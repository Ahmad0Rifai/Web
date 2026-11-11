# Kampüs Etkinlikleri Backend

## REST API Sözleşmesi
| Method | Endpoint | Amaç | Başarılı | Hata |
|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 |
| POST | `/events` | Yeni etkinlik | 201 | 400 |
