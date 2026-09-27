/* SAHNE 1 — MERAK (0–10 s)  How much does our class read?
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut, lerp, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;

  /** the 20 survey answers: books read last week */
  const DATA = [1, 2, 0, 1, 3, 2, 1, 4, 2, 1, 0, 2, 1, 3, 2, 1, 0, 3, 2, 1];
  const COUNT = [0, 1, 2, 3, 4].map((v) => DATA.filter((x) => x === v).length);
  /** where answer i sits in the dot plot: [value, height] */
  const SLOT = DATA.map((v, i) => [v, DATA.slice(0, i).filter((x) => x === v).length]);

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Merak ettim: sınıfımız ne kadar kitap okuyor?'],
      [10.6, 27.8, 'İstatistiksel bir soru mu? Nasıl araştırırız?'],
      [28.4, 45.8, 'Veriyi toplayalım ve düzenleyelim'],
      [46.4, 63.8, 'Grafiği çizip analiz edelim'],
      [64.4, 79.8, 'Sonuç ve değerlendirme'],
    ]);
  }

  function cards(ctx, env, t) {
    const L = KD.L(env), f = F(), a = win(t, 11.0, 19.2); if (a <= 0) return;
    const C = L.CARD, s = L.G.s * 0.95;
    const k1 = seg(t, 11.2, 11.6) * a, k2 = seg(t, 13.6, 14.0) * a;
    f.expr(ctx, ['“Ali geçen hafta kaç kitap okudu?”'], C[0][0], C[0][1], s, { alpha: k1, w: L.CW, halo: true });
    f.expr(ctx, ['Tek bir cevap: istatistiksel değil'], C[0][0], C[0][1] + 52, s * 0.85, { alpha: seg(t, 12.2, 12.6) * a, w: L.CW, halo: true });
    f.crossInk(ctx, C[0][0], C[0][1] - 70, 18, seg(t, 12.2, 12.8), a);
    f.expr(ctx, ['“Sınıftakiler geçen hafta kaç kitap okudu?”'], C[1][0], C[1][1], s, { alpha: k2, w: L.CW, halo: true });
    f.expr(ctx, ['Farklı cevaplar: veri gerekir'], C[1][0], C[1][1] + 52, s * 0.85, { alpha: seg(t, 14.6, 15.0) * a, w: L.CW, halo: true, color: A.amber });
    f.tick(ctx, C[1][0], C[1][1] - 70, seg(t, 14.6, 15.2), a);
  }

  function chart(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t) * (1 - seg(t, 79.8, 80.4)); if (a <= 0 || t < 28.4) return;
    const CH = L.CH, GR = L.GR, X = (v) => CH.x0 + v * CH.dx;
    // axis
    const ax = seg(t, 32.4, 33.2) * a;
    if (ax > 0) {
      Ink.path(ctx, [[CH.ax[0], CH.base], [CH.ax[1], CH.base]], { w: 4, p: seg(t, 32.4, 33.2), alpha: a, seed: 3200, taper: [0, 0] });
      [0, 1, 2, 3, 4].forEach((v) => f.T(ctx, String(v), X(v), CH.base + 34, { size: L.G.s * 0.8, alpha: ax }));
      f.T(ctx, 'okunan kitap', CH.ax[1] - 70, CH.base + 76, { size: L.G.s * 0.6, alpha: ax });
    }
    // answers: a grid first, then dots in columns, then bars
    const toBar = seg(t, 46.8, 48.4);
    DATA.forEach((v, i) => {
      const k = seg(t, 28.8 + i * 0.14, 29.2 + i * 0.14) * a; if (k <= 0) return;
      const g = [GR.x0 + (i % 5) * GR.dx, GR.y0 + Math.floor(i / 5) * GR.dy];
      const [sv, h] = SLOT[i], d = [X(sv), CH.base - CH.r - 6 - h * CH.step];
      const m = inOut(seg(t, 33.0 + i * 0.12, 34.4 + i * 0.12)), p = [lerp(g[0], d[0], m), lerp(g[1], d[1], m)];
      if (m < 0.02) f.T(ctx, String(v), p[0], p[1], { size: L.G.s * 0.95 * outBack(seg(t, 28.8 + i * 0.14, 29.3 + i * 0.14)), alpha: k });
      else if (toBar < 1) {
        ctx.fillStyle = amber(0.85 * k * (1 - toBar)); ctx.beginPath(); ctx.arc(p[0], p[1], CH.r * lerp(0.6, 1, m), 0, Math.PI * 2); ctx.fill();
        if (m < 0.6) f.T(ctx, String(v), p[0], p[1], { size: L.G.s * 0.6, alpha: k * (1 - m / 0.6) });
      }
    });
    // bars
    if (toBar > 0) COUNT.forEach((c, v) => {
      const hgt = c * CH.step * toBar, x = X(v);
      const hot = Math.max(v === 1 ? win(t, 48.8, 52.2) : 0, v >= 2 ? win(t, 56.4, 63.8) : 0, v === 1 || v === 2 ? win(t, 65.0, 79.8) : 0);
      ctx.fillStyle = amber((0.25 + 0.45 * hot) * a); ctx.fillRect(x - CH.bw / 2, CH.base - hgt, CH.bw, hgt);
      Ink.path(ctx, [[x - CH.bw / 2, CH.base], [x - CH.bw / 2, CH.base - hgt], [x + CH.bw / 2, CH.base - hgt], [x + CH.bw / 2, CH.base]], { w: 4, alpha: a * toBar, seed: 3210 + v, taper: [0, 0] });
    });
    // counts above the columns
    COUNT.forEach((c, v) => { const k = seg(t, 36.4 + v * 0.2, 36.8 + v * 0.2) * a; if (k > 0) f.T(ctx, String(c), X(v), CH.base - c * CH.step - 34, Object.assign({ size: L.G.s * 0.8, alpha: k, halo: true }, f.AMB)); });
    if (toBar > 0) f.T(ctx, 'kişi', CH.ax[0] + 10, CH.base - 7.4 * CH.step, { size: L.G.s * 0.6, alpha: a * toBar });
    // the frequency table
    const TB = L.TBL, tk = seg(t, 38.0, 38.6) * a;
    if (TB && tk > 0) {
      f.T(ctx, 'Kitap', TB.x[0], TB.y[0], { size: TB.s * 0.75, alpha: tk }); f.T(ctx, 'Kişi', TB.x[1], TB.y[0], { size: TB.s * 0.75, alpha: tk });
      Ink.path(ctx, [[TB.x[0] - 60, TB.y[0] + 24], [TB.x[1] + 50, TB.y[0] + 24]], { w: 3, alpha: tk * 0.6, seed: 3230, taper: [0, 0] });
      COUNT.forEach((c, v) => { f.T(ctx, String(v), TB.x[0], TB.y[v + 1], { size: TB.s, alpha: tk }); f.T(ctx, String(c), TB.x[1], TB.y[v + 1], Object.assign({ size: TB.s, alpha: tk }, f.AMB)); });
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[5.4, 10.2, 'Herkes aynı sayıda mı okuyor?'], [19.6, 27.8, 'Araştırma sorusu: öğrenciler bir haftada kaç kitap okuyor?'],
      [29.4, 35.8, '20 öğrenci cevap verdi'], [36.4, 45.8, 'Aynı cevapları bir araya topladık: sıklık tablosu'],
      [48.8, 63.8, 'En çok verilen cevap: 1 kitap (7 kişi)'], [65.0, 79.8, 'Sonuç: çoğu öğrenci haftada 1 ya da 2 kitap okuyor']]);
    exprs(ctx, t, at(W, 1), [[21.6, 27.8, 'Plan: 20 öğrenciye anket · “Geçen hafta kaç kitap okudun?”'],
      [52.4, 63.8, 'Toplam: 0 × 3 + 1 × 7 + 2 × 6 + 3 × 3 + 4 × 1 = 32 kitap'], [68.6, 79.8, 'Gerekçe: 20 öğrenciden 13’ü 1 ya da 2 dedi']]);
    exprs(ctx, t, at(W, 2), [[23.8, 27.8, 'Cevaplar sayı: nicel (kesikli) veri', true], [40.0, 45.8, 'Sayıları karşılaştırmak için sütun grafiği uygun', true],
      [56.4, 63.8, '20 öğrenciden 10’u en az 2 kitap okumuş: yarısı', true], [72.4, 79.8, 'Ama tek hafta! Sınav haftası olabilir: 4 hafta boyunca topla', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['İstatistiksel soru: farklı cevaplar beklenir', 80.6], ['Plan yap, anketle veri topla', 81.6], ['Uygun tablo ve grafikle analiz et', 82.6], ['Sonucu gerekçelendir, süreci değerlendir', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); cards(ctx, env, t); chart(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A question', nameTr: 'Merak', concept: 'How much do we read?', conceptTr: 'Ne kadar okuyoruz?', render });
})(window.LI = window.LI || {});
