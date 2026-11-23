/* ==========================================================
   Instandhaltung an Dach und Wand · Konfiguration
   Diese Datei steuert Lernlandkarte (index.html) UND App (app.html).

   So erweiterst du die Lernumgebung:
   1. Station unten eintragen oder bei einer bestehenden
      status von "bald" auf "offen" setzen.
   2. Für eine neue App-Station eine Datei in /modules anlegen
      (Vorlage: modules/einordnung.js) und bei "modul" eintragen.
   status:  "offen"  = freigeschaltet, in App und Karte anklickbar
            "bald"   = auf der Karte sichtbar, aber gesperrt
            "aus"    = komplett ausgeblendet
   teil:    [1] = Teil I (11. Jgst.), [2] = Teil II (12. Jgst.), [1,2] = beide
   ========================================================== */
window.LF_CONFIG = {
  titel: "Instandhaltung an Dach und Wand",
  kurz: "Instandhaltung",
  lernfeld: "LF 12 · Teil I und II",

  leitfrage: "Wie halten wir Dach und Wand dauerhaft dicht, sicher und werthaltig?",

  /* Allgemeiner Überblick (Lernlandkarte und Startseite der App) */
  ueberblick: "Dächer und Fassaden sind dauernd Wind, Wetter und Temperaturwechseln ausgesetzt. Als Spengler sorgen wir dafür, dass sie über Jahrzehnte dicht, sicher und werthaltig bleiben: Wir prüfen, warten, setzen instand und verbessern.",

  /* Einstiegssituation, nur in Station 1 */

  situation:
    "Familie Sperber hat ein 10 Jahre altes Einfamilienhaus gekauft und will es lange und nachhaltig erhalten. " +
    "Herr Sperber möchte, dass Schäden am Dach frühzeitig erkannt und behoben werden. " +
    "Langfristig denkt er auch über eine energetische Optimierung nach. Er beauftragt euren Betrieb mit der Instandhaltung.",

  /* Die vier Säulen der Instandhaltung (DIN 31051), spenglerbezogen */
  saeulen: [
    { id: "inspektion",     name: "Inspektion",    kern: "Ist-Zustand ermitteln",        farbe: "#2E75B6", icon: "lupe" },
    { id: "instandsetzung", name: "Instandsetzen", kern: "Soll-Zustand wiederherstellen", farbe: "#A3233A", icon: "hammer" },
    { id: "wartung",        name: "Wartung",       kern: "Soll-Zustand bewahren",         farbe: "#2F8A78", icon: "zyklus" },
    { id: "verbesserung",   name: "Verbessern",    kern: "Soll-Zustand optimieren",       farbe: "#C9851B", icon: "pfeil" }
  ],

  /* Stationen: saeule = unter welcher Säule die Station auf der Karte steht
     ("start" = Einstieg links, "ziel" = Abschluss, "fundament" = Grundlage unten) */
  stationen: [
    { id: "einordnung", saeule: "start", titel: "Was ist Instandhaltung?", sub: "Die vier Säulen · Zustandskurve",
      status: "offen", teil: [1, 2], modul: "modules/einordnung.js", dauer: "ca. 1 Std." },

    { id: "inspektion", saeule: "inspektion", titel: "Inspektion & Dokumentation", sub: "Intervalle · Fotos · Rundgang",
      status: "offen", teil: [1, 2], modul: "modules/inspektion.js", dauer: "ca. 2 Std." },
    { id: "korrosion", saeule: "inspektion", titel: "Korrosionsarten", sub: "KorrosionsLabor",
      status: "bald", teil: [1, 2] },
    { id: "verfaerbung", saeule: "inspektion", titel: "Verfärbung oder Korrosion?", sub: "Schaden richtig erkennen",
      status: "bald", teil: [1, 2] },

    { id: "instandsetzen", saeule: "instandsetzung", titel: "Instandsetzung planen", sub: "Demontage und Montage",
      status: "bald", teil: [1, 2] },
    { id: "zugang", saeule: "instandsetzung", titel: "Zugang & Sicherheit", sub: "Gerüst, Hubsteiger, UVV",
      status: "bald", teil: [1, 2] },

    { id: "wartung", saeule: "wartung", titel: "Wartungsplan", sub: "Wiederkehrende Maßnahmen",
      status: "bald", teil: [1, 2] },

    { id: "verbessern", saeule: "verbesserung", titel: "Energetisch optimieren", sub: "Besser als vorher",
      status: "bald", teil: [1, 2] },

    { id: "fachregeln", saeule: "fundament", titel: "Fachregeln", sub: "Anerkannte Regeln der Technik",
      status: "bald", teil: [1, 2] },

    { id: "beratung", saeule: "ziel", titel: "Kundenberatung & Präsentation", sub: "Den Kunden überzeugen",
      status: "bald", teil: [1, 2] }
  ]
};

/* ==========================================================
   Lernlandkarte (index.html): Mitte = Titel, vier Richtungen
   folien: Bausteine aus karte.js (Reihenfolge = Weg im Bereich)
   status "bald" = Bereich sichtbar, aber noch nicht ausgearbeitet
   ========================================================== */
window.LF_KARTE = {
  lernfeld: "Lernfeld 12 · Teil I und II",
  titel: "Instandhaltungsmaßnahmen an Dach und Wand durchführen",
  kompetenz: [
    "Die Schülerinnen und Schüler verfügen über die Kompetenz, Instandhaltungsmaßnahmen nach Kundenauftrag an Dach und Wand durchzuführen.",
    "Sie verschaffen sich einen Überblick über den Zustand des Objektes und analysieren den Kundenauftrag hinsichtlich der durchzuführenden Instandhaltungsarbeiten an den verschiedenen Bereichen des Daches und der Wand. Mit Hilfe der Sichtkontrolle und weiterer Prüfverfahren erfassen und dokumentieren die Schülerinnen und Schüler den Ist-Zustand von Dach und Wand. Durch Abgleich mit den vorhandenen Bestands- und Wartungsplänen erfassen die Schülerinnen und Schüler die notwendigen Instandhaltungsmaßnahmen.",
    "Sie informieren sich über die baulichen Gegebenheiten (Auflagen des Denkmalschutzes, Objektzustand und Verkehrssituation). Sie beachten die Regelwerke und die aktuellen Entwicklungen in der Spenglertechnik.",
    "Im Gespräch mit dem Kunden vereinbaren sie den Umfang der auszuführenden Instandhaltungsmaßnahmen.",
    "Sie planen die auszuführenden Instandhaltungsmaßnahmen für die Entwässerungssysteme, Dachdeckungen, Wandbekleidungen, Verwahrungen, An- und Abschlüsse, Dachdurchdringungen und Fugenabdichtungen, indem sie Demontagepläne und Montagepläne erstellen. Die Schülerinnen und Schüler berücksichtigen dabei insbesondere die Deckungsart, die Bekleidungsart und die jeweilige Nutzungsart. Sie untersuchen die möglichen Zugänge zu den instand zu haltenden Elementen, ermitteln deren Verfügbarkeit und wählen unter Berücksichtigung der Unfallverhütungsvorschriften die Zugangsmöglichkeiten aus.",
    "Die Schülerinnen und Schüler führen die notwendigen Instandhaltungsmaßnahmen an Entwässerungssystemen, Dachdeckungen, Wandbekleidungen, Verwahrungen, An- und Abschlüssen, Dachdurchdringungen und Fugenabdichtungen aus. Dabei beachten sie den Gesundheitsschutz und entsorgen die Abfälle umweltgerecht.",
    "Durch Prüfen der Verbindungsarten und Anschlüsse stellen die Schülerinnen und Schüler die Qualität der Arbeiten sicher. Im Rahmen des vorbeugenden Bestandsschutzes beraten sie den Kunden und weisen diesen auf notwendige sowie wiederkehrende Instandhaltungsmaßnahmen hin. Die Schülerinnen und Schüler dokumentieren die Ergebnisse der Kundenberatung, beraten im Team über die Effizienz der vorgeschlagenen Maßnahmen und begründen im Rahmen einer Präsentation ihre getroffenen Entscheidungen."
  ],
  bereiche: {
    oben:   { titel: "Die 4 Säulen & Inspektion", sub: "Was ist Instandhaltung? Ist-Zustand ermitteln", farbe: "#2E75B6", icon: "saeulen", status: "offen",
              folien: ["warum", "perspektiven", "pinnwand", "saeulen", "sortieren", "kurve", "intervalle", "werkzeug", "fotos", "rundgang"] },
    links:  { titel: "Korrosion oder Verfärbung?", sub: "Schäden richtig erkennen und einordnen", farbe: "#A3233A", icon: "lupe", status: "offen",
              folien: ["ko_was", "ko_bitumen", "ko_spannung", "ko_fliess", "ko_befestigung"] },
    rechts: { titel: "Optische Bewertung von Metalldächern und -fassaden", sub: "Was ist hinzunehmen, was ist ein Mangel?", farbe: "#C9851B", icon: "auge", status: "offen",
              folien: ["ob_leitfragen", "ob_abstand", "ob_erkennbar", "ob_licht", "ob_hinnehmbar", "ob_minderwert", "ob_entscheiden"] },
    unten:  { titel: "Weiterer Themenbereich", sub: "folgt", farbe: "#2F8A78", icon: "zyklus", status: "bald", folien: [] }
  }
};

/* Titelfolie: Kompetenzerwartung kompakt. [[Wort|id]] = anklickbarer Begriff */
window.LF_KARTE.phasen = [
  { name: "Analysieren",  icon: "lupe",   text: "Per [[Sichtkontrolle|sicht]] den [[Ist-Zustand|ist]] erfassen und Schäden wie [[Korrosion|korrosion]] erkennen" },
  { name: "Informieren",  icon: "info",   text: "[[Regelwerke|regel]] und Gegebenheiten wie [[Denkmalschutz|denkmal]] beachten" },
  { name: "Beraten",      icon: "sprech", text: "Umfang der Maßnahmen im [[Kundengespräch|kunde]] vereinbaren" },
  { name: "Planen",       icon: "plan",   text: "Demontage und Montage planen, sichere [[Zugänge|zugang]] wählen" },
  { name: "Durchführen",  icon: "hammer", text: "Entwässerung, Deckung und Anschlüsse instand halten, [[Gesundheitsschutz|gesund]] beachten" },
  { name: "Prüfen & Abschließen", icon: "check", text: "[[Qualität|qualitaet]] prüfen, auf [[wiederkehrende Maßnahmen|wieder]] hinweisen, [[dokumentieren|doku]]" }
];
window.LF_KARTE.begriffe = {
  sicht:     { t: "Sichtkontrolle", warum: "Ohne genauen Blick weißt du nicht, was zu tun ist.", spengler: "Rinne, Anschlüsse, Einfassungen und Deckung auf Schäden und Funktion prüfen.", ziel: ["oben", 9] },
  ist:       { t: "Ist-Zustand", warum: "Der Vergleich mit dem Soll zeigt, welche Maßnahme nötig ist.", spengler: "Feststellen, beurteilen und in der Checkliste dokumentieren.", ziel: ["oben", 3] },
  korrosion: { t: "Korrosion", warum: "Unerkannte Korrosion zerstört Bauteile und führt zu Wasserschäden.", spengler: "Korrosion von harmlosen Verfärbungen unterscheiden.", ziel: ["links", 0] },
  regel:     { t: "Regelwerke", warum: "Die Fachregeln legen den Soll-Zustand fest. Sie gelten als anerkannte Regeln der Technik.", spengler: "Wer prüft oder repariert, muss den aktuellen Stand kennen." },
  denkmal:   { t: "Denkmalschutz", warum: "Bei Denkmälern gelten Auflagen zu Material und Ausführung.", spengler: "Vor der Arbeit klären, was erlaubt ist, z. B. Material, Falzart oder Farbe." },
  kunde:     { t: "Kundengespräch", warum: "Der Kunde entscheidet, was gemacht wird, und will verstehen, warum.", spengler: "Ist-Zustand, Reparaturen, künftige Maßnahmen und Kosten verständlich erklären." },
  zugang:    { t: "Zugänge", warum: "Absturz ist eine der häufigsten Unfallursachen am Bau.", spengler: "Gerüst, Hubsteiger oder Leiter nach Unfallverhütungsvorschriften auswählen." },
  gesund:    { t: "Gesundheitsschutz", warum: "Lärm, Staub und alte Beschichtungen belasten die Gesundheit.", spengler: "Schutzausrüstung tragen, Abfälle umweltgerecht entsorgen." },
  qualitaet: { t: "Qualität", warum: "Saubere Arbeit überzeugt Kunden und vermeidet Reklamationen.", spengler: "Verbindungen und Anschlüsse prüfen, Optik von Metalldächern bewerten.", ziel: ["rechts", 0] },
  wieder:    { t: "Wiederkehrende Maßnahmen", warum: "Regelmäßige Wartung ist viel günstiger als ein Wasserschaden.", spengler: "Den Kunden auf Inspektions- und Wartungsintervalle hinweisen.", ziel: ["oben", 5] },
  doku:      { t: "Dokumentieren", warum: "Im Streitfall zählt, was belegt ist.", spengler: "Gerichtsverwertbare Fotos und eine archivierte Checkliste.", ziel: ["oben", 8] }
};

/* ==========================================================
   Digitale Pinnwand (Lernlandkarte, Folie „Pinnwand“ + senden.html)
   Supabase: Projekt-URL und „anon public“-Key eintragen
   (Supabase > Project Settings > API). Leer = Demo-Modus.
   ========================================================== */
window.LF_PINNWAND = {
  supabaseUrl: "https://nkytpsvpohwslcrvzjwm.supabase.co",
  supabaseKey: "sb_publishable_ZczyfAlv-DUGMzr5gWt9ug_OYocfb0X",
  tabelle: "begriffe",
  app: "ih",                /* Kennung dieser Lernlandkarte in der gemeinsamen Tabelle */
  maxProSchueler: 3
};
