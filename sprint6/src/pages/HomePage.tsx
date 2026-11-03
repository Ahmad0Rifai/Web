// Ahmad Alrifai — 2121032805
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import { toISODate } from "../utils/format-date";

export default function HomePage() {
    const { events } = useEvents();

    const upcoming = [...events]
        .sort((a, b) =>
            `${toISODate(a.date)}T${a.time}`.localeCompare(
                `${toISODate(b.date)}T${b.time}`
            )
        )
        .slice(0, 2);

    return (
        <>
            <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} />
        </>
    );
}