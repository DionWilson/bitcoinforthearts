import Image from 'next/image';

type Props = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  description?: string;
  heightClassName?: string; // e.g. "h-[240px] sm:h-[320px] lg:h-[380px]"
  overlayClassName?: string; // e.g. "bg-black/35"
  children?: React.ReactNode; // optional actions/extra content
  showScrollHint?: boolean;
};

export default function FullBleedHero({
  imageSrc,
  imageAlt,
  label,
  title,
  description,
  heightClassName = 'h-[240px] sm:h-[320px] lg:h-[380px]',
  overlayClassName = 'bg-black/35',
  children,
  showScrollHint = true,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className={`relative w-full ${heightClassName}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-8 pb-10 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {label}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                {description}
              </p>
            ) : null}

            {children ? <div className="mt-6">{children}</div> : null}
          </div>
        </div>
      </div>

      {showScrollHint ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white/75">
          <div className="flex flex-col items-center gap-1">
            <div className="text-[11px] font-semibold uppercase tracking-wide">
              Scroll
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </section>
  );
}

