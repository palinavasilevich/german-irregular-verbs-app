type VerbsListLayoutHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function VerbsListLayoutHeader({
  title,
  description,
  actions,
}: VerbsListLayoutHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="section-title m-auto">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>

      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
