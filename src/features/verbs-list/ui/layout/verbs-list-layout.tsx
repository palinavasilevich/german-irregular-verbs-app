type VerbsListLayoutProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

export function VerbsListLayout({ header, children }: VerbsListLayoutProps) {
  return (
    <section className="container mx-auto">
      <div className="flex-1 flex flex-col gap-6">
        {header}
        {children}
      </div>
    </section>
  );
}
