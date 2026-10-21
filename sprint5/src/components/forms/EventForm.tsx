// Ahmad Alrifai — 2121032805
import { categories } from "../../data/events";

interface EventFormProps {
    onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
    return (
        <>
            <p className="form-hint">
                Bu aşama form sadece görünüm; kayıt yapılmaz.
            </p>
            <form
                id="etkinlik-formu"
                className="form event-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="form-field">
                    <label htmlFor="etkinlik-adi">Etkinlik Adı</label>
                    <input
                        id="etkinlik-adi"
                        name="ad"
                        type="text"
                        placeholder="Örn. Kariyer Günleri 2026"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="kategori">Kategori</label>
                    <select id="kategori" name="kategori" defaultValue="" required>
                        <option value="" disabled>
                            Seçiniz
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="tarih">Tarih</label>
                    <input id="tarih" name="tarih" type="date" required />
                </div>

                <div className="form-field">
                    <label htmlFor="saat">Saat</label>
                    <input id="saat" name="saat" type="time" required />
                </div>

                <div className="form-field">
                    <label htmlFor="yer">Yer</label>
                    <input
                        id="yer"
                        name="yer"
                        type="text"
                        placeholder="Örn. A Blok Konferans Salonu"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="kontenjan">Kontenjan</label>
                    <input
                        id="kontenjan"
                        name="kontenjan"
                        type="number"
                        min="1"
                        max="1000"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="aciklama">Açıklama</label>
                    <textarea id="aciklama" name="aciklama" rows={4} />
                </div>

                <button type="submit">Kaydet</button>
            </form>
        </>
    );
}

export default EventForm;