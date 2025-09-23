type VerbsListLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function VerbsListLayout({
  header,
  children,
  footer,
}: VerbsListLayoutProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center">{header}</div>
      {children}
      {footer}
    </div>
  );
}
