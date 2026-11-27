const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatStipend(stipend: number) {
  if (stipend === 0) {
    return "Unpaid";
  }
  return `PKR ${stipend.toLocaleString("en-US")} / month`;
}

// Turns "2026-12-05" into "5 Dec 2026"
export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`;
}
