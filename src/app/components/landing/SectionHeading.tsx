interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-slate-900';
  const descriptionColor = tone === 'dark' ? 'text-slate-300' : 'text-slate-600';
  const eyebrowColor =
    tone === 'dark'
      ? 'bg-blue-400/15 text-blue-200 ring-1 ring-inset ring-blue-300/20'
      : 'bg-blue-50 text-[#2563EB]';

  return (
    <div className={`flex flex-col max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4 ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
