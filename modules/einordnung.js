/* Station 1 · Was ist Instandhaltung?
   Vorlage für neue Module: LF.register({ id, kurz, titel, schritte:[{name, render(el, api)}] }) */
LF.register({
  id: 'einordnung',
  kurz: 'Einordnung',
  eyebrow: 'Station 1 · Einordnung',
  schritte: [

    { name: 'Warum?', render(el, A){
      const rv = A.get('warum-auf', false);
      el.innerHTML = `
      <div class="card glass">
        <div class="eyebrow">Einstieg</div>
        <h2>Was ist hier passiert?</h2>
        <img class="ph" src="assets/img/schaden-traufe.jpg" alt="Durchfeuchtete Dachschalung an der Traufe" style="max-height:420px;object-fit:contain;background:#e9edf3"><p class="muted" style="font-size:12px;margin:4px 0 0">Bild und Fallbeispiel: kapipro.de/de/fuer-privatpersonen</p>
        <p style="margin:10px 0 0"><b>Hinweis:</b> Hier lag vorher ein Blechdach. Wir sehen den Traufbereich von oben.</p>
        <div class="task"><div class="ti">${A.ICON('auge',18)}</div><p>Schau dir das Foto genau an. Wie konnte das passieren?</p></div>
        ${A.note('warum-ursache', 'Meine Vermutung …', 2)}
        <div style="margin-top:12px"><button class="btn ghost" id="auf">${A.ICON('info',16)} Auflösung</button></div>
        <div class="merke" id="aufl" style="display:${rv?'block':'none'}"><b>Auflösung</b>Hier lag vorher ein Blechdach. In der Rinne hat sich Laub gesammelt, deshalb stand das Wasser höher als sonst. Durch die <b>Kapillarwirkung</b> ist es über das Traufblech zurück unter die Deckung gezogen. Die Folge: Die Schalung hat sich mit Feuchtigkeit vollgesogen.<br><span style="font-size:14px;color:var(--muted)">Ein Praxisfall: Ein fachgerecht ausgeführtes Stehfalzdach aus Edelstahl hatte schon nach 8 Jahren einen massiven Wasserschaden in der Dachkonstruktion, verursacht durch Kapillarwirkung an der Traufe.</span></div>
      </div>
      <div class="card glass">
        <div class="eyebrow">Schätzen</div><h3>Was kostet was?</h3>
        <div class="grid2">
          <label style="font-weight:600;color:var(--green)">Rinne reinigen<input type="text" inputmode="numeric" id="k1" data-note="kost1" placeholder="€" value="${(A.get('note:kost1','')+'').replace(/"/g,'')}"></label>
          <label style="font-weight:600;color:var(--berry)">Schalung und Dach erneuern<input type="text" inputmode="numeric" id="k2" data-note="kost2" placeholder="€" value="${(A.get('note:kost2','')+'').replace(/"/g,'')}"></label>
        </div>
        <div id="kv" style="margin-top:14px"></div>
      </div>
      <div class="card glass">
        <div class="eyebrow">Zum Nachdenken</div><h3>„Ein Dach ist doch fertig, wenn es gedeckt ist, oder?“</h3>
        <div style="display:flex;gap:8px;margin-top:8px"><button class="btn ghost" data-v="ja">Stimmt</button><button class="btn ghost" data-v="nein">Stimmt nicht</button></div>
        <div class="fb" id="pv"></div>
      </div>
      <div class="card glass">
        <div class="eyebrow">Wer hat etwas davon?</div><h3>Drei Perspektiven</h3>
        <div class="grid2" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
          ${[['kunde','Der Kunde','home'],['betrieb','Der Betrieb','saeulen'],['ich','Ich als Spengler','hammer']].map(p => `<div><b style="display:flex;gap:6px;align-items:center;color:var(--navy)">${A.ICON(p[2],18)} ${p[1]}</b>${A.note('persp-'+p[0], 'Gründe …', 3)}</div>`).join('')}
        </div>
        <div style="margin-top:12px"><button class="btn ghost" id="ideen">${A.ICON('auge',16)} Ideen anzeigen</button></div>
        <div id="id" style="display:none;margin-top:10px" class="grid2"></div>
      </div>
      <div class="hero"><div class="eyebrow">Und jetzt?</div><h1 style="font-size:26px">Prüfen, putzen, reparieren, besser machen: Ist das alles das Gleiche? Oder steckt ein System dahinter?</h1></div>`;
      el.querySelector('#auf').onclick = () => { el.querySelector('#aufl').style.display = 'block'; A.set('warum-auf', true); };
      const num = v => parseFloat((v||'').replace(/\./g,'').replace(',', '.').replace(/[^0-9.]/g,''));
      const kv = el.querySelector('#kv');
      function vgl(){
        const a = num(el.querySelector('#k1').value), b = num(el.querySelector('#k2').value);
        if (!(a > 0 && b > 0)) { kv.innerHTML = '<p class="muted" style="margin:0">Tragt beide Schätzungen ein.</p>'; return; }
        const f = b / a, w = Math.max(2, Math.min(100, 100 / f));
        kv.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;align-items:center;gap:10px"><div style="height:22px;width:${w}%;background:var(--green);border-radius:8px"></div><b>${a.toLocaleString('de-DE')} €</b></div>
          <div style="display:flex;align-items:center;gap:10px"><div style="height:22px;width:100%;background:var(--berry);border-radius:8px;flex:1"></div><b>${b.toLocaleString('de-DE')} €</b></div></div>
          <p style="font:700 20px var(--f-d);color:var(--navy);margin:10px 0 0">Der Schaden kostet etwa das ${Math.round(f).toLocaleString('de-DE')}-Fache.</p>`;
      }
      el.querySelectorAll('#k1,#k2').forEach(i => i.addEventListener('input', vgl)); vgl();
      el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { const pv = el.querySelector('#pv'); pv.className = 'fb on ' + (b.dataset.v === 'nein' ? 'good' : 'bad');
        pv.innerHTML = b.dataset.v === 'nein' ? '<b>Genau.</b> Wind, Wetter, Temperatur und Laub setzen jedem Dach zu. Ab dem ersten Tag beginnt die Abnutzung.' : '<b>Leider nein.</b> Ab dem ersten Tag nutzt sich jedes Dach ab: Wind, Regen, Temperaturwechsel, Laub. Ohne Pflege wird aus kleinen Mängeln ein großer Schaden.'; });
      el.querySelector('#ideen').onclick = () => { const d = el.querySelector('#id'); d.style.display = 'grid';
        d.innerHTML = [['Kunde','spart Geld, Haus behält seinen Wert, Sicherheit, Versicherungsschutz'],['Betrieb','planbare Aufträge durch Wartungsverträge, Kunden kommen wieder, Arbeit auch im Winter'],['Ich als Spengler','viele Baustellen sind Bestand, Fachwissen ist gefragt, gute Doku schützt im Streitfall']]
          .map(x => `<div style="background:rgba(255,255,255,.75);border-radius:14px;padding:12px"><b style="color:var(--navy)">${x[0]}</b><p style="margin:4px 0 0;font-size:14.5px">${x[1]}</p></div>`).join(''); };
    }},

    { name: 'Situation', render(el, A){
      el.innerHTML = `
      <div class="card glass">
        <div class="eyebrow">Kundenauftrag</div>
        <h2>Familie Sperber ruft an</h2>
        <img class="ph" src="assets/img/haus-sperber.png" alt="Haus der Familie Sperber" style="background:#fff;max-height:240px;object-fit:contain">
        <p>${A.C.situation}</p>
        <div class="task"><div class="ti">${A.ICON('stift',18)}</div><p>Was ist jetzt unsere Aufgabe als Spengler? Notiere <b>3 Stichpunkte</b>, die für dich mit „Instandhaltung“ zu tun haben.</p></div>
        <div class="grid2" style="grid-template-columns:1fr 1fr 1fr">
          ${[1,2,3].map(i => `<input type="text" data-note="stich${i}" placeholder="Stichpunkt ${i}" value="${(A.get('note:stich'+i,'')+'').replace(/"/g,'&quot;')}">`).join('')}
        </div>
      </div>
      <div class="card glass">
        <div class="eyebrow">Aus eurem Betrieb</div>
        <h3>Erzählt euch gegenseitig</h3>
        <ul>
          <li>Welche Schäden an Dach und Wand habt ihr schon gesehen?</li>
          <li>Seid ihr beim Beheben nach einem Plan vorgegangen?</li>
          <li>Gab es vorher eine Absprache mit dem Kunden?</li>
        </ul>
      </div>`;
    }},

    { name: 'Vier Säulen', render(el, A){
      const t = {
        inspektion: ['inspektion.jpg', 'Bevor wir etwas tun, müssen wir wissen, wie es um das Dach steht. Wir stellen den Ist-Zustand fest, beurteilen ihn und dokumentieren ihn. Regelmäßige Inspektionen sind Schadensvorsorge: Schwachstellen werden früh erkannt. Wir prüfen die Bauteile auf Korrosion, Haltbarkeit und Funktion.', 'Gefälle der Rinne prüfen, Kamineinfassung kontrollieren, Mängel fotografieren.'],
        instandsetzung: ['instandsetzung.jpg', 'Findet die Inspektion Mängel, stellen wir den Soll-Zustand wieder her. Dazu gehören Reparaturen, der Austausch von Bauteilen und das Gangbarmachen. Ziel ist, dass das Bauteil wieder voll funktioniert.', 'Undichte Lötnaht nachlöten, gerissene Kehle erneuern.'],
        wartung: ['wartung.jpg', 'Funktioniert alles wieder, soll das auch so bleiben. Bei der Wartung erkennen wir kleine Mängel früh und beheben sie gleich (Prävention). Ein paar Handgriffe verhindern große, teure Reparaturen. Regelmäßige Wartung senkt den Erhaltungsaufwand.', 'Rinne reinigen, Rohrschelle nachziehen, Schutzanstrich erneuern.'],
        verbesserung: ['verbesserung.jpg', 'Nach der Inspektion kann es sinnvoll sein, Bauteile zu modernisieren, zum Beispiel für mehr Energieeffizienz. Der Anlass ist oft eine Reparatur, aber das Ergebnis ist besser als der ursprüngliche Zustand.', 'Beim Neueindecken zusätzlich dämmen, größeres Fallrohr einbauen.']
      };
      el.innerHTML = `
      <div class="card glass">
        <div class="eyebrow">Informieren</div>
        <h2>Instandhaltung hat vier Teilbereiche</h2>
        <p>Alles, was wir als Spengler tun, um ein Dach oder eine Wand dauerhaft funktionsfähig zu halten, nennen wir <b>Instandhaltung</b>. Die Norm DIN 31051 teilt sie in vier Grundmaßnahmen. Tippe die Säulen an.</p>
      </div>
      <div class="grid2" id="sg"></div>
      <div class="merke"><b>Merke</b>Der Schlüssel ist der Vergleich von <b>Ist</b> und <b>Soll</b>: Die Inspektion ermittelt das Ist. Instandsetzen, Wartung und Verbessern arbeiten am Soll.</div>`;
      el.querySelector('#sg').innerHTML = A.C.saeulen.map(s => `
        <div class="card glass" style="margin:0;cursor:pointer;border-top:6px solid ${s.farbe}" data-s="${s.id}">
          <div style="display:flex;gap:12px;align-items:center">
            <div style="width:44px;height:44px;border-radius:50%;background:${s.farbe};color:#fff;display:grid;place-items:center">${A.ICON(s.icon,22)}</div>
            <div><h3 style="margin:0;color:${s.farbe};font-size:26px">${s.name}</h3><div style="font-weight:600;color:var(--slate-d)">${s.kern}</div></div>
          </div>
          <div class="more" style="display:none">
            <img class="ph" src="assets/img/${t[s.id][0]}" alt="" style="height:170px;margin:12px 0 4px">
            <p>${t[s.id][1]}</p>
            <p class="muted" style="font-size:14.5px"><b>Beispiele:</b> ${t[s.id][2]}</p>
          </div>
          <div class="hint muted" style="font-size:13px;margin-top:8px">Antippen zum Aufklappen</div>
        </div>`).join('');
      el.querySelectorAll('[data-s]').forEach(c => c.onclick = () => { const m = c.querySelector('.more'); const o = m.style.display === 'none'; m.style.display = o ? 'block' : 'none'; c.querySelector('.hint').style.display = o ? 'none' : ''; });
    }},

    { name: 'Sortieren', render(el, A){
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Anwenden</div><h2>Welche Säule passt?</h2>
        <div class="task"><div class="ti">${A.ICON('saeulen',18)}</div><p>Tippe eine Tätigkeit an und dann die passende Säule.</p></div><div id="so"></div></div>`;
      const B = A.C.saeulen.map(s => ({ id: s.id, name: s.name, sub: s.kern, farbe: s.farbe }));
      A.sorter(el.querySelector('#so'), { buckets: B, ende: 'Du kannst Spenglertätigkeiten den vier Säulen zuordnen.', items: [
        { t: 'Gefälle der Dachrinne mit der Wasserwaage prüfen', b: 'inspektion', why: 'Prüfen und Messen ermittelt den Ist-Zustand.' },
        { t: 'Mängel fotografieren und in die Checkliste eintragen', b: 'inspektion', why: 'Dokumentieren gehört zur Inspektion.' },
        { t: 'Schneefanggitter auf festen Sitz kontrollieren', b: 'inspektion', why: 'Kontrollieren heißt: Ist-Zustand feststellen.' },
        { t: 'Undichte Lötnaht an der Rinne nachlöten', b: 'instandsetzung', why: 'Ein Defekt wird behoben, die Funktion wiederhergestellt.' },
        { t: 'Gerissene Kehle austauschen', b: 'instandsetzung', why: 'Austausch eines defekten Bauteils stellt den Soll-Zustand wieder her.' },
        { t: 'Abgerissenes Fallrohr wieder montieren', b: 'instandsetzung', why: 'Die Funktion war weg und wird wiederhergestellt.' },
        { t: 'Laub aus Rinne und Rinneneinlauf entfernen', b: 'wartung', why: 'Reinigen bewahrt den Soll-Zustand, bevor ein Schaden entsteht.' },
        { t: 'Schutzanstrich auf verzinktem Stahl erneuern', b: 'wartung', why: 'Der Anstrich verzögert die Abnutzung (Korrosion).' },
        { t: 'Lockere Rohrschelle nachziehen', b: 'wartung', why: 'Kleiner Mangel, sofort mit wenigen Handgriffen beseitigt.' },
        { t: 'Beim Neueindecken zusätzlich eine Dämmung einbauen', b: 'verbesserung', why: 'Danach ist das Dach besser als im Ursprungszustand.' },
        { t: 'Zu klein bemessenes Fallrohr durch größeren Querschnitt ersetzen', b: 'verbesserung', why: 'Das Ergebnis übertrifft den alten Soll-Zustand.' },
        { t: 'Laubschutzgitter nachrüsten', b: 'verbesserung', why: 'Ein neues Bauteil verbessert die Funktion dauerhaft.' }
      ]});
    }},

    { name: 'Zustandskurve', render(el, A){
      el.innerHTML = `<div class="card glass">
        <div class="eyebrow">Simulation</div><h2>30 Jahre ein Dach</h2>
        <p>Jedes Dach nutzt sich ab. Steuere das Dach durch 30 Jahre: <b>möglichst günstig</b> und <b>ohne Wasserschaden</b>. Achtung: Den Zustand siehst du nur, wenn du inspizierst.</p>
        <svg id="zk" viewBox="0 0 640 300" style="width:100%;background:rgba(255,255,255,.7);border-radius:16px;touch-action:manipulation"></svg>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0;align-items:center">
          <span class="chip" id="zj">Jahr 0</span><span class="chip" id="zc">Kosten 0 €</span><span class="chip" id="zz">Zustand ?</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px" id="zb"></div>
        <div class="fb on" id="zl" style="background:rgba(17,50,119,.05);color:var(--slate-d)">Tipp: Erst inspizieren, dann entscheiden.</div>
      </div>
      <div class="card glass"><div class="eyebrow">Auswerten</div>
        <div class="task"><div class="ti">${A.ICON('stift',18)}</div><p>Welche Strategie war am günstigsten? Was passiert, wenn man nie inspiziert?</p></div>
        ${A.note('zk-auswertung', 'Meine Erkenntnis …', 3)}</div>`;

      const P = { insp: 80, wart: 250, inst: 1500, instK: 55, verb: 7000, schaden: 9000 };
      let st;
      const reset = () => st = { y: 0, z: 100, soll: 100, wart: 0, verb: false, cost: 0, known: [[0,100]], truth: [[0,100]], log: [], over: false, sch: 0, seen: false };
      reset();
      const svg = el.querySelector('#zk');
      const X = y => 50 + y * 19, Y = z => 270 - z * 2.1;
      function draw(){
        let g = '';
        for (let z = 0; z <= 120; z += 20) g += `<line x1="50" x2="620" y1="${Y(z)}" y2="${Y(z)}" stroke="rgba(17,50,119,.07)"/><text x="42" y="${Y(z)+4}" text-anchor="end" font-size="11" fill="#8497B0">${z}</text>`;
        for (let y = 0; y <= 30; y += 5) g += `<text x="${X(y)}" y="290" text-anchor="middle" font-size="11" fill="#8497B0">${y}</text>`;
        g += `<rect x="50" y="${Y(25)}" width="570" height="${Y(0)-Y(25)}" fill="rgba(163,35,58,.08)"/><text x="56" y="${Y(4)}" font-size="11" fill="#A3233A">Schadensgrenze: Wasser dringt ein</text>`;
        g += `<line x1="50" x2="620" y1="${Y(st.soll)}" y2="${Y(st.soll)}" stroke="#2F8A78" stroke-dasharray="6 5" stroke-width="2"/><text x="616" y="${Y(st.soll)-6}" text-anchor="end" font-size="11" fill="#2F8A78">Soll-Zustand</text>`;
        if (st.over) g += `<polyline fill="none" stroke="rgba(132,151,176,.7)" stroke-width="2" stroke-dasharray="3 4" points="${st.truth.map(p => X(p[0])+','+Y(p[1])).join(' ')}"/>`;
        g += `<polyline fill="none" stroke="#2E75B6" stroke-width="3" points="${st.known.map(p => X(p[0])+','+Y(p[1])).join(' ')}"/>`;
        g += st.known.map(p => `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="4.5" fill="#2E75B6"/>`).join('');
        const last = st.known[st.known.length - 1];
        if (!st.over && st.y > last[0]) g += `<rect x="${X(last[0])}" y="20" width="${X(st.y)-X(last[0])}" height="250" fill="rgba(132,151,176,.12)"/><text x="${(X(last[0])+X(st.y))/2}" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="#8497B0">?</text>`;
        g += `<line x1="${X(st.y)}" x2="${X(st.y)}" y1="20" y2="270" stroke="#113277" stroke-width="1.5"/>`;
        svg.innerHTML = g;
        el.querySelector('#zj').textContent = 'Jahr ' + st.y;
        el.querySelector('#zc').textContent = 'Kosten ' + st.cost.toLocaleString('de-DE') + ' €';
        el.querySelector('#zz').textContent = 'Zustand ' + (st.seen || st.over ? Math.round(st.z) + ' %' : '?');
        const bt = el.querySelector('#zb');
        bt.innerHTML = st.over ? `<button class="btn" data-a="neu">${A.ICON('reset',16)} Neue Runde</button>` :
          `<button class="btn" data-a="jahr">+1 Jahr ${A.ICON('pfeilR',16)}</button>
           <button class="btn ghost" data-a="insp" style="color:#2E75B6">${A.ICON('lupe',16)} Inspektion ${P.insp} €</button>
           <button class="btn ghost" data-a="wart" style="color:#2F8A78">${A.ICON('zyklus',16)} Wartung ${P.wart} €</button>
           <button class="btn ghost" data-a="inst" style="color:#A3233A">${A.ICON('hammer',16)} Instandsetzen</button>
           <button class="btn ghost" data-a="verb" style="color:#C9851B" ${st.verb?'disabled':''}>${A.ICON('pfeil',16)} Verbessern ${P.verb.toLocaleString('de-DE')} €</button>`;
        bt.querySelectorAll('button').forEach(b => b.onclick = () => act(b.dataset.a));
      }
      const log = t => { el.querySelector('#zl').innerHTML = t; };
      function act(a){
        if (a === 'neu') { reset(); log('Neue Runde. Tipp: Erst inspizieren, dann entscheiden.'); return draw(); }
        if (a === 'insp') { st.cost += P.insp; st.seen = true; st.known.push([st.y, st.z]); log(`Inspektion im Jahr ${st.y}: Zustand ${Math.round(st.z)} %. ${st.z < 50 ? 'Deutliche Mängel, jetzt instand setzen!' : st.z < 75 ? 'Erste Mängel sichtbar. Wartung lohnt sich.' : 'Alles im grünen Bereich.'}`); }
        if (a === 'wart') { st.cost += P.wart; st.wart = 2; log('Wartung: Kleine Mängel beseitigt. Die Abnutzung läuft die nächsten 2 Jahre deutlich langsamer.'); }
        if (a === 'inst') { const k = P.inst + Math.round((st.soll - st.z) * P.instK); st.cost += k; st.z = st.soll; st.known.push([st.y, st.z]); st.truth.push([st.y, st.z]); st.seen = true; log(`Instandsetzung für ${k.toLocaleString('de-DE')} €: Soll-Zustand wiederhergestellt. Je schlechter der Zustand, desto teurer.`); }
        if (a === 'verb') { st.cost += P.verb; st.verb = true; st.soll = 115; st.z = 115; st.known.push([st.y, st.z]); st.truth.push([st.y, st.z]); st.seen = true; log('Verbesserung: Dach energetisch optimiert. Der neue Soll-Zustand liegt über dem alten, die Abnutzung ist etwas langsamer.'); }
        if (a === 'jahr') {
          let r = st.wart > 0 ? 0.8 : 2.6; if (st.z < 60) r *= 1 + (60 - st.z) / 30; if (st.verb) r *= 0.8;
          st.z = Math.max(0, st.z - r); st.y++; st.wart = Math.max(0, st.wart - 1); st.seen = false; st.truth.push([st.y, st.z]);
          if (st.z < 25) { st.sch++; st.cost += P.schaden; const k = P.inst + Math.round((st.soll - st.z) * P.instK); st.cost += k; st.known.push([st.y, st.z]); st.z = st.soll; st.known.push([st.y, st.z]); st.truth.push([st.y, st.z]);
            log(`<b>Wasserschaden im Jahr ${st.y}!</b> Feuchte Dämmung, Flecken an der Decke: ${P.schaden.toLocaleString('de-DE')} € Folgeschaden plus Notreparatur.`); }
          else log(`Jahr ${st.y}. ${st.wart > 0 ? 'Die Wartung wirkt noch.' : 'Das Dach altert weiter. Wie es aussieht, weißt du erst nach einer Inspektion.'}`);
          if (st.y >= 30) { st.over = true; st.known.push([st.y, st.z]);
            log(`<b>Geschafft! 30 Jahre, Kosten ${st.cost.toLocaleString('de-DE')} €, ${st.sch} Wasserschaden${st.sch===1?'':'e'}.</b> Die graue Linie zeigt den echten Verlauf. Zum Vergleich: Wer 30 Jahre lang nichts tut, landet bei rund 15.000 € und einem Wasserschaden. Mit regelmäßiger Inspektion und Wartung geht es für etwa 5.000 €.`);
            A.set('zk-best', Math.min(A.get('zk-best', 1e9), st.cost)); }
        }
        draw();
      }
      draw();
    }},

    { name: 'Unser Verständnis', render(el, A){
      el.innerHTML = `<div class="card glass"><div class="eyebrow">Sichern</div><h2>Instandhaltung in eigenen Worten</h2>
        <div class="task"><div class="ti">${A.ICON('stift',18)}</div><p>Beschreibe mit den Begriffen <b>Ist-Zustand, Soll-Zustand, Inspektion, Instandsetzen, Wartung, Verbessern</b>, was Instandhaltung für uns Spengler bedeutet.</p></div>
        ${A.note('verstaendnis', 'Instandhaltung bedeutet für uns …', 5)}
        <div style="margin-top:12px"><button class="btn ghost" id="sh">${A.ICON('auge',16)} Musterlösung zeigen</button></div>
        <div class="merke" id="ml" style="display:none"><b>Musterlösung</b>Instandhaltung umfasst alle Maßnahmen, mit denen wir Dach und Wand dauerhaft funktionsfähig und werthaltig halten. Bei der <b>Inspektion</b> ermitteln wir den Ist-Zustand und vergleichen ihn mit dem Soll-Zustand. Weicht er ab, <b>setzen wir instand</b> und stellen den Soll-Zustand wieder her. Durch <b>Wartung</b> bewahren wir den Soll-Zustand, damit gar nicht erst große Schäden entstehen. Beim <b>Verbessern</b> heben wir den Soll-Zustand an, zum Beispiel durch eine energetische Optimierung.</div>
      </div>
      <div class="card glass"><div class="eyebrow">Ausblick</div><h3>Wie geht es weiter?</h3>
        <p>Bevor wir irgendetwas reparieren, müssen wir wissen, wie es um das Dach steht. Deshalb geht es als Nächstes um die <b>Inspektion</b>.</p></div>`;
      el.querySelector('#sh').onclick = () => { el.querySelector('#ml').style.display = 'block'; };
    }}
  ]
});
