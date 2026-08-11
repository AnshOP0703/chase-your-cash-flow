const groups = [
  { title: "Product", links: [["How it works", "#how-it-works"], ["Pricing", "#pricing"], ["FAQ", "#faq"]] },
  { title: "Company", links: [["About", "#top"], ["Contact", "mailto:hello@tagada.app"]] },
  { title: "Legal", links: [["Privacy", "#top"], ["Terms", "#top"], ["Security", "#top"]] },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container-page grid gap-12 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="text-[1.05rem] font-semibold tracking-[-0.035em]">Tagada</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Invoicing that chases unpaid revenue for you.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="eyebrow">{g.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {g.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Tagada
      </div>
    </footer>
  );
}
