// Ahmad Alrifai — 2121032805
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
    onBack: () => void;
    onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    return (
        <article className="event-detail" id="detay">
            <div className="detail-grid">
                <figure>
                    <img
                        src={`images/${event.id}.svg`}
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
                        <a
                            className="detail-link"
                            href="#events"
                            onClick={(e) => {
                                e.preventDefault();
                                onBack();
                            }}
                        >
                            ← Listeye dön
                        </a>
                        <a
                            className="button-link"
                            href={`#update-${event.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onEdit(event.id);
                            }}
                        >
                            Bu etkinliği güncelle
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default EventDetail;