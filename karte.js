/* ==========================================================
   Bausteine (Folien) der Lernlandkarte
   Neue Folie: KARTE_FOLIEN.meineId = { kurz, render(el, ctx) }
   und die id in config.js beim Bereich unter "folien" eintragen.
   ========================================================== */
(function(){
const $ = (s, el = document) => el.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const SAEULEN = [
  { id: 'inspektion', name: 'Inspektion', kern: 'Ist-Zustand ermitteln', farbe: '#2E75B6', icon: 'lupe' },
  { id: 'instandsetzung', name: 'Instandsetzen', kern: 'Soll-Zustand wiederherstellen', farbe: '#A3233A', icon: 'hammer' },
  { id: 'wartung', name: 'Wartung', kern: 'Soll-Zustand bewahren', farbe: '#2F8A78', icon: 'zyklus' },
  { id: 'verbesserung', name: 'Verbessern', kern: 'Soll-Zustand optimieren', farbe: '#C9851B', icon: 'pfeil' }
];

/* ---------- Ziehen und Ablegen (Maus, Finger, Stift) + Antippen ---------- */
function dnd(root, opt){
  // opt.check(itemEl, dropEl) -> true/false ; opt.onDrop(itemEl, dropEl, ok)
  let sel = null;
  const drops = () => [...root.querySelectorAll('[data-drop]')];
  const hot = on => drops().forEach(d => d.classList.toggle('hot', on));
  function place(it, d){ const ok = opt.check(it, d); opt.onDrop(it, d, ok); if (!ok) { it.classList.add('shake'); setTimeout(() => it.classList.remove('shake'), 400); } }
  root.addEventListener('pointerdown', e => {
    const it = e.target.closest('.dragc'); if (!it || it.classList.contains('ok') || !root.contains(it)) return;
    e.preventDefault();
    const k = (window.KARTE_SCALE ? window.KARTE_SCALE() : 1);
    const r = it.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
    let g = null, moved = false;
    const mv = ev => {
      if (!moved && Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) < 8) return;
      if (!g) { moved = true; g = it.cloneNode(true); g.classList.add('ghost'); g.classList.remove('sel'); g.style.width = (r.width / k) + 'px'; g.style.transformOrigin = '0 0';
        g.style.transform = `scale(${k}) rotate(-2deg)`; document.body.appendChild(g); it.style.opacity = '.35'; hot(true); }
      g.style.left = (ev.clientX - ox) + 'px'; g.style.top = (ev.clientY - oy) + 'px';
      drops().forEach(d => { const b = d.getBoundingClientRect(); d.classList.toggle('hot', ev.clientX > b.left && ev.clientX < b.right && ev.clientY > b.top && ev.clientY < b.bottom); });
    };
    const up = ev => {
      removeEventListener('pointermove', mv); removeEventListener('pointerup', up);
      if (g) { g.remove(); it.style.opacity = ''; hot(false);
        const d = drops().find(d => { const b = d.getBoundingClientRect(); return ev.clientX > b.left && ev.clientX < b.right && ev.clientY > b.top && ev.clientY < b.bottom; });
        if (d) place(it, d);
      } else {
        root.querySelectorAll('.dragc.sel').forEach(x => x !== it && x.classList.remove('sel'));
        it.classList.toggle('sel'); sel = it.classList.contains('sel') ? it : null; hot(!!sel);
      }
    };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  });
  root.addEventListener('click', e => {
    const d = e.target.closest('[data-drop]'); if (!d || !sel || e.target.closest('.dragc')) return;
    const it = sel; sel = null; it.classList.remove('sel'); hot(false); place(it, d);
  });
}

function fb(el, ok, html){ el.className = 'fbk ' + (ok ? 'good' : 'bad'); el.innerHTML = html; el.style.display = 'block'; }

const F = {};

/* ---------- 1 · Warum? ---------- */
F.warum = { kurz: 'Warum?', render(el){
  el.innerHTML = `<div style="display:grid;grid-template-columns:690px 1fr;gap:26px;height:100%">
    <div class="glass" style="padding:14px;position:relative;overflow:hidden">
      <img src="assets/img/schaden-traufe.jpg" alt="Durchfeuchtete Dachschalung an der Traufe" style="width:100%;height:100%;object-fit:contain;border-radius:14px;background:#e9edf3"><div style="position:absolute;right:24px;bottom:8px;font-size:12px;color:var(--muted)">Bild und Fallbeispiel: kapipro.de/de/fuer-privatpersonen</div>
      <div style="position:absolute;left:30px;top:28px;background:rgba(255,255,255,.88);border-radius:14px;padding:10px 16px;font:800 30px var(--f-d);color:var(--navy)">Was ist hier passiert?</div>
      <button class="btn2" id="wAuf" style="position:absolute;left:30px;bottom:30px">${ICON('info',18)} Auflösung</button>
      <div id="wAufT" style="display:none;position:absolute;left:30px;right:30px;bottom:30px;background:rgba(17,50,119,.94);color:#fff;border-radius:16px;padding:16px 20px;font-size:18px;line-height:1.4">Hier lag vorher ein Blechdach. In der Rinne hat sich Laub gesammelt, deshalb stand das Wasser höher als sonst. Durch die <b>Kapillarwirkung</b> ist es über das Traufblech zurück unter die Deckung gezogen. Die Folge: Die Schalung hat sich mit Feuchtigkeit vollgesogen.<div style="font-size:15px;opacity:.85;margin-top:8px">Ein Praxisfall: Ein fachgerecht ausgeführtes Stehfalzdach aus Edelstahl hatte schon nach 8 Jahren einen massiven Wasserschaden in der Dachkonstruktion, verursacht durch Kapillarwirkung an der Traufe.</div></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:18px">
      <div class="glass card2 reveal"><button class="rv-h" style="border:0;background:none;padding:0;width:100%;text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer"><span style="flex:1"><span class="eyebrow">Schätzt gemeinsam</span><h2 style="font-size:30px;margin:6px 0 0">Was kostet was?</h2></span><span class="rv-i" style="width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;flex:none">${ICON('auge',22)}</span></button>
        <div class="rv-b" style="display:none;margin-top:14px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <label style="font-weight:700;color:var(--green)">Rinne reinigen<input class="big-in" id="wk1" inputmode="numeric" placeholder="… €"></label>
          <label style="font-weight:700;color:var(--berry)">Schalung und Dach erneuern<input class="big-in" id="wk2" inputmode="numeric" placeholder="… €"></label>
        </div>
        <div id="wbar" style="margin-top:16px;min-height:96px"></div>
      </div></div>
      <div class="glass card2 reveal"><button class="rv-h" style="border:0;background:none;padding:0;width:100%;text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer"><span style="flex:1"><span class="eyebrow">Zum Nachdenken</span><h2 style="font-size:30px;margin:6px 0 0">Eine Frage an euch</h2></span><span class="rv-i" style="width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;flex:none">${ICON('auge',22)}</span></button>
        <div class="rv-b" style="display:none;margin-top:12px">
        <div style="font:800 28px/1.15 var(--f-d);color:var(--navy);margin:0 0 12px">„Ein Dach ist doch fertig, wenn es gedeckt ist, oder?“</div>
        <div style="display:flex;gap:10px"><button class="btn2 ghost" data-v="ja">Stimmt</button><button class="btn2 ghost" data-v="nein">Stimmt nicht</button></div>
        <div id="wv" style="display:none;margin-top:12px"></div>
      </div></div>
    </div></div>`;
  el.querySelectorAll('.reveal').forEach(r => r.querySelector('.rv-h').onclick = () => { const b = r.querySelector('.rv-b'), open = b.style.display === 'none';
    b.style.display = open ? 'block' : 'none'; r.querySelector('.rv-i').style.opacity = open ? '.35' : '1';
    if (open) b.animate([{ opacity: 0, filter: 'blur(8px)', transform: 'translateY(8px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 450, easing: 'ease-out' }); });
  $('#wAuf', el).onclick = () => { $('#wAuf', el).style.display = 'none'; $('#wAufT', el).style.display = 'block'; };
  const num = v => parseFloat((v || '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, ''));
  const upd = () => { const a = num($('#wk1', el).value), b = num($('#wk2', el).value), w = $('#wbar', el);
    if (!(a > 0 && b > 0)) { w.innerHTML = '<p class="muted" style="margin:0;font-size:16px">Tragt beide Schätzungen ein.</p>'; return; }
    const f = b / a;
    w.innerHTML = `<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px"><div style="height:26px;width:${Math.max(1.5, 100/f)}%;background:var(--green);border-radius:9px"></div><b>${a.toLocaleString('de-DE')} €</b></div>
      <div style="display:flex;align-items:center;gap:12px"><div style="height:26px;flex:1;background:var(--berry);border-radius:9px"></div><b>${b.toLocaleString('de-DE')} €</b></div>
      <div style="font:800 26px var(--f-d);color:var(--navy);margin-top:10px">Der Schaden kostet etwa das ${Math.round(f).toLocaleString('de-DE')}-Fache.</div>`; };
  el.querySelectorAll('.big-in').forEach(i => i.addEventListener('input', upd)); upd();
  el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => fb($('#wv', el), b.dataset.v === 'nein', b.dataset.v === 'nein'
    ? '<b>Genau.</b> Wind, Regen, Temperaturwechsel und Laub setzen jedem Dach ab dem ersten Tag zu.'
    : '<b>Leider nein.</b> Ab dem ersten Tag nutzt sich jedes Dach ab. Ohne Pflege wird aus kleinen Mängeln ein großer Schaden.'));
}};

/* ---------- 2 · Wer hat etwas davon? ---------- */
F.perspektiven = { kurz: 'Wer profitiert?', render(el){
  const P = [['Der Kunde', 'home', '#2E75B6', ['spart Geld', 'Haus behält seinen Wert', 'Sicherheit', 'Versicherungsschutz']],
             ['Der Betrieb', 'saeulen', '#2F8A78', ['planbare Aufträge durch Wartungsverträge', 'Kunden kommen wieder', 'Arbeit auch im Winter']],
             ['Ich als Spengler', 'hammer', '#A3233A', ['viele Baustellen sind Bestand', 'Fachwissen ist gefragt', 'gute Doku schützt im Streitfall']]];
  el.innerHTML = `<h2>Wer hat etwas davon?</h2><p class="lead">Sammelt Gründe, warum sich regelmäßige Instandhaltung lohnt. Tippt in die Felder, mit Enter kommt ein neuer Zettel.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;height:calc(100% - 150px)">
    ${P.map((p, i) => `<div class="glass card2" style="border-top:7px solid ${p[2]};display:flex;flex-direction:column">
      <div style="display:flex;gap:10px;align-items:center;color:${p[2]}">${ICON(p[1],26)}<h3 style="font-size:30px;color:${p[2]}">${p[0]}</h3></div>
      <div class="notes" data-i="${i}" style="display:flex;flex-direction:column;gap:8px;margin-top:12px;flex:1;overflow:auto"></div>
      <button class="btn2 ghost" data-tip="${i}" style="align-self:flex-start;margin-top:8px">${ICON('auge',16)} Ideen</button></div>`).join('')}
    </div>
    <div class="glass" style="margin-top:16px;padding:14px 22px;font:800 24px var(--f-d);color:var(--navy);text-align:center">Prüfen, putzen, reparieren, besser machen: Ist das alles das Gleiche? Oder steckt ein System dahinter?</div>`;
  const add = (box, txt = '', idea = false) => { const n = document.createElement('div'); n.contentEditable = !idea; n.textContent = txt;
    n.style.cssText = `background:${idea ? 'rgba(17,50,119,.06)' : '#FFF6C9'};border-radius:12px;padding:10px 14px;font:600 18px var(--f-b);min-height:44px;outline:none;box-shadow:0 2px 6px rgba(0,0,0,.06)`;
    n.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); add(box).focus(); } });
    box.appendChild(n); return n; };
  el.querySelectorAll('.notes').forEach(b => add(b));
  el.querySelectorAll('[data-tip]').forEach(b => b.onclick = () => { const box = el.querySelector(`.notes[data-i="${b.dataset.tip}"]`); P[+b.dataset.tip][3].forEach(t => add(box, t, true)); b.remove(); });
}};

/* ---------- 3 · Vier Säulen tragen das Dach ---------- */
F.saeulen = { kurz: '4 Säulen', render(el){
  let done = 0;
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 330px;gap:26px;height:100%">
    <div style="display:flex;flex-direction:column;align-items:center">
      <div id="sRoof" class="wobble" style="width:100%">
        <svg viewBox="0 0 1000 150" style="width:100%;display:block"><defs><clipPath id="sc"><path d="M500 6 990 144 10 144Z"/></clipPath></defs>
          <path d="M500 6 990 144 10 144Z" fill="#113277"/><g clip-path="url(#sc)" stroke="rgba(255,255,255,.12)" stroke-width="3">${Array.from({length:30},(_, i) => `<line x1="${20+i*34}" y1="0" x2="${20+i*34}" y2="150"/>`).join('')}</g>
          <text x="500" y="122" text-anchor="middle" font-family="Barlow Condensed" font-weight="800" font-size="40" fill="#fff" letter-spacing="5">INSTANDHALTUNG</text></svg>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px;width:92%;flex:1;margin-top:8px" id="sCols">
        ${shuffle(SAEULEN).map(s => `<div class="drop" data-drop="${s.id}" style="--c:${s.farbe};border:3px dashed rgba(17,50,119,.2);border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:14px;text-align:center">
          <div class="slot" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%"></div>
          <div style="font:700 19px/1.2 var(--f-b);color:var(--slate-d)">${s.kern}</div></div>`).join('')}
      </div>
      <div style="height:14px;width:100%;background:#8497B0;border-radius:6px;margin-top:8px"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="eyebrow">Ziehe jede Säule unter ihr Ziel</div>
      ${shuffle(SAEULEN).map(s => `<button class="dragc" data-id="${s.id}" style="--c:${s.farbe};font:800 26px var(--f-d);color:${s.farbe};display:flex;gap:12px;align-items:center;padding:16px 18px">${ICON(s.icon,26)} ${s.name}</button>`).join('')}
      <div id="sFb" style="display:none"></div>
    </div></div>`;
  dnd(el, {
    check: (it, d) => it.dataset.id === d.dataset.drop,
    onDrop(it, d, ok){
      if (!ok) { fb($('#sFb', el), false, 'Passt noch nicht. Welches Ziel hat diese Maßnahme?'); return; }
      const s = SAEULEN.find(x => x.id === it.dataset.id);
      d.style.border = '0'; d.style.background = `linear-gradient(180deg, ${s.farbe}, color-mix(in srgb, ${s.farbe} 75%, #000))`;
      d.querySelector('.slot').innerHTML = `<div style="width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;color:#fff">${ICON(s.icon,36)}</div><div style="font:800 32px var(--f-d);color:#fff">${s.name}</div>`;
      d.lastElementChild.style.color = '#fff'; d.removeAttribute('data-drop'); it.remove(); done++;
      fb($('#sFb', el), true, `<b>${s.name}:</b> ${s.kern}.`);
      if (done === 4) { $('#sRoof', el).classList.remove('wobble');
        fb($('#sFb', el), true, '<b>Das Dach steht!</b> Erst wenn alle vier Säulen zusammenspielen, ist die Instandhaltung vollständig. Schlüssel ist der Vergleich von <b>Ist</b> und <b>Soll</b>.'); }
    }
  });
}};

/* ---------- 4 · Tätigkeiten sortieren ---------- */
F.sortieren = { kurz: 'Sortieren', render(el){
  const T = [['Gefälle der Rinne mit der Wasserwaage prüfen','inspektion'],['Mängel fotografieren und dokumentieren','inspektion'],['Schneefanggitter auf festen Sitz kontrollieren','inspektion'],
    ['Undichte Lötnaht nachlöten','instandsetzung'],['Gerissene Kehle austauschen','instandsetzung'],['Abgerissenes Fallrohr wieder montieren','instandsetzung'],
    ['Laub aus der Rinne entfernen','wartung'],['Schutzanstrich erneuern','wartung'],['Lockere Rohrschelle nachziehen','wartung'],
    ['Beim Neueindecken zusätzlich dämmen','verbesserung'],['Größeres Fallrohr einbauen','verbesserung'],['Laubschutzgitter nachrüsten','verbesserung']];
  let n = 0, f = 0;
  el.innerHTML = `<h2>Welche Säule passt?</h2><p class="lead">Ziehe jede Tätigkeit auf die passende Säule. <span id="soS" style="font-weight:700;color:var(--navy)"></span></p>
    <div id="soPool" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;min-height:60px">${shuffle(T).map(t => `<button class="dragc" data-b="${t[1]}">${t[0]}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;height:calc(100% - 290px)">
      ${SAEULEN.map(s => `<div class="drop glass" data-drop="${s.id}" style="--c:${s.farbe};padding:12px;border-top:7px solid ${s.farbe};display:flex;flex-direction:column;gap:6px;overflow:auto">
        <div style="font:800 25px var(--f-d);color:${s.farbe};display:flex;gap:8px;align-items:center">${ICON(s.icon,22)} ${s.name}</div><div style="font-size:14px;color:var(--muted);margin-bottom:4px">${s.kern}</div></div>`).join('')}
    </div><div id="soFb" style="display:none;margin-top:10px"></div>`;
  const sc = () => $('#soS', el).textContent = `${n} von ${T.length} richtig` + (f ? ` · ${f} Fehlversuche` : '');
  sc();
  dnd(el, { check: (it, d) => it.dataset.b === d.dataset.drop,
    onDrop(it, d, ok){ if (ok) { it.classList.add('ok'); it.style.setProperty('--c', SAEULEN.find(s => s.id === d.dataset.drop).farbe); d.appendChild(it); n++; } else f++;
      sc(); if (n === T.length) fb($('#soFb', el), true, '<b>Alles richtig zugeordnet!</b>'); } });
}};

/* ---------- 5 · Zustandskurve (Demonstration) ---------- */
F.kurve = { kurz: 'Zustandskurve', render(el){
  let ev = [], year = 0;
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 320px;gap:24px;height:100%">
    <div class="glass" style="padding:16px;display:flex;flex-direction:column">
      <svg id="kv" viewBox="0 0 1000 520" style="width:100%;flex:1"></svg>
      <div style="display:flex;align-items:center;gap:16px;padding:6px 10px"><b style="font:700 20px var(--f-d);color:var(--navy);width:90px" id="kJ">Jahr 0</b>
        <input type="range" id="kR" min="0" max="30" value="0" style="flex:1;accent-color:#113277;height:30px"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Was passiert mit dem Dach?</h2>
      <p class="lead" style="font-size:16px;margin:0">Schiebe die Zeit nach rechts. Setze im jeweiligen Jahr eine Maßnahme.</p>
      ${SAEULEN.map(s => `<button class="btn2" data-a="${s.id}" style="background:${s.farbe};justify-content:flex-start;font-size:18px;padding:14px 18px">${ICON(s.icon,20)} ${s.name}</button>`).join('')}
      <button class="btn2 ghost" data-a="reset">${ICON('reset',18)} Zurücksetzen</button>
      <div class="fbk" id="kT" style="background:rgba(17,50,119,.06);color:var(--slate-d);font-size:16px">Ohne Maßnahmen nutzt sich das Dach immer weiter ab.</div>
    </div></div>`;
  const X = y => 70 + y * 30, Y = z => 470 - z * 3.6;
  function sim(){
    let z = 100, soll = 100, w = 0, pts = [[0, 100]], marks = [];
    for (let y = 0; y <= 30; y++) {
      ev.filter(e => e.y === y).forEach(e => {
        if (e.a === 'instandsetzung') { pts.push([y, z]); z = soll; pts.push([y, z]); }
        if (e.a === 'verbesserung') { pts.push([y, z]); soll = 115; z = 115; pts.push([y, z]); }
        if (e.a === 'wartung') w = 3;
        marks.push({ y, z, a: e.a });
      });
      if (y < 30) { let r = w > 0 ? 0.7 : 2.6; if (z < 60) r *= 1 + (60 - z) / 30; z = Math.max(0, z - r); w = Math.max(0, w - 1); pts.push([y + 1, z]); }
    }
    return { pts, marks, soll };
  }
  function draw(){
    const s = sim(); let g = '';
    for (let z = 0; z <= 120; z += 20) g += `<line x1="70" x2="970" y1="${Y(z)}" y2="${Y(z)}" stroke="rgba(17,50,119,.07)"/><text x="58" y="${Y(z)+5}" text-anchor="end" font-size="15" fill="#8497B0">${z} %</text>`;
    for (let y = 0; y <= 30; y += 5) g += `<text x="${X(y)}" y="505" text-anchor="middle" font-size="15" fill="#8497B0">${y} J.</text>`;
    g += `<rect x="70" y="${Y(25)}" width="900" height="${Y(0)-Y(25)}" fill="rgba(163,35,58,.09)"/><text x="80" y="${Y(8)}" font-size="16" fill="#A3233A" font-weight="600">Schadensgrenze: Wasser dringt ein</text>`;
    g += `<line x1="70" x2="970" y1="${Y(100)}" y2="${Y(100)}" stroke="#2F8A78" stroke-width="2.5" stroke-dasharray="8 6"/><text x="965" y="${Y(100)-8}" text-anchor="end" font-size="16" fill="#2F8A78" font-weight="600">Soll-Zustand</text>`;
    if (s.soll > 100) g += `<line x1="70" x2="970" y1="${Y(s.soll)}" y2="${Y(s.soll)}" stroke="#C9851B" stroke-width="2.5" stroke-dasharray="8 6"/><text x="965" y="${Y(s.soll)-8}" text-anchor="end" font-size="16" fill="#C9851B" font-weight="600">neuer Soll-Zustand</text>`;
    const vis = s.pts.filter(p => p[0] <= year);
    g += `<polyline fill="none" stroke="#113277" stroke-width="5" stroke-linejoin="round" points="${vis.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}"/>`;
    s.marks.forEach(m => { const c = SAEULEN.find(x => x.id === m.a).farbe; g += `<circle cx="${X(m.y)}" cy="${Y(m.z)}" r="11" fill="${c}" stroke="#fff" stroke-width="3"/>`; if (m.a === 'inspektion') g += `<text x="${X(m.y)}" y="${Y(m.z)-18}" text-anchor="middle" font-size="16" font-weight="700" fill="#2E75B6">${Math.round(m.z)} %</text>`; });
    g += `<line x1="${X(year)}" x2="${X(year)}" y1="20" y2="470" stroke="#113277" stroke-width="1.5" stroke-dasharray="3 4"/>`;
    $('#kv', el).innerHTML = g; $('#kJ', el).textContent = 'Jahr ' + year;
  }
  $('#kR', el).addEventListener('input', e => { year = +e.target.value; draw(); });
  const T = { inspektion: 'Inspektion: Der Ist-Zustand wird sichtbar. Erst jetzt weißt du, was zu tun ist.', wartung: 'Wartung: Kleine Mängel werden beseitigt, die Abnutzung läuft die nächsten Jahre langsamer.',
    instandsetzung: 'Instandsetzen: Der Soll-Zustand ist wiederhergestellt. Je später, desto größer der Sprung, desto teurer.', verbesserung: 'Verbessern: Das Dach ist jetzt besser als vorher. Der Soll-Zustand steigt.' };
  el.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { const a = b.dataset.a;
    if (a === 'reset') { ev = []; year = 0; $('#kR', el).value = 0; $('#kT', el).textContent = 'Ohne Maßnahmen nutzt sich das Dach immer weiter ab.'; return draw(); }
    ev = ev.filter(e => !(e.y === year && e.a === a)); ev.push({ y: year, a }); $('#kT', el).textContent = T[a]; draw(); });
  draw();
}};

/* ---------- 6 · Intervalle ---------- */
F.intervalle = { kurz: 'Intervalle', render(el){
  const B = [['h','Halbjährlich','#A3233A'],['j','Jährlich','#C9851B'],['d','Alle 3 Jahre','#2E75B6'],['f','Alle 5 Jahre','#113277']];
  const T = [['Dachentwässerung','h'],['Kunststoffdachbahnen','j'],['Schutzanstriche auf Metall','j'],['Blitzschutzanlagen','j'],['Dachanschlüsse','j'],['Zinkblechdeckungen','d'],['Schneefanggitter','d'],['Dachkonstruktion','f'],['Metallverkleidungen','f']];
  let n = 0;
  el.innerHTML = `<h2>Wann wird inspiziert?</h2><p class="lead">Ziehe die Bauteile in das passende Intervall. Was stark beansprucht wird oder schnell verschmutzt, schauen wir öfter an.</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;min-height:56px">${shuffle(T).map(t => `<button class="dragc" data-b="${t[1]}">${t[0]}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;height:calc(100% - 270px)">
      ${B.map(b => `<div class="drop glass" data-drop="${b[0]}" style="--c:${b[2]};padding:14px;border-top:7px solid ${b[2]};display:flex;flex-direction:column;gap:8px"><div style="font:800 27px var(--f-d);color:${b[2]}">${b[1]}</div></div>`).join('')}
    </div><div id="ivFb" style="display:none;margin-top:10px"></div>`;
  dnd(el, { check: (it, d) => it.dataset.b === d.dataset.drop,
    onDrop(it, d, ok){ if (ok) { it.classList.add('ok'); it.style.setProperty('--c', B.find(b => b[0] === d.dataset.drop)[2]); d.appendChild(it); n++; }
      if (n === T.length) fb($('#ivFb', el), true, '<b>Faustregel:</b> Entwässerung am häufigsten, Konstruktion und Verkleidungen am seltensten.');
      else if (!ok) fb($('#ivFb', el), false, 'Noch nicht. Denk an Laub, Schnee und Eis.'); } });
}};

/* ---------- 7 · Werkzeugkoffer ---------- */
F.werkzeug = { kurz: 'Werkzeug', render(el){
  const T = [['Checkliste',1,'Damit nichts vergessen wird, wird archiviert'],['Hammer',1,'Kleine Mängel gleich beseitigen'],['Wasserwaage',1,'Gefälle der Rinne, Dachneigung'],['Handykamera',1,'Mängel fotografieren'],
    ['Gutachter-Lineal / Münze',1,'Genormter Größenvergleich im Foto'],['Bauplan / Skizze',1,'Mängel verorten, Kunden aufklären'],['PSA gegen Absturz',1,'Sicherheit geht vor'],
    ['Zollstock als Maßstab im Foto',0,'Nicht genormt, nicht aussagekräftig'],['Lötkolben',0,'Löten ist Instandsetzung'],['Winkelschleifer',0,'Gehört nicht zur Inspektion'],['Kartuschenpresse',0,'Das ist Wartung oder Instandsetzung']];
  let n = 0;
  el.innerHTML = `<h2>Was kommt mit aufs Dach?</h2><p class="lead">Ziehe jedes Teil in den Koffer oder lass es in der Werkstatt.</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;min-height:56px">${shuffle(T).map(t => `<button class="dragc" data-b="${t[1]}" data-w="${t[2]}">${t[0]}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:18px;height:calc(100% - 250px)">
      <div class="drop glass" data-drop="1" style="--c:#2E75B6;padding:16px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:8px;border-top:7px solid #2E75B6"><div style="width:100%;font:800 28px var(--f-d);color:#2E75B6;display:flex;gap:10px;align-items:center">${ICON('lupe',26)} In den Inspektionskoffer</div></div>
      <div class="drop glass" data-drop="0" style="--c:#8497B0;padding:16px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:8px;border-top:7px solid #8497B0"><div style="width:100%;font:800 28px var(--f-d);color:#44546A">Bleibt in der Werkstatt</div></div>
    </div><div id="wzFb" style="display:none;margin-top:10px"></div>`;
  dnd(el, { check: (it, d) => it.dataset.b === d.dataset.drop,
    onDrop(it, d, ok){ fb($('#wzFb', el), ok, `<b>${it.textContent}:</b> ${it.dataset.w}.`);
      if (ok) { it.classList.add('ok'); it.style.setProperty('--c', d.dataset.drop === '1' ? '#2E75B6' : '#8497B0'); d.appendChild(it); if (++n === T.length) fb($('#wzFb', el), true, '<b>Perfekt gepackt!</b>'); } } });
}};

/* ---------- 8 · Beweisfotos ---------- */
function foto(o){
  const IMG = 'assets/img/falz-schaden.jpg';
  const bg = vb => `<svg x="0" y="0" width="260" height="170" viewBox="${vb}" preserveAspectRatio="xMidYMid slice"><image href="${IMG}" width="1000" height="1333"/></svg>`;
  if (o === 'uebersicht') {
    let seams = ''; for (let i = 0; i <= 26; i++) { const xb = 38 + i * 7.08, xt = 54 + i * 5.85; seams += `<line x1="${xb}" y1="100" x2="${xt}" y2="47" stroke="rgba(255,255,255,.13)" stroke-width="1"/><line x1="${xb+0.9}" y1="100" x2="${xt+0.8}" y2="47" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>`; }
    let dseams = ''; for (let x = 153; x < 176; x += 5) dseams += `<line x1="${x}" y1="57" x2="${x}" y2="88" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
    const win = (x, y, w, h) => `<rect x="${x-1.5}" y="${y-1.5}" width="${w+3}" height="${h+3}" fill="#fbfaf7"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#UGl)"/><line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h}" stroke="#fbfaf7" stroke-width="1.2"/><rect x="${x-2.5}" y="${y+h+1.5}" width="${w+5}" height="2" fill="#cfc9be"/>`;
    return `<svg viewBox="0 0 260 170"><defs>
      <linearGradient id="USk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc0e2"/><stop offset="1" stop-color="#e6eef6"/></linearGradient>
      <linearGradient id="URf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#57626d"/><stop offset=".55" stop-color="#3a434c"/><stop offset="1" stop-color="#2a3138"/></linearGradient>
      <linearGradient id="UWl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e2ddd3"/><stop offset=".5" stop-color="#f3efe8"/><stop offset="1" stop-color="#d8d2c6"/></linearGradient>
      <linearGradient id="UGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe0ee"/><stop offset=".45" stop-color="#7f97ab"/><stop offset="1" stop-color="#3f5160"/></linearGradient>
      <linearGradient id="UGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb36a"/><stop offset="1" stop-color="#5d8442"/></linearGradient>
      <linearGradient id="UDm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a545d"/><stop offset="1" stop-color="#353d45"/></linearGradient>
      <filter id="USf"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="USs"><feGaussianBlur stdDeviation=".5"/></filter><radialGradient id="UVg" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>
      <rect width="260" height="170" fill="url(#USk)"/>
      <ellipse cx="60" cy="24" rx="34" ry="7" fill="#fff" opacity=".55" filter="url(#USf)"/><ellipse cx="200" cy="16" rx="26" ry="5" fill="#fff" opacity=".45" filter="url(#USf)"/>
      <g filter="url(#USs)">
      <rect x="0" y="146" width="260" height="24" fill="url(#UGr)"/>
      <ellipse cx="22" cy="118" rx="22" ry="34" fill="#4e7a3a" opacity=".9"/><ellipse cx="14" cy="104" rx="15" ry="20" fill="#5f8d47"/><rect x="20" y="138" width="4" height="12" fill="#5b4632"/>
      <rect x="50" y="98" width="160" height="52" fill="url(#UWl)"/>
      <rect x="50" y="100" width="160" height="5" fill="rgba(0,0,0,.12)"/>
      ${win(62,110,18,22)}${win(92,110,18,22)}${win(150,110,18,22)}${win(180,110,18,22)}
      <rect x="121" y="114" width="16" height="36" fill="#5b6670"/><rect x="123" y="116" width="12" height="32" fill="#6c7882"/><circle cx="133" cy="133" r="1" fill="#d6d6d6"/>
      <rect x="44" y="146" width="172" height="4" fill="#b9b3a8"/>
      <polygon points="38,100 222,100 206,47 54,47" fill="url(#URf)"/>
      ${seams}
      <line x1="54" y1="47" x2="206" y2="47" stroke="#22292f" stroke-width="2.2"/>
      <polygon points="150,89 120,96 128,92 150,56" fill="rgba(0,0,0,.28)" filter="url(#USf)"/><polygon points="132,89 132,62 150,56 150,89" fill="#4b555e"/>
      <rect x="150" y="56" width="26" height="33" fill="url(#UDm)"/>
      ${dseams}
      <polygon points="146,56 180,56 176,51 150,51" fill="#22292f"/>
      <rect x="155" y="62" width="16" height="20" fill="#f7f6f2"/><rect x="156.5" y="63.5" width="13" height="17" fill="url(#UGl)"/>
      <rect x="150" y="88" width="26" height="2.5" fill="#1f252a"/>
      <rect x="36" y="99.5" width="188" height="3.6" rx="1.8" fill="#9aa3ad"/><rect x="36" y="99.5" width="188" height="1.2" fill="#c9d0d7"/>
      <rect x="216" y="102" width="3.4" height="44" fill="#9aa3ad"/><rect x="216" y="102" width="1.1" height="44" fill="#c9d0d7"/>
      </g>
      <rect width="260" height="170" fill="url(#UVg)"/>
      <circle cx="175" cy="86" r="11" fill="none" stroke="#e33" stroke-width="3"/>
    </svg>`;
  }
  let obj = '';
  /* Maßstab: Falzhöhe ca. 25 mm entspricht ca. 45 px, also 1 cm = 18 px */
  if (o === 'muenze') obj = '<circle cx="218" cy="56" r="23" fill="#d9b85a" stroke="#9c8232" stroke-width="2.4"/><circle cx="218" cy="56" r="15" fill="#cfcfcf" stroke="#8f8f8f" stroke-width="1.4"/><text x="218" y="62" font-size="17" text-anchor="middle" font-weight="800" fill="#555">2</text>';
  if (o === 'lineal') { obj = '<rect x="12" y="140" width="180" height="18" fill="#fff" stroke="#222"/>'; for (let i = 0; i < 10; i++) obj += `<rect x="${12+i*18}" y="${i%2?149:140}" width="18" height="9" fill="#111"/>`; }
  if (o === 'zollstock') { obj = '<rect x="12" y="140" width="190" height="16" fill="#f3c623" stroke="#b9920f"/>'; for (let i = 1; i <= 10; i++) obj += `<line x1="${12+i*18}" y1="140" x2="${12+i*18}" y2="146" stroke="#333" stroke-width="1"/><text x="${12+i*18}" y="154" font-size="7" text-anchor="middle" fill="#333">${i}</text>`; }
  const blur = o === 'unscharf' ? ' filter="url(#kbl)"' : '';
  const filt = o === 'filter' ? '<rect width="260" height="170" fill="rgba(255,120,190,.28)"/><text x="12" y="160" font-size="12" fill="#fff" font-weight="700">Beauty-Filter</text>' : '';
  return `<svg viewBox="0 0 260 170"><defs><filter id="kbl"><feGaussianBlur stdDeviation="3.2"/></filter></defs><g${blur}>${bg('250 560 460 300')}${obj}</g>${filt}</svg>`;
}
F.fotos = { kurz: 'Beweisfotos', render(el){
  const C = [['uebersicht',1,'Übersicht, Gaube markiert','Erst Übersicht, dann Detail.'],['muenze',1,'Detail mit 2-€-Münze','Genormter Vergleich, scharf.'],['zollstock',0,'Detail mit Zollstock','Zollstock ist nicht genormt.'],
             ['ohne',0,'Detail ohne Vergleich','Größe nicht beurteilbar.'],['lineal',1,'Detail mit Gutachter-Lineal','Genormter Maßstab.'],['unscharf',0,'Schnell geknipst','Unscharf, nicht eindeutig.'],['filter',0,'Mit Filter aufgehübscht','Bearbeitet, als Beweis angreifbar.']];
  el.innerHTML = `<div style="display:grid;grid-template-columns:340px 1fr;gap:24px;height:100%">
    <div class="glass card2"><h2 style="font-size:30px">Fotos, die vor Gericht zählen</h2>
      <ol style="padding-left:22px;font-size:17px;line-height:1.5;margin:10px 0 0">
        <li><b>Erst Übersicht, dann Detail</b></li><li><b>Genormter Vergleich</b>: Gutachter-Lineal oder Münze, kein Zollstock</li><li><b>Scharf</b> und gut ausgeleuchtet</li><li><b>Datum, Uhrzeit, Ort</b> und Nummer aus der Checkliste</li><li><b>Unbearbeitet</b> aufbewahren</li></ol>
      <p class="muted" style="font-size:14px">1 € = 23,25 mm · 2 € = 25,75 mm</p>
      <div class="score" id="fS" style="font:700 20px var(--f-d);color:var(--navy);margin-top:14px"></div></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-content:start" id="fG">
      ${C.map((c, i) => `<div class="glass" style="padding:10px;border-radius:18px" data-i="${i}"><div style="border-radius:10px;overflow:hidden;line-height:0">${foto(c[0])}</div>
        <div style="font:600 15px var(--f-b);margin:8px 2px">${c[2]}</div>
        <div style="display:flex;gap:6px"><button class="btn2" data-v="1" style="padding:8px 12px;font-size:14px">Taugt</button><button class="btn2 ghost" data-v="0" style="padding:8px 12px;font-size:14px">Taugt nicht</button></div>
        <div class="r" style="display:none;margin-top:8px;font-size:14px"></div></div>`).join('')}
    </div></div>`;
  let n = 0, r = 0;
  el.querySelectorAll('#fG [data-i]').forEach(card => card.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
    const c = C[+card.dataset.i], ok = (b.dataset.v === '1') === !!c[1]; n++; if (ok) r++;
    card.querySelectorAll('[data-v]').forEach(x => x.disabled = true);
    const d = card.querySelector('.r'); d.className = 'r fbk ' + (ok ? 'good' : 'bad'); d.style.display = 'block'; d.style.fontSize = '14px'; d.style.padding = '8px 10px';
    d.innerHTML = `<b>${c[1] ? 'Taugt.' : 'Taugt nicht.'}</b> ${c[3]}`;
    $('#fS', el).textContent = `${r} von ${n} richtig`;
  }));
}};

/* ---------- 9 · Inspektionsrundgang ---------- */
F.rundgang = { kurz: 'Rundgang', render(el){
  const BEW = [['ohne','Ohne erkennbare Mängel','#2F8A78'],['gering','Geringe Mängel','#C9851B'],['erheb','Erhebliche Mängel','#A3233A'],['sofort','Sofortmaßnahme','#6b0f22']];
  const S = [
    [60.7,30.5,'Kamineinfassung','3.3.1','Die Kappleiste steht ab, die Fuge darüber ist offen.',['erheb','sofort'],'Wasser kann eindringen: erheblicher Mangel, instand setzen.'],
    [55.4,37.5,'Dachflächenfenster','3.2.13','Eindeckrahmen fest und dicht, oberhalb Laub und Moos.',['gering','ohne'],'Funktion gegeben, aber Laub staut Wasser: reinigen (Wartung).'],
    [73.6,46.5,'Vorgehängte Rinne','3.1.1','Rinne voller Laub, nach Regen steht Wasser. Gefälle passt.',['gering'],'Geringer Mangel: reinigen (Wartung).'],
    [38.6,33.5,'Kamindurchführung','3.3.1','Die Einfassung am Edelstahlschornstein hat sich gelöst, der Regenkragen liegt nicht mehr dicht am Rohr an.',['erheb'],'Wasser kann am Rohr entlang eindringen: Einfassung instand setzen.'],
    [62.9,61.5,'Stehfalzdeckung untere Dachfläche','3.2','Ein abgebrochener Ast hat eine Schare durchschlagen. Im Blech ist ein kleines Loch.',['sofort','erheb'],'Wasser dringt ein: sofort provisorisch abdichten, dann instand setzen.'],
    [87.3,73.5,'Fallrohr','3.1.7','Eine Rohrschelle fehlt, das Rohr wackelt leicht, ist aber dicht.',['gering'],'Geringer Mangel: Schelle ergänzen.'],
    [23.6,64,'Mauerabdeckung Garage','3.2.16','Kein Dehnungsausgleich am Stoß, die Lötnaht ist gerissen.',['erheb'],'Nicht nach Fachregel: mit Dehnungsausgleich instand setzen.'],
    [17.9,82,'Wandbekleidung Garage','3.2.18','Bekleidung fest, Fugen gleichmäßig, keine Verformungen.',['ohne'],'Alles in Ordnung. Auch das wird dokumentiert.'],
    [42.9,58,'Wandanschluss untere Dachfläche','3.2.7','Dichtstoff am Wandanschlussprofil versprödet, stellenweise gelöst.',['gering','erheb'],'Wartungsfuge: Dichtstoff erneuern.']];
  const res = {};
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 430px;gap:22px;height:100%">
    <div class="glass" style="padding:12px;display:flex;align-items:center"><div id="rH" style="position:relative;width:100%;background:#fff;border-radius:14px;overflow:hidden">
      <img src="assets/img/haus-sperber.png" alt="Einfamilienhaus" style="width:100%;display:block"></div></div>
    <div class="glass card2" id="rP" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:32px">Inspektionsrundgang</h2>
      <p class="lead" style="font-size:17px;margin:0">Tippe auf eine Lupe, lies den Befund und bewertet ihn gemeinsam wie im Dach- und Fassaden-Check.</p>
      <div id="rS" style="font:700 20px var(--f-d);color:var(--navy)"></div></div></div>`;
  const pins = () => { $('#rH', el).querySelectorAll('.pin').forEach(p => p.remove());
    S.forEach((s, i) => { const r = res[i], col = r === undefined ? '#113277' : (r ? '#2F8A78' : '#C9851B');
      const p = document.createElement('button'); p.className = 'pin'; p.title = s[2];
      p.style.cssText = `position:absolute;left:${s[0]}%;top:${s[1]}%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;border:3px solid #fff;background:${col};color:#fff;display:grid;place-items:center;box-shadow:0 4px 14px rgba(17,50,119,.35);padding:0`;
      p.innerHTML = r === undefined ? ICON('lupe',22,2.5) : ICON('check',22,3); p.onclick = () => show(i); $('#rH', el).appendChild(p); });
    $('#rS', el).textContent = `${Object.keys(res).length} von ${S.length} Stellen geprüft`; };
  function show(i){
    const s = S[i], P = $('#rP', el);
    P.innerHTML = `<div class="eyebrow">Checkliste Nr. ${s[3]}</div><h2 style="font-size:32px">${s[2]}</h2><p style="font-size:19px;line-height:1.45;margin:0">${s[4]}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px">${BEW.map(b => `<button class="btn2 ghost" data-b="${b[0]}" style="color:${b[2]};font-size:15px;justify-content:center">${b[1]}</button>`).join('')}</div>
      <div id="rF" style="display:none"></div><div id="rS" style="font:700 20px var(--f-d);color:var(--navy);margin-top:auto"></div>`;
    P.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { const ok = s[5].includes(b.dataset.b); res[i] = ok;
      fb($('#rF', el), ok, (ok ? '<b>Passt.</b> ' : '<b>Fachlich sieht das anders aus.</b> ') + s[6]); pins(); });
    pins();
  }
  pins();
}};

window.KARTE_FOLIEN = F;
window.KARTE_DND = dnd;
})();
