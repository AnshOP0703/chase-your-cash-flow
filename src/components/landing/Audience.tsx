import { User, Users, Briefcase, Building2 } from "lucide-react";

const items = [
  { icon: User, label: "Freelancers", line: "Get paid without awkward follow-ups." },
  { icon: Users, label: "Agencies", line: "Automate retainers and milestones." },
  { icon: Briefcase, label: "Consultants", line: "Stop sending payment reminders." },
  { icon: Building2, label: "Small businesses", line: "Know what's overdue." },
];

export function Audience() {
  return (
    <section aria-labelledby="audience-heading" className="border-b border-border py-20 sm:py-24">
      <div className="container-page">
        <h2 id="audience-heading" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Built for people who hate chasing.
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <li key={i.label} className="group bg-background p-6 transition-colors duration-300 hover:bg-surface">
              <i.icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
              />
              <h3 className="mt-5 text-sm font-semibold tracking-tight">{i.label}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{i.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
