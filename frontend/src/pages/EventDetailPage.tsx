// Ahmad Alrifai — 2121032805
import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
    const { id } = useParams();
    const { events } = useEvents();

    // Find the event by checking if the id from the URL matches the data
    const event = events.find((e) => e.id === id);

    if (!event) {
        return <NotFoundPage />;
    }

    return <EventDetail event={event} />;
}