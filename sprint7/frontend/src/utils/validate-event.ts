// Ahmad Alrifai — 2121032805
import type { CampusEvent } from "../types/campus-event";

export type EventFormData = Omit<CampusEvent, "id">;

export function validateEvent(data: EventFormData) {
    const errors: Record<string, string> = {};

    if (data.title.trim().length < 3) {
        errors.title = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!data.category) {
        errors.category = "Bir kategori seçin.";
    }
    if (!data.date) {
        errors.date = "Geçerli bir tarih seçin.";
    }
    if (!data.time) {
        errors.time = "Geçerli bir saat seçin.";
    }
    if (data.location.trim().length < 3) {
        errors.location = "Yer bilgisini yazın.";
    }

    const capNum = Number(data.capacity);
    if (data.capacity && (isNaN(capNum) || capNum < 1 || capNum > 1000)) {
        errors.capacity = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    return errors;
}