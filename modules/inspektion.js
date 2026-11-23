/* Station 2 · Inspektion & Dokumentation */
(function(){
const BEW = [
  { id: 'ohne',    t: 'Ohne erkennbare Mängel', c: '#2F8A78' },
  { id: 'gering',  t: 'Geringe Mängel',         c: '#C9851B' },
  { id: 'erheb',   t: 'Erhebliche Mängel',      c: '#A3233A' },
  { id: 'sofort',  t: 'Sofortmaßnahme nötig',   c: '#6b0f22' }
];
const MASS = [
  { id: 'keine', t: 'Keine Maßnahme' }, { id: 'wartung', t: 'Wartung' },
  { id: 'instandsetzung', t: 'Instandsetzen' }, { id: 'verbesserung', t: 'Verbessern' }
];
/* Hotspots: x/y in Prozent der Hauszeichnung */
const SPOTS = [
  { id: 'k1', x: 60.7, y: 30.5, n: 'Kamineinfassung', nr: '3.3.1', f: 'Die Kappleiste der Kamineinfassung steht ab, die Fuge darüber ist offen. Bei Schlagregen kann Wasser hinter die Einfassung laufen.', ok: ['erheb', 'sofort'], m: ['instandsetzung'], e: 'Hier kann Wasser eindringen: erheblicher Mangel. Die Einfassung muss instand gesetzt werden.' },
  { id: 'k2', x: 55.4, y: 37.5, n: 'Dachflächenfenster', nr: '3.2.13', f: 'Der Eindeckrahmen sitzt fest und ist dicht. Oberhalb des Fensters liegen Laub und etwas Moos.', ok: ['gering', 'ohne'], m: ['wartung'], e: 'Funktion ist gegeben, aber Laub staut Wasser: geringer Mangel. Reinigen ist Wartung.' },
  { id: 'k3', x: 73.6, y: 46.5, n: 'Vorgehängte Rinne', nr: '3.1.1', f: 'Die Rinne ist voller Laub, nach dem Regen steht Wasser darin. Das Gefälle passt, die Rinne ist dicht.', ok: ['gering'], m: ['wartung'], e: 'Geringer Mangel: Rinne reinigen. Wird das nicht gemacht, droht Überlaufen und Korrosion.' },
  { id: 'k4', x: 38.6, y: 33.5, n: 'Kamindurchführung', nr: '3.3.1', f: 'Die Einfassung der Kamindurchführung (Edelstahlschornstein) hat sich gelöst, der Regenkragen liegt nicht mehr dicht am Rohr an.', ok: ['erheb'], m: ['instandsetzung'], e: 'Hier kann Wasser am Rohr entlang ins Dach laufen: erheblicher Mangel, Einfassung instand setzen.' },
  { id: 'k5', x: 62.9, y: 61.5, n: 'Stehfalzdeckung untere Dachfläche', nr: '3.2', f: 'Ein abgebrochener Ast hat eine Schare durchschlagen. Im Blech ist ein kleines Loch.', ok: ['sofort', 'erheb'], m: ['instandsetzung'], e: 'Durch das Loch dringt Wasser ein: sofort provisorisch abdichten, dann die Schare instand setzen.' },
  { id: 'k6', x: 87.3, y: 73.5, n: 'Fallrohr', nr: '3.1.7', f: 'Eine Rohrschelle fehlt, das Fallrohr wackelt leicht. Es ist aber noch dicht.', ok: ['gering'], m: ['wartung', 'instandsetzung'], e: 'Geringer Mangel. Schelle ergänzen und nachziehen, bevor sich das Rohr löst.' },
  { id: 'k7', x: 23.6, y: 64,   n: 'Mauerabdeckung Garage', nr: '3.2.16 / 3.2.17', f: 'Am Stoß der Mauerabdeckung wurde kein Dehnungsausgleich eingebaut. Die Lötnaht ist gerissen.', ok: ['erheb'], m: ['instandsetzung'], e: 'Nicht nach Fachregel ausgeführt, die Längenänderung reißt die Naht auf: erheblicher Mangel, mit Dehnungsausgleich instand setzen.' },
  { id: 'k8', x: 17.9, y: 82,   n: 'Wandbekleidung Garage', nr: '3.2.18', f: 'Die Bekleidung sitzt fest, die Fugen sind gleichmäßig, keine Verformungen oder Verfärbungen.', ok: ['ohne'], m: ['keine'], e: 'Alles in Ordnung. Auch das wird dokumentiert: Beim nächsten Check vergleichen wir damit.' },
  { id: 'k9', x: 42.9, y: 58,   n: 'Wandanschluss untere Dachfläche', nr: '3.2.7 / 3.2.19', f: 'Der Dichtstoff am Wandanschlussprofil ist versprödet und hat sich stellenweise gelöst.', ok: ['gering', 'erheb'], m: ['wartung', 'instandsetzung'], e: 'Die Fuge ist eine Wartungsfuge: Dichtstoff erneuern, bevor Wasser hinterläuft.' }
];
window.IH_SPOTS = SPOTS; window.IH_BEW = BEW;

/* kleine Foto-Attrappen für die Beweisfoto-Übung */
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
  const blur = o === 'unscharf' ? ' filter="url(#bl)"' : '';
  const filt = o === 'filter' ? '<rect width="260" height="170" fill="rgba(255,120,190,.28)"/><text x="12" y="160" font-size="12" fill="#fff" font-weight="700">Beauty-Filter</text>' : '';
  return `<svg viewBox="0 0 260 170"><defs><filter id="bl"><feGaussianBlur stdDeviation="3.2"/></filter></defs><g${blur}>${bg('250 560 460 300')}${obj}</g>${filt}</svg>`;
}

LF.register({
  id: 'inspektion',
  kurz: 'Inspektion',
  eyebrow: 'Station 2 · Säule Inspektion',
  schritte: [

    { name: 'Warum?', render(el, A){
      el.innerHTML = `<div class="card glass">
        <div class="eyebrow">Ist-Zustand ermitteln</div><h2>Warum inspizieren wir?</h2>
        <img class="ph" src="assets/img/inspektion.jpg" alt="" style="height:200px">
        <p>Ein regelmäßiger Inspektionsgang verschafft uns einen Überblick über den gegenwärtigen Zustand von Dach und Wand und all ihren Bauteilen. Ohne Inspektion wissen wir nicht, was zu tun ist.</p>
        <div class="grid2" style="margin-top:12px">
          ${[['lupe','Schäden früh erkennen','Kleine Mängel finden, bevor daraus ein teurer Wasserschaden wird.'],
             ['home','Wert erhalten','Ein gepflegtes Dach hält länger und erhält den Wert des ganzen Gebäudes.'],
             ['info','Versicherung und Haftung','Eigentümer müssen ihr Gebäude ordnungsgemäß unterhalten. Löst sich zum Beispiel ein Blech und verletzt jemanden, haftet der Eigentümer, wenn er die Unterhaltung vernachlässigt hat (§ 836 BGB). Schäden sind der Versicherung unverzüglich zu melden.'],
             ['kamera','Beweise sichern','Saubere Dokumentation mit Fotos dient im Streitfall als Beweismittel, auch vor Gericht.']]
            .map(x => `<div style="background:rgba(255,255,255,.7);border-radius:16px;padding:14px"><div style="color:var(--blue)">${A.ICON(x[0],22)}</div><b style="font:700 19px var(--f-d);color:var(--navy)">${x[1]}</b><p style="margin:4px 0 0;font-size:14.5px">${x[2]}</p></div>`).join('')}
        </div></div>
      <div class="card glass">
        <div class="eyebrow">Sicht- und Funktionsprüfung</div><h3>Was wir prüfen</h3>
        <p>Wir prüfen die Bauteile auf <b>Korrosion</b> und <b>Haltbarkeit</b> und ob sie ihre <b>Funktion</b> erfüllen. Ist die Funktion nicht gegeben, sind automatisch Maßnahmen nötig, also Wartung oder Instandsetzung.</p>
        <p>Was zu prüfen ist, zeigt die Checkliste <b>„Dach- und Fassaden-Check“</b>: Dachentwässerung, Dach- und Fassadenelemente, Zusatzeinrichtungen wie Kamineinfassung, Blitzschutz oder Schneefang.</p>
      </div>`;
    }},

    { name: 'Ist und Soll', render(el, A){
      el.innerHTML = `<div class="card glass">
        <div class="eyebrow">Stand der Technik</div><h2>Woran messen wir das Soll?</h2>
        <p>Einen Mangel erkennt nur, wer weiß, wie es richtig sein muss. Der Soll-Zustand ergibt sich aus den <b>Fachregeln</b> unseres Handwerks (ZVSHK). Sie gelten als <b>allgemein anerkannte Regeln der Technik</b>. Dazu kommen Normen wie die DIN 18339 (VOB/C), Herstellerangaben sowie die Bestands- und Wartungspläne des Gebäudes.</p>
        <figure><img class="ph" src="assets/img/spannungsrisse.jpg" alt="Spannungsrisse an einem Blechdach" style="height:220px"><figcaption>Spannungsrisse am Blechdach</figcaption></figure>
        <p>Manche Mängel entstehen nicht durch Alterung, sondern weil die Arbeit <b>nicht fachgerecht</b> ausgeführt wurde. Wird zum Beispiel die temperaturbedingte Längenänderung des Blechs nicht berücksichtigt, reißt das Material.</p>
        <div class="merke"><b>Merke</b>Mangel = Abweichung des Ist-Zustands vom Soll-Zustand. Wer inspiziert, muss die aktuellen Fachregeln kennen.</div>
      </div>
      <div class="card glass"><div class="eyebrow">Kurz geprüft</div><div id="qq"></div></div>`;
      A.quiz(el.querySelector('#qq'), [
        { q: 'Ein Kollege sagt: „Das haben wir schon immer so gemacht, das passt schon.“ Woran misst du bei der Inspektion, ob ein Mangel vorliegt?', o: ['An den aktuellen Fachregeln und Herstellerangaben', 'An der Erfahrung des ältesten Kollegen', 'Am Geschmack des Kunden'], a: 0, e: 'Maßstab ist der Stand der anerkannten Regeln der Technik, also vor allem die Fachregeln.' },
        { q: 'Die Spannungsrisse auf dem Bild sind entstanden, weil …', o: ['das Blech schon sehr alt ist', 'die Längenänderung durch Temperatur nicht berücksichtigt wurde', 'zu oft gereinigt wurde'], a: 1, e: 'Typischer Ausführungsfehler: fehlender Dehnungsausgleich oder zu starre Befestigung.' }
      ]);
    }},

    { name: 'Intervalle', render(el, A){
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Wann inspizieren?</div><h2>Inspektionsintervalle</h2>
        <p>Nicht jedes Bauteil muss gleich oft kontrolliert werden. Was stark beansprucht wird oder schnell verschmutzt, schauen wir öfter an.</p>
        <div class="task"><div class="ti">${A.ICON('saeulen',18)}</div><p>Ordne die Bauteile dem passenden Intervall zu.</p></div><div id="iv"></div></div>`;
      A.sorter(el.querySelector('#iv'), {
        buckets: [ { id: 'h', name: 'Halbjährlich', sub: 'alle 6 Monate', farbe: '#A3233A' }, { id: 'j', name: 'Jährlich', sub: 'einmal im Jahr', farbe: '#C9851B' },
                   { id: 'd', name: 'Alle 3 Jahre', sub: '', farbe: '#2E75B6' }, { id: 'f', name: 'Alle 5 Jahre', sub: '', farbe: '#113277' } ],
        ende: 'Faustregel: Entwässerung am häufigsten, Konstruktion und Verkleidungen am seltensten.',
        items: [
          { t: 'Dachentwässerung', b: 'h', why: 'Laub im Herbst, Schnee und Eis im Winter: zweimal im Jahr.', hint: 'Denk an Herbstlaub und Winter.' },
          { t: 'Kunststoffdachbahnen', b: 'j', why: 'Einmal im Jahr.' },
          { t: 'Schutzanstriche auf Metall', b: 'j', why: 'Einmal im Jahr.' },
          { t: 'Blitzschutzanlagen', b: 'j', why: 'Einmal im Jahr.' },
          { t: 'Dachanschlüsse', b: 'j', why: 'Einmal im Jahr.' },
          { t: 'Zinkblechdeckungen', b: 'd', why: 'Alle 3 Jahre.' },
          { t: 'Schneefanggitter', b: 'd', why: 'Alle 3 Jahre.' },
          { t: 'Dachkonstruktion', b: 'f', why: 'Alle 5 Jahre.' },
          { t: 'Metallverkleidungen', b: 'f', why: 'Alle 5 Jahre.' }
        ]});
    }},

    { name: 'Werkzeug', render(el, A){
      const T = [
        ['Checkliste (Dach- und Fassaden-Check)', true, 'Damit nichts vergessen wird. Wird archiviert und beim nächsten Check verglichen.'],
        ['Hammer', true, 'Kleine Mängel gleich beseitigen, z. B. vorstehende Nägel.'],
        ['Wasserwaage', true, 'Gefälle der Rinne prüfen, Dachneigung bestimmen.'],
        ['Handykamera', true, 'Mängel fotografieren und dokumentieren.'],
        ['Gutachter-Lineal oder Münze', true, 'Genormter Größenvergleich auf Detailfotos.'],
        ['Baupläne oder Skizze', true, 'Mängel verorten und dem Kunden zeigen.'],
        ['Persönliche Schutzausrüstung gegen Absturz', true, 'Ohne Absturzsicherung geht niemand aufs Dach. Unfallverhütungsvorschriften beachten!'],
        ['Zollstock als Größenvergleich im Foto', false, 'Ein Zollstock ist nicht genormt und gilt im Foto nicht als aussagekräftig.'],
        ['Lötkolben', false, 'Löten ist Instandsetzung, nicht Inspektion.'],
        ['Winkelschleifer', false, 'Gehört nicht zur Inspektion.'],
        ['Kartuschenpresse mit Dichtstoff', false, 'Das ist Wartung oder Instandsetzung. Bei der Inspektion wird erst festgestellt.']
      ];
      const order = A.shuffle(T.map((x, i) => i));
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Hilfsmittel</div><h2>Was kommt mit aufs Dach?</h2>
        <div class="task"><div class="ti">${A.ICON('check',18)}</div><p>Wähle alles aus, was du für den Inspektionsgang brauchst. Dann auf „Prüfen“.</p></div>
        <div class="pool" id="wz">${order.map(i => `<button class="item" data-i="${i}">${T[i][0]}</button>`).join('')}</div>
        <button class="btn" id="wp">Prüfen</button><div id="wr" style="margin-top:12px"></div></div>`;
      el.querySelectorAll('#wz .item').forEach(b => b.onclick = () => b.classList.toggle('sel'));
      el.querySelector('#wp').onclick = () => {
        let f = 0;
        el.querySelector('#wr').innerHTML = order.map(i => { const s = el.querySelector(`#wz [data-i="${i}"]`).classList.contains('sel'); const ok = s === T[i][1]; if (!ok) f++;
          return `<div class="fb on ${ok ? 'good' : 'bad'}" style="margin:6px 0"><b>${T[i][1] ? '✓ Gehört dazu' : '✗ Bleibt unten'}: ${T[i][0]}.</b> ${T[i][2]}</div>`; }).join('') +
          `<p class="score">${f === 0 ? 'Perfekt gepackt!' : f + ' Fehler. Lies die Hinweise.'}</p>`;
      };
    }},

    { name: 'Beweisfotos', render(el, A){
      const C = [
        ['muenze', true, 'Detailfoto mit 2-€-Münze, scharf. Ein Übersichtsfoto von der Stelle gibt es auch.', 'Genormter Vergleichsgegenstand, scharf, und die Lage ist durch das Übersichtsfoto klar.'],
        ['zollstock', false, 'Detailfoto mit Zollstock daneben.', 'Ein Zollstock ist nicht genormt. Besser: Gutachter-Lineal oder Münze.'],
        ['lineal', true, 'Detailfoto mit Gutachter-Lineal, dazu ein Übersichtsfoto.', 'So soll es sein: genormter Maßstab und Bezug zum Gebäude.'],
        ['ohne', false, 'Detailfoto ohne Gegenstand zum Vergleich.', 'Wie groß ist der Riss? Ohne Vergleichsgegenstand lässt sich das nicht beurteilen.'],
        ['unscharf', false, 'Schnell im Vorbeigehen geknipst, mit Münze.', 'Unscharf: Der Mangel ist nicht eindeutig erkennbar.'],
        ['filter', false, 'Mit Münze, aber mit einem Filter aufgehübscht.', 'Bearbeitete Fotos sind als Beweis angreifbar. Originale unbearbeitet aufbewahren.'],
        ['uebersicht', true, 'Übersichtsfoto, Mangelstelle an der Gaube markiert. Detailfoto folgt.', 'Erst Übersicht, dann Detail: So weiß jeder, wo der Mangel liegt.']
      ];
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Dokumentation</div><h2>Fotos, die vor Gericht zählen</h2>
        <div class="grid2" style="align-items:center">
          <figure style="margin:0"><img class="ph" src="assets/img/gutachter-lineal.jpg" alt="Gutachter-Lineal neben einem Riss"><figcaption>Gutachter-Lineal als genormter Maßstab</figcaption></figure>
          <ol style="margin:0;padding-left:20px">
            <li><b>Erst Übersicht, dann Detail.</b> Die Lage am Gebäude muss erkennbar sein.</li>
            <li><b>Genormter Vergleichsgegenstand</b> im Detailfoto: Gutachter-Lineal oder Münze (1 € = 23,25 mm, 2 € = 25,75 mm). Kein Zollstock!</li>
            <li><b>Scharf</b> und gut ausgeleuchtet.</li>
            <li><b>Datum, Uhrzeit, Ort</b> festhalten und Nummer aus der Checkliste notieren.</li>
            <li><b>Unbearbeitet</b> aufbewahren, keine Filter.</li>
          </ol>
        </div></div>
      <div class="card glass"><div class="eyebrow">Anwenden</div><h3>Taugt das Foto als Beweis?</h3><div id="fc" class="grid2"></div><p class="score" id="fs"></p></div>
      <div class="card glass"><div class="eyebrow">Praxis</div>
        <div class="task"><div class="ti">${A.ICON('kamera',18)}</div><p>Fotografiert am Dachmodell oder in der Werkstatt einen „Mangel“: ein Übersichtsfoto und ein Detailfoto mit Münze. Tauscht die Handys und prüft euch gegenseitig nach den fünf Regeln.</p></div></div>`;
      let n = 0, r = 0;
      el.querySelector('#fc').innerHTML = C.map((c, i) => `<div style="background:rgba(255,255,255,.75);border-radius:16px;padding:10px" data-i="${i}">
        <div style="border-radius:10px;overflow:hidden;line-height:0">${foto(c[0])}</div>
        <p style="font-size:14.5px;margin:8px 2px">${c[2]}</p>
        <div style="display:flex;gap:6px"><button class="btn sm" data-v="1">Taugt</button><button class="btn ghost sm" data-v="0">Taugt nicht</button></div>
        <div class="fb"></div></div>`).join('');
      el.querySelectorAll('#fc [data-i]').forEach(card => card.querySelectorAll('button').forEach(b => b.onclick = () => {
        const c = C[+card.dataset.i], ok = (b.dataset.v === '1') === c[1];
        card.querySelectorAll('button').forEach(x => x.disabled = true); n++; if (ok) r++;
        const fb = card.querySelector('.fb'); fb.className = 'fb on ' + (ok ? 'good' : 'bad'); fb.innerHTML = `<b>${c[1] ? 'Taugt.' : 'Taugt nicht.'}</b> ${c[3]}`;
        if (n === C.length) el.querySelector('#fs').textContent = `${r} von ${C.length} richtig beurteilt.`;
      }));
    }},

    { name: 'Rundgang', render(el, A){
      const res = A.get('rundgang', {});
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Inspektionsgang an einem Einfamilienhaus</div><h2>Finde und bewerte die Befunde</h2>
        <div class="task"><div class="ti">${A.ICON('lupe',18)}</div><p>Tippe auf die Lupen. Lies den Befund, bewerte ihn wie im Dach- und Fassaden-Check und wähle die passende Maßnahme.</p></div>
        <div id="hs" style="position:relative;background:#fff;border-radius:16px;overflow:hidden">
          <img src="assets/img/haus-sperber.png" alt="Einfamilienhaus" style="width:100%;display:block">
        </div>
        <p class="score" id="rp"></p>
        <div id="det"></div></div>`;
      const hs = el.querySelector('#hs');
      function pins(){
        hs.querySelectorAll('.pin').forEach(p => p.remove());
        SPOTS.forEach((s, i) => { const r = res[s.id]; const st = r ? (r.okB && r.okM ? '#2F8A78' : '#C9851B') : '#113277';
          const p = A.h(`<button class="pin" aria-label="${s.n}" style="position:absolute;left:${s.x}%;top:${s.y}%;transform:translate(-50%,-50%);width:34px;height:34px;border-radius:50%;border:3px solid #fff;background:${st};color:#fff;display:grid;place-items:center;box-shadow:0 4px 12px rgba(17,50,119,.35);padding:0">${r ? A.ICON('check',16,3) : A.ICON('lupe',16,2.5)}</button>`);
          p.onclick = () => show(s); hs.appendChild(p); });
        const d = Object.keys(res).length;
        el.querySelector('#rp').textContent = `${d} von ${SPOTS.length} Stellen geprüft` + (d === SPOTS.length ? ' · Rundgang abgeschlossen! Weiter zum Kundengespräch.' : '');
      }
      function show(s){
        let b = res[s.id] ? res[s.id].b : null, m = res[s.id] ? res[s.id].m : null;
        const det = el.querySelector('#det');
        det.innerHTML = `<div style="background:rgba(255,255,255,.85);border-radius:18px;padding:16px;margin-top:14px;box-shadow:inset 0 0 0 1.5px var(--line)">
          <div class="eyebrow">Checkliste Nr. ${s.nr}</div><h3 style="margin:6px 0">${s.n}</h3><p>${s.f}</p>
          <b style="font-size:14px">Bewertung</b><div class="pool" id="bb">${BEW.map(x => `<button class="item" data-b="${x.id}">${x.t}</button>`).join('')}</div>
          <b style="font-size:14px">Maßnahme</b><div class="pool" id="mm">${MASS.map(x => `<button class="item" data-m="${x.id}">${x.t}</button>`).join('')}</div>
          <button class="btn" id="ok">Eintragen</button><div class="fb" id="sf"></div></div>`;
        const mark = () => { det.querySelectorAll('[data-b]').forEach(x => x.classList.toggle('sel', x.dataset.b === b)); det.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('sel', x.dataset.m === m)); };
        det.querySelectorAll('[data-b]').forEach(x => x.onclick = () => { b = x.dataset.b; mark(); });
        det.querySelectorAll('[data-m]').forEach(x => x.onclick = () => { m = x.dataset.m; mark(); });
        mark();
        det.querySelector('#ok').onclick = () => {
          if (!b || !m) { A.toast('Bitte Bewertung und Maßnahme wählen'); return; }
          const okB = s.ok.includes(b), okM = s.m.includes(m);
          res[s.id] = { b, m, okB, okM }; A.set('rundgang', res);
          const sf = det.querySelector('#sf'); sf.className = 'fb on ' + (okB && okM ? 'good' : 'bad');
          sf.innerHTML = (okB && okM ? '<b>Passt.</b> ' : '<b>Fachlich sieht das anders aus.</b> ') + s.e;
          pins();
        };
        det.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      pins();
    }},

    { name: 'Kundengespräch', render(el, A){
      const P = [
        ['Gegenwärtiger Ist-Zustand', true], ['Erforderliche Reparaturen', true], ['Künftige Instandsetzungen', true],
        ['Wiederkehrende Instandhaltungsmaßnahmen', true], ['Notwendige Investitionen', true],
        ['Wie schlecht der Vorgängerbetrieb gearbeitet hat', false], ['Nur das Positive, damit der Kunde zufrieden ist', false], ['Möglichst viele Fachbegriffe, damit es kompetent klingt', false]
      ];
      const ord = A.shuffle(P.map((_, i) => i));
      const res = A.get('rundgang', {});
      const rank = { ohne: 0, gering: 1, erheb: 2, sofort: 3 };
      const done = SPOTS.filter(s => res[s.id]);
      const worst = done.reduce((w, s) => Math.max(w, rank[res[s.id].b]), -1);
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Dokumentation und Kundenkontakt</div><h2>Den Kunden informieren</h2>
        <img class="ph" src="assets/img/kundengespraech.jpg" alt="" style="height:190px">
        <p>Alle Beobachtungen stehen in der Checkliste. Sie wird <b>archiviert</b>, damit wir beim nächsten Check den neuen Ist-Zustand vergleichen können. Im Gespräch zeigen wir dem Kunden Fotos und Bauplan oder Skizze.</p>
        <div class="task"><div class="ti">${A.ICON('check',18)}</div><p>Worüber informierst du den Kunden? Wähle aus und prüfe.</p></div>
        <div class="pool" id="kp">${ord.map(i => `<button class="item" data-i="${i}">${P[i][0]}</button>`).join('')}</div>
        <button class="btn" id="kb">Prüfen</button><div class="fb" id="kf"></div></div>
      <div class="card glass"><div class="eyebrow">Euer Prüfbericht</div><h2>Dach- und Fassaden-Check</h2>
        ${done.length === 0 ? '<p class="muted">Mach zuerst den Rundgang, dann erscheint hier dein Bericht.</p>' :
        `<table style="width:100%;border-collapse:collapse;font-size:14.5px">
          <tr style="text-align:left;color:var(--muted)"><th style="padding:6px 4px">Nr.</th><th>Bauteil</th><th>Bewertung</th><th>Maßnahme</th></tr>
          ${done.map(s => { const r = res[s.id]; const bw = BEW.find(x => x.id === r.b); return `<tr style="border-top:1px solid var(--line)"><td style="padding:7px 4px">${s.nr}</td><td>${s.n}</td><td style="color:${bw.c};font-weight:600">${bw.t}</td><td>${MASS.find(x => x.id === r.m).t}</td></tr>`; }).join('')}
        </table>
        <p><b>Prüfergebnis gesamt:</b> <span style="color:${BEW[Math.max(worst,0)].c};font-weight:700">${BEW[Math.max(worst,0)].t}</span></p>
        <p class="muted" style="font-size:14.5px">Nächster Check: Die Dachentwässerung spätestens in 6 Monaten, das restliche Dach nach den Intervallen.</p>`}
        <div class="task"><div class="ti">${A.ICON('stift',18)}</div><p>Formuliere die ersten zwei Sätze, mit denen du dem Kunden das Ergebnis erklärst. Verständlich, ehrlich, ohne Fachchinesisch.</p></div>
        ${A.note('kundensatz', 'Guten Tag, wir haben heute …', 3)}</div>`;
      el.querySelectorAll('#kp .item').forEach(b => b.onclick = () => b.classList.toggle('sel'));
      el.querySelector('#kb').onclick = () => {
        let f = 0; el.querySelectorAll('#kp .item').forEach(b => { const s = b.classList.contains('sel'); if (s !== P[+b.dataset.i][1]) f++; });
        const kf = el.querySelector('#kf'); kf.className = 'fb on ' + (f ? 'bad' : 'good');
        kf.innerHTML = f ? `<b>${f} Fehler.</b> Der Kunde soll ehrlich und vollständig informiert werden, über fünf Punkte. Schlechtreden anderer Betriebe und Fachchinesisch gehören nicht dazu.` :
          '<b>Genau.</b> Ist-Zustand, erforderliche Reparaturen, künftige Instandsetzungen, wiederkehrende Maßnahmen und notwendige Investitionen.';
      };
    }},

    { name: 'Check', render(el, A){
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Selbsttest</div><h2>Bist du fit für die Inspektion?</h2><div id="qz"></div></div>`;
      A.quiz(el.querySelector('#qz'), [
        { q: 'Was ist das Ziel der Inspektion?', o: ['Den Ist-Zustand feststellen, beurteilen und dokumentieren', 'Den Soll-Zustand wiederherstellen', 'Das Dach energetisch verbessern'], a: 0, e: 'Inspektion = Ist-Zustand ermitteln.' },
        { q: 'Wie oft sollte die Dachentwässerung inspiziert werden?', o: ['Alle 5 Jahre', 'Halbjährlich', 'Alle 3 Jahre'], a: 1, e: 'Laub und Winter: zweimal im Jahr.' },
        { q: 'Warum ist ein Zollstock im Detailfoto ungeeignet?', o: ['Er ist zu kurz', 'Er ist nicht genormt', 'Er glänzt zu stark'], a: 1, e: 'Für Beweisfotos braucht es genormte Gegenstände: Gutachter-Lineal oder Münze.' },
        { q: 'Welche Reihenfolge ist bei der Fotodokumentation richtig?', o: ['Erst Detail, dann Übersicht', 'Nur Detailfotos', 'Erst Übersicht, dann Detail'], a: 2, e: 'Die Übersicht zeigt, wo am Gebäude der Mangel liegt.' },
        { q: 'Wofür nimmst du die Wasserwaage mit aufs Dach?', o: ['Um das Gefälle der Rinne zu prüfen', 'Um Nägel einzuschlagen', 'Als Maßstab im Foto'], a: 0, e: 'Gefälle der Rinne, Dachneigung.' },
        { q: 'Warum wird die Checkliste nach der Inspektion archiviert?', o: ['Weil es Vorschrift fürs Finanzamt ist', 'Damit man beim nächsten Check den neuen Ist-Zustand vergleichen kann', 'Damit der Kunde sie nicht verliert'], a: 1, e: 'So lässt sich die Entwicklung eines Mangels verfolgen.' },
        { q: 'Was ist bei der Inspektion der Maßstab für den Soll-Zustand?', o: ['Die Fachregeln als anerkannte Regeln der Technik', 'Der Zustand beim Nachbarhaus', 'Der Preis der Reparatur'], a: 0, e: 'Dazu Normen, Herstellerangaben, Bestands- und Wartungspläne.' },
        { q: 'Ein abgebrochener Ast hat ein Loch in eine Schare geschlagen. Wie bewertest du das?', o: ['Ohne erkennbare Mängel', 'Geringer Mangel', 'Sofortmaßnahme nötig'], a: 2, e: 'Durch das Loch dringt Wasser ein: sofort provisorisch abdichten.' }
      ]);
    }}
  ]
});
})();
