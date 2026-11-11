// Ahmad Alrifai — 2121032805
import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
    return (
        <article className="event-detail" id="detay">
            <div className="detail-grid">
                <figure>
                    <img
                        src={`/images/${event.id}.svg`}
                        width={720}
                        height={480}
                        alt={`${event.title}: ${formatDate(event.date)}, ${event.time}, ${event.location}.`}
                    />
                    <figcaption>{event.title} afişi</figcaption>
                </figure>
                <div>
                    <h3>Etkinlik Künyesi</h3>
                    <dl>
                        <dt>Tarih</dt>
                        <dd>
                            <time dateTime={`${toISODate(event.date)}T${event.time}`}>
                                {formatDate(event.date)}, {event.time}
                            </time>
                        </dd>
                        <dt>Yer</dt>
                        <dd>{event.location}</dd>
                        <dt>Kategori</dt>
                        <dd>{event.category}</dd>
                        <dt>Kontenjan</dt>
                        <dd>{event.capacity} kişi</dd>
                    </dl>
                    <h3>Açıklama</h3>
                    <p>{event.description}</p>

                    <div className="detail-actions">
                        <Link className="detail-link" to="/events">
                            ← Listeye dön
                        </Link>
                        <Link className="button-link" to={`/admin/${event.id}/edit`}>
                            Bu etkinliği güncelle
                        </Link>
                    </div>

                </div>
            </div>
        </article>
    );
}