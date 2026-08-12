/**
 * One invoice, followed across the whole page.
 * Every section reuses this same client, amount and collection timeline so the
 * page reads as a single story rather than a stack of sections.
 */
export const INVOICE = {
  client: "Northline Creative",
  initials: "NC",
  number: "#0042",
  amount: "₹48,000",
  amountValue: 48000,
  due: "14 March",
  note: "Design retainer",
  contact: "Priya",
} as const;

export const COLLECTION = [
  { key: "sent", label: "Invoice sent", meta: "Day 0" },
  { key: "scheduled", label: "Reminder scheduled", meta: "Day 3" },
  { key: "email", label: "Email reminder", meta: "Day 7" },
  { key: "whatsapp", label: "WhatsApp follow-up", meta: "Day 14" },
  { key: "paid", label: "Payment received", meta: "UPI" },
] as const;
