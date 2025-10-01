type VerbsTableLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function VerbsTableLayout({
  header,
  children,
  footer,
}: VerbsTableLayoutProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">{header}</div>
      {children}
      {footer}
    </div>
  );
}
