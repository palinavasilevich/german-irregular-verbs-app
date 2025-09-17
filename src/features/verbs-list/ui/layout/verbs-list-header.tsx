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
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>

      <div className="flex gap-2">{actions}</div>
    </div>
  );
}
