import { events, toISODate, toDisplayDate, escapeHTML } from "./data.js";

const container = document.querySelector("#detay");
const heading = document.querySelector("h1");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((item) => item.id === id);

if (container) {
  if (!event) {
    heading.textContent = "Etkinlik bulunamadı";
    document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
    container.innerHTML = `<div class="notice notice-error" role="alert">
      <p>Etkinlik bulunamadı. Bağlantı eksik veya geçersiz; lütfen listeden bir etkinlik seçin.</p>
    </div><p><a class="button-link" href="etkinlikler.html">← Listeye dön</a></p>`;
  } else {
    heading.textContent = event.title;
    document.title = `${event.title} | Kampüs Etkinlikleri`;
    container.innerHTML = `<article class="event-detail">
      <div class="detail-grid">
        <figure>
          <img src="images/${event.id}.svg" width="720" height="480"
            alt="${escapeHTML(event.title)}: ${toDisplayDate(event.date)}, ${event.time}, ${escapeHTML(event.location)}.">
          <figcaption>${escapeHTML(event.title)} etkinlik afişi.</figcaption>
        </figure>
        <div>
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt><dd><time datetime="${toISODate(event.date)}T${event.time}">${toDisplayDate(event.date)}, ${event.time}</time></dd>
            <dt>Yer</dt><dd>${escapeHTML(event.location)}</dd>
            <dt>Kategori</dt><dd>${escapeHTML(event.category)}</dd>
            <dt>Kontenjan</dt><dd>${event.capacity} kişi</dd>
          </dl>
          <h2>Açıklama</h2>
          <p>${escapeHTML(event.description)}</p>
          <div class="detail-actions">
            <a class="detail-link" href="etkinlikler.html">← Listeye dön</a>
            <a class="button-link" href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}">Bu etkinliği güncelle</a>
          </div>
        </div>
      </div>
    </article>`;
  }
}
