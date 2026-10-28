// Diagrams drawn as inline SVG. Colours come from the page's CSS tokens (so they follow light/dark mode);
// every label comes from T[lang].fig, so each diagram reads in the chosen language.
// FIGS[id](labels) returns the SVG markup; MEDIA says which diagrams and photos each section shows.

// The first diagram of each section is its "hero": shown on the card itself, before the section is opened.
const MEDIA = {
  s1: ['fig:f1', 'fig:f1b'],
  s2: ['fig:f2'],
  s3: ['fig:f3', 'fig:f3b', 'photo:pintoi'],
  s4: ['fig:f4', 'photo:lalang'],
  s5: ['fig:f5', 'fig:f5b'],
  s6: ['fig:f6'],
  s7: ['fig:f7', 'photo:cowgrassLawn', 'photo:cowgrassClose'],
  s8: ['fig:f8', 'fig:f8b'],
  s9: ['fig:f9']
};
// Diagrams that show an idea rather than measured numbers get a caption saying so.
const ILLUSTRATIVE = ['f6', 'f7'];

const PHOTOS = {
  cowgrassLawn: { file: 'photos/cowgrass-lawn.jpg', author: 'Forest and Kim Starr', license: 'CC BY 3.0 US', page: 'https://commons.wikimedia.org/wiki/File:Starr-091104-0663-Axonopus_compressus-lawn-Kahanu_Gardens_NTBG_Kaeleku_Hana-Maui_(24914734446).jpg' },
  cowgrassClose: { file: 'photos/cowgrass-close.jpg', author: 'Forest and Kim Starr', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Starr_040812-0041_Axonopus_compressus.jpg' },
  lalang: { file: 'photos/lalang.jpg', author: 'Apurv013', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Imperata_cylindrica_-_Cogon_grass.jpg' },
  pintoi: { file: 'photos/pintoi.jpg', author: 'Ethel Aardvark', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Arachis_pintoi_foliage_and_flower.jpg' },
  durianBuds: { file: 'photos/durian-buds.jpg', author: 'Azreey', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Durian_flower_buds.jpg' },
  durianFlowers: { file: 'photos/durian-flowers.jpg', author: 'DXLINH (Vietnamese Wikipedia)', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Durian_flowers.jpg' }
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const svg = (h, body, label) =>
  `<svg viewBox="0 0 340 ${h}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const txt = (x, y, s, cls = 'lb', anchor = 'start') => {
  const lines = String(s).split('\n');
  return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${lines.map((l, i) => `<tspan x="${x}" dy="${i ? 13 : 0}">${esc(l)}</tspan>`).join('')}</text>`;
};
const blades = (pts, cls = 'leaf', w = 4) => pts.map(d => `<path d="${d}" class="${cls}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`).join('');

const FIGS = {
  // 1 · monocot vs dicot: fibrous mat vs taproot, growing point low vs high
  f1: L => svg(214, `
    <rect x="0" y="112" width="340" height="88" class="soil"/>
    <line x1="170" y1="8" x2="170" y2="200" class="rule"/>
    ${txt(12, 22, L.mono, 'lb title mono')}${txt(182, 22, L.di, 'lb title di')}
    ${blades(['M85 112 Q78 72 60 42', 'M85 112 Q85 62 88 32', 'M85 112 Q92 72 110 46', 'M85 112 Q100 88 122 74', 'M85 112 Q70 88 50 78'])}
    <g class="root" fill="none" stroke-width="1.4" stroke-linecap="round">
      ${[[58, 162], [70, 176], [85, 182], [100, 176], [112, 162], [46, 142], [124, 142], [40, 124], [130, 124]].map(([x, y]) => `<path d="M85 114 Q${(85 + x) / 2} ${(114 + y) / 2 + 6} ${x} ${y}"/>`).join('')}
    </g>
    <circle cx="85" cy="110" r="5" class="gp"/>
    ${txt(14, 194, L.fibrous, 'lb on-soil')}
    <path d="M255 112 Q257 80 255 40" class="stem" stroke-width="3" fill="none"/>
    <g class="dileaf">
      <ellipse cx="234" cy="84" rx="20" ry="9" transform="rotate(-25 234 84)"/>
      <ellipse cx="277" cy="70" rx="20" ry="9" transform="rotate(25 277 70)"/>
      <ellipse cx="238" cy="56" rx="14" ry="7" transform="rotate(-30 238 56)"/>
    </g>
    <circle cx="255" cy="38" r="5" class="gp"/>
    <path d="M251 114 Q255 150 255 186 Q258 150 260 114 Z" class="taproot"/>
    <g class="root" fill="none" stroke-width="1.4" stroke-linecap="round">
      <path d="M254 136 Q240 142 228 152"/><path d="M256 142 Q270 148 284 154"/><path d="M255 166 Q244 172 238 182"/>
    </g>
    ${txt(290, 194, L.taproot, 'lb on-soil', 'middle')}
    <rect x="0" y="200" width="340" height="14" class="legend-bg"/><circle cx="18" cy="207" r="4.5" class="gp"/>${txt(28, 211, L.gp, 'lb small')}
  `, `${L.mono} / ${L.di}`),

  // 2 · succession under regular cutting: pioneers → mixed → cow grass mat, soil darkening
  f2: L => svg(204, `
    ${txt(170, 16, L.years, 'lb strong', 'middle')}
    <rect x="0" y="118" width="113" height="44" class="soil"/>
    <rect x="113" y="118" width="114" height="44" class="soil mid"/>
    <rect x="227" y="118" width="113" height="44" class="soil dark"/>
    ${blades(['M30 118 Q28 80 20 46', 'M44 118 Q46 74 52 40', 'M62 118 Q60 84 70 56', 'M80 118 Q82 90 92 62'], 'pale', 2.5)}
    ${blades(['M132 118 Q130 96 124 78', 'M146 118 Q148 92 156 72', 'M196 118 Q194 98 188 84', 'M208 118 Q212 100 216 90'], 'leaf', 3)}
    <g class="dileaf"><ellipse cx="170" cy="106" rx="12" ry="6"/><ellipse cx="182" cy="100" rx="10" ry="5" transform="rotate(20 182 100)"/></g>
    ${blades(Array.from({ length: 16 }, (_, i) => { const x = 236 + i * 6.3; return `M${x} 118 Q${x + 2} 108 ${x + 5} ${100 + (i % 3) * 3}`; }), 'leaf', 3)}
    <path d="M104 86 h16 m-6 -5 l6 5 -6 5" class="arrow" fill="none"/>
    <path d="M218 86 h16 m-6 -5 l6 5 -6 5" class="arrow" fill="none"/>
    ${txt(283, 138, L.som, 'lb small on-dark', 'middle')}
    ${txt(56, 178, L.st1, 'lb', 'middle')}${txt(170, 178, L.st2, 'lb', 'middle')}${txt(283, 178, L.st3, 'lb', 'middle')}
  `, `${L.st1} → ${L.st2} → ${L.st3}`),

  // 3 · nitrogen: legume spreads on poor soil, grass shades it on rich soil
  f3: L => {
    const peanut = (cx, cy, n, r) => Array.from({ length: n }, (_, i) => {
      const x = cx + (i % 5) * 14 - 28, y = cy - Math.floor(i / 5) * 9;
      return `<circle cx="${x}" cy="${y}" r="${r}" class="dicot"/>${i % 4 === 1 ? `<circle cx="${x + 4}" cy="${y - 6}" r="2.6" class="flower"/>` : ''}`;
    }).join('');
    return svg(190, `
      <rect x="0" y="122" width="340" height="40" class="soil"/>
      <line x1="170" y1="8" x2="170" y2="162" class="rule"/>
      ${txt(85, 22, L.lowN, 'lb title', 'middle')}${txt(255, 22, L.richN, 'lb title', 'middle')}
      ${blades(['M40 122 Q38 108 34 98', 'M130 122 Q132 110 136 102'], 'pale', 2.5)}
      ${peanut(85, 118, 15, 6)}
      ${peanut(255, 118, 5, 4)}
      ${blades(Array.from({ length: 12 }, (_, i) => { const x = 196 + i * 10; return `M${x} 122 Q${x - 4} 80 ${x - 10 + (i % 3) * 4} ${38 + (i % 4) * 6}`; }), 'leaf', 3.5)}
      <g class="sunray"><path d="M318 30 l-14 14 M326 44 l-18 8"/></g>
      ${txt(85, 180, L.peanutWins, 'lb', 'middle')}${txt(255, 180, L.grassWins, 'lb', 'middle')}
    `, `${L.lowN}: ${L.peanutWins}. ${L.richN}: ${L.grassWins}.`);
  },

  // 4 · cogongrass: thrives in open sun on rhizomes, fades under canopy shade
  f4: L => svg(196, `
    <rect x="0" y="126" width="340" height="44" class="soil sand"/>
    <line x1="170" y1="8" x2="170" y2="170" class="rule"/>
    <circle cx="34" cy="34" r="12" class="sun"/>
    <g class="sunray">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a * Math.PI / 180; return `<path d="M${34 + Math.cos(r) * 16} ${34 + Math.sin(r) * 16} L${34 + Math.cos(r) * 22} ${34 + Math.sin(r) * 22}"/>`; }).join('')}</g>
    ${blades(Array.from({ length: 11 }, (_, i) => { const x = 62 + i * 9; return `M${x} 126 Q${x - 2} 86 ${x - 6 + (i % 3) * 5} ${46 + (i % 4) * 7}`; }), 'pale', 2.6)}
    <g class="root" fill="none" stroke-width="2.4" stroke-linecap="round"><path d="M40 144 C80 138 120 150 160 142"/><path d="M60 158 C90 152 120 160 150 156"/></g>
    <g class="node">${[70, 100, 130].map(x => `<circle cx="${x}" cy="${143 + (x % 20) / 10}" r="3"/>`).join('')}</g>
    ${txt(14, 166, L.rhizomes, 'lb on-soil')}
    <ellipse cx="262" cy="46" rx="70" ry="34" class="canopy"/>
    <rect x="258" y="70" width="9" height="56" class="trunk"/>
    <path d="M200 126 L322 126 L310 64 L212 64 Z" class="shade"/>
    ${blades(['M214 126 Q212 112 208 104', 'M306 126 Q308 114 312 108'], 'pale', 2)}
    ${txt(85, 188, L.open, 'lb', 'middle')}${txt(255, 188, L.shade, 'lb', 'middle')}
  `, `${L.open}. ${L.shade}.`),

  // 5 · four ways roots build soil, as a soil cross-section
  f5: L => svg(210, `
    <rect x="0" y="34" width="340" height="146" class="soil"/>
    ${blades(Array.from({ length: 28 }, (_, i) => { const x = 6 + i * 12; return `M${x} 34 Q${x + 2} 26 ${x + 4} ${18 + (i % 3) * 3}`; }), 'leaf', 2.6)}
    <path d="M52 34 Q56 90 50 160" class="deadroot" fill="none" stroke-width="3" stroke-dasharray="6 4"/>
    <g class="om">${[[40, 70], [62, 82], [46, 104], [64, 118], [40, 132], [58, 146], [70, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`).join('')}</g>
    <path d="M136 34 Q140 100 134 168" class="pore" fill="none" stroke-width="9" stroke-linecap="round"/>
    <path d="M131 118 q4 -6 8 0 t8 0" class="worm" fill="none" stroke-width="3" stroke-linecap="round"/>
    <g class="crumb">${[[204, 74], [222, 80], [212, 96], [232, 100], [198, 104], [220, 118], [240, 84]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${8 + (i % 3)}" ry="${6 + (i % 2)}"/>`).join('')}</g>
    <g class="hypha" fill="none" stroke-width="1"><path d="M190 70 Q214 88 246 76"/><path d="M196 112 Q222 96 248 110"/><path d="M206 64 Q216 100 226 126"/></g>
    <path d="M300 34 Q304 110 298 176" class="root" fill="none" stroke-width="2.6"/>
    <g class="root" fill="none" stroke-width="1.2"><path d="M301 70 l-12 8"/><path d="M302 104 l12 8"/><path d="M300 140 l-12 8"/></g>
    <g class="uparrow" fill="none" stroke-width="1.6"><path d="M318 160 V108 m-5 6 l5 -6 5 6"/></g>
    ${[[55, L.om], [136, L.pores], [220, L.glue], [300, L.life]].map(([x, s], i) => `<circle cx="${x}" cy="${i === 1 ? 52 : 52}" r="9" class="badge"/><text x="${x}" y="56" class="badge-t" text-anchor="middle">${i + 1}</text>${txt(i === 3 ? 336 : x, 198, s, 'lb', i === 3 ? 'end' : 'middle')}`).join('')}
  `, [L.om, L.pores, L.glue, L.life].map((s, i) => `${i + 1} ${s}`).join(', ')),

  // 6 · living roots over time: cutting keeps them, spraying kills them once (illustrative)
  f6: L => svg(176, `
    <line x1="40" y1="20" x2="40" y2="134" class="axis"/><line x1="40" y1="134" x2="326" y2="134" class="axis"/>
    ${txt(44, 16, L.roots, 'lb strong')}${txt(326, 152, L.time, 'lb', 'end')}
    <polyline points="40,40 80,40 84,54 112,42 148,42 152,56 180,44 216,44 220,58 248,46 284,46 288,60 316,48 326,48" class="line-a" fill="none" stroke-width="3" stroke-linejoin="round"/>
    <polyline points="40,40 92,40 104,128 210,128 250,112 290,96 326,88" class="line-b" fill="none" stroke-width="3" stroke-linejoin="round" stroke-dasharray="7 5"/>
    ${[84, 152, 220, 288].map(x => `<path d="M${x} 136 v6" class="axis"/>${txt(x, 166, L.cut, 'lb small', 'middle')}`).join('')}
    <path d="M98 30 v8" class="axis"/>${txt(98, 28, L.spray, 'lb small', 'middle')}
    <g transform="translate(168 70)"><rect width="14" height="4" y="-4" class="sw-a"/>${txt(20, 0, L.cutting, 'lb small')}<rect width="14" height="4" y="12" class="sw-b"/>${txt(20, 16, L.herbicide, 'lb small')}</g>
  `, `${L.cutting} / ${L.herbicide}`),

  // 7 · plant variety vs how often you cut: a hump (illustrative)
  f7: L => svg(192, `
    <line x1="40" y1="20" x2="40" y2="140" class="axis"/><line x1="40" y1="140" x2="326" y2="140" class="axis"/>
    ${txt(44, 16, L.y, 'lb strong')}${txt(326, 184, L.x, 'lb', 'end')}
    <path d="M46 126 C110 30, 220 30, 316 122" class="line-a" fill="none" stroke-width="3"/>
    <circle cx="181" cy="52" r="5" class="gp"/>${txt(181, 40, L.mid, 'lb strong', 'middle')}
    ${txt(42, 156, L.left, 'lb small')}${txt(326, 156, L.right, 'lb small', 'end')}
  `, `${L.y}: ${L.left}, ${L.mid}, ${L.right}`),

  // 8 · the one-third rule on a ruler: 15 cm grass cut to 10 cm
  f8: L => svg(196, `
    <rect x="0" y="170" width="340" height="26" class="soil"/>
    <line x1="44" y1="20" x2="44" y2="170" class="axis"/>
    ${[0, 5, 10, 15].map(cm => { const y = 170 - cm * 10; return `<line x1="38" y1="${y}" x2="50" y2="${y}" class="axis"/>${txt(32, y + 4, cm, 'lb small', 'end')}`; }).join('')}
    ${txt(32, 12, L.cm, 'lb small', 'end')}
    ${blades(Array.from({ length: 12 }, (_, i) => { const x = 74 + i * 9; return `M${x} 170 Q${x + 1} 100 ${x - 3 + (i % 3) * 3} ${20 + (i % 3) * 4}`; }), 'leaf', 3)}
    <line x1="60" y1="70" x2="200" y2="70" class="cutline" stroke-width="2" stroke-dasharray="6 4"/>
    <path d="M204 22 h6 v46 h-6" class="bracket" fill="none"/>${txt(216, 44, L.remove, 'lb strong')}${txt(216, 58, '(5 ' + L.cm + ')', 'lb small')}
    <path d="M204 72 h6 v96 h-6" class="bracket" fill="none"/>${txt(216, 116, L.leave, 'lb strong')}${txt(216, 130, '(10 ' + L.cm + ')', 'lb small')}
    ${txt(216, 82, L.cut, 'lb cut')}
  `, `${L.remove}, ${L.leave}`),

  // 9 · orchard zones from above: short tree rings and paths, the rest cut less often
  f9: L => svg(236, `
    <rect x="0" y="0" width="340" height="180" rx="10" class="zone-rest"/>
    ${Array.from({ length: 60 }, (_, i) => `<path d="M${(i * 37) % 330 + 6} ${(i * 53) % 170 + 6} l2 -6" class="tuft"/>`).join('')}
    <rect x="0" y="80" width="340" height="20" class="zone-path"/>
    ${[[80, 40], [260, 40], [80, 140], [260, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" class="zone-ring"/><circle cx="${x}" cy="${y}" r="7" class="trunk"/>`).join('')}
    <g transform="translate(8 196)"><circle cx="7" cy="-4" r="7" class="zone-ring"/>${txt(20, 0, L.ring, 'lb small')}</g>
    <g transform="translate(8 214)"><rect y="-10" width="14" height="12" class="zone-path line"/>${txt(20, 0, L.path, 'lb small')}</g>
    <g transform="translate(8 232)"><rect y="-10" width="14" height="12" class="zone-rest"/>${txt(20, 0, L.rest, 'lb small')}</g>
  `, `${L.ring}; ${L.path}; ${L.rest}`),

  // 1b · leaf veins: grass blade (parallel) vs broad leaf (net)
  f1b: L => svg(128, `
    <line x1="170" y1="8" x2="170" y2="120" class="rule"/>
    ${txt(90, 20, L.grassLeaf, 'lb title mono', 'middle')}${txt(255, 20, L.broadLeaf, 'lb title di', 'middle')}
    <path d="M18 66 C60 50 120 48 162 58 C120 66 60 76 18 66 Z" class="blade"/>
    <g class="vein" fill="none"><path d="M24 65 C64 54 120 53 156 58"/><path d="M24 66 C64 60 120 58 156 59"/><path d="M24 67 C64 66 120 62 156 60"/></g>
    <ellipse cx="255" cy="66" rx="64" ry="32" class="dileaf"/>
    <g class="vein" fill="none"><path d="M192 66 H318"/>${[212, 236, 260, 284, 304].map((x, i) => `<path d="M${x} 66 L${x + 14} ${42 + i % 2 * 3}"/><path d="M${x} 66 L${x + 14} ${90 - i % 2 * 3}"/>`).join('')}
      <path d="M218 52 l10 3 M243 50 l9 4 M268 50 l9 4 M292 54 l7 3 M218 80 l10 -3 M243 82 l9 -4 M268 82 l9 -4 M292 78 l7 -3"/></g>
    ${txt(90, 112, L.par, 'lb', 'middle')}${txt(255, 112, L.net, 'lb', 'middle')}
  `, `${L.grassLeaf}: ${L.par}. ${L.broadLeaf}: ${L.net}.`),

  // 3b · how a legume gets nitrogen: sugar down, nitrogen from air in nodules, soil nitrate switches them off
  f3b: L => svg(206, `
    <defs><marker id="ah3b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ahead"/></marker></defs>
    <rect x="0" y="96" width="340" height="110" class="soil"/>
    <path d="M110 96 Q112 60 108 34" class="stem" stroke-width="3" fill="none"/>
    <g class="dicot"><ellipse cx="92" cy="40" rx="13" ry="7" transform="rotate(-30 92 40)"/><ellipse cx="126" cy="36" rx="13" ry="7" transform="rotate(30 126 36)"/><ellipse cx="108" cy="22" rx="10" ry="6"/></g>
    <path d="M110 98 Q112 140 108 190" class="root" stroke-width="2.2" fill="none"/>
    <g class="root" fill="none" stroke-width="1.4"><path d="M110 120 l-22 14"/><path d="M111 140 l22 12"/><path d="M109 162 l-18 12"/></g>
    <g class="nodule">${[[90, 133], [97, 129], [131, 151], [125, 148], [93, 173]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5"/>`).join('')}</g>
    <path d="M250 34 C210 52 170 92 138 140" class="arrow-n" fill="none" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ah3b)"/>
    ${txt(332, 26, L.air, 'lb strong', 'end')}
    <path d="M80 50 Q70 90 86 126" class="arrow-s" fill="none" stroke-width="2" marker-end="url(#ah3b)"/>
    ${txt(8, 70, L.sugar, 'lb small')}
    <path d="M134 154 L150 170" class="axis"/>${txt(152, 180, L.nodule, 'lb on-soil')}
    ${txt(332, 120, L.soilN, 'lb small on-soil', 'end')}
  `, `${L.sugar}; ${L.air}; ${L.nodule}. ${L.soilN}`),

  // 5b · the cut-and-regrow root cycle
  f5b: L => {
    const cx = 170, cy = 112, r = 66, P = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const arc = (a1, a2) => { const [x1, y1] = P(a1), [x2, y2] = P(a2); return `<path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" class="cycle" fill="none" stroke-width="2.4" marker-end="url(#ah5b)"/>`; };
    const nodes = [[-90, L.cut], [0, L.dieback], [90, L.rot], [180, L.regrow]];
    return svg(232, `
      <defs><marker id="ah5b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="ahead"/></marker></defs>
      ${arc(-78, -12)}${arc(12, 78)}${arc(102, 168)}${arc(192, 258)}
      ${nodes.map(([a], i) => { const [x, y] = P(a); return `<circle cx="${x}" cy="${y}" r="11" class="badge"/><text x="${x}" y="${y + 4}" class="badge-t" text-anchor="middle">${i + 1}</text>`; }).join('')}
      <circle cx="${cx}" cy="${cy}" r="26" class="soil"/>
      ${blades(['M162 104 Q160 92 156 86', 'M170 104 Q170 90 172 82', 'M178 104 Q180 94 184 88'])}
      <g class="root" fill="none" stroke-width="1.2"><path d="M170 106 l-8 18"/><path d="M170 106 v22"/><path d="M170 106 l8 18"/></g>
      ${txt(cx, 26, L.cut, 'lb strong', 'middle')}
      ${txt(cx + r + 16, cy - 4, L.dieback, 'lb')}
      ${txt(cx, cy + r + 26, L.rot, 'lb', 'middle')}
      ${txt(cx - r - 16, cy - 4, L.regrow, 'lb', 'end')}
    `, nodes.map(([, s], i) => `${i + 1} ${s.replace('\n', ' ')}`).join(', '));
  },

  // 8b · cutting through the year: wet (often), dry (less), before induction (short under canopy)
  f8b: L => {
    const col = (x0, h, cls, n) => blades(Array.from({ length: n }, (_, i) => { const x = x0 + i * 8; return `M${x} 128 Q${x + 1} ${128 - h / 2} ${x - 2 + (i % 3) * 2} ${128 - h + (i % 3) * 4}`; }), cls, 3);
    return svg(186, `
      <rect x="0" y="128" width="340" height="18" class="soil"/>
      <line x1="113" y1="8" x2="113" y2="146" class="rule"/><line x1="227" y1="8" x2="227" y2="146" class="rule"/>
      ${txt(56, 20, L.wet, 'lb title', 'middle')}${txt(170, 20, L.dry, 'lb title', 'middle')}${txt(283, 20, L.ind, 'lb title', 'middle')}
      <g class="drop">${[[30, 36], [56, 30], [82, 38]].map(([x, y]) => `<path d="M${x} ${y} q5 7 0 9 q-5 -2 0 -9z"/>`).join('')}</g>
      ${col(24, 62, 'leaf', 9)}
      <line x1="16" y1="96" x2="98" y2="96" class="cutline" stroke-width="1.6" stroke-dasharray="5 4"/>
      <circle cx="170" cy="44" r="10" class="sun"/>
      ${col(138, 52, 'pale', 9)}
      <line x1="130" y1="96" x2="212" y2="96" class="cutline" stroke-width="1.6" stroke-dasharray="5 4"/>
      <g class="bud">${[[268, 40], [276, 46], [284, 40], [292, 46], [300, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>
      <path d="M262 34 Q284 26 306 34" class="trunk-line" fill="none" stroke-width="2"/>
      ${col(250, 14, 'leaf', 9)}
      ${txt(56, 162, L.often, 'lb', 'middle')}${txt(170, 162, L.less, 'lb', 'middle')}${txt(283, 162, L.short, 'lb', 'middle')}
    `, `${L.wet}: ${L.often}. ${L.dry}: ${L.less}. ${L.ind}: ${L.short}.`);
  },

  // durian · induction timeline, flush to flower buds
  fd2: L => svg(232, `
    <line x1="34" y1="30" x2="34" y2="184" class="tl"/>
    ${[[30, L.flush], [80, L.harden], [130, L.dry], [180, L.buds]].map(([y, s], i) => `
      <circle cx="34" cy="${y}" r="15" class="tl-dot"/>
      ${[
        `<ellipse cx="34" cy="${y}" rx="8" ry="4.5" class="leaf-new" transform="rotate(-30 34 ${y})"/>`,
        `<ellipse cx="34" cy="${y}" rx="8" ry="4.5" class="leaf-old" transform="rotate(-30 34 ${y})"/>`,
        `<circle cx="34" cy="${y}" r="6" class="sun"/>`,
        `<g class="bud"><circle cx="29" cy="${y + 2}" r="3"/><circle cx="34" cy="${y - 3}" r="3"/><circle cx="39" cy="${y + 2}" r="3"/></g>`
      ][i]}
      ${txt(60, y + 5, s, 'lb strong')}`).join('')}
    ${txt(8, 222, L.note, 'lb small')}
  `, [L.flush, L.harden, L.dry, L.buds].join(' → ')),

  // durian · two seasons on the orchard floor
  fd: L => svg(186, `
    <rect x="0" y="110" width="340" height="52" class="soil"/>
    <line x1="170" y1="8" x2="170" y2="162" class="rule"/>
    ${txt(85, 20, L.normal, 'lb title', 'middle')}${txt(255, 20, L.induction, 'lb title', 'middle')}
    ${blades(Array.from({ length: 13 }, (_, i) => { const x = 14 + i * 11; return `M${x} 110 Q${x - 2} 80 ${x - 4 + (i % 3) * 4} ${48 + (i % 4) * 6}`; }), 'leaf', 3.2)}
    <g class="mulch">${Array.from({ length: 12 }, (_, i) => `<path d="M${10 + i * 13} ${106 + (i % 2) * 3} l9 -3"/>`).join('')}</g>
    <g class="drop">${[[40, 130], [80, 142], [120, 128], [60, 152], [140, 148]].map(([x, y]) => `<path d="M${x} ${y - 6} q5 7 0 9 q-5 -2 0 -9z"/>`).join('')}</g>
    ${blades(Array.from({ length: 13 }, (_, i) => { const x = 184 + i * 11; return `M${x} 110 l1 -10`; }), 'leaf', 3)}
    <circle cx="306" cy="48" r="13" class="sun"/>
    <g class="sunray">${[0, 60, 120, 180, 240, 300].map(a => { const r = a * Math.PI / 180; return `<path d="M${306 + Math.cos(r) * 17} ${48 + Math.sin(r) * 17} L${306 + Math.cos(r) * 23} ${48 + Math.sin(r) * 23}"/>`; }).join('')}</g>
    <g class="crack" fill="none"><path d="M200 112 l6 12 -4 10 6 12"/><path d="M262 112 l-4 14 6 8"/><path d="M310 112 l4 10 -6 14"/></g>
    ${txt(85, 178, L.moist, 'lb', 'middle')}${txt(255, 178, L.dry, 'lb', 'middle')}
  `, `${L.normal}: ${L.moist}. ${L.induction}: ${L.dry}.`)
};
