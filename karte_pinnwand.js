/* ==========================================================
   Digitale Pinnwand: Schüler senden Begriffe per QR-Code (senden.html),
   die Tafel sammelt sie und clustert sie nach den vier Säulen.
   Speicher: Supabase (Tabelle in config.js, LF_PINNWAND)
   ========================================================== */
(function(){
const F = window.KARTE_FOLIEN, $ = (s, el) => el.querySelector(s);
const P = window.LF_PINNWAND || {};
const hdr = () => P.supabaseKey.startsWith('sb_') ? { apikey: P.supabaseKey } : { apikey: P.supabaseKey, Authorization: 'Bearer ' + P.supabaseKey };
const CL = [
  { id: 'inspektion',     name: 'Inspektion',    farbe: '#2E75B6', w: ['prüf', 'kontroll', 'inspek', 'check', 'begutacht', 'untersuch', 'anschau', 'ansehen', 'schau', 'dokument', 'foto', 'mess', 'feststell', 'sicht', 'erkenn', 'zustand', 'ist-', 'find', 'such'] },
  { id: 'instandsetzung', name: 'Instandsetzen', farbe: '#A3233A', w: ['repar', 'austausch', 'tausch', 'ersetz', 'erneuer', 'instand', 'flick', 'löt', 'abdicht', 'beheb', 'sanier', 'wiederherst', 'richten', 'kaputt', 'schaden', 'beseitig'] },
  { id: 'wartung',        name: 'Wartung',       farbe: '#2F8A78', w: ['wart', 'reinig', 'sauber', 'putz', 'pfleg', 'laub', 'nachzieh', 'schmier', 'anstrich', 'streich', 'vorbeug', 'regelmäßig', 'erhalt', 'bewahr', 'service'] },
  { id: 'verbesserung',   name: 'Verbessern',    farbe: '#C9851B', w: ['verbesser', 'dämm', 'modern', 'optimier', 'energ', 'effizien', 'aufwert', 'nachrüst', 'umbau', 'solar', 'besser', 'upgrade', 'neu mach'] },
  { id: 'weitere',        name: 'Weitere Begriffe', farbe: '#8497B0', w: [] }
];
const DEMO = ['Dach kontrollieren', 'Reparieren', 'Rinne reinigen', 'Schäden finden', 'Wartung', 'Dämmen', 'Kosten', 'Prüfen', 'Austauschen', 'Laub entfernen', 'Pflege', 'Sicherheit', 'Fotos machen', 'Erneuern', 'Modernisieren', 'Werterhalt', 'reparieren', 'Kontrolle', 'Abdichten', 'Schutzanstrich'];
const norm = t => t.toLowerCase().trim().replace(/\s+/g, ' ');
const guess = t => { const n = norm(t); const c = CL.find(c => c.w.some(w => n.includes(w))); return c ? c.id : 'weitere'; };
const esc = t => t.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ls = { get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }, set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
const newCode = () => Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

F.pinnwand = { kurz: 'Pinnwand', render(el){
  let code = ls.get('pw-code', null) || newCode(); ls.set('pw-code', code);
  let items = [], lastId = 0, mode = 'lose', timer = null;
  let manual = ls.get('pw-manual-' + code, {}), hidden = ls.get('pw-hidden-' + code, []);
  const online = !!(P.supabaseUrl && P.supabaseKey);
  const base = () => P.supabaseUrl.replace(/\/$/, '') + '/rest/v1/';
  const tok = () => { let t = ls.get('pw-token-' + code, null); if (!t) { t = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join(''); ls.set('pw-token-' + code, t); } return t; };
  let offen = ls.get('pw-offen-' + code, true);
  async function setStatus(o){
    offen = o; ls.set('pw-offen-' + code, o); lockUI();
    if (!online) return true;
    try {
      const r = await fetch(base() + 'rpc/pinnwand_setzen', { method: 'POST', headers: Object.assign(hdr(), { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ p_app: P.app || 'ih', p_sitzung: code, p_token: tok(), p_offen: o }) });
      if (!r.ok) return false;
      return await r.json();
    } catch(e){ return false; }
  }
  function lockUI(){
    const b = $('#pLock', el); if (!b) return;
    b.innerHTML = offen ? `${ICON('lock',15)} Senden sperren` : `${ICON('check',15)} Senden freigeben`;
    b.style.background = offen ? '#A3233A' : 'var(--green)';
    $('#pQr', el).style.filter = offen ? '' : 'blur(6px)'; $('#pQr', el).style.opacity = offen ? '1' : '.35';
    $('#pLk', el).style.display = offen ? 'none' : 'flex';
  }
  const url = () => new URL('senden.html', location.href).href.split('#')[0] + '?s=' + code;

  el.innerHTML = `<div style="display:grid;grid-template-columns:330px 1fr;gap:22px;height:100%">
    <div class="glass card2" style="display:flex;flex-direction:column;align-items:center;text-align:center">
      <div class="eyebrow">Digitale Pinnwand</div>
      <h2 style="font-size:28px;margin:4px 0 10px">Scannen und 3 Begriffe senden</h2>
      <div style="position:relative"><div id="pQr" style="background:#fff;border-radius:16px;padding:12px;width:230px;height:230px;transition:filter .3s,opacity .3s"></div><div id="pLk" style="display:none;position:absolute;inset:0;background:rgba(255,255,255,.88);border-radius:16px;align-items:center;justify-content:center;flex-direction:column;gap:6px;color:#A3233A;font:800 22px var(--f-d)">${ICON('lock',46)}Senden gesperrt</div></div>
      <div style="margin-top:10px;font:600 13px var(--f-b);color:var(--muted)">oder Code eingeben</div>
      <div id="pCode" style="font:800 40px var(--f-d);letter-spacing:.25em;color:var(--navy)"></div>
      <div id="pCnt" style="font:700 18px var(--f-d);color:var(--slate-d);margin-top:4px"></div>
      <div id="pOff" style="display:none;margin-top:10px;font-size:13px;color:#A3233A;line-height:1.35">Noch nicht mit Supabase verbunden (config.js). Demo-Modus.</div>
      <div style="display:flex;gap:8px;margin-top:auto;flex-wrap:wrap;justify-content:center">
        <button class="btn2" id="pLock" style="font-size:14px;padding:9px 14px"></button>
        <button class="btn2 ghost" id="pNew" style="font-size:14px;padding:9px 14px">${ICON('reset',15)} Neue Runde</button>
        <button class="btn2 ghost" id="pDemo" style="font-size:14px;padding:9px 14px;display:none">Demo-Begriffe</button>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;min-height:0">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <h2 style="font-size:32px;margin:0;flex:1">Was bedeutet „Instandhaltung“?</h2>
        <input id="pAdd" placeholder="Begriff ergänzen …" maxlength="40" style="font:600 15px var(--f-b);border:1.5px solid var(--line);border-radius:12px;padding:9px 12px;width:220px;background:rgba(255,255,255,.9)">
        <button class="btn2" id="pMode" style="background:var(--navy)">${ICON('saeulen',18)} Clustern</button>
      </div>
      <div id="pArea" style="flex:1;min-height:0;position:relative"></div>
    </div></div>`;

  function drawQR(){
    const q = qrcode(0, 'M'); q.addData(url()); q.make();
    $('#pQr', el).innerHTML = q.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
    const svg = $('#pQr', el).querySelector('svg'); if (svg) { svg.style.width = '100%'; svg.style.height = '100%'; }
    $('#pCode', el).textContent = code;
    $('#pOff', el).style.display = online ? 'none' : 'block';
    $('#pDemo', el).style.display = online ? 'none' : 'inline-flex';
  }

  /* Gruppieren: gleiche Begriffe zusammenfassen */
  function groups(){
    const g = {};
    items.forEach(it => { const k = norm(it.begriff); if (hidden.includes(k)) return; if (!g[k]) g[k] = { k, t: it.begriff.trim(), n: 0 }; g[k].n++; });
    return Object.values(g);
  }
  const clusterOf = g => manual[g.k] || guess(g.t);

  function card(g, c){
    const col = c ? CL.find(x => x.id === c).farbe : '#113277';
    const size = mode === 'lose' ? Math.min(30, 17 + (g.n - 1) * 4) : 16;
    return `<div class="dragc pwc" data-k="${esc(g.k)}" style="--c:${col};display:inline-flex;align-items:center;gap:8px;font:700 ${size}px/1.2 var(--f-b);padding:9px 12px;${c ? `box-shadow:inset 0 0 0 1.5px ${col}55;` : ''}">
      <span>${esc(g.t)}</span>${g.n > 1 ? `<b style="background:${col};color:#fff;border-radius:999px;padding:1px 8px;font-size:13px">×${g.n}</b>` : ''}
      <span class="pwx" title="Ausblenden" style="color:var(--muted);cursor:pointer;font-size:14px;margin-left:2px">✕</span></div>`;
  }

  function draw(){
    const G = groups(), area = $('#pArea', el);
    $('#pCnt', el).textContent = items.length ? `${items.length} Begriff${items.length === 1 ? '' : 'e'} eingegangen` : 'Noch keine Begriffe';
    if (mode === 'lose') {
      area.innerHTML = `<div class="glass" style="height:100%;padding:18px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:10px;overflow:auto">${G.length ? G.map(g => card(g)).join('') : '<div style="margin:auto;text-align:center;color:var(--muted);font-size:20px">Die Begriffe erscheinen hier, sobald sie gesendet werden.</div>'}</div>`;
    } else {
      area.innerHTML = `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;height:100%">${CL.map(c => `<div class="drop glass" data-drop="${c.id}" style="--c:${c.farbe};padding:12px;border-top:7px solid ${c.farbe};display:flex;flex-direction:column;gap:7px;overflow:auto">
        <div style="font:800 22px var(--f-d);color:${c.farbe}">${c.name}</div>${G.filter(g => clusterOf(g) === c.id).map(g => card(g, c.id)).join('')}</div>`).join('')}</div>`;
    }
    area.querySelectorAll('.pwx').forEach(x => x.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault();
      const k = x.closest('.pwc').dataset.k; hidden.push(k); ls.set('pw-hidden-' + code, hidden); draw(); }));
    area.querySelectorAll('.pwc').forEach((c, i) => c.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: Math.min(i * 15, 300), easing: 'ease-out', fill: 'backwards' }));
  }

  window.KARTE_DND(el, { check: () => true, onDrop(it, d){ manual[it.dataset.k] = d.dataset.drop; ls.set('pw-manual-' + code, manual); draw(); } });

  async function poll(){
    if (!online || !document.body.contains(el)) { clearInterval(timer); return; }
    try {
      const r = await fetch(`${P.supabaseUrl.replace(/\/$/, '')}/rest/v1/${P.tabelle || 'begriffe'}?select=id,begriff&app=eq.${encodeURIComponent(P.app || 'ih')}&sitzung=eq.${code}&id=gt.${lastId}&order=id.asc`,
        { headers: hdr() });
      if (!r.ok) return;
      const rows = await r.json();
      if (rows.length) { rows.forEach(x => { items.push(x); lastId = Math.max(lastId, x.id); }); draw(); }
    } catch(e){}
  }

  $('#pMode', el).onclick = () => { mode = mode === 'lose' ? 'cluster' : 'lose';
    $('#pMode', el).innerHTML = mode === 'lose' ? `${ICON('saeulen',18)} Clustern` : `${ICON('reset',18)} Alle lose zeigen`; draw(); };
  $('#pNew', el).onclick = async () => { if (online && offen) await setStatus(false); code = newCode(); ls.set('pw-code', code); items = []; lastId = 0; manual = {}; hidden = []; mode = 'lose';
    $('#pMode', el).innerHTML = `${ICON('saeulen',18)} Clustern`; drawQR(); draw(); await start(); };
  $('#pLock', el).onclick = () => setStatus(!offen);
  async function start(){ offen = ls.get('pw-offen-' + code, true); lockUI();
    if (online) { let ok = await setStatus(offen); if (ok === false) { code = newCode(); ls.set('pw-code', code); drawQR(); ok = await setStatus(true); } } }
  $('#pDemo', el).onclick = () => { DEMO.forEach((t, i) => items.push({ id: -i - 1, begriff: t })); draw(); };
  $('#pAdd', el).addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.value.trim()) { items.push({ id: -Date.now(), begriff: e.target.value.trim().slice(0, 40) }); e.target.value = ''; draw(); } });

  drawQR(); draw(); start();
  if (online) { poll(); timer = setInterval(poll, 2500); }
}};
})();
