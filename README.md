# Instandhaltung an Dach und Wand

Lernlandkarte und Lern-App für die Spengler (LF 12, Teil I und II), BS1 Bayreuth.

- `index.html` Lernlandkarte: Mitte = Titel und Kompetenzerwartung, vier Themenbereiche (oben, links, rechts, unten), Pfeiltasten oder Klick zum Navigieren, Esc = zurück zur Mitte
- `karte.js` interaktive Folien der Lernlandkarte (Bereiche und Reihenfolge in `config.js` unter `LF_KARTE`)
- `app.html` Lern-App für die Schülerinnen und Schüler
- `config.js` steuert beides: Stationen freischalten (`status: "offen"`), neue Stationen eintragen
- `modules/` je Station eine Datei, Vorlage: `modules/einordnung.js`
- `assets/` Schriften, Logos, Bilder

Hosting: Ordnerinhalt in das GitHub-Repo `ih` laden und GitHub Pages aktivieren.
Der QR-Code im Skript zeigt auf https://hackij.github.io/ih/app.html
