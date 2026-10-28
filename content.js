// All text shown in the app, in three languages. Section ids, sources and checklist ids are shared.
// Blocks: ['p', html] · ['ol', [html]] · ['ul', [html]] · ['note', html] · ['cmp', {a, b, rows:[[label, a, b, why?]]}]

const CITES = {
  s1: [['Sage & Pearcy 1987', '10.1104/pp.84.3.954'], ['Sage 2004', '10.1111/j.1469-8137.2004.00974.x']],
  s2: [['Chikoye et al. 2000', '10.1016/s0261-2194(00)00044-2'], ['van der Putten et al. 2013', '10.1111/1365-2745.12054']],
  s3: [['Gutschick 1981', '10.1086/283858'], ['Vance & Heichel 1991', '10.1146/annurev.pp.42.060191.002105'], ['Streeter & Wong 1988', '10.1080/07352688809382257'], ['Ledgard & Steele 1992', '10.1007/BF00011314'], ['Lascano et al. 2005', '10.3920/978-90-8686-552-9_256'], ['Carvalho et al. 2019', '10.1016/j.agee.2019.02.016']],
  s4: [['MacDonald 2004', '10.1080/07352680490505114'], ['MacDicken et al. 1996', '10.1007/bf00142871'], ['Akobundu et al. 2000', '10.1080/096708700227453']],
  s5: [['Rasse et al. 2005', '10.1007/s11104-004-0907-y'], ['Sokol & Bradford 2019', '10.1038/s41561-018-0258-6'], ['Cresswell & Kirkegaard 1995', '10.1071/SR9950221'], ['Tisdall & Oades 1982', '10.1111/j.1365-2389.1982.tb01755.x'], ['Rillig 2004', '10.4141/S04-003'], ['Crider 1955 (USDA Tech. Bull. 1102)', null]],
  s6: [['Sokol & Bradford 2019', '10.1038/s41561-018-0258-6']],
  s7: [['CABI', '10.1079/cabicompendium.8094'], ['Grime 1973', '10.1038/242344a0'], ['Connell 1978', '10.1126/science.199.4335.1302'], ['Chollet et al. 2018', '10.1016/j.landurbplan.2018.08.009']],
  s8: [['Harivandi & Gibeault 1999', '10.3733/ucanr.8006'], ['Crider 1955 (USDA Tech. Bull. 1102)', null]],
  s9: [['Kopp & Guillard 2002', '10.2135/cropsci2002.1225'], ['Harivandi & Gibeault 1999', '10.3733/ucanr.8006']]
};

const REFS = [
  ['Akobundu, Udensi & Chikoye (2000). Velvetbean suppresses speargrass and increases maize yield. Int. J. Pest Management.', '10.1080/096708700227453'],
  ['CABI (2019). Axonopus compressus (carpet grass). CABI Compendium.', '10.1079/cabicompendium.8094'],
  ['CABI (2019). Durio zibethinus (durian). CABI Compendium.', '10.1079/cabicompendium.20179'],
  ['Carvalho et al. (2019). Nodulation and biological nitrogen fixation in forage peanut (Arachis pintoi). Agric. Ecosyst. Environ.', '10.1016/j.agee.2019.02.016'],
  ['Chikoye, Manyong & Ekeleme (2000). Characteristics of speargrass-dominated fields in West Africa. Crop Protection.', '10.1016/s0261-2194(00)00044-2'],
  ['Chikoye et al. (2002). Response of speargrass to cover crops integrated with handweeding and chemical control. Crop Protection.', '10.1016/s0261-2194(01)00078-3'],
  ['Chollet et al. (2018). From urban lawns to urban meadows: reduction of mowing frequency increases plant diversity. Landscape and Urban Planning.', '10.1016/j.landurbplan.2018.08.009'],
  ['Connell (1978). Diversity in tropical rain forests and coral reefs. Science 199.', '10.1126/science.199.4335.1302'],
  ['Cresswell & Kirkegaard (1995). Subsoil amelioration by plant roots: the process and the evidence. Aust. J. Soil Research 33.', '10.1071/SR9950221'],
  ['Crider (1955). Root-growth stoppage resulting from defoliation of grass. USDA Technical Bulletin 1102.', null],
  ['Grime (1973). Competitive exclusion in herbaceous vegetation. Nature 242.', '10.1038/242344a0'],
  ['Gutschick (1981). Evolved strategies in nitrogen acquisition by plants. American Naturalist 118.', '10.1086/283858'],
  ['Harivandi & Gibeault (1999). Mowing your lawn and grasscycling. UC ANR Publication 8006.', '10.3733/ucanr.8006'],
  ['Kopp & Guillard (2002). Clipping management and nitrogen fertilization of turfgrass. Crop Science 42.', '10.2135/cropsci2002.1225'],
  ['Laidlaw (1984). Effect of spring nitrogen fertilizer on white clover content. Grass and Forage Science.', '10.1111/j.1365-2494.1984.tb01702.x'],
  ['Lascano, Peters & Holmann (2005). Arachis pintoi in the humid tropics of Colombia: a forage legume success story.', '10.3920/978-90-8686-552-9_256'],
  ['Ledgard & Steele (1992). Biological nitrogen fixation in mixed legume/grass pastures. Plant and Soil 141.', '10.1007/BF00011314'],
  ['MacDicken et al. (1996). Shade-based control of Imperata cylindrica: tree fallows and cover crops. Agroforestry Systems.', '10.1007/bf00142871'],
  ['MacDonald (2004). Cogongrass (Imperata cylindrica): biology, ecology, and management. Crit. Rev. Plant Sciences 23.', '10.1080/07352680490505114'],
  ['Rasse, Rumpel & Dignac (2005). Is soil carbon mostly root carbon? Plant and Soil 269.', '10.1007/s11104-004-0907-y'],
  ['Rillig (2004). Arbuscular mycorrhizae, glomalin, and soil aggregation. Can. J. Soil Science 84.', '10.4141/S04-003'],
  ['Sage (2004). The evolution of C4 photosynthesis. New Phytologist 161.', '10.1111/j.1469-8137.2004.00974.x'],
  ['Sage & Pearcy (1987). The nitrogen use efficiency of C3 and C4 plants. Plant Physiology 84.', '10.1104/pp.84.3.954'],
  ['Sokol & Bradford (2019). Microbial formation of stable soil carbon is more efficient from belowground than aboveground input. Nature Geoscience 12.', '10.1038/s41561-018-0258-6'],
  ['Streeter & Wong (1988). Inhibition of legume nodule formation and N2 fixation by nitrate. Crit. Rev. Plant Sciences 7.', '10.1080/07352688809382257'],
  ['Tisdall & Oades (1982). Organic matter and water-stable aggregates in soils. J. Soil Science 33.', '10.1111/j.1365-2389.1982.tb01755.x'],
  ['Vance & Heichel (1991). Carbon in N2 fixation: limitation or exquisite adaptation. Annu. Rev. Plant Physiol. 42.', '10.1146/annurev.pp.42.060191.002105'],
  ['van der Putten et al. (2013). Plant–soil feedbacks: the past, the present and future challenges. Journal of Ecology 101.', '10.1111/1365-2745.12054']
];

// How each source was checked, citation counts and free-to-read links (OpenAlex, 28 Oct 2026)
const REFMETA = {
 "10.1080/096708700227453": {
  "basis": "abs",
  "cited": 54,
  "free": null
 },
 "10.1079/cabicompendium.8094": {
  "basis": "title",
  "cited": 0,
  "free": "https://doi.org/10.1079/cabicompendium.8094"
 },
 "10.1079/cabicompendium.20179": {
  "basis": "title",
  "cited": 0,
  "free": null
 },
 "10.1016/j.agee.2019.02.016": {
  "basis": "abs",
  "cited": 38,
  "free": "https://doi.org/10.1016/j.agee.2019.02.016"
 },
 "10.1016/s0261-2194(00)00044-2": {
  "basis": "abs",
  "cited": 81,
  "free": "https://hdl.handle.net/10568/92646"
 },
 "10.1016/s0261-2194(01)00078-3": {
  "basis": "abs",
  "cited": 71,
  "free": null
 },
 "10.1016/j.landurbplan.2018.08.009": {
  "basis": "abs",
  "cited": 147,
  "free": null
 },
 "10.1126/science.199.4335.1302": {
  "basis": "abs",
  "cited": 9427,
  "free": null
 },
 "10.1071/SR9950221": {
  "basis": "abs",
  "cited": 253,
  "free": null
 },
 "crider": {
  "basis": "none",
  "cited": null,
  "free": null
 },
 "10.1038/242344a0": {
  "basis": "abs",
  "cited": 2532,
  "free": null
 },
 "10.1086/283858": {
  "basis": "abs",
  "cited": 336,
  "free": null
 },
 "10.3733/ucanr.8006": {
  "basis": "title",
  "cited": 3,
  "free": "https://doi.org/10.3733/ucanr.8006"
 },
 "10.2135/cropsci2002.1225": {
  "basis": "abs",
  "cited": 118,
  "free": null
 },
 "10.1111/j.1365-2494.1984.tb01702.x": {
  "basis": "abs",
  "cited": 33,
  "free": null
 },
 "10.3920/978-90-8686-552-9_256": {
  "basis": "title",
  "cited": 5,
  "free": null
 },
 "10.1007/BF00011314": {
  "basis": "abs",
  "cited": 478,
  "free": null
 },
 "10.1007/bf00142871": {
  "basis": "abs",
  "cited": 46,
  "free": null
 },
 "10.1080/07352680490505114": {
  "basis": "abs",
  "cited": 186,
  "free": null
 },
 "10.1007/s11104-004-0907-y": {
  "basis": "abs",
  "cited": 1859,
  "free": null
 },
 "10.4141/S04-003": {
  "basis": "abs",
  "cited": 1066,
  "free": "https://doi.org/10.4141/s04-003"
 },
 "10.1111/j.1469-8137.2004.00974.x": {
  "basis": "title",
  "cited": 1353,
  "free": null
 },
 "10.1104/pp.84.3.954": {
  "basis": "abs",
  "cited": 186,
  "free": "https://doi.org/10.1104/pp.84.3.954"
 },
 "10.1038/s41561-018-0258-6": {
  "basis": "title",
  "cited": 890,
  "free": "https://www.osti.gov/biblio/1814107"
 },
 "10.1080/07352688809382257": {
  "basis": "title",
  "cited": 657,
  "free": null
 },
 "10.1111/j.1365-2389.1982.tb01755.x": {
  "basis": "abs",
  "cited": 6265,
  "free": null
 },
 "10.1146/annurev.pp.42.060191.002105": {
  "basis": "abs",
  "cited": 293,
  "free": null
 },
 "10.1111/1365-2745.12054": {
  "basis": "abs",
  "cited": 1762,
  "free": "https://pure.knaw.nl/portal/en/publications/20a11daa-2f4e-4bb4-9830-66c85735edcd"
 }
};

const APP_URL = 'https://stanleywoosweeleong.github.io/grasscutting/';

const CABI_DURIAN = 'https://doi.org/10.1079/cabicompendium.20179';

const T = {
/* ───────────────────────── English ───────────────────────── */
en: {
  htmlLang: 'en', code: 'EN', native: 'English',
  appName: 'Grass Cutting',
  tabs: { learn: 'Learn', durian: 'Durian', sources: 'Sources' },
  install: 'Install', installed: 'Installed', offline: 'Offline',
  iosHint: 'Tap Share, then Add to Home Screen',
  sourceOne: 'Source:', sourceMany: 'Sources:',
  langMenu: { title: 'Language', done: 'Done' },
  learn: {
    eyebrow: 'For durian growers',
    h2: 'Build soil by cutting, not spraying',
    lede: 'How grass and soil shape each other, with the research behind each point. Tap a section to read it.'
  },
  sections: [
    { t: 'Monocot grasses vs dicot ground covers',
      take: 'Fibrous roots, a protected growing point and efficient C4 photosynthesis let grasses get by on poorer soil.',
      b: [
        ['p', 'Monocots carry one cotyledon (seed leaf) in the seed and dicots carry two. Every true grass (family Poaceae) is a monocot. The dicots used as ground covers are broadleaf plants such as white clover, dichondra and pinto peanut.'],
        ['cmp', { a: 'Monocot', b: 'Dicot', rows: [
          ['Roots', 'Fibrous mat from the crown', 'Taproot, plus roots at creeping nodes', 'A fibrous mat copes with thin or compact soil. A taproot needs loose, deep soil.'],
          ['Leaves', 'Narrow, parallel veins', 'Broad, net veins', 'Broad leaves lose more water, so they need steadier moisture.'],
          ['Growing point', 'At the crown, near the soil', 'At shoot tips, above ground', 'Cutting removes dicot tips but spares grass crowns.'],
          ['Photosynthesis', 'Mostly C4 (tropical turf)', 'C3', 'In heat and sun, C4 usually makes more growth per unit of water and nitrogen; on very poor soil the nitrogen edge can disappear.']
        ] }],
        ["p", "<b>What C3 and C4 mean.</b> The names count the carbon atoms in the first molecule a plant builds when it takes carbon from the air: 3 or 4. The difference that matters is how each type copes with heat."],
        ["ul", ["<b>C3 plants</b> (most broadleaf plants, legumes such as pinto peanut, trees including durian, and cool-climate grasses): the enzyme that catches carbon dioxide also grabs oxygen by mistake, and the mistake grows in hot, bright weather. They waste energy and water, so they do best in cool or shaded spots.", "<b>C4 plants</b> (most tropical grasses, including cow grass and cogongrass, plus maize and sugarcane): they first pump carbon dioxide into special cells inside the leaf, so the enzyme rarely makes the mistake. In heat and full sun they grow more per drop of water, and usually per unit of nitrogen.", "<b>On the orchard floor:</b> in Malaysia's heat, C4 grasses usually win in the open. Under shade the C4 advantage shrinks, which is one reason grass thins out under a closed canopy."]],
        ['p', 'Legumes such as pinto peanut add one twist: they make their own nitrogen, so what they need from fertile soil is phosphorus, potassium and moisture (section 3).']
      ] },
    { t: "What grows is the soil's report card",
      take: 'What grows reflects the soil, and the plants slowly change it.',
      b: [
        ['p', "What grows naturally reflects the soil's water, nutrients, structure and disturbance history. Ecologists call these <b>indicator plants</b>. Fields dominated by cogongrass in West Africa, for example, had degraded, low-fertility soils."],
        ['p', 'The report card also feeds back. Plants change their soil through dead roots, root exudates, the microbes they host and the nutrients they pull up. The changed soil then favours different plants. This <b>plant–soil feedback</b> drives succession.'],
        ['p', "You can't pick a grass to fix soil overnight. Managing the vegetation that grows there, mainly by how you cut it, is how the soil improves over the years."]
      ] },
    { t: 'Why pinto peanut wins on poor soil and loses on rich soil',
      take: 'It makes its own nitrogen, so it wins where nitrogen is short and gets shaded out on rich soil.',
      b: [
        ['p', 'Pinto peanut (<i>Arachis pintoi</i>) has an edge only where soil nitrogen is short. On fertile soil that edge switches off, and faster grasses shade it out.'],
        ['ol', [
          "<b>Fixing nitrogen costs energy.</b> Root-nodule bacteria turn air nitrogen into ammonia, paid for with the plant's sugars. That costs more than taking up nitrogen the soil already provides.",
          '<b>On low-nitrogen soil the cost pays off.</b> Grasses are held back by the shortage; the legume is not.',
          '<b>On rich soil, fixation switches down.</b> Soil nitrate suppresses nodules, so the legume loses its edge.',
          '<b>Then it competes for light and loses.</b> C4 grasses grow taller and faster in heat. In mixed pastures, nitrogen fertilizer reliably lowers the legume share.'
        ]],
        ['p', 'On a fertile, fertilized orchard floor, the natural vegetation is grass, and pinto peanut is working against it. Where it is grown, cut it high: kept at 15–20 cm it fixed more nitrogen than at 5–10 cm.']
      ] },
    { t: 'Pinto peanut vs cogongrass on sandy soil',
      take: 'Cogongrass wins on dry sand; shade is what pushes it back.',
      b: [
        ['p', 'On dry sand, cogongrass (<i>Imperata cylindrica</i>) almost always wins. Shade is what pushes it back.'],
        ['cmp', { a: 'Cogongrass', b: 'Pinto peanut', rows: [
          ['Below ground', 'Dense rhizomes; regrows after cutting and fire', 'Taproot and stolons; slow to establish'],
          ['Drought on sand', 'Tolerates it', 'Fixation and growth slow down'],
          ['Weakness', 'Shade', 'Being overtopped']
        ] }],
        ['p', 'Shade from tree fallows or tall cover crops such as velvet bean (<i>Mucuna</i>) suppresses cogongrass. In a Nigerian trial, velvet bean cut cogongrass shoot growth by 72–92% in one season, but the rhizomes survived, so the weed returns unless the shade lasts. Pinto peanut grows too low to do that. In an orchard, the closing tree canopy does the job over time.']
      ] },
    { t: 'Roots build more soil than leaves',
      take: 'Root carbon stays about 2.4× longer, and roots also build pores, crumbs and nutrient cycling.',
      b: [
        ['p', 'Carbon from roots stays in soil about <b>2.4 times longer</b> than carbon from leaves and stems, based on the few studies with complete data. Microbes also turn underground inputs into stable organic matter more efficiently than surface litter.'],
        ['p', 'Roots build soil in four ways:'],
        ['ul', [
          '<b>Organic matter.</b> Dead roots and root sugars feed microbes, whose remains bind to clay as stable carbon.',
          '<b>Pores.</b> Growing roots push soil apart; rotted roots leave channels for air, water, earthworms and new roots. In dense subsoil this is slow and hard to prove: a 1995 review found two seasons of a short-lived crop made no measurable change. Long-lived roots, such as a permanent grass cover, are the best candidates.',
          '<b>Glue.</b> Fine roots, fungal threads and the fungal protein glomalin bind clay into crumbs that drain instead of sealing.',
          '<b>Chemistry and soil life.</b> Roots free locked phosphorus, lift nutrients from depth and feed the soil food web.'
        ]],
        ['note', "<b>Cut high to keep roots growing.</b> Removing more than about half of a grass's leaf area stopped root growth in a classic USDA study. Occasional cuts feed the soil; scalping shrinks the roots that build it."]
      ] },
    { t: 'Cutting vs herbicide',
      take: 'Living roots feed the soil continuously; roots killed by spray feed it once.',
      b: [
        ['p', 'Cutting beats herbicide for soil building because it keeps roots alive. A systemic herbicide such as glyphosate kills the whole plant, roots included. Those dead roots add organic matter once, and then the soil gets nothing until something regrows.'],
        ['cmp', { a: 'Cutting', b: 'Herbicide', rows: [
          ['Roots', 'Alive; shed and regrow each cut', 'Die once'],
          ['Soil cover', 'Always covered', 'Bare; crusting and erosion'],
          ['Organic matter', 'Small pulses for years', 'One pulse']
        ] }],
        ['p', 'Pulling or digging is worse than either, because it also breaks up the soil crumbs.']
      ] },
    { t: 'Why regular cutting ends in cow grass',
      take: 'Frequent cutting leaves only low creepers; moderate cutting keeps more variety.',
      b: [
        ['p', 'Frequent cutting acts as a filter. Only low, creeping grasses survive it, so diversity drops and cow grass (<i>Axonopus compressus</i>) takes over. The shift is gradual: a mixed sward can take several years of regular cutting to become mostly cow grass.'],
        ['ul', [
          '<b>Who survives:</b> cow grass spreads by stolons with its growing points below cutting height. It suits moist, slightly acidic soils and tolerates part shade.',
          '<b>The pattern:</b> species richness peaks at moderate disturbance. Very frequent cutting leaves only tolerant species; rare cutting lets a few tall ones dominate.',
          '<b>Direct evidence:</b> cutting urban lawns less often increased plant diversity.'
        ]],
        ['p', 'A uniform cow-grass mat is easy, covers soil well and grows slowly. A mixed sward has roots at more depths and more soil life.']
      ] },
    { t: 'When to cut, and how high',
      take: 'Take off no more than a third of the leaf at a time, and adjust how often you cut to the season.',
      b: [
        ['p', 'Research on lawns and turf such as golf courses gives one firm rule: <b>never remove more than about a third of the leaf height in one cut.</b> It was worked out for turf, not orchards, but the reason behind it applies to any grass: taking more stops root growth for a while, which is the opposite of what builds soil.'],
        ['ul', [
          '<b>How to use it:</b> pick the height you want to leave, then cut when the grass reaches about 1.5 times that. To leave 10 cm, cut at about 15 cm.',
          '<b>If it has grown too tall,</b> bring it down in two cuts a couple of weeks apart, not all at once.'
        ]],
        ['p', 'How often to cut depends on the season and what you want the grass to do:'],
        ['ul', [
          "<b>Most of the year:</b> cut by thirds and don't scalp. More leaf means more energy for the roots.",
          "<b>Dry season:</b> tall grass shades the soil but also draws water from the same soil your trees use. A moderate height with clippings left as mulch usually saves more moisture. Grass grows slowly in drought, so cut less often, and don't cut grass that is already browning.",
          '<b>Wet season:</b> grass grows fast, so cut more often to keep access easy. Keep the area around trunks short and airy; damp, crowded trunks favour root and stem diseases.',
          '<b>Before flower induction:</b> cut short under the canopy (see the <a href="#durian">Durian</a> tab).'
        ]],
        ['note', '<b>How sure is this?</b> The one-third rule is well established for lawns and golf-course turf. No published cutting height for durian orchards was found, so the seasonal advice applies the same science rather than a tested recommendation.']
      ] },
    { t: 'Putting it into practice',
      take: 'Leave clippings, cut high and reduce fertilizer step by step.',
      b: [
        ['p', 'Cut, leave the cuttings, cut higher, and reduce fertilizer step by step. Each step lowers both fertilizer and cutting costs.'],
        ['ul', [
          '<b>Leave the clippings.</b> In a US lawn study, returning clippings let nitrogen fertilizer be cut by 50% or more without losing quality. Rake surplus into tree rings as mulch.',
          '<b>Cut higher.</b> About 10–15 cm is a reasonable working height for an orchard floor (a suggestion, not from a study).',
          '<b>Reduce fertilizer gradually</b> and watch whether the cow grass stays green and dense.',
          '<b>Time cuts against seeding</b> to shift the mix without herbicide.',
          '<b>Use zones for diversity:</b> paths and tree rings short, the rest cut less often.',
          '<b>On cogongrass patches,</b> use shade and tall cover crops, not more cutting alone.',
          "<b>Don't pull or dig.</b>"
        ]],
        ['note', '<b>Durian induction season is the exception.</b> See the <a href="#durian">Durian</a> tab.']
      ] }
  ],
  durian: {
    eyebrow: 'Durian orchards',
    h2: 'Two seasons on the orchard floor',
    lede: 'Durian flowering needs a stress signal from the root zone. After the leaf flush matures, the root zone must dry out and the ground must reach a certain temperature. A thick grass mat and mulch keep it moist and cool.',
    normal: 'Normal season', induction: 'Induction season',
    normalTitle: 'Most of the year: build soil',
    normalItems: [
      ['n1', 'Cut every few months; never pull or dig'],
      ['n2', 'Cut when grass reaches about 1.5× the height you leave (e.g. 15 cm down to 10 cm); never take more than a third'],
      ['n3', 'Leave clippings; rake surplus into tree rings'],
      ['n4', 'Cut unwanted species before they set seed'],
      ['n5', 'Reduce fertilizer a step and watch the grass']
    ],
    inductionTitle: 'Before and during induction: let the root zone dry and warm',
    inductionItems: [
      ['i1', 'Cut short under the canopy'],
      ['i2', 'Rake clippings and mulch out of the root zone'],
      ['i3', 'Hold back nitrogen; it pushes leaf flushes instead of flowers'],
      ['i4', 'Start once the last leaf flush has hardened to dark green and dry weather is coming'],
      ['i6', "Note the dates of the flush, the dry spell and the first flower buds, to learn your orchard's timing year by year"],
      ['i5', 'After fruit set, return to the normal cycle']
    ],
    clear: 'Clear ticks', cleared: 'Ticks cleared',
    cite: `Published guidance emphasises a dry spell after the leaf flush (<a href="${CABI_DURIAN}">CABI: Durio zibethinus</a>). This approach works with that natural signal, with no growth regulators. Ticks are saved on this phone only.`
  },
  sources: { eyebrow: 'References', h2: 'Sources', lede: 'Every DOI was checked against the Crossref registry. Crider 1955 has no DOI.', noDoi: 'No DOI.' },
  tip: { text: 'Tip: install the app to read it offline in the orchard. The durian checklists are in the <a href="#durian">Durian</a> tab.', close: 'Close tip' },
  settings: {"title": "Settings", "open": "Open settings", "language": "Language", "textSize": "Text size", "sizes": ["Small", "Normal", "Large", "Extra large"], "theme": "Appearance", "themes": {"system": "Follow phone", "light": "Light", "dark": "Dark"}, "share": "Share this app", "back": "Back"},
  share: {"button": "Share", "title": "Share this app", "scan": "Scan to open on another phone", "previewNote": "How it will look in WhatsApp", "message": "Message (you can edit it)", "whatsapp": "Share on WhatsApp", "copyLink": "Copy link", "copyMsg": "Copy message", "more": "More options", "copied": "Link copied", "copiedMsg": "Message copied", "copyFail": "Could not copy. Press and hold the text to copy it.", "cardTitle": "割草养土 · Grass Cutting · Potong Rumput", "cardDesc": "Build soil by cutting, not spraying. For durian growers.", "text": "Grass Cutting: how cutting grass instead of spraying builds orchard soil, with the research behind it. For durian growers, free, and it works offline:"},
  refs: {"cited": "Cited {n} times", "free": "Free to read", "basis": {"abs": "Checked against the abstract", "title": "Checked against the title and record only", "none": "Not online; cited from later reviews"}, "note": "Citation counts from OpenAlex, 28 Oct 2026. Each line under a source is our own short summary.", "findings": {"10.1080/096708700227453": "Velvet bean cut cogongrass shoots by 72–92% in a season, but the rhizomes survived.", "10.1079/cabicompendium.8094": "Reference profile of cow grass: where it grows and how it behaves.", "10.1079/cabicompendium.20179": "Reference profile of durian biology and growing conditions.", "10.1016/j.agee.2019.02.016": "Pinto peanut kept at 15–20 cm fixed more nitrogen than at 5–10 cm; moderate defoliation worked best.", "10.1016/s0261-2194(00)00044-2": "Farmer survey in West Africa: speargrass fields lose yield and need more labour.", "10.1016/s0261-2194(01)00078-3": "For speargrass control, cover crops paid off better in cassava than in maize.", "10.1016/j.landurbplan.2018.08.009": "After 25 years, lawns mown less often had far more plant diversity.", "10.1126/science.199.4335.1302": "Classic paper: diversity stays highest under moderate disturbance.", "10.1071/SR9950221": "Roots opening up dense subsoil is plausible but hard to prove; long-lived roots are the best bet.", "crider": "Removing more than about half the leaf stopped grass root growth.", "10.1038/242344a0": "How dominant plants crowd others out, and how disturbance keeps room for more species.", "10.1086/283858": "Works out the energy cost to plants of using air nitrogen, ammonium and nitrate.", "10.3733/ucanr.8006": "University of California guide to mowing and leaving clippings on the lawn.", "10.2135/cropsci2002.1225": "Returning clippings let nitrogen fertilizer be cut by 50% or more without losing quality.", "10.1111/j.1365-2494.1984.tb01702.x": "In a five-year trial, spring nitrogen fertilizer lowered the clover share of grass–clover swards.", "10.3920/978-90-8686-552-9_256": "Pinto peanut persists well in grazed grass pastures in humid Colombia.", "10.1007/BF00011314": "Review of how much nitrogen legumes fix in mixed pastures, and what limits it.", "10.1007/bf00142871": "Tree fallows and cover crops suppress Imperata by shading it.", "10.1080/07352680490505114": "Review: cogongrass is one of the world's ten worst weeds; lasting control needs revegetation.", "10.1007/s11104-004-0907-y": "Root carbon stays in soil about 2.4 times longer than shoot carbon, from the studies with full data.", "10.4141/S04-003": "The fungal protein glomalin is linked to stable soil crumbs and breaks down slowly.", "10.1111/j.1469-8137.2004.00974.x": "Review of how C4 plants evolved and why they do well in heat.", "10.1104/pp.84.3.954": "The C4 plant used nitrogen better when nitrogen was plentiful; the C3 plant did better at low nitrogen.", "10.1038/s41561-018-0258-6": "Microbes turn root inputs into stable soil carbon more efficiently than surface litter.", "10.1080/07352688809382257": "Review: nitrate in soil suppresses nodule formation and nitrogen fixation.", "10.1111/j.1365-2389.1982.tb01755.x": "Roots and fungal threads hold soil crumbs together, so how land is managed changes soil structure.", "10.1146/annurev.pp.42.060191.002105": "Review of the carbon (sugar) cost of fixing nitrogen.", "10.1111/1365-2745.12054": "Review: plants change their soil, and the changed soil steers which plants come next."}},
  fig: {"f1": {"mono": "Monocot", "di": "Dicot", "fibrous": "Fibrous roots", "taproot": "Taproot", "gp": "Growing point"}, "f2": {"years": "Years of regular cutting →", "st1": "Pioneers\n(cogongrass)", "st2": "Mixed\ngrasses", "st3": "Cow grass\nmat", "som": "More organic\nmatter"}, "f3": {"lowN": "Low-nitrogen soil", "richN": "Rich soil", "peanutWins": "Pinto peanut spreads", "grassWins": "Grass shades it out"}, "f4": {"open": "Full sun: cogongrass thrives", "shade": "Under canopy: it fades", "rhizomes": "Rhizomes"}, "f5": {"om": "Organic matter", "pores": "Pores", "glue": "Glue", "life": "Chemistry & life"}, "f6": {"roots": "Living roots", "time": "Time →", "cutting": "Cutting", "herbicide": "Herbicide", "spray": "spray", "cut": "cut"}, "f7": {"y": "Plant variety", "x": "Cutting: rare → very often", "left": "Tall grasses take over", "mid": "Most variety", "right": "Mostly cow grass"}, "f8": {"cut": "Cut here", "remove": "Remove ≤ ⅓", "leave": "Leave ⅔", "cm": "cm"}, "f9": {"ring": "Tree ring: keep short", "path": "Path: keep short", "rest": "Rest: cut less often"}, "fd": {"moist": "Moist and cool", "dry": "Dry and warm"}, "illus": "Illustration of the idea, not measured data.", "f1b": {"grassLeaf": "Grass blade", "broadLeaf": "Broad leaf", "par": "Parallel veins", "net": "Net veins"}, "f3b": {"air": "Nitrogen from air", "sugar": "Sugar from\nthe leaves", "nodule": "Root nodules (bacteria)", "soilN": "Nitrate in soil\nswitches them off"}, "f5b": {"cut": "Cut the grass", "dieback": "Some roots\ndie back", "rot": "Dead roots rot:\nfood and pores", "regrow": "New roots\ngrow"}, "f8b": {"wet": "Wet season", "dry": "Dry season", "ind": "Before induction", "often": "Cut more\noften", "less": "Cut less\noften", "short": "Cut short\nunder canopy"}, "fd2": {"flush": "New leaf flush", "harden": "Leaves harden, dark green", "dry": "Dry spell: soil dries and warms", "buds": "Flower buds appear", "note": "Write down these dates each year."}, "f1c": {"c3sub": "Most broadleaf plants,\ndurian, legumes", "c4sub": "Most tropical\ngrasses", "o2": "O₂ mix-up", "pump": "CO₂ pump", "c3note": "In heat: more mix-ups,\nmore water lost", "c4note": "In heat: CO₂ pumped in,\nless water lost"}},
  viewer: {"close": "Close", "hint": "Tap the picture to zoom in or out", "open": "Tap to enlarge"},
  photo: {"credit": "Photo:", "heading": "Photos", "lede": "Photos from Wikimedia Commons, used under the licences shown.", "cowgrassLawn": "Cow grass (Axonopus compressus) as a lawn under trees", "cowgrassClose": "Cow grass close up: flat, broad blades", "lalang": "Cogongrass (Imperata cylindrica) in flower", "pintoi": "Pinto peanut (Arachis pintoi): leaves and flower", "durianBuds": "Durian flower buds on the branch", "durianFlowers": "Durian flowers"}
},

/* ───────────────────────── 中文 ───────────────────────── */
zh: {
  htmlLang: 'zh-Hans', code: '中文', native: '中文',
  appName: '割草养土',
  tabs: { learn: '学习', durian: '榴莲', sources: '来源' },
  install: '安装', installed: '已安装', offline: '离线',
  iosHint: '点“分享”，再点“添加到主屏幕”',
  sourceOne: '来源：', sourceMany: '来源：',
  langMenu: { title: '语言', done: '完成' },
  learn: {
    eyebrow: '写给榴莲园主',
    h2: '割草养土，不喷除草剂',
    lede: '草与土如何相互影响，以及每一点背后的研究。点开任一节阅读。'
  },
  sections: [
    { t: '单子叶禾草与双子叶地被',
      take: '须根、受保护的生长点和高效的 C4 光合作用，让禾草在较贫瘠的土壤里也能生长。',
      b: [
        ['p', '单子叶植物的种子只有一片子叶，双子叶植物有两片。所有真正的禾草（禾本科）都是单子叶植物。用作地被的双子叶植物是阔叶植物，例如白车轴草、马蹄金和蔓花生。'],
        ['cmp', { a: '单子叶', b: '双子叶', rows: [
          ['根系', '从根冠长出的须根网', '主根，加上匍匐茎节上的根', '须根网能适应薄土或紧实的土；主根需要疏松深厚的土。'],
          ['叶片', '窄叶，平行脉', '阔叶，网状脉', '阔叶失水更多，所以需要更稳定的水分。'],
          ['生长点', '在根冠，贴近地面', '在枝梢，高于地面', '割草会剪掉双子叶的枝梢，却保住禾草的根冠。'],
          ['光合作用', '多为 C4（热带草坪草）', 'C3', '在高温强光下，C4 每单位水和氮通常能长出更多；不过在非常贫瘠的土壤上，氮的优势可能消失。']
        ] }],
        ["p", "<b>C3 和 C4 是什么意思？</b>名称指的是植物从空气中固定碳时，最先合成的分子含有 3 个还是 4 个碳原子。真正重要的区别，在于它们怎样应对高温。"],
        ["ul", ["<b>C3 植物</b>（大多数阔叶植物、蔓花生等豆科植物、包括榴莲在内的树木，以及温带草类）：负责抓取二氧化碳的酶会误抓氧气，天气越热越亮，误抓越多。它们因此浪费能量和水分，在凉爽或有遮荫的地方表现最好。", "<b>C4 植物</b>（大多数热带禾草，包括地毯草和茅草，还有玉米和甘蔗）：先把二氧化碳“泵”进叶片内部的特殊细胞，酶就很少出错。在高温和强光下，每一滴水都能长得更多，通常每一份氮也是。", "<b>在果园地面上：</b>马来西亚天气炎热，空旷处通常是 C4 禾草占上风。到了树荫下，C4 的优势变小，这也是树冠郁闭后草变稀的原因之一。"]],
        ['p', '豆科植物如蔓花生有一点不同：它们自己固氮，所以它们需要肥沃土壤提供的是磷、钾和水分（见第 3 节）。']
      ] },
    { t: '长出什么，就是土壤的成绩单',
      take: '长出来的植物反映土壤，植物也在慢慢改变土壤。',
      b: [
        ['p', '自然长出的植物反映了土壤的水分、养分、结构和受干扰的历史。生态学称之为<b>指示植物</b>。例如在西非，茅草占优势的田地，土壤多已退化、肥力低。'],
        ['p', '成绩单也会反过来影响土壤。植物通过死根、根系分泌物、共生的微生物和从深层吸上来的养分改变土壤，改变后的土壤又会偏向另一些植物。这种<b>植物–土壤反馈</b>推动着植被演替。'],
        ['p', '不可能挑一种草一夜之间改良土壤。管理好长在那里的植被，主要靠怎么割草，土壤才会年复一年地变好。']
      ] },
    { t: '为什么蔓花生在贫瘠土壤胜出、在肥沃土壤落败',
      take: '它自己固氮，所以在缺氮的地方占优势，在肥土上则被禾草遮住。',
      b: [
        ['p', '蔓花生（<i>Arachis pintoi</i>）只在土壤缺氮时才有优势。在肥沃的土壤上，这个优势就消失了，长得更快的禾草会把它遮住。'],
        ['ol', [
          '<b>固氮要消耗能量。</b>根瘤菌把空气中的氮转化为氨，代价是植物的糖分。这比直接吸收土壤里现成的氮更“贵”。',
          '<b>在缺氮的土壤，这个代价划算。</b>禾草受缺氮限制，豆科植物却不受影响。',
          '<b>在肥沃的土壤，固氮会减弱。</b>土壤中的硝态氮会抑制根瘤，豆科植物就失去了优势。',
          '<b>接着比的是抢阳光，它会输。</b>C4 禾草在高温下长得更高更快。在混播牧场里，施氮肥一定会降低豆科的比例。'
        ]],
        ['p', '在肥沃、又有施肥的果园地面，自然的植被就是禾草，种蔓花生等于逆着自然走。如果要种，就割高一点：保持在 15–20 厘米时，它的固氮量比保持在 5–10 厘米时更多。']
      ] },
    { t: '沙地上：蔓花生与茅草',
      take: '在干沙地上茅草会赢；能压住它的是遮荫。',
      b: [
        ['p', '在干燥的沙地上，茅草（<i>Imperata cylindrica</i>）几乎总是赢。能压住它的是遮荫。'],
        ['cmp', { a: '茅草', b: '蔓花生', rows: [
          ['地下部分', '密集的根茎；割了、烧了都会再长', '主根加匍匐茎；建立很慢'],
          ['沙地干旱', '耐得住', '固氮和生长都会放缓'],
          ['弱点', '怕遮荫', '怕被高的植物盖过']
        ] }],
        ['p', '休耕地上的树木，或高大的覆盖作物如黧豆（<i>Mucuna</i>）带来的遮荫，能压制茅草。尼日利亚的一项试验中，黧豆在一季内让茅草地上部分减少 72–92%，但根茎仍然存活，所以遮荫一停，茅草就会回来。蔓花生长得太矮，做不到。在果园里，树冠慢慢郁闭就会完成这件事。']
      ] },
    { t: '根比叶更能养土',
      take: '根的碳在土里停留的时间约长 2.4 倍，根还能造孔隙、团粒，推动养分循环。',
      b: [
        ['p', '来自根的碳在土壤中停留的时间，约是来自叶和茎的碳的 <b>2.4 倍</b>（根据少数数据完整的研究估算）。微生物把地下来源转化为稳定有机质的效率，也比地表落叶高。'],
        ['p', '根通过四种方式养土：'],
        ['ul', [
          '<b>有机质。</b>死根和根分泌的糖分喂养微生物，微生物的残体与黏土结合，成为稳定的碳。',
          '<b>孔隙。</b>生长的根把土撑开；烂掉的根留下通道，让空气、水、蚯蚓和新根通过。在紧实的底土中，这个过程很慢，也难以证实：1995 年的一篇综述发现，种两季短命作物并没有带来可测量的改变。长期存在的根系，例如常年的草被，最有可能做到。',
          '<b>胶结。</b>细根、真菌菌丝和真菌蛋白球囊霉素把黏土粘成团粒，团粒土排水好，不会板结。',
          '<b>化学与土壤生物。</b>根能释放被固定的磷，把深层养分带上来，并喂养土壤食物网。'
        ]],
        ['note', '<b>割高一点，让根继续长。</b>美国农业部一项经典研究发现，剪掉草叶面积的一半以上，根就停止生长。偶尔割草是在喂土；剃得太低反而会让养土的根缩小。']
      ] },
    { t: '割草与除草剂',
      take: '活根持续喂土；被喷死的根只喂一次。',
      b: [
        ['p', '就养土而言，割草胜过除草剂，因为割草让根活着。草甘膦这类内吸性除草剂会杀死整株植物，连根一起。那些死根只增加一次有机质，之后土壤就什么都得不到，直到有东西重新长出来。'],
        ['cmp', { a: '割草', b: '除草剂', rows: [
          ['根', '活着；每割一次就脱落再长', '死一次'],
          ['地面覆盖', '一直有覆盖', '裸露；结皮和冲刷'],
          ['有机质', '年年小量补充', '只有一次']
        ] }],
        ['p', '拔草或挖草比两者都差，因为还会破坏土壤团粒。']
      ] },
    { t: '为什么经常割草，最后只剩地毯草',
      take: '频繁割草只留下低矮的匍匐草；适度割草能保留更多种类。',
      b: [
        ['p', '频繁割草就像一个筛子，只有低矮、匍匐的草能存活，所以种类减少，地毯草（<i>Axonopus compressus</i>，俗称 cow grass）逐渐占据。这是慢慢发生的：混杂的草地可能要经过几年的定期割草，才会变成以地毯草为主。'],
        ['ul', [
          '<b>谁能存活：</b>地毯草靠匍匐茎蔓延，生长点低于割草高度。它适合湿润、微酸的土壤，也耐半阴。',
          '<b>规律：</b>物种数量在中等干扰时最多。割得太频繁只剩耐割的种类；很少割则让少数高大的草独占。',
          '<b>直接证据：</b>减少城市草坪的割草次数，植物多样性就增加了。'
        ]],
        ['p', '清一色的地毯草省事、覆盖好、长得慢。混杂的草地则有不同深度的根，土壤生物也更多。']
      ] },
    { t: '什么时候割、割多高',
      take: '每次最多割掉叶子的三分之一；割草的频率随季节调整。',
      b: [
        ['p', '针对草坪和高尔夫球场等草地的研究，有一条明确的原则：<b>每次割草，最多只割掉叶片高度的三分之一左右。</b>这条原则是为草坪而不是果园总结出来的，但背后的道理适用于所有草：割得更多，根会暂停生长一段时间，这正好与养土背道而驰。'],
        ['ul', [
          '<b>怎么用：</b>先定好想留的高度，等草长到这个高度的约 1.5 倍再割。想留 10 厘米，就在约 15 厘米时割。',
          '<b>如果草已经长得太高，</b>分两次割低，中间隔一两个星期，不要一次割完。'
        ]],
        ['p', '多久割一次，要看季节，以及你想让草发挥什么作用：'],
        ['ul', [
          '<b>一年中大部分时间：</b>按三分之一来割，不要剃得太低。叶子越多，输送给根的能量就越多。',
          '<b>旱季：</b>高草能遮住地面，但也会从果树用的同一片土里吸水。保持中等高度、把草屑留作覆盖，通常更能保住水分。干旱时草长得慢，所以少割一些，已经枯黄的草不要割。',
          '<b>雨季：</b>草长得快，要割得勤一些，方便进出。树干周围要保持矮而通风；潮湿、拥挤的树干容易引发根部和茎部病害。',
          '<b>催花前：</b>把树冠下的草割短（见<a href="#durian">榴莲</a>页）。'
        ]],
        ['note', '<b>有多可靠？</b>三分之一原则在草坪和高尔夫球场的研究中已很成熟。目前没有找到针对榴莲园的割草高度研究，所以季节建议是根据同样的科学推论出来的，并非经过试验的推荐。']
      ] },
    { t: '实际做法',
      take: '留下草屑、割高一点、逐步减少肥料。',
      b: [
        ['p', '割草、留下草屑、割高一点，并逐步减少施肥。每一步都能同时降低肥料和割草的成本。'],
        ['ul', [
          '<b>留下草屑。</b>美国一项草坪研究发现，把草屑留在草地上，氮肥可减少 50% 或更多，草坪质量不变。多余的草屑可耙到树盘当覆盖物。',
          '<b>割高一点。</b>果园地面留约 10–15 厘米是合理的高度（这是建议，不是研究数据）。',
          '<b>逐步减少肥料，</b>观察地毯草是否依然青绿茂密。',
          '<b>在杂草结籽前割，</b>不用除草剂也能改变草的组成。',
          '<b>分区管理以保留多样性：</b>走道和树盘割短，其他地方少割一些。',
          '<b>遇到茅草丛，</b>要靠遮荫和高大的覆盖作物，单靠多割不够。',
          '<b>不要拔草或挖草。</b>'
        ]],
        ['note', '<b>榴莲催花季节是例外。</b>请看<a href="#durian">榴莲</a>页。']
      ] }
  ],
  durian: {
    eyebrow: '榴莲园',
    h2: '果园地面的两个季节',
    lede: '榴莲开花需要根区传来的压力信号。新梢老熟后，根区要变干，地温也要达到一定程度。厚厚的草层和覆盖物会让根区保持湿润、凉爽。',
    normal: '平常季节', induction: '催花季节',
    normalTitle: '一年中大部分时间：养土',
    normalItems: [
      ['n1', '每隔几个月割一次草；绝不拔草或挖草'],
      ['n2', '草长到想留高度的约 1.5 倍再割（例如 15 厘米割到 10 厘米）；每次不超过三分之一'],
      ['n3', '留下草屑；多余的耙到树盘'],
      ['n4', '在杂草结籽前割掉'],
      ['n5', '减少一点肥料，观察草的状况']
    ],
    inductionTitle: '催花前和催花期间：让根区变干变暖',
    inductionItems: [
      ['i1', '把树冠下的草割短'],
      ['i2', '把草屑和覆盖物耙出根区'],
      ['i3', '暂停氮肥；氮会促发新叶而不是开花'],
      ['i4', '等最后一次新梢老熟转深绿、旱天将到时开始'],
      ['i6', '记下抽梢、旱期和第一批花芽的日期，一年年摸清自己果园的时间'],
      ['i5', '坐果后，回到平常的做法']
    ],
    clear: '清除勾选', cleared: '已清除勾选',
    cite: `已发表的资料强调抽梢后需要一段旱期（<a href="${CABI_DURIAN}">CABI：榴莲</a>）。这个做法顺应这种自然信号，不使用植物生长调节剂。勾选只保存在这部手机上。`
  },
  sources: { eyebrow: '参考文献', h2: '资料来源', lede: '所有 DOI 都已在 Crossref 登记库中核对。Crider 1955 没有 DOI。文献按原文（英文）列出。', noDoi: '无 DOI。' },
  tip: { text: '提示：安装这个应用，在果园没网也能看。榴莲清单在<a href="#durian">榴莲</a>页。', close: '关闭提示' },
  settings: {"title": "设置", "open": "打开设置", "language": "语言", "textSize": "字体大小", "sizes": ["小", "标准", "大", "特大"], "theme": "外观", "themes": {"system": "跟随手机", "light": "浅色", "dark": "深色"}, "share": "分享这个应用", "back": "返回"},
  share: {"button": "分享", "title": "分享这个应用", "scan": "用另一部手机扫码打开", "previewNote": "在 WhatsApp 中的样子", "message": "信息（可以修改）", "whatsapp": "分享到 WhatsApp", "copyLink": "复制链接", "copyMsg": "复制信息", "more": "更多方式", "copied": "链接已复制", "copiedMsg": "信息已复制", "copyFail": "无法复制，请长按文字复制。", "cardTitle": "割草养土 · Grass Cutting · Potong Rumput", "cardDesc": "割草养土，不喷除草剂。写给榴莲园主。", "text": "割草养土：用割草代替喷药来养土，附研究依据。写给榴莲园主，免费，离线也能用："},
  refs: {"cited": "被引用 {n} 次", "free": "可免费阅读", "basis": {"abs": "已对照摘要核实", "title": "仅对照标题与记录", "none": "无网上版本；依据后来的综述引用"}, "note": "引用次数来自 OpenAlex（2026 年 10 月 28 日）。每条文献下的一句话是我们自己的简短摘要。", "findings": {"10.1080/096708700227453": "黧豆一季内使茅草地上部分减少 72–92%，但根茎存活。", "10.1079/cabicompendium.8094": "地毯草资料：分布与习性。", "10.1079/cabicompendium.20179": "榴莲的生物学与生长条件资料。", "10.1016/j.agee.2019.02.016": "蔓花生保持在 15–20 厘米时固氮比 5–10 厘米多；适度采食最好。", "10.1016/s0261-2194(00)00044-2": "西非农户调查：茅草田减产，并需要更多劳力。", "10.1016/s0261-2194(01)00078-3": "以覆盖作物控制茅草，在木薯中比在玉米中更划算。", "10.1016/j.landurbplan.2018.08.009": "25 年的比较：少割的草坪植物多样性大增。", "10.1126/science.199.4335.1302": "经典论文：中等程度的干扰下多样性最高。", "10.1071/SR9950221": "根系疏通紧实底土虽有可能，但难以证实；长期根系最有希望。", "crider": "剪掉一半以上叶片，草根停止生长。", "10.1038/242344a0": "优势植物如何排挤他种，干扰又如何为更多物种留出空间。", "10.1086/283858": "计算植物利用空气中的氮、铵和硝酸盐的能量成本。", "10.3733/ucanr.8006": "加州大学的割草与留草屑指南。", "10.2135/cropsci2002.1225": "留下草屑，氮肥可减少 50% 以上而质量不变。", "10.1111/j.1365-2494.1984.tb01702.x": "五年试验：春施氮肥降低草地中白车轴草的比例。", "10.3920/978-90-8686-552-9_256": "在哥伦比亚湿润地区，蔓花生能在放牧草地中长期存活。", "10.1007/BF00011314": "综述混播牧场中豆科植物的固氮量及其限制因素。", "10.1007/bf00142871": "休耕林与覆盖作物以遮荫压制茅草。", "10.1080/07352680490505114": "综述：茅草是全球十大恶性杂草之一；长期控制需要重新植被覆盖。", "10.1007/s11104-004-0907-y": "根的碳在土中停留时间约为地上部分碳的 2.4 倍（据数据完整的研究）。", "10.4141/S04-003": "真菌蛋白球囊霉素与稳定团粒相关，且分解缓慢。", "10.1111/j.1469-8137.2004.00974.x": "综述 C4 植物如何演化，以及它们为何耐热。", "10.1104/pp.84.3.954": "氮充足时 C4 植物用氮效率较高；低氮时反而是 C3 植物较好。", "10.1038/s41561-018-0258-6": "微生物把根系来源转化为稳定土壤碳的效率高于地表落叶。", "10.1080/07352688809382257": "综述：土壤硝酸盐抑制根瘤形成与固氮。", "10.1111/j.1365-2389.1982.tb01755.x": "根和真菌菌丝把团粒粘在一起，所以土地管理方式会改变土壤结构。", "10.1146/annurev.pp.42.060191.002105": "综述固氮所需的碳（糖分）成本。", "10.1111/1365-2745.12054": "综述：植物改变土壤，改变后的土壤又决定接下来长什么。"}},
  fig: {"f1": {"mono": "单子叶", "di": "双子叶", "fibrous": "须根", "taproot": "主根", "gp": "生长点"}, "f2": {"years": "年复一年定期割草 →", "st1": "先锋草（茅草）", "st2": "混杂的草", "st3": "地毯草草毯", "som": "有机质增加"}, "f3": {"lowN": "缺氮的土", "richN": "肥沃的土", "peanutWins": "蔓花生蔓延", "grassWins": "禾草把它遮住"}, "f4": {"open": "全日照：茅草旺盛", "shade": "树冠下：茅草衰退", "rhizomes": "根茎"}, "f5": {"om": "有机质", "pores": "孔隙", "glue": "胶结", "life": "化学与生物"}, "f6": {"roots": "活根", "time": "时间 →", "cutting": "割草", "herbicide": "除草剂", "spray": "喷药", "cut": "割"}, "f7": {"y": "植物种类", "x": "割草：很少 → 很频繁", "left": "高草独占", "mid": "种类最多", "right": "多为地毯草"}, "f8": {"cut": "在这里割", "remove": "最多割掉 ⅓", "leave": "留下 ⅔", "cm": "厘米"}, "f9": {"ring": "树盘：割短", "path": "走道：割短", "rest": "其余：少割"}, "fd": {"moist": "湿润凉爽", "dry": "干燥温暖"}, "illus": "示意图，并非实测数据。", "f1b": {"grassLeaf": "禾草叶", "broadLeaf": "阔叶", "par": "平行脉", "net": "网状脉"}, "f3b": {"air": "空气中的氮", "sugar": "叶片送下\n的糖分", "nodule": "根瘤（固氮细菌）", "soilN": "土壤硝态氮\n会关掉根瘤"}, "f5b": {"cut": "割草", "dieback": "部分根\n死亡", "rot": "死根腐烂：\n养分与孔隙", "regrow": "长出\n新根"}, "f8b": {"wet": "雨季", "dry": "旱季", "ind": "催花前", "often": "割得\n勤一些", "less": "少割\n一些", "short": "树冠下\n割短"}, "fd2": {"flush": "抽新梢", "harden": "叶片老熟转深绿", "dry": "旱期：土变干变暖", "buds": "出现花芽", "note": "每年记下这些日期。"}, "f1c": {"c3sub": "多数阔叶植物、\n榴莲、豆科", "c4sub": "多数热带禾草", "o2": "误抓氧气", "pump": "二氧化碳泵", "c3note": "高温下：误抓多、\n失水多", "c4note": "高温下：先泵入二氧化碳、\n失水少"}},
  viewer: {"close": "关闭", "hint": "点图片放大或缩小", "open": "点击放大"},
  photo: {"credit": "照片：", "heading": "照片", "lede": "照片来自维基共享资源，按所示许可使用。", "cowgrassLawn": "树下的地毯草（Axonopus compressus）草坪", "cowgrassClose": "地毯草近照：叶片扁平宽阔", "lalang": "开花的茅草（Imperata cylindrica）", "pintoi": "蔓花生（Arachis pintoi）的叶和花", "durianBuds": "枝上的榴莲花芽", "durianFlowers": "榴莲花"}
},

/* ───────────────────────── Bahasa Melayu ───────────────────────── */
ms: {
  htmlLang: 'ms', code: 'BM', native: 'Bahasa Melayu',
  appName: 'Potong Rumput',
  tabs: { learn: 'Belajar', durian: 'Durian', sources: 'Sumber' },
  install: 'Pasang', installed: 'Dipasang', offline: 'Luar talian',
  iosHint: 'Ketik Kongsi, kemudian Tambah ke Skrin Utama',
  sourceOne: 'Sumber:', sourceMany: 'Sumber:',
  langMenu: { title: 'Bahasa', done: 'Selesai' },
  learn: {
    eyebrow: 'Untuk penanam durian',
    h2: 'Bina tanah dengan memotong, bukan menyembur',
    lede: 'Bagaimana rumput dan tanah saling membentuk, dengan kajian di sebalik setiap perkara. Ketik satu bahagian untuk membacanya.'
  },
  sections: [
    { t: 'Rumput monokot dan penutup bumi dikot',
      take: 'Akar serabut, titik tumbuh yang terlindung dan fotosintesis C4 yang cekap membolehkan rumput hidup di tanah yang lebih miskin.',
      b: [
        ['p', 'Tumbuhan monokot mempunyai satu kotiledon (daun lembaga) dalam biji, manakala dikot mempunyai dua. Semua rumput sebenar (famili Poaceae) ialah monokot. Dikot yang dijadikan penutup bumi ialah tumbuhan berdaun lebar seperti semanggi putih, dichondra dan kacang pintoi.'],
        ['cmp', { a: 'Monokot', b: 'Dikot', rows: [
          ['Akar', 'Jaringan akar serabut dari pangkal', 'Akar tunjang, serta akar pada buku batang menjalar', 'Akar serabut sesuai dengan tanah nipis atau padat. Akar tunjang memerlukan tanah gembur dan dalam.'],
          ['Daun', 'Sempit, urat selari', 'Lebar, urat jaring', 'Daun lebar kehilangan lebih banyak air, jadi memerlukan kelembapan yang lebih stabil.'],
          ['Titik tumbuh', 'Di pangkal, dekat tanah', 'Di hujung pucuk, di atas tanah', 'Memotong membuang hujung pucuk dikot tetapi tidak menjejaskan pangkal rumput.'],
          ['Fotosintesis', 'Kebanyakannya C4 (rumput tropika)', 'C3', 'Dalam panas dan cahaya terik, C4 biasanya menghasilkan lebih banyak pertumbuhan bagi setiap unit air dan nitrogen; di tanah yang sangat miskin, kelebihan nitrogen itu boleh hilang.']
        ] }],
        ["p", "<b>Apakah maksud C3 dan C4?</b> Nama ini merujuk kepada bilangan atom karbon dalam molekul pertama yang dibina oleh tumbuhan apabila mengambil karbon daripada udara: 3 atau 4. Perbezaan yang penting ialah cara setiap jenis menghadapi cuaca panas."],
        ["ul", ["<b>Tumbuhan C3</b> (kebanyakan tumbuhan berdaun lebar, kekacang seperti kacang pintoi, pokok termasuk durian, dan rumput iklim sejuk): enzim yang menangkap karbon dioksida tersilap menangkap oksigen, dan kesilapan ini bertambah dalam cuaca panas dan terik. Tenaga dan air terbazir, jadi ia paling sesuai di tempat sejuk atau teduh.", "<b>Tumbuhan C4</b> (kebanyakan rumput tropika, termasuk cow grass dan lalang, serta jagung dan tebu): ia terlebih dahulu 'mengepam' karbon dioksida ke dalam sel khas di dalam daun, jadi enzim itu jarang tersilap. Dalam cuaca panas dan cahaya penuh, ia tumbuh lebih banyak bagi setiap titis air, dan biasanya bagi setiap unit nitrogen.", "<b>Di lantai dusun:</b> dalam cuaca panas Malaysia, rumput C4 biasanya menang di kawasan terbuka. Di bawah naungan, kelebihan C4 berkurang, dan ini salah satu sebab rumput menjadi jarang di bawah kanopi yang rapat."]],
        ['p', 'Kekacang seperti kacang pintoi sedikit berbeza: ia menghasilkan nitrogen sendiri, jadi yang diperlukannya daripada tanah subur ialah fosforus, kalium dan kelembapan (bahagian 3).']
      ] },
    { t: 'Apa yang tumbuh ialah kad laporan tanah',
      take: 'Tumbuhan yang tumbuh mencerminkan tanah, dan tumbuhan itu perlahan-lahan mengubahnya.',
      b: [
        ['p', 'Tumbuhan yang tumbuh secara semula jadi mencerminkan air, nutrien, struktur dan sejarah gangguan tanah. Ahli ekologi menggelarnya <b>tumbuhan penunjuk</b>. Contohnya, di Afrika Barat, ladang yang dikuasai lalang mempunyai tanah yang merosot dan kurang subur.'],
        ['p', 'Kad laporan ini juga memberi kesan balik. Tumbuhan mengubah tanahnya melalui akar yang mati, rembesan akar, mikrob yang menumpang padanya dan nutrien yang ditarik dari lapisan bawah. Tanah yang berubah pula menyebelahi tumbuhan lain. <b>Suap balik tumbuhan–tanah</b> ini menggerakkan sesaran tumbuhan.'],
        ['p', 'Kita tidak boleh memilih sejenis rumput untuk membaiki tanah dalam semalam. Mengurus tumbuhan yang tumbuh di situ, terutamanya melalui cara memotongnya, ialah cara tanah menjadi lebih baik dari tahun ke tahun.']
      ] },
    { t: 'Mengapa kacang pintoi menang di tanah miskin dan kalah di tanah subur',
      take: 'Ia menghasilkan nitrogen sendiri, jadi ia menang di tempat yang kurang nitrogen tetapi kalah kerana dinaungi rumput di tanah subur.',
      b: [
        ['p', 'Kacang pintoi (<i>Arachis pintoi</i>) hanya mempunyai kelebihan apabila tanah kekurangan nitrogen. Di tanah subur, kelebihan itu hilang, dan rumput yang tumbuh lebih cepat menaunginya.'],
        ['ol', [
          '<b>Mengikat nitrogen memerlukan tenaga.</b> Bakteria bintil akar menukar nitrogen udara kepada ammonia, dibayar dengan gula tumbuhan. Kosnya lebih tinggi daripada menyerap nitrogen yang sedia ada dalam tanah.',
          '<b>Di tanah kurang nitrogen, kos itu berbaloi.</b> Rumput terbantut kerana kekurangan; kekacang tidak.',
          '<b>Di tanah subur, pengikatan nitrogen berkurang.</b> Nitrat dalam tanah menyekat bintil akar, jadi kekacang hilang kelebihannya.',
          '<b>Kemudian ia bersaing untuk cahaya dan kalah.</b> Rumput C4 tumbuh lebih tinggi dan cepat dalam cuaca panas. Di padang ragut campuran, baja nitrogen sentiasa mengurangkan bahagian kekacang.'
        ]],
        ['p', 'Di lantai dusun yang subur dan dibaja, tumbuhan semula jadinya ialah rumput, dan menanam kacang pintoi bermakna melawan arus. Jika ditanam, potong tinggi: pada 15–20 cm ia mengikat lebih banyak nitrogen berbanding 5–10 cm.']
      ] },
    { t: 'Kacang pintoi dan lalang di tanah berpasir',
      take: 'Lalang menang di pasir kering; naunganlah yang dapat menekannya.',
      b: [
        ['p', 'Di pasir kering, lalang (<i>Imperata cylindrica</i>) hampir selalu menang. Naunganlah yang dapat menekannya.'],
        ['cmp', { a: 'Lalang', b: 'Kacang pintoi', rows: [
          ['Bawah tanah', 'Rizom padat; tumbuh semula selepas dipotong dan dibakar', 'Akar tunjang dan stolon; lambat bertapak'],
          ['Kemarau di tanah pasir', 'Tahan', 'Pengikatan nitrogen dan pertumbuhan menjadi perlahan'],
          ['Kelemahan', 'Naungan', 'Ditenggelami tumbuhan yang lebih tinggi']
        ] }],
        ['p', 'Naungan daripada pokok di tanah rehat atau tanaman penutup bumi yang tinggi seperti kacang baldu (<i>Mucuna</i>) menekan lalang. Dalam satu ujian di Nigeria, kacang baldu mengurangkan pertumbuhan pucuk lalang sebanyak 72–92% dalam satu musim, tetapi rizomnya masih hidup, jadi lalang kembali jika naungan tidak berterusan. Kacang pintoi terlalu rendah untuk berbuat begitu. Di dusun, kanopi pokok yang semakin rapat akan melakukannya dari masa ke masa.']
      ] },
    { t: 'Akar membina tanah lebih daripada daun',
      take: 'Karbon akar kekal kira-kira 2.4 kali lebih lama, dan akar juga membina liang, gumpalan tanah dan kitaran nutrien.',
      b: [
        ['p', 'Karbon daripada akar kekal dalam tanah kira-kira <b>2.4 kali lebih lama</b> daripada karbon daripada daun dan batang, berdasarkan beberapa kajian yang mempunyai data lengkap. Mikrob juga menukar input bawah tanah kepada bahan organik yang stabil dengan lebih cekap berbanding sampah daun di permukaan.'],
        ['p', 'Akar membina tanah dengan empat cara:'],
        ['ul', [
          '<b>Bahan organik.</b> Akar mati dan gula akar memberi makan mikrob, dan sisa mikrob terikat pada tanah liat sebagai karbon yang stabil.',
          '<b>Liang.</b> Akar yang tumbuh menolak tanah; akar yang reput meninggalkan saluran untuk udara, air, cacing tanah dan akar baharu. Di lapisan tanah bawah yang padat, proses ini perlahan dan sukar dibuktikan: satu ulasan pada 1995 mendapati dua musim tanaman jangka pendek tidak membawa perubahan yang boleh diukur. Akar yang hidup lama, seperti litupan rumput kekal, paling berpotensi.',
          '<b>Perekat.</b> Akar halus, hifa kulat dan protein kulat glomalin mengikat tanah liat menjadi gumpalan yang menyalirkan air dan tidak memadat.',
          '<b>Kimia dan hidupan tanah.</b> Akar membebaskan fosforus yang terikat, menaikkan nutrien dari lapisan dalam dan memberi makan rantaian makanan tanah.'
        ]],
        ['note', '<b>Potong tinggi supaya akar terus tumbuh.</b> Dalam satu kajian klasik USDA, membuang lebih daripada separuh luas daun rumput menghentikan pertumbuhan akar. Potongan sekali-sekala memberi makan tanah; memotong terlalu rendah mengecilkan akar yang membina tanah.']
      ] },
    { t: 'Memotong dan racun rumpai',
      take: 'Akar hidup memberi makan tanah secara berterusan; akar yang mati disembur hanya sekali.',
      b: [
        ['p', 'Untuk membina tanah, memotong lebih baik daripada racun rumpai kerana ia mengekalkan akar hidup. Racun sistemik seperti glifosat membunuh seluruh tumbuhan, termasuk akar. Akar yang mati itu menambah bahan organik sekali sahaja, kemudian tanah tidak mendapat apa-apa sehingga sesuatu tumbuh semula.'],
        ['cmp', { a: 'Memotong', b: 'Racun rumpai', rows: [
          ['Akar', 'Hidup; gugur dan tumbuh semula setiap kali dipotong', 'Mati sekali'],
          ['Litupan tanah', 'Sentiasa berlitup', 'Terdedah; berkerak dan terhakis'],
          ['Bahan organik', 'Sedikit demi sedikit selama bertahun-tahun', 'Sekali sahaja']
        ] }],
        ['p', 'Mencabut atau menggali lebih teruk daripada kedua-duanya, kerana ia juga memecahkan gumpalan tanah.']
      ] },
    { t: 'Mengapa pemotongan kerap berakhir dengan cow grass',
      take: 'Pemotongan kerap hanya meninggalkan rumput menjalar yang rendah; pemotongan sederhana mengekalkan lebih banyak jenis.',
      b: [
        ['p', 'Pemotongan kerap bertindak seperti penapis. Hanya rumput rendah yang menjalar dapat bertahan, jadi kepelbagaian menurun dan cow grass (<i>Axonopus compressus</i>) mengambil alih. Perubahan ini berlaku perlahan: kawasan rumput campuran mungkin mengambil beberapa tahun pemotongan berkala untuk menjadi kebanyakannya cow grass.'],
        ['ul', [
          '<b>Siapa yang bertahan:</b> cow grass merebak melalui stolon dengan titik tumbuh di bawah paras pemotongan. Ia sesuai dengan tanah lembap yang sedikit berasid dan tahan separa teduh.',
          '<b>Coraknya:</b> bilangan spesies paling tinggi pada gangguan sederhana. Pemotongan terlalu kerap hanya meninggalkan spesies yang tahan; pemotongan yang jarang membiarkan beberapa spesies tinggi menguasai.',
          '<b>Bukti langsung:</b> mengurangkan kekerapan memotong rumput di bandar meningkatkan kepelbagaian tumbuhan.'
        ]],
        ['p', 'Hamparan cow grass yang seragam mudah dijaga, melitupi tanah dengan baik dan tumbuh perlahan. Rumput campuran mempunyai akar pada lebih banyak kedalaman dan lebih banyak hidupan tanah.']
      ] },
    { t: 'Bila hendak memotong, dan setinggi mana',
      take: 'Jangan buang lebih daripada satu pertiga daun sekali potong, dan ubah kekerapan memotong mengikut musim.',
      b: [
        ['p', 'Kajian tentang laman rumput dan padang seperti padang golf memberi satu peraturan yang jelas: <b>jangan buang lebih daripada kira-kira satu pertiga ketinggian daun dalam satu potongan.</b> Peraturan ini dibina untuk laman rumput, bukan dusun, tetapi sebab di sebaliknya terpakai untuk semua rumput: memotong lebih banyak menghentikan pertumbuhan akar buat seketika, iaitu bertentangan dengan usaha membina tanah.'],
        ['ul', [
          '<b>Cara menggunakannya:</b> pilih ketinggian yang hendak ditinggalkan, kemudian potong apabila rumput mencapai kira-kira 1.5 kali ketinggian itu. Untuk meninggalkan 10 cm, potong pada kira-kira 15 cm.',
          '<b>Jika rumput sudah terlalu tinggi,</b> rendahkan dalam dua kali potongan dengan selang satu atau dua minggu, bukan sekali gus.'
        ]],
        ['p', 'Kekerapan memotong bergantung pada musim dan peranan yang anda mahu rumput mainkan:'],
        ['ul', [
          '<b>Sepanjang tahun:</b> potong ikut satu pertiga dan jangan potong terlalu rendah. Lebih banyak daun bermakna lebih banyak tenaga untuk akar.',
          '<b>Musim kemarau:</b> rumput tinggi meneduhkan tanah tetapi juga menyedut air daripada tanah yang sama digunakan oleh pokok. Ketinggian sederhana dengan keratan ditinggalkan sebagai sungkupan biasanya lebih menjimatkan kelembapan. Rumput tumbuh perlahan semasa kemarau, jadi kurangkan kekerapan memotong, dan jangan potong rumput yang sudah menguning.',
          '<b>Musim hujan:</b> rumput tumbuh cepat, jadi potong lebih kerap supaya mudah keluar masuk. Pastikan kawasan sekeliling batang pokok rendah dan berudara; batang yang lembap dan sesak menggalakkan penyakit akar dan batang.',
          '<b>Sebelum aruhan bunga:</b> potong pendek di bawah kanopi (lihat tab <a href="#durian">Durian</a>).'
        ]],
        ['note', '<b>Sejauh mana pasti?</b> Peraturan satu pertiga sudah mantap dalam kajian laman rumput dan padang golf. Tiada kajian tentang ketinggian memotong khusus untuk dusun durian ditemui, jadi nasihat bermusim ini menggunakan sains yang sama, bukan cadangan yang telah diuji.']
      ] },
    { t: 'Mempraktikkannya',
      take: 'Tinggalkan keratan rumput, potong tinggi dan kurangkan baja secara berperingkat.',
      b: [
        ['p', 'Potong, tinggalkan keratan, potong lebih tinggi, dan kurangkan baja secara berperingkat. Setiap langkah menurunkan kos baja dan kos memotong.'],
        ['ul', [
          '<b>Tinggalkan keratan rumput.</b> Dalam satu kajian laman di Amerika Syarikat, memulangkan keratan rumput membolehkan baja nitrogen dikurangkan 50% atau lebih tanpa menjejaskan kualiti. Sapukan lebihan ke bulatan pokok sebagai sungkupan.',
          '<b>Potong lebih tinggi.</b> Kira-kira 10–15 cm ialah ketinggian yang munasabah untuk lantai dusun (cadangan, bukan daripada kajian).',
          '<b>Kurangkan baja secara beransur-ansur</b> dan perhatikan sama ada cow grass kekal hijau dan padat.',
          '<b>Potong sebelum rumpai berbiji</b> untuk mengubah campuran rumput tanpa racun.',
          '<b>Gunakan zon untuk kepelbagaian:</b> laluan dan bulatan pokok dipotong pendek, selebihnya jarang dipotong.',
          '<b>Di tompok lalang,</b> gunakan naungan dan tanaman penutup bumi yang tinggi, bukan sekadar memotong lebih kerap.',
          '<b>Jangan cabut atau gali.</b>'
        ]],
        ['note', '<b>Musim aruhan bunga durian ialah pengecualian.</b> Lihat tab <a href="#durian">Durian</a>.']
      ] }
  ],
  durian: {
    eyebrow: 'Dusun durian',
    h2: 'Dua musim di lantai dusun',
    lede: 'Pembungaan durian memerlukan isyarat tekanan daripada zon akar. Selepas pucuk daun matang, zon akar mesti kering dan suhu tanah mesti mencapai tahap tertentu. Lapisan rumput yang tebal dan sungkupan mengekalkannya lembap dan sejuk.',
    normal: 'Musim biasa', induction: 'Musim aruhan',
    normalTitle: 'Sepanjang tahun: bina tanah',
    normalItems: [
      ['n1', 'Potong setiap beberapa bulan; jangan sekali-kali cabut atau gali'],
      ['n2', 'Potong apabila rumput mencapai kira-kira 1.5 kali ketinggian yang ditinggalkan (cth. 15 cm ke 10 cm); jangan buang lebih daripada satu pertiga'],
      ['n3', 'Tinggalkan keratan; sapukan lebihan ke bulatan pokok'],
      ['n4', 'Potong rumpai sebelum ia berbiji'],
      ['n5', 'Kurangkan baja sedikit dan perhatikan rumput']
    ],
    inductionTitle: 'Sebelum dan semasa aruhan: biarkan zon akar kering dan panas',
    inductionItems: [
      ['i1', 'Potong pendek di bawah kanopi'],
      ['i2', 'Sapukan keratan dan sungkupan keluar dari zon akar'],
      ['i3', 'Tahan baja nitrogen; ia menggalakkan pucuk daun, bukan bunga'],
      ['i4', 'Mulakan apabila pucuk daun terakhir sudah keras dan hijau tua, dan cuaca kering hampir tiba'],
      ['i6', 'Catat tarikh pucuk, musim kering dan putik bunga pertama, untuk mengenal masa dusun anda dari tahun ke tahun'],
      ['i5', 'Selepas buah menjadi, kembali kepada kitaran biasa']
    ],
    clear: 'Kosongkan tanda', cleared: 'Tanda dikosongkan',
    cite: `Panduan yang diterbitkan menekankan tempoh kering selepas pucuk daun (<a href="${CABI_DURIAN}">CABI: Durio zibethinus</a>). Pendekatan ini menggunakan isyarat semula jadi itu, tanpa pengawal atur tumbesaran. Tanda hanya disimpan dalam telefon ini.`
  },
  sources: { eyebrow: 'Rujukan', h2: 'Sumber', lede: 'Setiap DOI telah disemak dengan daftar Crossref. Crider 1955 tiada DOI. Rujukan disenaraikan dalam bahasa asalnya (Inggeris).', noDoi: 'Tiada DOI.' },
  tip: { text: 'Petua: pasang aplikasi ini supaya boleh dibaca tanpa internet di dusun. Senarai semak durian ada di tab <a href="#durian">Durian</a>.', close: 'Tutup petua' },
  settings: {"title": "Tetapan", "open": "Buka tetapan", "language": "Bahasa", "textSize": "Saiz teks", "sizes": ["Kecil", "Biasa", "Besar", "Sangat besar"], "theme": "Paparan", "themes": {"system": "Ikut telefon", "light": "Cerah", "dark": "Gelap"}, "share": "Kongsi aplikasi ini", "back": "Kembali"},
  share: {"button": "Kongsi", "title": "Kongsi aplikasi ini", "scan": "Imbas untuk buka di telefon lain", "previewNote": "Rupanya di WhatsApp", "message": "Mesej (boleh diubah)", "whatsapp": "Kongsi di WhatsApp", "copyLink": "Salin pautan", "copyMsg": "Salin mesej", "more": "Pilihan lain", "copied": "Pautan disalin", "copiedMsg": "Mesej disalin", "copyFail": "Tidak dapat menyalin. Tekan lama pada teks untuk menyalin.", "cardTitle": "割草养土 · Grass Cutting · Potong Rumput", "cardDesc": "Kurangkan penyemburan racun rumpai; bina tanah dengan memotong. Untuk penanam durian.", "text": "Potong Rumput: cara memotong rumput untuk mengurangkan penyemburan racun rumpai dan membina tanah dusun, berserta kajian di sebaliknya. Untuk penanam durian, percuma dan boleh digunakan tanpa internet:"},
  refs: {"cited": "Dipetik {n} kali", "free": "Percuma dibaca", "basis": {"abs": "Disemak dengan abstrak", "title": "Disemak dengan tajuk dan rekod sahaja", "none": "Tiada dalam talian; dipetik daripada ulasan kemudian"}, "note": "Bilangan petikan daripada OpenAlex, 28 Okt 2026. Ayat di bawah setiap sumber ialah ringkasan pendek kami sendiri.", "findings": {"10.1080/096708700227453": "Kacang baldu mengurangkan pucuk lalang 72–92% dalam satu musim, tetapi rizom masih hidup.", "10.1079/cabicompendium.8094": "Profil rujukan cow grass: taburan dan tabiatnya.", "10.1079/cabicompendium.20179": "Profil rujukan biologi dan keadaan tumbesaran durian.", "10.1016/j.agee.2019.02.016": "Kacang pintoi pada 15–20 cm mengikat lebih banyak nitrogen berbanding 5–10 cm; ragutan sederhana paling baik.", "10.1016/s0261-2194(00)00044-2": "Tinjauan petani di Afrika Barat: ladang lalang kurang hasil dan memerlukan lebih banyak tenaga kerja.", "10.1016/s0261-2194(01)00078-3": "Untuk mengawal lalang, tanaman penutup bumi lebih menguntungkan dalam ubi kayu berbanding jagung.", "10.1016/j.landurbplan.2018.08.009": "Selepas 25 tahun, laman yang jarang dipotong jauh lebih pelbagai tumbuhannya.", "10.1126/science.199.4335.1302": "Kertas klasik: kepelbagaian paling tinggi pada gangguan sederhana.", "10.1071/SR9950221": "Akar membuka tanah bawah yang padat mungkin berlaku tetapi sukar dibuktikan; akar jangka panjang paling berpotensi.", "crider": "Membuang lebih separuh daun menghentikan pertumbuhan akar rumput.", "10.1038/242344a0": "Bagaimana tumbuhan dominan menyesakkan yang lain, dan gangguan memberi ruang kepada lebih banyak spesies.", "10.1086/283858": "Mengira kos tenaga bagi tumbuhan menggunakan nitrogen udara, ammonium dan nitrat.", "10.3733/ucanr.8006": "Panduan Universiti California tentang memotong rumput dan meninggalkan keratan.", "10.2135/cropsci2002.1225": "Memulangkan keratan membolehkan baja nitrogen dikurangkan 50% atau lebih tanpa menjejaskan kualiti.", "10.1111/j.1365-2494.1984.tb01702.x": "Ujian lima tahun: baja nitrogen musim bunga mengurangkan bahagian semanggi dalam rumput campuran.", "10.3920/978-90-8686-552-9_256": "Kacang pintoi kekal baik dalam padang ragut rumput di Colombia yang lembap.", "10.1007/BF00011314": "Ulasan tentang jumlah nitrogen yang diikat kekacang dalam padang campuran, dan apa yang mengehadkannya.", "10.1007/bf00142871": "Pokok tanah rehat dan tanaman penutup bumi menekan lalang dengan naungan.", "10.1080/07352680490505114": "Ulasan: lalang antara sepuluh rumpai terburuk dunia; kawalan jangka panjang memerlukan penanaman semula.", "10.1007/s11104-004-0907-y": "Karbon akar kekal dalam tanah kira-kira 2.4 kali lebih lama daripada karbon pucuk, daripada kajian berdata lengkap.", "10.4141/S04-003": "Protein kulat glomalin berkait dengan gumpalan tanah yang stabil dan lambat terurai.", "10.1111/j.1469-8137.2004.00974.x": "Ulasan tentang evolusi tumbuhan C4 dan mengapa ia subur dalam cuaca panas.", "10.1104/pp.84.3.954": "Apabila nitrogen banyak, tumbuhan C4 lebih cekap; pada nitrogen rendah, tumbuhan C3 lebih baik.", "10.1038/s41561-018-0258-6": "Mikrob menukar input akar kepada karbon tanah yang stabil dengan lebih cekap daripada sampah permukaan.", "10.1080/07352688809382257": "Ulasan: nitrat dalam tanah menyekat pembentukan bintil dan pengikatan nitrogen.", "10.1111/j.1365-2389.1982.tb01755.x": "Akar dan hifa kulat mengikat gumpalan tanah, jadi cara tanah diurus mengubah strukturnya.", "10.1146/annurev.pp.42.060191.002105": "Ulasan tentang kos karbon (gula) untuk mengikat nitrogen.", "10.1111/1365-2745.12054": "Ulasan: tumbuhan mengubah tanahnya, dan tanah yang berubah menentukan tumbuhan seterusnya."}},
  fig: {"f1": {"mono": "Monokot", "di": "Dikot", "fibrous": "Akar serabut", "taproot": "Akar tunjang", "gp": "Titik tumbuh"}, "f2": {"years": "Bertahun-tahun memotong secara berkala →", "st1": "Perintis\n(lalang)", "st2": "Rumput\ncampuran", "st3": "Hamparan\ncow grass", "som": "Lebih bahan\norganik"}, "f3": {"lowN": "Tanah kurang nitrogen", "richN": "Tanah subur", "peanutWins": "Kacang pintoi merebak", "grassWins": "Rumput menaunginya"}, "f4": {"open": "Cahaya penuh: lalang subur", "shade": "Bawah kanopi: lalang lemah", "rhizomes": "Rizom"}, "f5": {"om": "Bahan organik", "pores": "Liang", "glue": "Perekat", "life": "Kimia & hidupan"}, "f6": {"roots": "Akar hidup", "time": "Masa →", "cutting": "Memotong", "herbicide": "Racun rumpai", "spray": "sembur", "cut": "potong"}, "f7": {"y": "Kepelbagaian tumbuhan", "x": "Memotong: jarang → sangat kerap", "left": "Rumput tinggi menguasai", "mid": "Paling pelbagai", "right": "Kebanyakan cow grass"}, "f8": {"cut": "Potong di sini", "remove": "Buang ≤ ⅓", "leave": "Tinggal ⅔", "cm": "cm"}, "f9": {"ring": "Bulatan pokok: pendek", "path": "Laluan: pendek", "rest": "Selebihnya: jarang dipotong"}, "fd": {"moist": "Lembap dan sejuk", "dry": "Kering dan panas"}, "illus": "Ilustrasi idea, bukan data yang diukur.", "f1b": {"grassLeaf": "Daun rumput", "broadLeaf": "Daun lebar", "par": "Urat selari", "net": "Urat jaring"}, "f3b": {"air": "Nitrogen dari udara", "sugar": "Gula dari\ndaun", "nodule": "Bintil akar (bakteria)", "soilN": "Nitrat tanah\nmematikannya"}, "f5b": {"cut": "Potong rumput", "dieback": "Sebahagian\nakar mati", "rot": "Akar mati reput:\nmakanan & liang", "regrow": "Akar baharu\ntumbuh"}, "f8b": {"wet": "Musim hujan", "dry": "Kemarau", "ind": "Sebelum aruhan", "often": "Potong lebih\nkerap", "less": "Kurang\nmemotong", "short": "Potong pendek\nbawah kanopi"}, "fd2": {"flush": "Pucuk daun baharu", "harden": "Daun keras, hijau tua", "dry": "Musim kering: tanah kering, panas", "buds": "Putik bunga muncul", "note": "Catat tarikh ini setiap tahun."}, "f1c": {"c3sub": "Kebanyakan daun lebar,\ndurian, kekacang", "c4sub": "Kebanyakan rumput\ntropika", "o2": "Tersilap ambil O₂", "pump": "Pam CO₂", "c3note": "Dalam panas: lebih silap,\nlebih banyak air hilang", "c4note": "Dalam panas: CO₂ dipam,\nkurang air hilang"}},
  viewer: {"close": "Tutup", "hint": "Ketik gambar untuk zum masuk atau keluar", "open": "Ketik untuk besarkan"},
  photo: {"credit": "Foto:", "heading": "Foto", "lede": "Foto daripada Wikimedia Commons, digunakan di bawah lesen yang ditunjukkan.", "cowgrassLawn": "Cow grass (Axonopus compressus) sebagai laman di bawah pokok", "cowgrassClose": "Cow grass dari dekat: daun leper dan lebar", "lalang": "Lalang (Imperata cylindrica) sedang berbunga", "pintoi": "Kacang pintoi (Arachis pintoi): daun dan bunga", "durianBuds": "Putik bunga durian pada dahan", "durianFlowers": "Bunga durian"}
}
};
