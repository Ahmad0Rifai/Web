// Ahmad Alrifai — 2121032805
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
    searchText: string;
    category: Category | "";
    categories: Category[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
                         searchText,
                         category,
                         categories,
                         onSearchChange,
                         onCategoryChange,
                     }: EventFilterProps) {
    return (
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
                    placeholder="Örn. atölye, kariyer"
                    autoComplete="off"
                    aria-controls="etkinlik-listesi"
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                    id="kategori-filtre"
                    name="kategori"
                    aria-controls="etkinlik-listesi"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value as Category | "")}
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
    );
}

export default EventFilter;