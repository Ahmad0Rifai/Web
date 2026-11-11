# Kampüs Etkinlikleri Backend

## Kurulum ve Çalıştırma
Projeyi bilgisayarınızda çalıştırmak için aşağıdaki komutları sırasıyla terminalde çalıştırın:
1. `npm install`
2. `npm run dev`

## Ortam Değişkenleri
Uygulama bağlantı noktası `.env` dosyasındaki `PORT` değişkeninden okunur.
Eğer `.env` dosyası yoksa `.env.example` dosyasını kopyalayarak oluşturabilirsiniz (Örnek: `PORT=3000`).

## REST API Sözleşmesi
| Method | Endpoint | Amaç | Başarılı | Hata |
|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 |
| POST | `/events` | Yeni etkinlik | 201 | 400 |