type PageContentProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

export function PageContent({ title, children }: PageContentProps) {
  return (
    <section className="container mx-auto mt-6">
      <div className="flex-1 flex flex-col">
        <h1 className="section-title m-auto mb-6">{title}</h1>
        {children}
      </div>
    </section>
  );
}
