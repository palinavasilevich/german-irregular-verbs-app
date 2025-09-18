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
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>

      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
