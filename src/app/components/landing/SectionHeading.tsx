interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-blue-50 text-[#2563EB] px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
