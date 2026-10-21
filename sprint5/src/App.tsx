// Ahmad Alrifai — 2121032805
import { useState } from "react";
import "./App.css";
import { events, categories } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { toISODate } from "./utils/format-date";
import {
    searchEvents,
    filterByCategory,
    findEventById,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
    const [page, setPage] = useState<PageName>("home");
    const [selectedId, setSelectedId] = useState<string>("event-1");
    const [searchText, setSearchText] = useState<string>("");
    const [category, setCategory] = useState<Category | "">("");

    const upcoming = [...events]
        .sort((a, b) =>
            `${toISODate(a.date)}T${a.time}`.localeCompare(
                `${toISODate(b.date)}T${b.time}`
            )
        )
        .slice(0, 2);

    const filtered = filterByCategory(searchEvents(events, searchText), category);
    const selected = findEventById(events, selectedId);

    function go(nextPage: PageName, id?: string) {
        if (id) setSelectedId(id);
        setPage(nextPage);
        window.scrollTo(0, 0);
    }

    const headerTitle =
        page === "home"
            ? "Kampüs Etkinlikleri"
            : page === "events"
                ? "Tüm Etkinlikler"
                : page === "detail" && selected
                    ? selected.title
                    : page === "add"
                        ? "Etkinlik Ekle"
                        : "Etkinlik Güncelle";

    const headerText =
        page === "home"
            ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
            : page === "events"
                ? "Bahar ayında kampüste düzenlenen etkinlikler."
                : undefined;

    return (
        <>
            <Header title={headerTitle} text={headerText} />
            <Navigation current={page} onNavigate={(p) => go(p)} />

            <main className="container" id="ana-icerik">
                {page === "home" && (
                    <>
                        <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
                        <EventList
                            events={upcoming}
                            onShowDetail={(id) => go("detail", id)}
                        />
                        <p className="all-events">
                            <a
                                href="#events"
                                onClick={(e) => {
                                    e.preventDefault();
                                    go("events");
                                }}
                            >
                                Tüm etkinliklere git →
                            </a>
                        </p>
                    </>
                )}

                {page === "events" && (
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
                        <EventList
                            events={filtered}
                            onShowDetail={(id) => go("detail", id)}
                            emptyText="Aramanıza uygun etkinlik bulunamadı."
                        />
                    </>
                )}

                {page === "detail" && selected && (
                    <EventDetail
                        event={selected}
                        onBack={() => go("events")}
                        onEdit={(id) => go("update", id)}
                    />
                )}

                {(page === "add" || page === "update") && (
                    <EventForm onSubmit={() => window.scrollTo(0, 0)} />
                )}
            </main>

            <Footer />
        </>
    );
}

export default App;