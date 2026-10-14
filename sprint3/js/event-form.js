import { events, toISODate } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const message = document.querySelector("#form-mesaj");
const categories = [...new Set(events.map((event) => event.category))];
const fieldNames = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];

function readData(id) {
  const fd = new FormData(form);
  const get = (name) => String(fd.get(name) ?? "").trim();
  return {
    id,
    title: get("ad"),
    category: get("kategori"),
    date: get("tarih") ? toISODate(get("tarih")) : "",
    time: get("saat"),
    location: get("yer"),
    description: get("aciklama"),
    capacity: get("kontenjan") === "" ? null : Number(get("kontenjan")),
  };
}

function validate(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!categories.includes(data.category)) errors.kategori = "Bir kategori seçin.";
  if (!data.date || !form.elements.tarih.validity.valid) errors.tarih = "Geçerli bir tarih seçin.";
  if (!data.time || !form.elements.saat.validity.valid) errors.saat = "Geçerli bir saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (form.elements.kontenjan.validity.badInput ||
      (data.capacity !== null && (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000))) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

function showFieldError(name, error = "") {
  form.elements[name].setAttribute("aria-invalid", String(Boolean(error)));
  document.querySelector(`#${name}-hata`).textContent = error;
}

function showSummary(errors) {
  message.replaceChildren();
  if (Object.keys(errors).length) {
    message.className = "notice notice-error";
    message.textContent = "Formda hatalı alanlar var. Lütfen işaretli alanları düzeltin.";
    message.hidden = false;
  } else {
    message.hidden = true;
    message.className = "";
  }
}

function initializeForm() {
  if (!form || !message) return;
  for (const name of categories) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    form.elements.kategori.append(option);
  }

  const isUpdate = form.dataset.mode === "guncelle";
  const id = new URLSearchParams(location.search).get("id");
  const original = isUpdate ? events.find((event) => event.id === id) : null;

  if (isUpdate && !original) {
    form.hidden = true;
    document.querySelector("h1").textContent = "Güncellenecek etkinlik bulunamadı";
    document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
    message.hidden = false;
    message.className = "notice notice-error";
    const explanation = document.createElement("p");
    explanation.textContent = "Güncellenecek etkinlik bulunamadı. Listeden bir etkinlik seçip detay sayfasındaki güncelle bağlantısını kullanın.";
    const link = document.createElement("a");
    link.href = "etkinlikler.html";
    link.textContent = "Etkinliklere git";
    message.replaceChildren(explanation, link);
    return;
  }

  if (original) {
    form.elements.ad.value = original.title;
    form.elements.kategori.value = original.category;
    form.elements.tarih.value = toISODate(original.date);
    form.elements.saat.value = original.time;
    form.elements.yer.value = original.location;
    form.elements.kontenjan.value = original.capacity ?? "";
    form.elements.aciklama.value = original.description;
    document.title = `${original.title} — Güncelle | Kampüs Etkinlikleri`;
  }

  const nextId = `event-${Math.max(...events.map((event) => Number(event.id.split("-")[1]))) + 1}`;
  const objectId = original ? original.id : nextId;
  let submitted = false;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    const data = readData(objectId);
    const errors = validate(data);
    for (const name of fieldNames) showFieldError(name, errors[name]);
    showSummary(errors);
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }

    const text = document.createElement("p");
    text.textContent = isUpdate
      ? "Etkinlik güncellendi (bu sprintte kalıcı olarak kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kalıcı olarak kaydedilmez):";
    const json = document.createElement("pre");
    // Kullanıcının yazdığı HTML, çalıştırılmadan düz metin olarak gösterilir.
    json.textContent = JSON.stringify(data, null, 2);
    message.replaceChildren(text, json);
    message.className = "notice notice-success";
    message.hidden = false;
    console.log(data);
  });

  // Düzeltirken önceki alan hatasını temizle; eski başarı sonucu gösterilmesin.
  function handleCorrection(event) {
    if (!fieldNames.includes(event.target.name) || !submitted) return;
    const errors = validate(readData(objectId));
    showFieldError(event.target.name, errors[event.target.name]);
    showSummary(errors);
  }
  form.addEventListener("input", handleCorrection);
  form.addEventListener("change", handleCorrection);
}

initializeForm();
