export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 shadow-sm py-4 text-center text-xs text-gray-500">
      <div className="space-y-1">
        <p className="font-medium text-gray-600">
          Mighty Verbs © {currentYear}
        </p>
        <p>Built with ❤️ for learning German irregular verbs</p>
        <p className="text-xs text-gray-400">by pvslvch</p>
      </div>
    </footer>
  );
}
