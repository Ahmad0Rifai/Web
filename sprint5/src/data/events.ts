// Ahmad Alrifai — 2121032805
// Tek veri kaynağı. Tarihler GG-AA-YYYY, saatler SS:DD biçimindedir.
import type { CampusEvent , Category} from "../types/campus-event";

export const events: CampusEvent[] = [
    {
        id: "event-1",
        title: "Kariyer Günleri 2026",
        category: "Seminer",
        date: "12-10-2026",
        time: "14:00",
        location: "A Blok Konferans Salonu",
        description:
            "Mezunlarla kariyer söyleşileri ve şirket standları. Farklı sektörlerdeki çalışma alanlarını tanıyın.",
        capacity: 120,
    },
    {
        id: "event-2",
        title: "Robotik Atölyesi",
        category: "Atölye",
        date: "20-10-2026",
        time: "10:00",
        location: "Bilgisayar Laboratuvarı 2",
        description:
            "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi. Temel robotik bileşenleri uygulamalı olarak tanıyın.",
        capacity: 30,
    },
    {
        id: "event-3",
        title: "Siber Güvenlik Söyleşisi",
        category: "Söyleşi",
        date: "27-10-2026",
        time: "13:00",
        location: "B Blok Amfi 1",
        description:
            "Sektörden bir uzmanla güvenlik kariyerleri, güçlü parolalar ve çevrim içi tehditler üzerine sohbet.",
        capacity: 80,
    },
    {
        id: "event-4",
        title: "Web Tasarım Atölyesi",
        category: "Atölye",
        date: "03-11-2026",
        time: "15:00",
        location: "Bilgisayar Laboratuvarı 1",
        description:
            "HTML ve CSS ile ilk kişisel web sayfanızı oluşturun. Başlangıç seviyesine uygun uygulamalı çalışma.",
        capacity: 30,
    },
    {
        id: "event-5",
        title: "Yapay Zekâ Semineri",
        category: "Seminer",
        date: "10-11-2026",
        time: "11:00",
        location: "A Blok Konferans Salonu",
        description:
            "Yapay zekânın temel kavramlarını, günlük kullanımlarını ve sorumlu kullanım ilkelerini keşfedin.",
        capacity: 100,
    },
    {
        id: "event-6",
        title: "Girişimcilik Söyleşisi",
        category: "Söyleşi",
        date: "24-11-2026",
        time: "13:30",
        location: "B Blok Amfi 2",
        description:
            "Genç girişimcilerle tanışma ve soru-cevap. Bir fikri projeye dönüştürmenin ilk adımlarını öğrenin.",
        capacity: 80,
    },
];

export const categories: Category[] = ["Seminer", "Atölye", "Söyleşi"];

// HTML tarih alanı YYYY-MM-DD bekler. Sıralamada da bu biçimi kullanırız.
export function toISODate(date: string): string {
    const parts = date.split("-");
    return parts[0].length === 4 ? date : parts.reverse().join("-");
}

export function toDisplayDate(date: string): string {
    const iso = toISODate(date);
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}