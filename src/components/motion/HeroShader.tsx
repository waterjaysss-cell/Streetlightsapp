"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import { heroShader } from "@/lib/motion";

/* ============================================================================
   HERO SHADER — monochrome FBM noise field
   ============================================================================
   - Full-screen quad with a custom GLSL fragment shader.
   - Output is strictly in the night → smoke → bone grayscale range — no color.
   - Drifts slowly over time; mouse position warps the noise field subtly.
   - Rendered with mixBlendMode: 'overlay' so it adds film-grain atmosphere
     on top of the hero photo without overpowering it.
   ============================================================================ */

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uMouseInfluence;

  // Cheap hash + value noise — perf > fidelity for a background field.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    // preserve aspect so noise is round, not stretched
    p.x *= uResolution.x / uResolution.y;

    // mouse pushes the field — subtle, not parallactic
    vec2 mouseOffset = uMouse * uMouseInfluence;

    // two layers drifting at different rates feel less mechanical
    float t = uTime * uSpeed;
    float n1 = fbm(p * 1.2 + vec2(t * 0.6, -t * 0.4) + mouseOffset);
    float n2 = fbm(p * 2.8 - vec2(t * 0.3, t * 0.5) - mouseOffset * 0.5);
    float n = mix(n1, n2, 0.4);

    // map to night (0.04) → smoke (0.45) → bone (0.96), then clamp brightness
    // so it stays in the "atmospheric grain" zone, not the "light show" zone.
    float gray = mix(0.06, 0.55, smoothstep(0.25, 0.85, n));

    // edge falloff — keeps the center subtle so headline stays primary
    float vignette = smoothstep(1.4, 0.3, length(p));
    gray *= vignette;

    gl_FragColor = vec4(vec3(gray), 1.0);
  }
`;

function NoiseField() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: {
        value: new THREE.Vector2(
          size.width * viewport.dpr,
          size.height * viewport.dpr,
        ),
      },
      uSpeed: { value: heroShader.speed },
      uMouseInfluence: { value: heroShader.mouseInfluence },
    }),
    // intentionally only on mount — resolution updates via the resize effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // resize
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr,
      );
    }
  });

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // smooth the mouse so wiggles feel weighted, not jittery
    mouseTarget.current.set(state.pointer.x, state.pointer.y);
    mouseSmooth.current.lerp(mouseTarget.current, 0.04);
    materialRef.current.uniforms.uMouse.value.copy(mouseSmooth.current);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // We blend in CSS via mixBlendMode — keep WebGL output opaque so
        // the blend is deterministic and not double-applied.
        transparent={false}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

export default function HeroShader() {
  return (
    <Canvas
      // GL config tuned for reliability over performance:
      // - alpha:true — the wrapper uses mixBlendMode and needs transparency
      // - antialias:false — we render fbm noise, no edges to smooth
      // - powerPreference "default" — "high-performance" can fail to
      //   acquire a context on integrated GPUs; default falls back gracefully
      // - failIfMajorPerformanceCaveat:false — let the browser provide
      //   software-rasterized GL rather than refusing entirely
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
      }}
      dpr={[1, heroShader.maxDpr]}
      // flat 2D quad — orthographic so the screen quad fills correctly
      orthographic
      camera={{ position: [0, 0, 1], near: 0, far: 1 }}
      style={{ width: "100%", height: "100%" }}
    >
      <NoiseField />
    </Canvas>
  );
}
