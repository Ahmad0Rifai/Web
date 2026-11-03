// Ahmad Alrifai — 2121032805
import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";

interface EventCardProps {
    event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <article className="event-card">
            <h3>{event.title}</h3>
            <p className="category-label">{event.category}</p>
            <p>
                <strong>Tarih:</strong>{" "}
                <time dateTime={`${toISODate(event.date)}T${event.time}`}>
                    {formatDate(event.date)}, {event.time}
                </time>
            </p>
            <p>
                <strong>Yer:</strong> {event.location}
            </p>
            <p>
                <strong>Kontenjan:</strong> {event.capacity} kişi
            </p>
            <p className="card-description">{event.description}</p>
            <Link className="detail-link" to={`/events/${event.id}`}>
                Detayları gör
                <span className="sr-only">: {event.title}</span> →
            </Link>
        </article>
    );
}