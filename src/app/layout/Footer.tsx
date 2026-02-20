export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-4 text-center text-[11px] text-muted-foreground">
      Mighty Verbs © {currentYear} • Designed & built by pvslvch
    </footer>
  );
}
