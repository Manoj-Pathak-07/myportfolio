export function SceneFallback() {
  return (
    <div
      data-scene-fallback
      className="relative flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Abstract geometric sculpture made of concentric rings around a faceted core"
    >
      <div data-fallback-frame className="relative aspect-square w-[min(76vw,34rem)] translate-x-[6%] translate-y-[-2%] md:translate-x-[22%]">
        <div data-fallback-orbit="outer" className="absolute inset-[8%] rounded-full border border-electric/15" />
        <div data-fallback-orbit="middle" className="absolute inset-[18%] -rotate-[24deg] rounded-full border border-violet/20" />
        <div data-fallback-orbit="inner" className="absolute inset-[27%] rotate-[42deg] rounded-full border border-chalk/10" />
        <div data-fallback-core className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2">
          <div data-fallback-facet className="absolute inset-0 rotate-45 border border-electric/30 bg-ink-raised/80" />
          <div data-fallback-inner-facet className="absolute inset-[18%] rotate-12 border border-violet/30" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk/80 shadow-[0_0_30px_8px_rgba(89,123,255,0.35)]" />
        </div>
        <div className="absolute inset-[2%] rounded-full border border-chalk/[0.04]" />
        <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-electric/60" />
        <span className="absolute bottom-[12%] right-[12%] h-1 w-1 rounded-full bg-violet/60" />
      </div>
    </div>
  );
}
