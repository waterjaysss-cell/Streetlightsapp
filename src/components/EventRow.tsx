type Props = {
  day: string;
  month: string;
  title: string;
  location: string;
};

export default function EventRow({ day, month, title, location }: Props) {
  return (
    <div className="group grid grid-cols-[auto_1fr] sm:grid-cols-[10rem_1fr_auto] items-baseline gap-x-6 sm:gap-x-10 gap-y-2 border-t border-bone/15 py-7 sm:py-9 transition-colors hover:bg-bone/[0.02]">
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="font-display text-5xl sm:text-7xl leading-none">
          {day}
        </span>
        <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-smoke">
          {month}
        </span>
      </div>

      <h3 className="col-start-1 sm:col-start-2 col-span-2 sm:col-span-1 font-display text-3xl sm:text-5xl uppercase leading-none tracking-tight">
        {title}
      </h3>

      <p className="col-start-1 sm:col-start-3 col-span-2 sm:col-span-1 text-sm uppercase tracking-[0.22em] text-bone/70 sm:text-right">
        {location}
      </p>
    </div>
  );
}
