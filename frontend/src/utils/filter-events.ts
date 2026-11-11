// Ahmad Alrifai — 2121032805
import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(
    list: CampusEvent[],
    query: string
): CampusEvent[] {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    if (!q) return list;
    return list.filter((e) =>
        e.title.toLocaleLowerCase("tr-TR").includes(q)
    );
}

export function filterByCategory(
    list: CampusEvent[],
    category: Category | ""
): CampusEvent[] {
    if (!category) return list;
    return list.filter((e) => e.category === category);
}

export function findEventById(
    list: CampusEvent[],
    id: string
): CampusEvent | undefined {
    return list.find((e) => e.id === id);
}