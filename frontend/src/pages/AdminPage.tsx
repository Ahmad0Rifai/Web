// Ahmad Alrifai — 2121032805
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
    const { events, deleteEvent } = useEvents();

    const handleDelete = (id: string) => {
        if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
            deleteEvent(id);
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2>Etkinlik Yönetimi</h2>
                <Link to="/admin/new" className="button-link" style={{ textDecoration: "none" }}>
                    + Yeni Etkinlik
                </Link>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Etkinlik Adı</th>
                        <th>Tarih & Saat</th>
                        <th>Kategori</th>
                        <th>İşlemler</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td data-label="Etkinlik Adı">{event.title}</td>
                            <td data-label="Tarih & Saat">{formatDate(event.date)} - {event.time}</td>
                            <td data-label="Kategori">{event.category}</td>
                            <td data-label="İşlemler">
                                <Link to={`/admin/${event.id}/edit`} className="duzenle-btn" style={{ marginRight: "10px" }}>Düzenle</Link>
                                <button onClick={() => handleDelete(event.id)} className="sil-btn" style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Sil</button>
                            </td>
                        </tr>
                    ))}
                    {events.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>Etkinlik bulunamadı.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}