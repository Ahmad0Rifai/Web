// Ahmad Alrifai — 2121032805
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";

interface EventCardProps {
    event: CampusEvent;
    onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
    return (
        <article className="event-card">
            <h2>{event.title}</h2>
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
            <a
                className="detail-link"
                href={`#detail-${event.id}`}
                onClick={(e) => {
                    e.preventDefault();
                    onShowDetail(event.id);
                }}
            >
                Detayları gör
                <span className="sr-only">: {event.title}</span> →
            </a>
        </article>
    );
}

export default EventCard;