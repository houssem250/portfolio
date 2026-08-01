type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  id?: string;
};

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
