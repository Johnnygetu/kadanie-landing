type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-wine-600">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-wine-900 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-wine-900/60 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
