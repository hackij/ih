/* Einfache Linien-Icons (24er Raster) */
window.ICON = (function(){
  const p = {
    lupe:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/><path d="M8 10.5h5M10.5 8v5" opacity=".0"/>',
    hammer:'<path d="M14 4.5 19.5 10"/><path d="M11.5 7 17 12.5"/><path d="M12.8 5.7 9 2.5 6.5 5l3.2 3.8"/><path d="M14.2 9.8 4 20a1.4 1.4 0 0 1-2-2L12.2 7.8"/>',
    zyklus:'<path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12A8 8 0 0 1 17.7 6.4"/><path d="M18 2.5v4h-4"/><path d="M6 21.5v-4h4"/>',
    pfeil:'<path d="M4 18 10 12l4 4 6-8"/><path d="M15 8h5v5"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x:'<path d="M6 6l12 12M18 6 6 18"/>',
    home:'<path d="M3.5 11 12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/>',
    saeulen:'<path d="M3 9 12 4l9 5"/><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8"/><path d="M3 20h18"/>',
    kamera:'<path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    karte:'<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
    auge:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    flagge:'<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    pfeilR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    voll:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6"/><circle cx="12" cy="17" r=".6"/>',
    stift:'<path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z"/>',
    reset:'<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
    sprech:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    plan:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6"/>'
  };
  return (name, size=22, sw=2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p[name]||''}</svg>`;
})();
