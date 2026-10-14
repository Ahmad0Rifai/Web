// Ahmad Alrifai — 2121032805
import { useState, useId } from "react";
import "./App.css";
import { events, categories, toISODate, toDisplayDate } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
    searchEvents,
    filterByCategory,
    findEventById,
} from "./utils/filter-events";

type Page = "home" | "events" | "detail" | "add" | "edit";

function App() {
    const [page, setPage] = useState<Page>("home");
    const [selectedId, setSelectedId] = useState<string>("event-1");
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<Category | "">("");

    // Form states for Add and Edit
    const [formTitle, setFormTitle] = useState("");
    const [formCategory, setFormCategory] = useState<Category | "">("");
    const [formDate, setFormDate] = useState("");
    const [formTime, setFormTime] = useState("");
    const [formLocation, setFormLocation] = useState("");
    const [formCapacity, setFormCapacity] = useState("");
    const [formDescription, setFormDescription] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formMessage, setFormMessage] = useState<{
        type: "success" | "error";
        text: string;
        data?: CampusEvent;
    } | null>(null);

    const adId = useId();
    const katId = useId();
    const tarihId = useId();
    const saatId = useId();
    const yerId = useId();
    const kontenjanId = useId();
    const aciklamaId = useId();

    function go(nextPage: Page, id?: string) {
        if (id) {
            setSelectedId(id);
            if (nextPage === "edit") {
                const ev = findEventById(events, id);
                if (ev) {
                    setFormTitle(ev.title);
                    setFormCategory(ev.category);
                    setFormDate(toISODate(ev.date));
                    setFormTime(ev.time);
                    setFormLocation(ev.location);
                    setFormCapacity(ev.capacity ? String(ev.capacity) : "");
                    setFormDescription(ev.description);
                }
            }
        }
        if (nextPage === "add") {
            setFormTitle("");
            setFormCategory("");
            setFormDate("");
            setFormTime("");
            setFormLocation("");
            setFormCapacity("");
            setFormDescription("");
        }
        setErrors({});
        setFormMessage(null);
        setPage(nextPage);
    }

    // Home Page: 2 Closest Upcoming Events
    const upcoming: CampusEvent[] = [...events]
        .sort((a, b) =>
            `${toISODate(a.date)}T${a.time}`.localeCompare(
                `${toISODate(b.date)}T${b.time}`
            )
        )
        .slice(0, 2);

    // Events Page: Search and Category Filter
    const filtered: CampusEvent[] = filterByCategory(
        searchEvents(events, query),
        category
    );

    const selectedEvent: CampusEvent | undefined = findEventById(
        events,
        selectedId
    );

    function handleFormSubmit(e: React.FormEvent, isUpdate: boolean) {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (formTitle.trim().length < 3) {
            newErrors.ad = "Etkinlik adı en az 3 karakter olmalı.";
        }
        if (!formCategory) {
            newErrors.kategori = "Bir kategori seçin.";
        }
        if (!formDate) {
            newErrors.tarih = "Geçerli bir tarih seçin.";
        }
        if (!formTime) {
            newErrors.saat = "Geçerli bir saat seçin.";
        }
        if (!formLocation.trim()) {
            newErrors.yer = "Yer bilgisini yazın.";
        }
        const capNum = formCapacity === "" ? null : Number(formCapacity);
        if (
            formCapacity !== "" &&
            (isNaN(capNum!) || capNum! < 1 || capNum! > 1000)
        ) {
            newErrors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setFormMessage({
                type: "error",
                text: "Formda hatalı alanlar var. Lütfen işaretli alanları düzeltin.",
            });
            return;
        }

        const targetId = isUpdate ? selectedId : `event-${events.length + 1}`;
        const payload: CampusEvent = {
            id: targetId,
            title: formTitle.trim(),
            category: formCategory as Category,
            date: formDate,
            time: formTime,
            location: formLocation.trim(),
            description: formDescription.trim(),
            capacity: capNum ?? 50,
        };

        setFormMessage({
            type: "success",
            text: isUpdate
                ? "Etkinlik güncellendi (bu sprintte kalıcı olarak kaydedilmez):"
                : "Etkinlik oluşturuldu (bu sprintte kalıcı olarak kaydedilmez):",
            data: payload,
        });
    }

    function renderCard(event: CampusEvent) {
        return (
            <article key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p className="category-label">{event.category}</p>
                <p>
                    <strong>Tarih:</strong>{" "}
                    <time dateTime={`${toISODate(event.date)}T${event.time}`}>
                        {toDisplayDate(event.date)}, {event.time}
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
                        go("detail", event.id);
                    }}
                >
                    Detayları gör
                    <span className="sr-only">: {event.title}</span> →
                </a>
            </article>
        );
    }

    return (
        <>
            <header className="site-header">
                <div className="container">
                    <h1>Kampüs Etkinlikleri</h1>
                    <nav aria-label="Ana menü">
                        <a
                            href="#home"
                            aria-current={page === "home" ? "page" : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                go("home");
                            }}
                        >
                            Ana Sayfa
                        </a>
                        <a
                            href="#events"
                            aria-current={page === "events" ? "page" : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                go("events");
                            }}
                        >
                            Etkinlikler
                        </a>
                        <a
                            href="#add"
                            aria-current={page === "add" ? "page" : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                go("add");
                            }}
                        >
                            Ekle
                        </a>
                    </nav>
                </div>
            </header>

            <main className="container" id="ana-icerik">
                {page === "home" && (
                    <>
                        <p className="intro">
                            Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
                        </p>
                        <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
                        <section
                            id="etkinlik-listesi"
                            className="event-grid upcoming-grid"
                            aria-labelledby="yaklasan-baslik"
                        >
                            {upcoming.map(renderCard)}
                        </section>
                        <p className="all-events">
                            <a
                                href="#events"
                                onClick={(e) => {
                                    e.preventDefault();
                                    go("events");
                                }}
                            >
                                Tüm etkinlikleri gör →
                            </a>
                        </p>
                    </>
                )}

                {page === "events" && (
                    <>
                        <h2 id="liste-baslik">Tüm Etkinlikler</h2>
                        <form
                            id="filtre-formu"
                            className="filtre"
                            role="search"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div>
                                <label htmlFor="arama">Etkinlik ara</label>
                                <input
                                    type="search"
                                    id="arama"
                                    name="arama"
                                    placeholder="Atölye, kariyer…"
                                    autoComplete="off"
                                    aria-controls="etkinlik-listesi"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="kategori-filtre">Kategori</label>
                                <select
                                    id="kategori-filtre"
                                    name="kategori"
                                    aria-controls="etkinlik-listesi"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value as Category | "")
                                    }
                                >
                                    <option value="">Tümü</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>

                        <p id="sonuc" role="status" aria-live="polite" aria-atomic="true">
                            {filtered.length} etkinlik listeleniyor.
                        </p>

                        <section
                            id="etkinlik-listesi"
                            className="event-grid"
                            aria-labelledby="liste-baslik"
                        >
                            {filtered.length > 0 ? (
                                filtered.map(renderCard)
                            ) : (
                                <p className="empty-state">
                                    Aramanıza uygun etkinlik bulunamadı. Arama metnini veya
                                    kategoriyi değiştirin.
                                </p>
                            )}
                        </section>
                    </>
                )}

                {page === "detail" && (
                    <div id="detay">
                        {!selectedEvent ? (
                            <div className="notice notice-error" role="alert">
                                <p>
                                    Etkinlik bulunamadı. Bağlantı eksik veya geçersiz; lütfen
                                    listeden bir etkinlik seçin.
                                </p>
                            </div>
                        ) : (
                            <article className="event-detail">
                                <h2>{selectedEvent.title}</h2>
                                <div className="detail-grid">
                                    <figure>
                                        <img
                                            src={`images/${selectedEvent.id}.svg`}
                                            width={720}
                                            height={480}
                                            alt={`${selectedEvent.title}: ${toDisplayDate(
                                                selectedEvent.date
                                            )}, ${selectedEvent.time}, ${selectedEvent.location}.`}
                                        />
                                        <figcaption>
                                            {selectedEvent.title} etkinlik afişi.
                                        </figcaption>
                                    </figure>
                                    <div>
                                        <h3>Etkinlik Künyesi</h3>
                                        <dl>
                                            <dt>Tarih</dt>
                                            <dd>
                                                <time
                                                    dateTime={`${toISODate(selectedEvent.date)}T${
                                                        selectedEvent.time
                                                    }`}
                                                >
                                                    {toDisplayDate(selectedEvent.date)},{" "}
                                                    {selectedEvent.time}
                                                </time>
                                            </dd>
                                            <dt>Yer</dt>
                                            <dd>{selectedEvent.location}</dd>
                                            <dt>Kategori</dt>
                                            <dd>{selectedEvent.category}</dd>
                                            <dt>Kontenjan</dt>
                                            <dd>{selectedEvent.capacity} kişi</dd>
                                        </dl>
                                        <h3>Açıklama</h3>
                                        <p>{selectedEvent.description}</p>
                                        <div className="detail-actions">
                                            <a
                                                className="detail-link"
                                                href="#events"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    go("events");
                                                }}
                                            >
                                                ← Listeye dön
                                            </a>
                                            <a
                                                className="button-link"
                                                href={`#edit-${selectedEvent.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    go("edit", selectedEvent.id);
                                                }}
                                            >
                                                Bu etkinliği güncelle
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )}
                    </div>
                )}

                {(page === "add" || page === "edit") && (
                    <div>
                        <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
                        <form
                            id="etkinlik-formu"
                            className="event-form"
                            onSubmit={(e) => handleFormSubmit(e, page === "edit")}
                        >
                            <p className="form-hint">
                                Yıldızlı (*) alanlar zorunludur. Bu sprintte bilgiler kalıcı
                                olarak kaydedilmez; sonuç aşağıda gösterilir.
                            </p>

                            <div className="form-field">
                                <label htmlFor={adId}>Etkinlik adı *</label>
                                <input
                                    id={adId}
                                    name="ad"
                                    type="text"
                                    required
                                    aria-invalid={Boolean(errors.ad)}
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                />
                                <span className="field-error" id={`${adId}-hata`}>
                  {errors.ad}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={katId}>Kategori *</label>
                                <select
                                    id={katId}
                                    name="kategori"
                                    required
                                    aria-invalid={Boolean(errors.kategori)}
                                    value={formCategory}
                                    onChange={(e) =>
                                        setFormCategory(e.target.value as Category | "")
                                    }
                                >
                                    <option value="">Seçiniz</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <span className="field-error" id={`${katId}-hata`}>
                  {errors.kategori}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={tarihId}>Tarih *</label>
                                <input
                                    id={tarihId}
                                    name="tarih"
                                    type="date"
                                    required
                                    aria-invalid={Boolean(errors.tarih)}
                                    value={formDate}
                                    onChange={(e) => setFormDate(e.target.value)}
                                />
                                <span className="field-error" id={`${tarihId}-hata`}>
                  {errors.tarih}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={saatId}>Saat *</label>
                                <input
                                    id={saatId}
                                    name="saat"
                                    type="time"
                                    required
                                    aria-invalid={Boolean(errors.saat)}
                                    value={formTime}
                                    onChange={(e) => setFormTime(e.target.value)}
                                />
                                <span className="field-error" id={`${saatId}-hata`}>
                  {errors.saat}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={yerId}>Yer *</label>
                                <input
                                    id={yerId}
                                    name="yer"
                                    type="text"
                                    required
                                    aria-invalid={Boolean(errors.yer)}
                                    value={formLocation}
                                    onChange={(e) => setFormLocation(e.target.value)}
                                />
                                <span className="field-error" id={`${yerId}-hata`}>
                  {errors.yer}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={kontenjanId}>Kontenjan (isteğe bağlı)</label>
                                <input
                                    id={kontenjanId}
                                    name="kontenjan"
                                    type="number"
                                    min="1"
                                    max="1000"
                                    step="1"
                                    aria-invalid={Boolean(errors.kontenjan)}
                                    value={formCapacity}
                                    onChange={(e) => setFormCapacity(e.target.value)}
                                />
                                <span className="field-error" id={`${kontenjanId}-hata`}>
                  {errors.kontenjan}
                </span>
                            </div>

                            <div className="form-field">
                                <label htmlFor={aciklamaId}>Açıklama (isteğe bağlı)</label>
                                <textarea
                                    id={aciklamaId}
                                    name="aciklama"
                                    rows={4}
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                ></textarea>
                                <span className="field-error" id={`${aciklamaId}-hata`}></span>
                            </div>

                            <button type="submit">
                                {page === "add" ? "Kaydet" : "Güncelle"}
                            </button>
                        </form>

                        {formMessage && (
                            <div
                                id="form-mesaj"
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                                className={`notice ${
                                    formMessage.type === "error"
                                        ? "notice-error"
                                        : "notice-success"
                                }`}
                                style={{ marginTop: "1rem" }}
                            >
                                <p>{formMessage.text}</p>
                                {formMessage.data && (
                                    <pre>{JSON.stringify(formMessage.data, null, 2)}</pre>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>

            <footer className="site-footer container">
                <p>Ahmad Alrifai · 2121032805 · 2026</p>
            </footer>
        </>
    );
}

export default App;