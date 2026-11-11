// Ahmad Alrifai — 2121032805
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
    events: CampusEvent[];
    emptyText?: string;
}

export default function EventList({
                                      events,
                                      emptyText = "Aramanıza uygun etkinlik bulunamadı.",
                                  }: EventListProps) {
    if (events.length === 0) {
        return <p className="sonuc empty-state">{emptyText}</p>;
    }

    return (
        <section id="etkinlik-listesi" className="event-grid">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </section>
    );
}