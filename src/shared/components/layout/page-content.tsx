type PageContentProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

export function PageContent({ title, children }: PageContentProps) {
  return (
    <section className="container mx-auto">
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="section-title m-auto">{title}</h1>
        {children}
      </div>
    </section>
  );
}
