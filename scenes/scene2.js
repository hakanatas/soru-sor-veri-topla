/* SAHNE 2 — SORU VE PLAN (10–28 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 28, name: 'Question and plan', nameTr: 'Soru ve plan', concept: 'Many answers, a survey', conceptTr: 'Farklı cevaplar, anket', render });
})(window.LI = window.LI || {});
