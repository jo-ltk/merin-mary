export function Footer() {
  return (
    <footer className="px-8 py-12 md:px-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © 2026 PROJECT: MERIN MARY. Some moments stay.
        </div>
        <div className="flex items-center gap-6">
          {["Memory Archive", "Patch Notes", "Thanks"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

