export function OrbitLoader() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink-raised">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(89,123,255,0.16),transparent_55%)]" />
      <div className="relative h-24 w-24" aria-hidden="true">
        <div className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full border border-electric/30" />
        <div className="absolute inset-3 rotate-[36deg] animate-[spin_6s_linear_infinite_reverse] rounded-full border border-violet/40" />
        <div className="absolute inset-7 animate-[spin_4s_linear_infinite] rounded-full border border-chalk/20" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk shadow-[0_0_18px_4px_rgba(89,123,255,0.4)]" />
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
        Pure CSS / 3 rings
      </span>
      <span className="sr-only">Animated orbital loading mark</span>
    </div>
  );
}
