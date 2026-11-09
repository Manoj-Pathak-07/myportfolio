import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative z-10 bg-ink">
      <div className="shell flex min-h-[80svh] flex-col justify-center py-32">
        <p className="eyebrow-accent">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-display-md text-chalk">
          This route doesn&apos;t resolve.
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
          The page you were looking for has moved, been renamed, or never existed.
          नेभिगेसन भने काम गरिरहेको छ।
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/en/" className="button-primary">
            English home
          </Link>
          <Link href="/ne/" className="button-secondary">
            नेपाली गृहपृष्ठ
          </Link>
        </div>
      </div>
    </div>
  );
}
