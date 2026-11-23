/* ==========================================================
   Themenbereich rechts: Optische Bewertung von Metalldächern und -fassaden
   Alle Inhalte in eigenen Worten zusammengefasst.
   ========================================================== */
(function(){
const F = window.KARTE_FOLIEN, $ = (s, el) => el.querySelector(s);
const C = '#C9851B';
const fb = (el, ok, html) => { el.className = 'fbk ' + (ok ? 'good' : 'bad'); el.innerHTML = html; el.style.display = 'block'; };
const box = (inner, extra = '') => `<div class="glass card2" style="${extra}">${inner}</div>`;
const pill = t => `<span style="display:inline-block;background:rgba(201,133,27,.14);color:#8a5a0e;border-radius:10px;padding:3px 9px;font:700 14px var(--f-b)">${t}</span>`;

/* ---------- 0 · Leitfragen ---------- */
F.ob_leitfragen = { kurz: 'Leitfragen', render(el){
  const G = [
    ['Betrachtungsabstand & Gesamteindruck', [['Aus welchem Abstand wird betrachtet?', 1], ['Welche Parameter sind relevant?', 1], ['Wann ist ein Mangel deutlich erkennbar?', 2]]],
    ['Beleuchtung & Sonnenstand', [['Welche Rolle spielen Sonne und Licht?', 3], ['Was gilt bei künstlicher Beleuchtung?', 3]]],
    ['Optische Mängel & Wertminderung', [['Wann besteht Anspruch auf komplette Sanierung?', 6], ['Welche Anforderungen muss eine Minderwertermittlung erfüllen?', 6], ['Welches Verfahren hilft dabei?', 4], ['Was sind Bagatellen?', 4], ['Wie wird die Wertminderung berechnet?', 5], ['Was wird dokumentiert?', 6]]]
  ];
  el.innerHTML = `<h2>Ist das ein Mangel oder hinzunehmen?</h2>
    <p class="lead">Metall lebt: leichte Unebenheiten, Farbunterschiede, Spiegelungen. Wann ist das hinzunehmen, und wann muss nachgebessert werden? Tippe eine Leitfrage an, um zur passenden Station zu springen.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
      ${G.map((g, gi) => box(`<div class="eyebrow" style="color:${C}">Leitfragen ${gi+1}</div><h3 style="font-size:27px;margin:4px 0 12px">${g[0]}</h3>
        <div style="display:flex;flex-direction:column;gap:8px">${g[1].map(q => `<button data-j="${q[1]}" style="border:0;text-align:left;background:rgba(255,255,255,.85);border-radius:14px;padding:11px 14px;font:600 16px/1.3 var(--f-b);color:var(--ink);display:flex;justify-content:space-between;gap:10px;align-items:center;box-shadow:inset 0 0 0 1.5px var(--line)">${q[0]}<span style="color:${C};flex:none">${ICON('pfeilR',16)}</span></button>`).join('')}</div>`, 'border-top:7px solid ' + C)).join('')}
    </div>`;
  el.querySelectorAll('[data-j]').forEach(b => b.onclick = () => window.KARTE_GO && window.KARTE_GO('rechts', +b.dataset.j));
}};

/* ---------- 1 · Betrachtungsabstand ---------- */
F.ob_abstand = { kurz: 'Abstand', render(el){
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 430px;gap:22px;height:100%">
    <div class="glass" style="padding:16px;display:flex;flex-direction:column">
      <svg id="aS" viewBox="0 0 1000 470" style="width:100%;flex:1"></svg>
      <div style="display:flex;gap:16px;align-items:center;padding:4px 10px">
        <b style="font:700 20px var(--f-d);color:var(--navy);width:150px" id="aD"></b>
        <input type="range" id="aR" min="1" max="25" step="0.5" value="4" style="flex:1;accent-color:${C};height:30px">
        <label style="display:flex;gap:8px;align-items:center;font:600 15px var(--f-b);color:var(--slate-d)"><input type="checkbox" id="aG" style="width:20px;height:20px">Vorgarten</label>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Wo stehe ich zum Beurteilen?</h2>
      <p class="lead" style="font-size:16px;margin:0">Schiebe die Person. Beurteilt wird aus dem Abstand, aus dem man die Fläche im Alltag sieht, und so, dass man sie <b>ohne Kopfbewegung</b> als Ganzes erfasst.</p>
      <div id="aF" class="fbk" style="font-size:17px"></div>
      ${box(`<div class="eyebrow" style="color:${C}">Wenn nichts vereinbart ist</div>
        <div style="display:grid;grid-template-columns:120px 1fr;gap:6px 10px;font-size:15px;margin-top:8px">
          <b>Standort</b><span>etwa 10 m entfernt, rechtwinklig zur Wand</span>
          <b>Blickfeld</b><span>seitlich ca. 30° je Richtung, nach oben ca. 45°, ergibt ein Feld von ungefähr 12 × 12 m</span>
          <b>Licht</b><span>diffus, kein Streiflicht, keine direkte Sonne</span>
          <b>Dauer</b><span>ein störender Anblick sollte höchstens rund eine Stunde am Tag sichtbar sein</span></div>`, 'padding:16px 18px')}
      <p class="muted" style="font-size:14px;margin:0">Dächer: meist größerer Abstand nötig, Blick von unten. Ein Gerüst schränkt den Blick ein: dann Teilabnahmen machen und dokumentieren.</p>
    </div></div>`;
  const W = 900, px = m => W - m * 32, top = 70, bot = 410;
  function draw(){
    const m = +$('#aR', el).value, g = $('#aG', el).checked, x = px(m);
    const hFac = bot - top, dist = W - x;
    const ok45 = hFac <= dist * Math.tan(45 * Math.PI / 180) + 20;
    const inGarden = g && m < 6;
    let s = `<rect x="0" y="${bot}" width="1000" height="60" fill="#e6ebf2"/>`;
    if (g) s += `<rect x="${px(6)}" y="${bot-4}" width="${W-px(6)}" height="10" fill="#9ccf9a"/><text x="${(px(6)+W)/2}" y="${bot+34}" text-anchor="middle" font-size="16" fill="#3d7a3b" font-weight="600">Vorgarten: kein Standort</text>`;
    s += `<rect x="${W}" y="${top}" width="34" height="${hFac}" fill="#9aa6b2"/>`;
    for (let y = top + 20; y < bot; y += 40) s += `<line x1="${W}" x2="${W+34}" y1="${y}" y2="${y}" stroke="rgba(255,255,255,.5)" stroke-width="3"/>`;
    s += `<text x="${W+17}" y="${top-14}" text-anchor="middle" font-size="15" fill="#44546A">Fassade 11 m</text>`;
    const ey = bot - 52;
    s += `<polygon points="${x+8},${ey} ${W},${Math.max(top, ey - dist)} ${W},${bot}" fill="${ok45 && !inGarden ? 'rgba(47,138,120,.16)' : 'rgba(163,35,58,.12)'}"/>`;
    s += `<line x1="${x+8}" y1="${ey}" x2="${W}" y2="${Math.max(top, ey - dist)}" stroke="${C}" stroke-width="2" stroke-dasharray="6 5"/>`;
    s += `<g transform="translate(${x},${bot})" stroke="#113277" stroke-width="5" stroke-linecap="round" fill="none"><circle cx="0" cy="-62" r="11" fill="#fff"/><path d="M0 -50V-18M0 -18l-12 18M0 -18l12 18M0 -42l-14 14M0 -42l14 14"/></g>`;
    s += `<line x1="${x}" x2="${W}" y1="${bot+18}" y2="${bot+18}" stroke="#44546A" stroke-width="1.5"/><text x="${(x+W)/2}" y="${bot+48}" text-anchor="middle" font-size="16" fill="#44546A">${m.toLocaleString('de-DE')} m</text>`;
    $('#aS', el).innerHTML = s; $('#aD', el).textContent = 'Abstand ' + m.toLocaleString('de-DE') + ' m';
    const f = $('#aF', el);
    if (inGarden) fb(f, false, '<b>Kein zulässiger Standort.</b> Grünflächen und Vorgärten betritt man im Alltag nicht.');
    else if (!ok45) fb(f, false, '<b>Zu nah.</b> Die Fassade passt nicht ins Blickfeld, ein Gesamteindruck ist so nicht möglich.');
    else if (m > 16) fb(f, true, '<b>Gesamteindruck möglich.</b> Aber so weit weg steht man meist nicht, wenn man das Haus im Alltag ansieht.');
    else fb(f, true, '<b>Passt.</b> Die ganze Fläche ist ohne Kopfbewegung zu sehen. Ein Gesamteindruck ist möglich.');
  }
  el.querySelectorAll('#aR,#aG').forEach(i => i.addEventListener('input', draw)); draw();
}};

/* ---------- 2 · Deutlich erkennbar? ---------- */
F.ob_erkennbar = { kurz: 'Erkennbar?', render(el){
  const S = [
    ['Eine Delle ist beim Vorbeigehen aus normalem Abstand sofort zu sehen.', 1, 'Fällt spontan im alltäglichen Blickfeld auf: deutlich erkennbar.'],
    ['Der Kunde findet die Stelle erst, als der Nachbar mit dem Finger darauf zeigt.', 0, 'Muss erst jemand darauf hinweisen, gilt der Mangel nicht als deutlich erkennbar.'],
    ['Mit Taschenlampe im Streiflicht und aus 30 cm sind leichte Wellen zu erkennen.', 0, 'Nicht aus normalem Abstand, nur mit Hilfsmitteln und gezieltem Suchen.'],
    ['Die Wellen sind nur morgens etwa 20 Minuten im Streiflicht zu sehen.', 0, 'Zeitlich begrenzt, deutlich unter etwa einer Stunde pro Tag: in der Regel hinzunehmen.'],
    ['Ein Farbunterschied an der Rückseite ist nur von der Leiter aus zu sehen.', 0, 'Beurteilt werden nur Flächen, die man ohne Hilfsmittel aus üblicher Position sieht.'],
    ['Eine deutlich schiefe Falzeinteilung an der Straßenseite fällt jedem Besucher auf.', 1, 'Im normalen Blickfeld klar zu sehen: deutlich erkennbar, also zu bewerten.']
  ];
  let n = 0, r = 0;
  el.innerHTML = `<h2>Mangel im Sinne der Bewertung?</h2>
    <p class="lead">Ein optischer Mangel zählt nur, wenn er aus <b>normalem Abstand</b> im <b>alltäglichen Blickfeld</b> auffällt, also <b>spontan</b>, ohne Suchen und ohne Hinweis einer anderen Person. <span id="eS" style="font-weight:700;color:var(--navy)"></span></p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      ${S.map((s, i) => box(`<div style="font:600 18px/1.35 var(--f-b);min-height:76px">${s[0]}</div>
        <div style="display:flex;gap:8px;margin-top:12px"><button class="btn2" data-v="1" style="padding:10px 14px;font-size:15px;background:${C}">Deutlich erkennbar</button><button class="btn2 ghost" data-v="0" style="padding:10px 14px;font-size:15px">Hinzunehmen</button></div>
        <div class="r" style="display:none;margin-top:10px"></div>`, 'padding:16px 18px').replace('class="glass card2"', `class="glass card2" data-i="${i}"`)).join('')}
    </div>`;
  el.querySelectorAll('[data-i]').forEach(c => c.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
    const s = S[+c.dataset.i], ok = (+b.dataset.v) === s[1]; n++; if (ok) r++;
    c.querySelectorAll('[data-v]').forEach(x => x.disabled = true);
    const d = c.querySelector('.r'); fb(d, ok, (ok ? '<b>Richtig.</b> ' : '<b>Andersherum.</b> ') + s[2]); d.style.fontSize = '15px';
    $('#eS', el).textContent = `${r} von ${n} richtig`;
  }));
}};

/* ---------- 3 · Sonnenstand und Licht ---------- */
F.ob_licht = { kurz: 'Licht', render(el){
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 420px;gap:22px;height:100%">
    <div class="glass" style="padding:16px;display:flex;flex-direction:column">
      <div style="display:flex;gap:8px;margin-bottom:8px"><button class="btn2" data-s="ost" style="background:${C}">Ostfassade</button><button class="btn2 ghost" data-s="nord">Nordfassade</button></div>
      <svg id="lS" viewBox="0 0 1000 440" style="width:100%;flex:1"></svg>
      <div style="display:flex;gap:16px;align-items:center;padding:4px 10px"><b style="font:700 20px var(--f-d);color:var(--navy);width:110px" id="lT"></b>
        <input type="range" id="lR" min="6" max="20" step="0.25" value="7" style="flex:1;accent-color:${C};height:30px"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Sonne und Licht verändern alles</h2>
      <div id="lF" class="fbk" style="font-size:17px"></div>
      ${box(`<ul style="margin:0;padding-left:20px;font-size:15.5px;line-height:1.5">
        <li>Beurteilt wird bei <b>normalem Tageslicht</b>.</li>
        <li><b>Streiflicht</b> lässt kleinste Unebenheiten hervortreten. Ist das nur kurz am Tag so, ist es hinzunehmen.</li>
        <li>Darum immer festhalten: <b>Datum, Uhrzeit, Standort, Wetter</b>, z. B. im Bautagebuch.</li>
        <li><b>Künstliche Beleuchtung</b> der Fassade stellt höhere Anforderungen an die Ebenheit. Sie muss vor Arbeitsbeginn bekannt sein und spätestens zur Abnahme installiert sein. Nachgestelltes Licht zählt nicht.</li></ul>`, 'padding:16px 18px')}
    </div></div>`;
  let side = 'ost';
  function draw(){
    const h = +$('#lR', el).value, az = 90 + (h - 6) * 15, nrm = side === 'ost' ? 90 : 0;
    let d = Math.abs(az - nrm); if (d > 180) d = 360 - d;
    const lit = d < 90, graze = lit ? Math.max(0, (d - 55) / 35) : 0;
    const alt = Math.sin(Math.PI * (h - 6) / 14);
    const sx = 500 + (az - 180) * 3.6, sy = 330 - alt * 270;
    let s = `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe2f6"/><stop offset="1" stop-color="#f4f8fc"/></linearGradient></defs>
      <rect width="1000" height="440" fill="url(#sk)" rx="14"/>`;
    const cx = 880, cy = 120, R = 85, hw = 34, hh = 26;
    s += `<g><circle cx="${cx}" cy="${cy}" r="${R+14}" fill="rgba(255,255,255,.75)"/><text x="${cx}" y="${cy-R-20}" text-anchor="middle" font-size="13" font-weight="700" fill="#44546A">Draufsicht · N oben</text>`;
    s += `<rect x="${cx-hw}" y="${cy-hh}" width="${hw*2}" height="${hh*2}" fill="#dfe5ee" stroke="#44546A" stroke-width="2"/>`;
    s += side === 'ost' ? `<line x1="${cx+hw}" y1="${cy-hh}" x2="${cx+hw}" y2="${cy+hh}" stroke="${C}" stroke-width="7"/>` : `<line x1="${cx-hw}" y1="${cy-hh}" x2="${cx+hw}" y2="${cy-hh}" stroke="${C}" stroke-width="7"/>`;
    const ra = az * Math.PI / 180, px2 = cx + Math.sin(ra) * R, py2 = cy - Math.cos(ra) * R;
    const tx = side === 'ost' ? cx + hw : cx, ty = side === 'ost' ? cy : cy - hh;
    s += `<line x1="${px2}" y1="${py2}" x2="${tx}" y2="${ty}" stroke="#f0b323" stroke-width="3" stroke-dasharray="${lit ? '0' : '5 5'}" opacity="${lit ? 1 : .5}"/><circle cx="${px2}" cy="${py2}" r="14" fill="#f6c443"/></g>`;
    const base = lit ? 205 - graze * 30 : 150;
    s += `<rect x="250" y="120" width="340" height="300" fill="rgb(${base},${base+8},${base+18})" stroke="#44546A" stroke-width="2"/>`;
    for (let x = 272; x < 556; x += 42) {
      s += `<line x1="${x}" y1="120" x2="${x}" y2="420" stroke="rgba(255,255,255,${lit ? .35 + graze*.4 : .12})" stroke-width="4"/>`;
      for (let y = 140; y < 420; y += 26) s += `<path d="M${x+6} ${y} q15 ${6} 30 0" fill="none" stroke="rgba(30,40,60,${(graze*0.55).toFixed(2)})" stroke-width="2"/>`;
    }
    s += `<text x="420" y="105" text-anchor="middle" font-size="18" font-weight="700" fill="#44546A">${side === 'ost' ? 'Ostfassade' : 'Nordfassade'}</text>`;
    $('#lS', el).innerHTML = s;
    $('#lT', el).textContent = Math.floor(h) + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0') + ' Uhr';
    const f = $('#lF', el);
    if (side === 'nord') fb(f, false, '<b>Nordseite: dauerhaft im Schatten.</b> Oft Gegenlicht, Kontraste sind schwerer zu erkennen.');
    else if (!lit) fb(f, false, '<b>Im Schatten.</b> Die Sonne steht hinter der Fassade, Unebenheiten fallen kaum auf.');
    else if (graze > .45) fb(f, false, '<b>Streiflicht!</b> Die Sonne fällt flach über die Fläche, kleinste Wellen treten hervor. Ist das nur kurze Zeit am Tag so, ist es hinzunehmen.');
    else if (graze > .1) fb(f, true, '<b>Sonne von schräg vorn.</b> Erste Schatten werden sichtbar, die Fläche wirkt aber noch ruhig.');
    else fb(f, true, '<b>Sonne von vorn.</b> Die Fläche wirkt gleichmäßig.');
  }
  el.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { side = b.dataset.s;
    el.querySelectorAll('[data-s]').forEach(x => { const on = x === b; x.className = 'btn2' + (on ? '' : ' ghost'); x.style.background = on ? C : ''; }); draw(); });
  $('#lR', el).addEventListener('input', draw); draw();
}};

/* ---------- 4 · Hinnehmbar? Matrix nach Oswald ---------- */
F.ob_hinnehmbar = { kurz: 'Hinnehmbar?', render(el){
  const Bd = [['unwichtig',10],['eher unbedeutend',30],['wichtig',60],['sehr wichtig',90]];
  const Gr = [['geringfügig',10],['mäßig',30],['deutlich',60],['sehr stark',90]];
  el.innerHTML = `<div style="display:grid;grid-template-columns:470px 1fr;gap:24px;height:100%">
    <div class="glass card2" style="display:flex;flex-direction:column">
      <div class="eyebrow" style="color:${C}">Verfahren nach Oswald</div><h2 style="font-size:30px;margin:4px 0 10px">Ist der Mangel hinzunehmen?</h2>
      <p style="font-size:16px;margin:0 0 12px;color:var(--slate-d)">Zwei Fragen: Wie <b>wichtig</b> ist das Merkmal (z. B. Optik an der Straßenseite)? Wie <b>stark</b> ist es beeinträchtigt? Beides zusammen ergibt die Beeinträchtigung in Prozent.</p>
      <label style="font:700 16px var(--f-b);color:var(--navy)">Bedeutung des Merkmals: <span id="hB"></span></label>
      <input type="range" id="hRb" min="5" max="100" step="5" value="60" style="accent-color:${C};height:30px">
      <label style="font:700 16px var(--f-b);color:var(--navy);margin-top:8px">Grad der Beeinträchtigung: <span id="hG"></span></label>
      <input type="range" id="hRg" min="5" max="100" step="5" value="30" style="accent-color:${C};height:30px">
      <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px">
        <button class="btn2 ghost" data-p="80,30" style="font-size:14px">Schiefe Falzeinteilung, Straßenseite</button>
        <button class="btn2 ghost" data-p="30,30" style="font-size:14px">Gleicher Fehler, Hofseite</button>
        <button class="btn2 ghost" data-p="20,10" style="font-size:14px">Leichte Welle, kaum sichtbar</button>
      </div>
    </div>
    <div class="glass" style="padding:16px;display:grid;grid-template-columns:1fr 290px;gap:16px;align-items:center"><svg id="hM" viewBox="0 0 640 590" style="width:100%;max-height:100%"></svg><div id="hRes"></div></div></div>`;
  const zone = v => v < 2 ? ['Bagatelle', 'Unter 2 %: so gering, dass es als mangelfrei gilt.', '#2F8A78'] : v <= 15 ? ['Minderung möglich', '2 bis 15 %: statt Nachbesserung kann eine Wertminderung vereinbart werden.', '#C9851B'] : ['Nacherfüllung', 'Über 15 %: der Mangel muss in der Regel beseitigt werden.', '#A3233A'];
  const lbl = (v, arr) => arr.reduce((a, b) => Math.abs(b[1] - v) < Math.abs(a[1] - v) ? b : a)[0];
  function draw(){
    const b = +$('#hRb', el).value, g = +$('#hRg', el).value, v = b * g / 100, z = zone(v);
    $('#hB', el).textContent = `${b} (${lbl(b, Bd)})`; $('#hG', el).textContent = `${g} (${lbl(g, Gr)})`;
    $('#hRes', el).innerHTML = `<div style="border-radius:18px;padding:16px 18px;background:color-mix(in srgb, ${z[2]} 13%, white)"><div style="font:800 54px var(--f-d);color:${z[2]}">${v.toLocaleString('de-DE', {maximumFractionDigits: 2})} %</div><div style="font:800 24px var(--f-d);color:${z[2]}">${z[0]}</div><div style="font-size:16px;margin-top:4px">${z[1]}</div></div>`;
    let s = ''; const cw = 26, x0 = 80, y0 = 20;
    for (let gi = 0; gi < 20; gi++) for (let bi = 0; bi < 20; bi++) { const bb = 100 - bi * 5, gg = 100 - gi * 5, vv = bb * gg / 100, c = zone(vv)[2];
      s += `<rect x="${x0 + bi*cw}" y="${y0 + gi*cw}" width="${cw-2}" height="${cw-2}" rx="4" fill="${c}" opacity="${.18 + .5 * Math.min(1, vv / 40)}"/>`; }
    const mx = x0 + (100 - b) / 5 * cw + cw / 2 - 1, my = y0 + (100 - g) / 5 * cw + cw / 2 - 1;
    s += `<circle cx="${mx}" cy="${my}" r="15" fill="#fff" stroke="#113277" stroke-width="5"/>`;
    s += `<text x="${x0 + 10*cw}" y="${y0 + 20*cw + 30}" text-anchor="middle" font-size="17" font-weight="700" fill="#44546A">Bedeutung: sehr wichtig ← → unwichtig</text>`;
    s += `<text x="${x0 - 22}" y="${y0 + 10*cw}" text-anchor="middle" font-size="17" font-weight="700" fill="#44546A" transform="rotate(-90 ${x0-22} ${y0+10*cw})">Beeinträchtigung: sehr stark ← → gering</text>`;
    $('#hM', el).innerHTML = s;
  }
  el.querySelectorAll('#hRb,#hRg').forEach(i => i.addEventListener('input', draw));
  el.querySelectorAll('[data-p]').forEach(p => p.onclick = () => { const [b, g] = p.dataset.p.split(','); $('#hRb', el).value = b; $('#hRg', el).value = g; draw(); });
  draw();
}};

/* ---------- 5 · Wertminderung berechnen (Zielbaum nach Aurnhammer) ---------- */
F.ob_minderwert = { kurz: 'Wertminderung', render(el){
  const A = ['einwandfrei','kaum beeinträchtigt','leicht beeinträchtigt','noch in Ordnung','knapp ausreichend','nicht zufriedenstellend','mangelhaft','stark mangelhaft','unzureichend','gerade noch nutzbar','unbrauchbar'];
  const P = {
    strasse: { t: 'Fassade zur Straße', k: [['Aussehen','Einheitliche Farbe',25,2],['Aussehen','Gleichmäßige Struktur',20,3],['Aussehen','Ebenheit',15,0],['Nutzen','Standsicherheit',10,0],['Nutzen','Schlagregendichtheit',10,0],['Nutzen','Winddichtheit',10,0],['Nutzen','Wärmeschutz',10,0]] },
    hof:     { t: 'Fassade zum Hof',    k: [['Aussehen','Einheitliche Farbe',12,2],['Aussehen','Gleichmäßige Struktur',10,3],['Aussehen','Ebenheit',8,0],['Nutzen','Standsicherheit',20,0],['Nutzen','Schlagregendichtheit',20,0],['Nutzen','Winddichtheit',15,0],['Nutzen','Wärmeschutz',15,0]] }
  };
  let cur = 'strasse', rows = P[cur].k.map(r => r.slice());
  el.innerHTML = `<div style="display:grid;grid-template-columns:1fr 400px;gap:22px;height:100%">
    <div class="glass card2" style="display:flex;flex-direction:column">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px"><div class="eyebrow" style="color:${C};margin-right:auto">Zielbaum nach Aurnhammer</div>
        <button class="btn2" data-f="strasse" style="background:${C};font-size:14px">Straßenseite</button><button class="btn2 ghost" data-f="hof" style="font-size:14px">Hofseite</button></div>
      <table style="width:100%;border-collapse:collapse;font-size:16px" id="mT"></table>
      <p class="muted" style="font-size:14px;margin:10px 0 0">Gewichtung in Prozent, zusammen 100. Abweichung von 0 (einwandfrei) bis 10 (unbrauchbar). Werte zum Ausprobieren änderbar.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${box(`<div class="eyebrow" style="color:${C}">So wird gerechnet</div>
        <div style="font:700 22px var(--f-d);color:var(--navy);margin:8px 0">Minderwert je Kriterium = Gewichtung × Abweichung ÷ 10</div>
        <div style="font-size:15.5px;color:var(--slate-d)">Alle Einzelwerte zusammen ergeben den Minderwert in Prozent vom Wert des Bauteils.</div>`, 'padding:16px 18px')}
      <div id="mR"></div>
      ${box(`<label style="font:700 15px var(--f-b);color:var(--navy)">Wert des Bauteils (optional)</label><input class="big-in" id="mW" inputmode="numeric" placeholder="… €" style="font-size:26px;margin-top:6px"><div id="mE" style="font:800 24px var(--f-d);color:var(--navy);margin-top:8px"></div>`, 'padding:16px 18px')}
    </div></div>`;
  function draw(){
    const sumG = rows.reduce((a, r) => a + r[2], 0);
    let tot = 0;
    $('#mT', el).innerHTML = `<tr style="text-align:left;color:var(--muted);font-size:13px"><th style="padding:4px">Bereich</th><th>Kriterium</th><th>Gewichtung</th><th>Abweichung</th><th style="text-align:right">Minderwert</th></tr>` +
      rows.map((r, i) => { const m = r[2] * r[3] / 10; tot += m;
        return `<tr style="border-top:1px solid var(--line)"><td style="padding:7px 4px">${pill(r[0])}</td><td style="font-weight:600">${r[1]}</td>
          <td><input type="number" min="0" max="100" value="${r[2]}" data-g="${i}" style="width:70px;font:600 16px var(--f-b);border:1.5px solid var(--line);border-radius:10px;padding:5px 8px"> %</td>
          <td><select data-a="${i}" style="font:600 15px var(--f-b);border:1.5px solid var(--line);border-radius:10px;padding:5px 6px;max-width:210px">${A.map((t, k) => `<option value="${k}" ${k===r[3]?'selected':''}>${k} · ${t}</option>`).join('')}</select></td>
          <td style="text-align:right;font-weight:700;color:${m > 0 ? '#A3233A' : 'var(--muted)'}">${m.toLocaleString('de-DE', {maximumFractionDigits: 2})} %</td></tr>`; }).join('') +
      `<tr style="border-top:2px solid var(--navy)"><td></td><td style="padding:8px 4px;font-weight:700">Summe</td><td style="font-weight:700;color:${sumG===100?'var(--green)':'var(--berry)'}">${sumG} %</td><td></td><td style="text-align:right;font:800 20px var(--f-d);color:var(--navy)">${tot.toLocaleString('de-DE', {maximumFractionDigits: 2})} %</td></tr>`;
    const z = tot < 2 ? ['Bagatelle','#2F8A78'] : tot <= 15 ? ['Minderung möglich','#C9851B'] : ['Nacherfüllung','#A3233A'];
    $('#mR', el).innerHTML = `<div style="border-radius:20px;padding:16px 18px;background:color-mix(in srgb, ${z[1]} 13%, white)"><div style="font:700 15px var(--f-b);color:var(--slate-d)">Minderwert ${P[cur].t}</div><div style="font:800 50px var(--f-d);color:${z[1]}">${tot.toLocaleString('de-DE', {maximumFractionDigits: 2})} %</div><div style="font:800 22px var(--f-d);color:${z[1]}">${z[0]}</div>${sumG!==100?'<div style="color:#A3233A;font-size:14px;margin-top:4px">Achtung: Gewichtung ergibt nicht 100 %</div>':''}</div>`;
    const w = parseFloat(($('#mW', el).value || '').replace(/\./g,'').replace(',', '.'));
    $('#mE', el).textContent = w > 0 ? `= ${Math.round(w * tot / 100).toLocaleString('de-DE')} € Minderung` : '';
    el.querySelectorAll('[data-g]').forEach(i => i.onchange = () => { rows[+i.dataset.g][2] = Math.max(0, Math.min(100, +i.value || 0)); draw(); });
    el.querySelectorAll('[data-a]').forEach(i => i.onchange = () => { rows[+i.dataset.a][3] = +i.value; draw(); });
  }
  $('#mW', el).addEventListener('input', draw);
  el.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { cur = b.dataset.f; rows = P[cur].k.map(r => r.slice());
    el.querySelectorAll('[data-f]').forEach(x => { const on = x === b; x.className = 'btn2' + (on ? '' : ' ghost'); x.style.background = on ? C : ''; x.style.fontSize = '14px'; }); draw(); });
  draw();
}};

/* ---------- 6 · Sanieren, mindern oder hinnehmen? ---------- */
F.ob_entscheiden = { kurz: 'Entscheiden', render(el){
  const K = [
    ['Durch die Delle läuft Wasser hinter die Bekleidung.', 'nach', 'Die technische Funktion ist erheblich gestört: nachbessern oder erneuern.'],
    ['Farbunterschied an der Straßenseite, Beeinträchtigung rund 8 %. Ein Austausch wäre unverhältnismäßig teuer.', 'mind', 'Aufwand steht in keinem Verhältnis: Wertminderung statt Erneuerung.'],
    ['Eine leichte Welle, die nur im Streiflicht kurz am Morgen auffällt.', 'baga', 'Unter 2 %, kaum wahrnehmbar: Bagatelle, gilt als mangelfrei.'],
    ['Falsche Blechfarbe auf der ganzen Straßenfassade, Beeinträchtigung über 15 %.', 'nach', 'Über 15 %: Nacherfüllung ist in der Regel erforderlich.']
  ];
  const T = [['nach','Nachbessern / erneuern','#A3233A'],['mind','Wertminderung','#C9851B'],['baga','Hinnehmen (Bagatelle)','#2F8A78']];
  const Q = [['Nachvollziehbar','Alle Beteiligten können das Verfahren einsehen und verstehen.'],['Einheitlich','Vergleichbare Fälle führen zu ähnlichen Ergebnissen.'],['Angemessen','Am Ende empfinden alle Seiten die Lösung als gerecht.']];
  el.innerHTML = `<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:22px;height:100%">
    <div style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:32px">Erneuern, mindern oder hinnehmen?</h2>
      <p class="lead" style="font-size:16px;margin:0">Ein Fehler bedeutet nicht automatisch eine komplette Neuausführung. Die gibt es nur, wenn sich der Mangel nicht nachbessern lässt oder die Funktion erheblich gestört ist.</p>
      ${K.map((k, i) => box(`<div style="font:600 17px/1.35 var(--f-b)">${k[0]}</div><div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">${T.map(t => `<button class="btn2 ghost" data-t="${t[0]}" style="padding:8px 12px;font-size:14px;color:${t[2]}">${t[1]}</button>`).join('')}</div><div class="r" style="display:none;margin-top:8px"></div>`, 'padding:14px 16px').replace('class="glass card2"', `class="glass card2" data-k="${i}"`)).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${box(`<div class="eyebrow" style="color:${C}">Ein gutes Verfahren zur Wertminderung ist …</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">${Q.map(q => `<button data-q style="border:0;text-align:left;border-radius:14px;padding:12px 14px;background:rgba(201,133,27,.10);font:800 21px var(--f-d);color:#8a5a0e">${q[0]}<span style="display:none;font:500 15px/1.4 var(--f-b);color:var(--ink);margin-top:4px">${q[1]}</span></button>`).join('')}</div>
        <p class="muted" style="font-size:13px;margin:8px 0 0">Antippen zum Aufdecken</p>`, 'padding:16px 18px')}
      ${box(`<div class="eyebrow" style="color:${C}">Das gehört in die Dokumentation</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin-top:10px;font:600 16px var(--f-b)">
          ${['Datum und Uhrzeit','Wetter und Licht','Standort und Abstand','Fotos (Übersicht und Detail)','Beteiligte Personen','Ergebnis und Vereinbarung'].map(t => `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" style="width:20px;height:20px;accent-color:${C}">${t}</label>`).join('')}
        </div><p class="muted" style="font-size:14px;margin:10px 0 0">So können später auch Dritte nachvollziehen, wie bewertet wurde.</p>`, 'padding:16px 18px')}
    </div></div>`;
  el.querySelectorAll('[data-k]').forEach(c => c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
    const k = K[+c.dataset.k], ok = b.dataset.t === k[1];
    c.querySelectorAll('[data-t]').forEach(x => x.disabled = true);
    const d = c.querySelector('.r'); fb(d, ok, (ok ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + k[2]); d.style.fontSize = '15px'; d.style.padding = '8px 12px';
  }));
  el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { b.lastElementChild.style.display = 'block'; });
}};
})();
