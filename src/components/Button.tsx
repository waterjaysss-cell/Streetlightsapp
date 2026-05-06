import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "filled" | "outline";

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center px-7 sm:px-9 h-14 text-sm uppercase tracking-[0.22em] font-medium transition-colors duration-200 select-none";

const variants: Record<Variant, string> = {
  filled: "bg-bone text-night hover:bg-bone/90",
  outline:
    "border border-bone text-bone hover:bg-bone hover:text-night",
};

export default function Button({
  variant = "filled",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <Link
      {...rest}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
