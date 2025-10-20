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
    <div className="w-full flex flex-col">
      {header && (
        <div className="mb-4 flex items-center justify-between">{header}</div>
      )}
      {children}
      {footer}
    </div>
  );
}
