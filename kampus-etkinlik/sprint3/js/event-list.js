import { events, toISODate, toDisplayDate, escapeHTML } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filterForm = document.querySelector("#filtre-formu");
const search = document.querySelector("#arama");
const category = document.querySelector("#kategori-filtre");
const resultLine = document.querySelector("#sonuc");

function createCard(event) {
  return `<article class="event-card">
    <h3>${escapeHTML(event.title)}</h3>
    <p class="category-label">${escapeHTML(event.category)}</p>
    <p><strong>Tarih:</strong> <time datetime="${toISODate(event.date)}T${event.time}">${toDisplayDate(event.date)}, ${event.time}</time></p>
    <p><strong>Yer:</strong> ${escapeHTML(event.location)}</p>
    <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
    <p class="card-description">${escapeHTML(event.description)}</p>
    <a class="detail-link" href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}">Detayları gör<span class="sr-only">: ${escapeHTML(event.title)}</span> →</a>
  </article>`;
}

function render(items) {
  list.innerHTML = items.length
    ? items.map(createCard).join("")
    : '<p class="empty-state">Aramanıza uygun etkinlik bulunamadı. Arama metnini veya kategoriyi değiştirin.</p>';
  if (resultLine) resultLine.textContent = `${items.length} etkinlik listeleniyor.`;
}

function filterEvents() {
  const query = search.value.trim().toLocaleLowerCase("tr-TR");
  const filtered = events.filter((event) => {
    const text = `${event.title} ${event.category} ${event.location} ${event.description}`
      .toLocaleLowerCase("tr-TR");
    return text.includes(query) && (!category.value || event.category === category.value);
  });
  render(filtered);
}

if (list) {
  if (list.dataset.limit) {
    // GG-AA-YYYY metinlerini doğrudan sıralamak ay değişiminde yanlış sonuç verir.
    const upcoming = [...events]
      .sort((a, b) => `${toISODate(a.date)}T${a.time}`.localeCompare(`${toISODate(b.date)}T${b.time}`))
      .slice(0, Number(list.dataset.limit));
    render(upcoming);
  } else {
    render(events);
  }
}

if (filterForm && search && category) {
  for (const name of new Set(events.map((event) => event.category))) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    category.append(option);
  }
  search.addEventListener("input", filterEvents);
  category.addEventListener("change", filterEvents);
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterEvents();
  });
}
