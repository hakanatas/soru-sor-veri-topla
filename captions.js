/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Sınıfımız ne kadar kitap okuyor?', en: 'How much does our class read?',
      note: 'Nokta merak ediyor: sınıfımızdaki öğrenciler ne kadar kitap okuyor? Herkes aynı sayıda mı okuyor?' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'Tek cevap mı, farklı cevaplar mı?', en: 'One answer, or many?',
      note: '“Ali geçen hafta kaç kitap okudu?” sorusunun tek bir cevabı var; istatistiksel bir soru değil. “Sınıftakiler geçen hafta kaç kitap okudu?” sorusunun farklı cevapları olur; cevaplamak için veri gerekir.' },
    { scene: 2, start: 19.6, end: 27.8, tr: 'Soru, plan ve veri türü', en: 'Question, plan, type of data',
      note: 'Araştırma sorumuz: öğrenciler bir haftada kaç kitap okuyor? Planımız: 20 öğrenciye anket yapmak, “Geçen hafta kaç kitap okudun?” diye sormak. Cevaplar sayı olacağı için verimiz nicel ve kesikli.' },
    { scene: 3, start: 28.6, end: 36.0, tr: '20 cevap geldi', en: '20 answers came in',
      note: 'Anketi yaptık, 20 cevap geldi: 1, 2, 0, 1, 3... Aynı cevapları bir araya toplayalım.' },
    { scene: 3, start: 36.4, end: 45.8, tr: 'Sıklık tablosu ve sütun grafiği', en: 'A frequency table and a bar chart',
      note: 'Her cevabı kaç kişinin verdiğini bir sıklık tablosuna yazdık. Sayıları karşılaştırmak istediğimiz için sütun grafiği uygun bir araç.' },
    { scene: 4, start: 46.6, end: 55.8, tr: 'En çok: 1 kitap · toplam 32 kitap', en: 'Most common: 1 book · 32 books in all',
      note: 'Grafiği çizelim. En çok verilen cevap 1 kitap, 7 kişi. Sınıf geçen hafta toplam 32 kitap okumuş.' },
    { scene: 4, start: 56.2, end: 63.8, tr: 'Yarısı en az 2 kitap okumuş', en: 'Half read at least 2 books',
      note: '2, 3 ve 4 kitap okuyanları toplayalım: 6 artı 3 artı 1, 10 kişi. 20 öğrencinin yarısı en az 2 kitap okumuş.' },
    { scene: 5, start: 64.6, end: 72.0, tr: 'Çoğu öğrenci 1 ya da 2 kitap okuyor', en: 'Most read 1 or 2 books',
      note: 'Sonuç: öğrencilerin çoğu haftada 1 ya da 2 kitap okuyor. Gerekçemiz: 20 öğrenciden 13’ü bu cevabı verdi.' },
    { scene: 5, start: 72.4, end: 79.8, tr: 'Tek hafta yeterli mi? Planı yenile', en: 'Is one week enough? Plan again',
      note: 'Sonuç sorumuza ne kadar cevap veriyor? Veriyi tek bir haftada topladık; o hafta sınav haftası olabilir. Planı yenileyelim: veriyi 4 hafta boyunca toplayalım.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Soru, plan, veri, grafik, sonuç', en: 'Question, plan, data, chart, conclusion',
      note: 'Aklında kalsın: istatistiksel bir soru sor, plan yap, veri topla, uygun grafikle analiz et, sonucunu gerekçelendir.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Süreci değerlendir!', en: 'Look back at the process!',
      note: 'Ve sonunda süreci değerlendir: gerekirse yeniden planla!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
