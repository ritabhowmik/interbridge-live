const PROVINCES = ["ON", "QC", "BC", "AB"];

export default function ProvinceStrip({ target }: { target: string }) {
  return (
    <div className="flex justify-center gap-3 mb-10">
      {PROVINCES.map((p) => {
        const isTarget = p === target;
        return (
          <div
            key={p}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display text-sm relative ${
              isTarget
                ? "bg-cherry text-cream"
                : "bg-ink/5 text-ink/40 border border-ink/15"
            }`}
          >
            {p}
            {isTarget && (
              <span className="absolute -bottom-5 text-[10px] font-medium text-cherry whitespace-nowrap">
                expanding here
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
