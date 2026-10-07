# Kampüs Etkinlikleri

Öğrenci: Ahmad Alrifai  
Öğrenci numarası: 2121032805

## Sprint 1 — HTML ve Git

`sprint1/` içinde beş HTML sayfası vardır. CSS, JavaScript ve veri kaydetme yoktur.
Ana sayfa yaklaşan iki etkinliği, etkinlikler sayfası tüm etkinlikleri gösterir.
Etkinlikler geçici `table border="1"` yapısında, her biri tek hücrededir.
Detay sayfasında üç etkinliğin bağlantı verilebilen bölümleri, afiş, açıklayıcı
alt metin, figure/figcaption, article, dl/dt/dd ve time bulunur.
Form alanları görünür label ve required özelliği içerir. Güncelleme formu doludur.

Her sayfada tek h1 ve aynı menü vardır. Dosyalar UTF-8, sayfa dili Türkçedir.
Görseller yereldir; internet gerektirmez.

## Yerelde açma

`sprint1/index.html` dosyasını tarayıcıda açın. Kurulum veya derleme gerekmez.

Güncel tasarım için `sprint2/index.html` dosyasını açın.

## Sprint 2 — CSS ve responsive tasarım

- Beş sayfanın tümü `sprint2/css/2121032805.css` dosyasını kullanır.
- CSS künyesi: Ahmad Alrifai — 2121032805.
- `--no: 2121032805`; `2121032805 % 360 = 127`.
- Son hane 7: `"Palatino Linotype"` (yüklü değilse Palatino/serif yedeği).
- Ana renk `hsl(127 65% 38%)`; zemin `hsl(127 30% 97%)`.
- Renk ve aralıklar CSS değişkenleriyle tanımlanmıştır.
- Etkinlik tabloları, section içindeki article kartlarına dönüştürülmüştür.
- Dar ekran: tek sütun; geniş ekran: listede üç, ana sayfada iki sütun.
- Detaylarda geniş ekranda afiş solda, künye sağda; dar ekranda alt alta.
- Form etiketleri üsttedir. Required doğrulamasından sonra geçersiz alanlar
  `:user-invalid` ile kırmızı kenarlık ve açıklama gösterir.
- Menü satıra sarılır; form kontrolleri ve düğmeler en az 44 piksel hedeflidir.
- JavaScript, framework, paket kurulumu veya backend yoktur.
- Üç etkinlik aynı detay sayfasında benzersiz fragment bağlantılarıyla açılır.
  CSS `:has()` desteklemeyen tarayıcılarda bütün detaylar görünür kalır.

## Git geçmişi

Proje anlamlı adımlarla commit edilmiştir. `sprint-01` HTML aşamasını,
`sprint-02` ise CSS aşamasını işaretler. `main` güncel sürümdür.
Commit işlemleri otomatik hazırlık sırasında Codex kimliğiyle yapılmıştır;
öğrenci künyesi sayfalarda ve CSS dosyasında yer alır.

## GitHub ve Vercel teslimi

Bu bölüm öğretmenin slaytlarındaki yayın adımlarını izler.

1. GitHub'da boş bir `kampus-etkinlik` deposu oluşturun.
2. Terminali bu README'nin bulunduğu proje kökünde açın.
3. Aşağıdaki `KULLANICI_ADINIZ` ifadesini kendi GitHub kullanıcı adınızla değiştirin:

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/kampus-etkinlik.git
git push -u origin main
git push origin --tags
```

4. Vercel'de depoyu içe aktarın. Framework: **Other**. Build Command: boş.
   Güncel teslim için Root Directory: **sprint2**; ilk aşama için **sprint1**.
   Output Directory için bir `dist` klasörü belirtmeyin; statik dosyalar
   seçilen kök klasördedir. Install Command gerekmez.
5. Yayından sonra aşağıdaki gerçek GitHub ve Vercel adreslerini doldurun.
   README değişikliğini commit edip gönderin.
6. Telefonda canlı `index.html`, etkinlik listesi, detay, ekle ve güncelle
   sayfalarını kontrol edin. Bilgisayarda CSS künyesini ve `index.html` açın.

## Yapılan kontroller ve kalan doğrulama

Kaynak düzeyinde kontrol edildi: 10 HTML sayfası, 73 yerel bağlantı/görsel/form
hedefi, fragment hedefleri, tek h1, Türkçe dil etiketi, label eşleştirmeleri,
required alanlar, Sprint 1'de CSS/JS olmaması, Sprint 2'de ortak CSS kullanımı,
ana sayfada iki ve listede üç etkinlik bulunması.

Bu ortamda tarayıcı önizlemesi açılamadığı için görsel mobil/masaüstü testi ve
etkileşimli form doğrulaması henüz tamamlanmadı. Teslimden önce 320–390 px ve
geniş ekranda yatay taşma olmadığını, boş Kaydet ile hata göründüğünü ve dolu
Güncelle formunu tarayıcıda kontrol edin. Canlı yayın da henüz yapılmadı.

## Yayın durumu

GitHub deposu: Henüz bağlanmadı.  
Vercel canlı URL: Henüz yayınlanmadı; yayınlandıktan sonra gerçek URL buraya eklenecek.

Bu uygulama statik bir ders çalışmasıdır. Geçerli form gönderimi aynı HTML
sayfasına GET isteği yapar; veri kaydedilmez. Boş zorunlu alanlar tarayıcı
tarafından engellenir. Gösterilen etkinlikler örnek veridir.
