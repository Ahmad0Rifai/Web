// Ahmad Alrifai — 2121032805
export function toISODate(date: string): string {
    const parts = date.split("-");
    return parts[0].length === 4 ? date : parts.reverse().join("-");
}

export function formatDate(date: string): string {
    const iso = toISODate(date);
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const toDisplayDate = formatDate;