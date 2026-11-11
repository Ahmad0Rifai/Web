// Ahmad Alrifai — 2121032805
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import { categories } from "../data/events";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
    const { events } = useEvents();
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const filtered = filterByCategory(searchEvents(events, searchText), category);

    return (
        <>
            <EventFilter
                searchText={searchText}
                category={category}
                categories={categories}
                onSearchChange={setSearchText}
                onCategoryChange={setCategory}
            />
            <p id="sonuc" className="sonuc" role="status" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
            </p>
            <EventList events={filtered} />
        </>
    );
}