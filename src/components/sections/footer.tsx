export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-4 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid place-items-center pb-10">
          <span className="font-script text-2xl text-blush/70">
            some moments stay forever
          </span>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border/30 pt-8 md:flex-row">
          <div className="text-xs tracking-wide text-muted-foreground">
            © 2026 PROJECT: MERIN MARY · Some moments stay.
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "Memory Archive", href: "#story" },
              { label: "Patch Notes", href: "#moments" },
              { label: "Thanks", href: "#thanks" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
