/* ==========================================================
   Themenbereich links: Korrosion oder Verfärbung?
   Teil 1: Chemische vs. elektrochemische Korrosion
   ========================================================== */
(function(){
const F = window.KARTE_FOLIEN, $ = (s, el) => el.querySelector(s);
const C = '#A3233A';
const fb = (el, ok, html) => { el.className = 'fbk ' + (ok ? 'good' : 'bad'); el.innerHTML = html; el.style.display = 'block'; };
const box = (inner, extra = '') => `<div class="glass card2" style="${extra}">${inner}</div>`;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const M = { cu: ['Kupfer', '#c4713a', 0.34], zn: ['Titanzink', '#9aa3ad', -0.76], al: ['Aluminium', '#c9ced6', -1.67], fe: ['Verzinkter Stahl', '#7f8a96', -0.76], va: ['Edelstahl', '#b8c2cc', null] };
/* Kontakt bzw. Wasser von oben nach unten: false = Schaden */
const OK = (oben, unten) => !(oben === 'cu' && ['zn', 'al', 'fe'].includes(unten));

/* ---------- 1 · Was ist Korrosion? ---------- */
F.ko_was = { kurz: 'Was ist Korrosion?', render(el){
  const T = [['Bitumenkorrosion an der Traufe', 'ch'], ['Säuren, Laugen oder Salze greifen die Oberfläche an', 'ch'], ['Ablaufwasser von Beton oder Kies umspült ein Blech', 'ch'],
             ['Kupferstift in einer Titanzinkdeckung', 'el'], ['Wasser vom Kupferdach läuft in eine Zinkrinne', 'el'], ['Zwei verschiedene Metalle berühren sich, dazu Feuchtigkeit', 'el']];
  let n = 0;
  el.innerHTML = `<div style="display:grid;grid-template-columns:420px 1fr;gap:24px;height:100%">
    <div style="display:flex;flex-direction:column;gap:14px">
      ${box(`<div class="eyebrow" style="color:${C}">Begriff</div><h2 style="font-size:32px;margin:4px 0 8px">Korrosion</h2>
        <p style="font-size:17px;line-height:1.5;margin:0">Metall verändert sich von der Oberfläche her oder wird zerstört, weil es mit seiner Umgebung <b>chemisch</b> oder <b>elektrochemisch</b> reagiert.</p>`, 'border-top:7px solid ' + C)}
      ${box(`<div class="eyebrow" style="color:${C}">Gut zu wissen</div><p style="font-size:17px;line-height:1.5;margin:6px 0 0">Die meisten Korrosionsschäden entstehen durch Fehler bei <b>Planung und Ausführung</b>, vor allem bei der Wahl der Werkstoffe und der Ausbildung der Details. Also genau da, wo wir Spengler entscheiden.</p>`)}
      <div id="kwF" style="display:none"></div>
    </div>
    <div style="display:flex;flex-direction:column">
      <h2>Chemisch oder elektrochemisch?</h2><p class="lead">Ziehe jede Situation in die passende Spalte.</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;min-height:56px">${shuffle(T).map(t => `<button class="dragc" data-b="${t[1]}">${t[0]}</button>`).join('')}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1">
        <div class="drop glass" data-drop="ch" style="--c:#C9851B;padding:16px;border-top:7px solid #C9851B;display:flex;flex-direction:column;gap:8px"><div style="font:800 27px var(--f-d);color:#C9851B">Chemische Korrosion</div><div class="muted" style="font-size:15px">Stoffe aus der Umgebung greifen das Metall direkt an.</div></div>
        <div class="drop glass" data-drop="el" style="--c:#2E75B6;padding:16px;border-top:7px solid #2E75B6;display:flex;flex-direction:column;gap:8px"><div style="font:800 27px var(--f-d);color:#2E75B6">Elektrochemische Korrosion</div><div class="muted" style="font-size:15px">Zwei Metalle plus Feuchtigkeit: Es fließt Strom.</div></div>
      </div>
    </div></div>`;
  window.KARTE_DND(el, { check: (it, d) => it.dataset.b === d.dataset.drop,
    onDrop(it, d, ok){ if (ok) { it.classList.add('ok'); it.style.setProperty('--c', d.dataset.drop === 'ch' ? '#C9851B' : '#2E75B6'); d.appendChild(it); n++; }
      if (n === T.length) fb($('#kwF', el), true, '<b>Alles richtig!</b> Jetzt schauen wir uns beide Arten genauer an.');
      else if (!ok) fb($('#kwF', el), false, 'Noch nicht. Sind zwei verschiedene Metalle beteiligt?'); } });
}};

/* ---------- 2 · Bitumenkorrosion ---------- */
F.ko_bitumen = { kurz: 'Bitumenkorrosion', render(el){
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 420px;gap:22px;height:100%">
    <div class="glass" style="padding:16px;display:flex;flex-direction:column">
      <svg id="bS" viewBox="0 0 1000 500" style="width:100%;flex:1"></svg>
      <div style="display:flex;gap:16px;align-items:center;padding:4px 10px"><b style="font:700 20px var(--f-d);color:var(--navy);width:140px" id="bJ"></b>
        <input type="range" id="bR" min="0" max="20" value="0" style="flex:1;accent-color:${C};height:30px"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Säure von oben</h2>
      <p class="lead" style="font-size:16px;margin:0">Sonne (UV) lässt ungeschütztes Bitumen oxidieren. Dabei entstehen <b>Säuren</b>. Der Regen spült sie auf die Metallteile darunter. Schiebe die Jahre und tippe auf die Bauteile.</p>
      <div id="bF" class="fbk" style="font-size:16px;background:rgba(17,50,119,.06);color:var(--slate-d)">Tippe auf ein Bauteil im Schnitt.</div>
      ${box(`<div class="eyebrow" style="color:${C}">Was passiert, wenn …</div>
        <label style="display:flex;gap:10px;align-items:center;font:600 16px var(--f-b);margin-top:10px"><input type="checkbox" id="bU" style="width:22px;height:22px;accent-color:${C}"> die Bitumenbahn vor UV geschützt ist (beschiefert oder bekiest)?</label>`, 'padding:16px 18px')}
      <p class="muted" style="font-size:14px;margin:0">Ähnlich wirkt Ablaufwasser von Beton, Gründächern, Sand oder Kies. Vereinzelt auch von Schiefer- oder Faserzementdächern.</p>
    </div></div>`;
  const P = { trauf: ['Traufblech', 'Liegt direkt unter der Bahn: bekommt die Säure zuerst ab.'], rinne: ['Dachrinne', 'Das saure Wasser steht und fließt darin: besonders gefährdet.'], fall: ['Fallrohr', 'Auch das Fallrohr wird vom sauren Wasser durchspült.'], winkel: ['Anschlussblech unterhalb', 'Alles, was in Fließrichtung unter der Bitumenfläche liegt, ist gefährdet.'] };
  function draw(){
    const y = +$('#bR', el).value, uv = $('#bU', el).checked, dmg = uv ? 0 : Math.min(1, y / 15);
    const rust = a => `rgba(${150 + a*40},${110 - a*50},${60 - a*30},${(0.15 + a*0.85).toFixed(2)})`;
    let s = `<rect width="1000" height="500" fill="#f4f7fb" rx="14"/>`;
    s += `<polygon points="60,250 640,250 640,300 60,300" fill="#d9c7a8"/><text x="350" y="285" text-anchor="middle" font-size="16" fill="#6b5a3d">Dämmung / Unterkonstruktion</text>`;
    s += `<polygon points="60,232 640,240 640,252 60,250" fill="${uv ? '#5f6772' : '#2b2b2b'}"/>`;
    if (uv) for (let x = 70; x < 640; x += 14) s += `<circle cx="${x}" cy="${236 + (x-60)*0.01}" r="3" fill="#9aa3ad"/>`;
    s += `<text x="300" y="222" font-size="17" font-weight="700" fill="#2b2b2b">Bitumenbahn${uv ? ' mit Schutzschicht' : ''}</text>`;
    s += `<circle cx="160" cy="80" r="34" fill="#f6c443"/>`; if (!uv) for (let i = 0; i < 4; i++) s += `<line x1="${190+i*30}" y1="${110+i*10}" x2="${230+i*40}" y2="${200+i*8}" stroke="#f0b323" stroke-width="3" stroke-dasharray="6 6"/>`;
    s += `<g data-p="trauf" style="cursor:pointer"><rect x="590" y="236" width="120" height="40" fill="transparent"/><path d="M600 244 L690 250 L700 268" fill="none" stroke="#9aa3ad" stroke-width="10" stroke-linejoin="round"/><path d="M600 244 L690 250 L700 268" fill="none" stroke="${rust(dmg)}" stroke-width="10" stroke-linejoin="round"/></g>`;
    s += `<g data-p="rinne" style="cursor:pointer"><rect x="670" y="278" width="120" height="70" fill="transparent"/><path d="M680 280 Q680 340 730 340 Q780 340 780 280" fill="none" stroke="#9aa3ad" stroke-width="10"/><path d="M680 280 Q680 340 730 340 Q780 340 780 280" fill="none" stroke="${rust(dmg)}" stroke-width="10"/></g>`;
    s += `<g data-p="fall" style="cursor:pointer"><rect x="716" y="340" width="28" height="140" fill="#9aa3ad"/><rect x="716" y="340" width="28" height="140" fill="${rust(dmg*0.8)}"/></g>`;
    s += `<g data-p="winkel" style="cursor:pointer"><rect x="10" y="300" width="70" height="150" fill="transparent"/><path d="M60 300 L60 420 L20 440" fill="none" stroke="#9aa3ad" stroke-width="9"/><path d="M60 300 L60 420 L20 440" fill="none" stroke="${rust(dmg*0.6)}" stroke-width="9"/></g>`;
    if (!uv && y > 0) for (let i = 0; i < 6; i++) s += `<path d="M${520+i*24} ${236+i} q6 14 0 20 q-6 -6 0 -20" fill="rgba(163,35,58,.55)"/>`;
    s += `<text x="730" y="372" text-anchor="middle" font-size="15" fill="#44546A">Rinne</text><text x="760" y="460" font-size="15" fill="#44546A">Fallrohr</text><text x="640" y="232" font-size="15" fill="#44546A">Traufblech</text>`;
    $('#bS', el).innerHTML = s; $('#bJ', el).textContent = y + (y === 1 ? ' Jahr' : ' Jahre');
    $('#bS', el).querySelectorAll('[data-p]').forEach(g => g.onclick = () => { const p = P[g.dataset.p]; fb($('#bF', el), !!uv, `<b>${p[0]}:</b> ${uv ? 'Die Bahn ist geschützt, es entsteht kaum Säure.' : p[1]}`); });
  }
  el.querySelectorAll('#bR,#bU').forEach(i => i.addEventListener('input', draw)); draw();
}};

/* ---------- 3 · Spannungsreihe ---------- */
F.ko_spannung = { kurz: 'Spannungsreihe', render(el){
  const E = [['Magnesium', -2.40], ['Aluminium', -1.67], ['Zink', -0.76], ['Eisen', -0.44], ['Blei', -0.13], ['Wasserstoff', 0], ['Kupfer', 0.34], ['Gold', 1.50]];
  let sel = [], wet = true;
  el.innerHTML = `<div style="display:grid;grid-template-columns:520px 1fr;gap:24px;height:100%">
    <div class="glass card2" style="display:flex;flex-direction:column">
      <div class="eyebrow" style="color:${C}">Elektrochemische Spannungsreihe</div><h2 style="font-size:28px;margin:4px 0 6px">Wähle zwei Metalle</h2>
      <div id="sL" style="display:flex;flex-direction:column;gap:6px;flex:1;justify-content:center"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="glass" style="padding:14px"><svg id="sS" viewBox="0 0 900 360" style="width:100%"></svg></div>
      <div style="display:flex;gap:10px;align-items:center"><button class="btn2" id="sW" style="background:${C}">${ICON('info',16)} Feuchtigkeit: an</button></div>
      <div id="sF" class="fbk" style="font-size:17px;background:rgba(17,50,119,.06);color:var(--slate-d)">Tippe links zwei Metalle an.</div>
    </div></div>`;
  function list(){
    $('#sL', el).innerHTML = E.slice().reverse().map(e => { const on = sel.includes(e[0]), dis = e[0] === 'Wasserstoff';
      const w = Math.abs(e[1]) / 2.4 * 170;
      return `<button ${dis ? 'disabled' : ''} data-e="${e[0]}" style="border:0;border-radius:14px;padding:8px 12px;display:grid;grid-template-columns:120px 1fr 70px;align-items:center;gap:10px;background:${on ? 'rgba(163,35,58,.12)' : 'rgba(255,255,255,.8)'};box-shadow:${on ? 'inset 0 0 0 2.5px ' + C : 'inset 0 0 0 1.5px var(--line)'};font:700 16px var(--f-b);color:var(--ink);opacity:${dis ? .55 : 1}">
        <span style="text-align:left">${e[0]}</span>
        <span style="position:relative;height:16px"><span style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:#8497B0"></span><span style="position:absolute;top:2px;height:12px;border-radius:6px;${e[1] >= 0 ? 'left:50%' : 'right:50%'};width:${w}px;max-width:50%;background:${e[1] >= 0 ? '#2F8A78' : '#C9851B'}"></span></span>
        <span style="text-align:right">${e[1] > 0 ? '+' : ''}${e[1].toFixed(2).replace('.', ',')} V</span></button>`; }).join('') +
      `<div style="display:flex;justify-content:space-between;font:600 13px var(--f-b);color:var(--muted);padding:4px 12px"><span>oben: edel</span><span>unten: unedel</span></div>`;
    el.querySelectorAll('[data-e]').forEach(b => b.onclick = () => { const n = b.dataset.e; sel = sel.includes(n) ? sel.filter(x => x !== n) : sel.concat(n).slice(-2); list(); draw(); });
  }
  function draw(){
    let s = `<rect width="900" height="360" rx="14" fill="#f4f7fb"/>`;
    if (wet) s += `<rect x="150" y="250" width="600" height="80" rx="12" fill="rgba(46,117,182,.22)"/><text x="450" y="315" text-anchor="middle" font-size="15" fill="#2E75B6">Feuchtigkeit (Elektrolyt)</text>`;
    const f = $('#sF', el);
    if (sel.length < 2) { $('#sS', el).innerHTML = s + `<text x="450" y="160" text-anchor="middle" font-size="22" fill="#8497B0">Zwei Metalle wählen</text>`; f.className = 'fbk'; f.style.background = 'rgba(17,50,119,.06)'; f.innerHTML = 'Tippe links zwei Metalle an.'; return; }
    const a = E.find(e => e[0] === sel[0]), b = E.find(e => e[0] === sel[1]);
    const [un, ed] = a[1] < b[1] ? [a, b] : [b, a], du = (ed[1] - un[1]);
    s += `<rect x="190" y="90" width="200" height="200" rx="10" fill="#C9851B" opacity=".85"/><text x="290" y="180" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">${un[0]}</text><text x="290" y="210" text-anchor="middle" font-size="16" fill="#fff">unedler · löst sich auf</text>`;
    s += `<rect x="510" y="90" width="200" height="200" rx="10" fill="#2F8A78" opacity=".85"/><text x="610" y="180" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">${ed[0]}</text><text x="610" y="210" text-anchor="middle" font-size="16" fill="#fff">edler · bleibt erhalten</text>`;
    s += `<text x="450" y="60" text-anchor="middle" font-size="22" font-weight="800" fill="#113277">Spannung: ${du.toFixed(2).replace('.', ',')} V</text>`;
    if (wet) { s += `<path d="M395 240 H505" stroke="#A3233A" stroke-width="4" marker-end="url(#ar)"/><defs><marker id="ar" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#A3233A"/></marker></defs><text x="450" y="230" text-anchor="middle" font-size="14" fill="#A3233A">Metallionen</text>`;
      for (let i = 0; i < 6; i++) s += `<circle cx="${200 + (i*37)%180}" cy="${100 + (i*53)%180}" r="${6 + i%3*3}" fill="rgba(80,40,0,.35)"/>`; }
    $('#sS', el).innerHTML = s;
    if (!wet) fb(f, true, '<b>Ohne Feuchtigkeit fließt kein Strom.</b> Erst Wasser (Elektrolyt) macht aus den zwei Metallen ein Element.');
    else fb(f, false, `<b>Kontaktkorrosion:</b> Das unedlere <b>${un[0]}</b> verliert Masse, Metallionen wandern zum edleren <b>${ed[0]}</b>. Je größer die Spannung, desto stärker der Angriff.`);
  }
  $('#sW', el).onclick = () => { wet = !wet; $('#sW', el).innerHTML = `${ICON('info',16)} Feuchtigkeit: ${wet ? 'an' : 'aus'}`; $('#sW', el).style.background = wet ? C : '#8497B0'; draw(); };
  list(); draw();
}};

/* ---------- 4 · Fließregel ---------- */
F.ko_fliess = { kurz: 'Fließregel', render(el){
  let oben = 'cu', unten = 'zn';
  const opts = ['cu', 'zn', 'al', 'fe', 'va'];
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 430px;gap:22px;height:100%">
    <div class="glass" style="padding:16px"><svg id="fS" viewBox="0 0 1000 560" style="width:100%;height:100%"></svg></div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Wohin fließt das Wasser?</h2>
      <p class="lead" style="font-size:16px;margin:0">Regenwasser nimmt Metallionen von der Dachfläche mit. Landen Kupferionen auf einem unedleren Metall, beginnt dort Korrosion.</p>
      ${box(`<div class="eyebrow" style="color:${C}">Dachfläche (oben)</div><div id="fO" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px"></div>
        <div class="eyebrow" style="color:${C};margin-top:14px">Rinne (unten)</div><div id="fU" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px"></div>`, 'padding:16px 18px')}
      <div id="fF"></div>
      <button class="btn2 ghost" id="fR" style="align-self:flex-start">${ICON('auge',16)} Fließregel zeigen</button>
      <div id="fRT" class="merke" style="display:none;margin:0"><b>Fließregel</b>In Fließrichtung des Wassers darf nie ein unedleres Metall unter einem edleren liegen. Also: edel unten, unedel oben, nie umgekehrt.</div>
    </div></div>`;
  const btns = (id, cur, set) => { $(id, el).innerHTML = opts.map(k => `<button class="btn2 ${k === cur ? '' : 'ghost'}" data-k="${k}" style="padding:8px 12px;font-size:14px;${k === cur ? 'background:' + C : ''}">${M[k][0]}</button>`).join('');
    $(id, el).querySelectorAll('[data-k]').forEach(b => b.onclick = () => { set(b.dataset.k); draw(); }); };
  function draw(){
    btns('#fO', oben, k => oben = k); btns('#fU', unten, k => unten = k);
    const ok = OK(oben, unten), mo = M[oben], mu = M[unten];
    let s = `<rect width="1000" height="560" rx="14" fill="#f4f7fb"/>`;
    s += `<polygon points="80,120 620,320 620,350 80,150" fill="${mo[1]}"/>`;
    for (let x = 110; x < 620; x += 50) s += `<line x1="${x}" y1="${120 + (x-80)*0.37}" x2="${x}" y2="${150 + (x-80)*0.37}" stroke="rgba(255,255,255,.5)" stroke-width="4"/>`;
    s += `<text x="300" y="150" font-size="22" font-weight="800" fill="#44546A" transform="rotate(20 300 150)">Dach: ${mo[0]}</text>`;
    s += `<path d="M600 330 Q600 420 680 420 Q760 420 760 330" fill="none" stroke="${mu[1]}" stroke-width="16"/>`;
    if (!ok) s += `<path d="M640 400 Q680 425 720 400" fill="none" stroke="#7a3b10" stroke-width="7" stroke-dasharray="3 6"/>`;
    s += `<text x="680" y="470" text-anchor="middle" font-size="22" font-weight="800" fill="#44546A">Rinne: ${mu[0]}</text>`;
    for (let i = 0; i < 7; i++) { const x = 150 + i * 70, y = 145 + (x-80)*0.37; s += `<path d="M${x} ${y-12} q7 14 0 20 q-7 -6 0 -20" fill="${oben === 'cu' ? 'rgba(46,160,140,.7)' : 'rgba(46,117,182,.6)'}"/>`; }
    s += `<path d="M640 360 q10 18 0 26 q-10 -8 0 -26" fill="${oben === 'cu' ? 'rgba(46,160,140,.8)' : 'rgba(46,117,182,.7)'}"/>`;
    s += `<g transform="translate(860,170)"><circle r="70" fill="${ok ? '#2F8A78' : '#A3233A'}"/><text y="14" text-anchor="middle" font-size="44" font-weight="800" fill="#fff">${ok ? '✓' : '✗'}</text></g>`;
    $('#fS', el).innerHTML = s;
    fb($('#fF', el), ok, ok ? (oben === unten ? '<b>Gleiches Metall:</b> keine Gefahr.' : `<b>Unbedenklich.</b> Vom ${mo[0]} gelangen keine schädlichen Ionen auf ${mu[0]}.`)
      : `<b>Korrosionsschaden!</b> Kupferionen aus dem Regenwasser zerstören die Rinne aus ${mu[0]}.`);
  }
  $('#fR', el).onclick = () => { $('#fRT', el).style.display = 'block'; $('#fR', el).remove(); };
  draw();
}};

/* ---------- 5 · Befestigungsmittel ---------- */
F.ko_befestigung = { kurz: 'Befestigung', render(el){
  const K = [
    ['Verzinkte Schieferstifte für Kupferhaften', 0, 'Zink ist unedler als Kupfer: Die Stifte lösen sich auf, die Haften verlieren den Halt.'],
    ['Kupferstifte in einer Titanzinkdeckung', 0, 'Das Zink um den edleren Kupferstift herum korrodiert.'],
    ['Edelstahlhaften für eine Titanzinkdeckung', 1, 'Edelstahl und Titanzink vertragen sich.'],
    ['Kupfernägel für eine Kupferdeckung', 1, 'Gleiches Metall: keine Kontaktkorrosion.'],
    ['Aluminiumnieten in Kupferblech', 0, 'Aluminium ist viel unedler als Kupfer und wird zerstört.'],
    ['Edelstahlschrauben an einer Aluminiumblende', 1, 'Kleine, edle Verbindungsmittel in einer großen Fläche sind hier unbedenklich.']
  ];
  let n = 0, r = 0;
  el.innerHTML = `<h2>Eingebauter Verschleiß?</h2>
    <p class="lead">Häufige Ursache für Kontaktkorrosion: Befestigungsmittel, die gerade von einer anderen Baustelle übrig sind. Passt die Kombination? <span id="bS2" style="font-weight:700;color:var(--navy)"></span></p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      ${K.map((k, i) => `<div class="glass card2" data-i="${i}" style="padding:16px 18px"><div style="font:700 20px/1.3 var(--f-d);color:var(--navy);min-height:56px">${k[0]}</div>
        <div style="display:flex;gap:8px;margin-top:10px"><button class="btn2" data-v="1" style="padding:10px 14px;font-size:15px;background:#2F8A78">Passt</button><button class="btn2" data-v="0" style="padding:10px 14px;font-size:15px;background:${C}">Passt nicht</button></div>
        <div class="r" style="display:none;margin-top:10px"></div></div>`).join('')}
    </div>
    <div class="merke" style="margin-top:16px"><b>Merke</b>Verbindungsmittel immer passend zum Werkstoff der Deckung wählen. Falsch gewählte Stifte oder Nieten können für Kunde und Betrieb einen großen wirtschaftlichen Schaden bedeuten.</div>`;
  el.querySelectorAll('[data-i]').forEach(c => c.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
    const k = K[+c.dataset.i], ok = (+b.dataset.v) === k[1]; n++; if (ok) r++;
    c.querySelectorAll('[data-v]').forEach(x => x.disabled = true);
    const d = c.querySelector('.r'); fb(d, ok, (ok ? '<b>Richtig.</b> ' : '<b>Andersherum.</b> ') + k[2]); d.style.fontSize = '15px';
    $('#bS2', el).textContent = `${r} von ${n} richtig`;
  }));
}};
})();
