// Ahmad Alrifai — 2121032805
export type Category = "Seminer" | "Atölye" | "Söyleşi";

export interface CampusEvent {
    id: string;
    title: string;
    category: Category;
    date: string;
    time: string;
    location: string;
    description: string;
    capacity: number;
}