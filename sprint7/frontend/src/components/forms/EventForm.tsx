// Ahmad Alrifai — 2121032805
import React, { useState } from "react";
import { categories } from "../../data/events";
import type { Category } from "../../types/campus-event";
import { validateEvent, type EventFormData } from "../../utils/validate-event";

interface EventFormProps {
    initialData?: EventFormData;
    onSubmit: (data: EventFormData) => void;
    submitText: string;
}

const emptyForm: EventFormData = {
    title: "",
    category: "" as Category,
    date: "",
    time: "",
    location: "",
    capacity: 50,
    description: "",
};

export default function EventForm({ initialData = emptyForm, onSubmit, submitText }: EventFormProps) {
    const [formData, setFormData] = useState<EventFormData>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateEvent(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };

    return (
        <form id="etkinlik-formu" className="form event-form" onSubmit={handleSubmit}>
            <p className="form-hint">Yıldızlı (*) alanlar zorunludur.</p>

            <div className="form-field">
                <label htmlFor="title">Etkinlik Adı *</label>
                <input
                    id="title" name="title" type="text"
                    value={formData.title} onChange={handleChange}
                    aria-invalid={Boolean(errors.title)}
                />
                {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="category">Kategori *</label>
                <select
                    id="category" name="category"
                    value={formData.category} onChange={handleChange}
                    aria-invalid={Boolean(errors.category)}
                >
                    <option value="" disabled>Seçiniz</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="date">Tarih *</label>
                <input
                    id="date" name="date" type="date"
                    value={formData.date} onChange={handleChange}
                    aria-invalid={Boolean(errors.date)}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="time">Saat *</label>
                <input
                    id="time" name="time" type="time"
                    value={formData.time} onChange={handleChange}
                    aria-invalid={Boolean(errors.time)}
                />
                {errors.time && <span className="field-error">{errors.time}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="location">Yer *</label>
                <input
                    id="location" name="location" type="text"
                    value={formData.location} onChange={handleChange}
                    aria-invalid={Boolean(errors.location)}
                />
                {errors.location && <span className="field-error">{errors.location}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="capacity">Kontenjan (Kişi)</label>
                <input
                    id="capacity" name="capacity" type="number" min="1" max="1000"
                    value={formData.capacity} onChange={handleChange}
                    aria-invalid={Boolean(errors.capacity)}
                />
                {errors.capacity && <span className="field-error">{errors.capacity}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="description">Açıklama</label>
                <textarea
                    id="description" name="description" rows={4}
                    value={formData.description} onChange={handleChange}
                />
            </div>

            <button type="submit">{submitText}</button>
        </form>
    );
}