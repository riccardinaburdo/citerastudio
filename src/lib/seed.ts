import type { ProjectData } from './schema';

export const defaultData: ProjectData = {
  info: {
    id: 'default',
    name: 'Villa delle Azalee — Full Renovation',
    location: 'Contrada Monti Ausoni, Alberobello (BA) — Puglia, Italy',
    clientName: 'Mr. & Mrs. James Thompson',
    clientEmail: 'j.thompson@example.com',
    architect: 'Arch. Vito Depalo — CiteraStudio',
    start: '2024-04-15',
    end: '2025-01-31',
    updated: '2024-11-01',
    updateNum: 3,
  },
  contractors: [
    {
      id: 'C1',
      name: 'Costruzioni Generali S.r.l.',
      trade: 'Structural & Civil Works',
      contact: 'ing. Marco Russo — +39 080 555 0123',
      sal: [
        { id: 'DEP',  label: 'Initial Deposit',    triggerType: 'signing',  triggerPct: null, pct: 20 },
        { id: 'SAL1', label: 'Progress Payment 1', triggerType: 'percent',  triggerPct: 30,   pct: 10 },
        { id: 'SAL2', label: 'Progress Payment 2', triggerType: 'percent',  triggerPct: 60,   pct: 30 },
        { id: 'SAL3', label: 'Progress Payment 3', triggerType: 'percent',  triggerPct: 90,   pct: 30 },
        { id: 'FIN',  label: 'Final Balance',       triggerType: 'final',    triggerPct: null, pct: 10 },
      ],
    },
    {
      id: 'C2',
      name: 'Tekne Impianti S.r.l.',
      trade: 'MEP — Plumbing & Electrical',
      contact: 'geom. Laura Vitale — +39 080 555 0456',
      sal: [
        { id: 'DEP',  label: 'Initial Deposit',    triggerType: 'signing',  triggerPct: null, pct: 30 },
        { id: 'SAL1', label: 'Progress Payment 1', triggerType: 'percent',  triggerPct: 50,   pct: 40 },
        { id: 'FIN',  label: 'Final Balance',       triggerType: 'final',    triggerPct: null, pct: 30 },
      ],
    },
    {
      id: 'C3',
      name: 'Infissi Puglia S.r.l.',
      trade: 'Doors, Windows & Shutters',
      contact: 'sig. Antonio Greco — +39 080 555 0789',
      sal: [
        { id: 'DEP',  label: 'Initial Deposit',    triggerType: 'signing',  triggerPct: null, pct: 25 },
        { id: 'SAL1', label: 'Progress Payment 1', triggerType: 'percent',  triggerPct: 50,   pct: 50 },
        { id: 'FIN',  label: 'Final Balance',       triggerType: 'final',    triggerPct: null, pct: 25 },
      ],
    },
  ],
  categories: [
    {
      id: 'A',
      label: 'Site Preparation & Demolition',
      items: [
        { id: 'A.01', brief: 'Demolition of existing masonry structures', fullDesc: 'Demolition of existing load-bearing masonry walls and non-structural partitions using mechanical equipment and hand tools where required. Includes removal of debris, sorting for recycling, and loading into skips for disposal off-site. Works to be carried out in accordance with the approved demolition method statement and Health & Safety plan.', unit: 'm³', qty: 48, price: 73.50, done: 52, extra: false, contractor: 'C1' },
        { id: 'A.02', brief: 'Removal of old roof covering and flashings', fullDesc: 'Complete removal of existing clay roof tiles, timber battens, and underlay. Includes removal of all lead and mortar flashings at abutments, ridges, and valleys. Material to be sorted on-site; salvageable tiles to be stacked and made available to Client; remainder to be disposed of off-site.', unit: 'm²', qty: 320, price: 9.63, done: 320, extra: false, contractor: 'C1' },
        { id: 'A.03', brief: 'Removal of existing floor finishes and screed', fullDesc: 'Mechanical removal of existing ceramic floor tiles, adhesive bed, and sand-cement screed throughout ground floor. Includes cutting at perimeter walls and around service penetrations. Debris to be removed off-site. Sub-base to be left clean and level, ready to receive new insulation and screed.', unit: 'm²', qty: 415, price: 7.00, done: 370, extra: false, contractor: 'C1' },
        { id: 'A.04', brief: 'Stripping of deteriorated internal plaster', fullDesc: '', unit: 'm²', qty: 580, price: 6.56, done: 400, extra: false, contractor: 'C1' },
      ],
    },
    {
      id: 'B',
      label: 'Structural Works',
      items: [
        { id: 'B.01', brief: 'Reinforced concrete — foundations & ring beams', fullDesc: '', unit: 'm³', qty: 85, price: 175.00, done: 80, extra: false, contractor: 'C1' },
        { id: 'B.02', brief: 'Steel reinforcement bars, cut & fixed', fullDesc: '', unit: 'kg', qty: 8500, price: 1.75, done: 8000, extra: false, contractor: 'C1' },
        { id: 'B.03', brief: 'Load-bearing concrete block masonry walls', fullDesc: '', unit: 'm²', qty: 280, price: 68.25, done: 230, extra: false, contractor: 'C1' },
      ],
    },
    {
      id: 'C',
      label: 'Internal Finishes',
      items: [
        { id: 'C.01', brief: 'Three-coat internal plaster with skim finish', fullDesc: "Application of three-coat plaster system to all internal masonry walls and soffits: scratch coat (12 mm), floating coat (8 mm), and finishing skim coat (3 mm). All coats to be applied in accordance with manufacturer's instructions. Surfaces to be prepared and left ready for decoration. Beads and stops to be provided at all junctions and openings.", unit: 'm²', qty: 1250, price: 18.40, done: 950, extra: false, contractor: 'C1' },
        { id: 'C.02', brief: 'Screed flooring base, 60 mm thick', fullDesc: 'Supply and lay 60 mm sand-cement screed (mix 1:4) over insulation boards. Includes primer to receive screed, polythene separator layer, and expansion joints at perimeter and intermediate positions as required. Surface to be finished to receive floor tiles; tolerance ±3 mm under 2 m straight-edge.', unit: 'm²', qty: 850, price: 12.25, done: 780, extra: false, contractor: 'C1' },
        { id: 'C.03', brief: 'Porcelain floor tiles 60×60 cm, laid & grouted', fullDesc: '', unit: 'm²', qty: 780, price: 48.00, done: 600, extra: false, contractor: 'C1' },
        { id: 'C.04', brief: 'Ceramic wall tiles, bathrooms & kitchen', fullDesc: '', unit: 'm²', qty: 320, price: 42.00, done: 280, extra: false, contractor: 'C1' },
        { id: 'C.05', brief: 'Interior emulsion paint, two finish coats', fullDesc: '', unit: 'm²', qty: 2100, price: 6.30, done: 1800, extra: false, contractor: 'C1' },
        { id: 'C.EX1', brief: 'Feature stone cladding — entrance hall', fullDesc: 'EXTRA WORK — variation agreed 12/09/2024. Supply and fix natural travertine stone cladding panels (600×300 mm, 20 mm thick) to entrance hall walls as per revised design drawings Rev.C. Includes adhesive, stainless-steel fixings, grout, and sealant. All stone to be from single batch to ensure colour consistency. Price includes wastage allowance of 15%.', unit: 'm²', qty: 0, price: 185.00, done: 45, extra: true, contractor: 'C1' },
      ],
    },
    {
      id: 'D',
      label: 'Roofing Works',
      items: [
        { id: 'D.01', brief: 'Torch-on waterproofing membrane, 4 mm', fullDesc: '', unit: 'm²', qty: 320, price: 24.50, done: 320, extra: false, contractor: 'C1' },
        { id: 'D.02', brief: 'XPS thermal insulation boards, 80 mm', fullDesc: '', unit: 'm²', qty: 320, price: 21.00, done: 320, extra: false, contractor: 'C1' },
        { id: 'D.03', brief: 'Clay roof tiles, ridges, verges & flashings', fullDesc: '', unit: 'm²', qty: 285, price: 38.50, done: 270, extra: false, contractor: 'C1' },
      ],
    },
    {
      id: 'E',
      label: 'Doors & Windows',
      items: [
        { id: 'E.01', brief: 'PVC triple-glazed windows (Uw ≤ 1.2 W/m²K)', fullDesc: 'Supply and install PVC-U triple-glazed window units with thermally-broken frames to all openings as scheduled. Uw value not to exceed 1.2 W/m²K. Glazing units to be argon-filled with low-E coating. Includes internal and external cills, reveals, and mastic sealant. Hardware to be Grade 304 stainless steel. Colour: RAL 9010 Pure White both sides.', unit: 'unit', qty: 28, price: 485.00, done: 24, extra: false, contractor: 'C3' },
        { id: 'E.02', brief: 'Internal timber doors, frame & ironmongery', fullDesc: 'Supply and hang solid-core internal timber doors (44 mm thick) complete with timber frames, stops, and ironmongery as per hardware schedule. Doors to be pre-hung and supplied in sets. Ironmongery to include: lever handle on rose, ball-catch or latch, hinges (3 per leaf), and door stop. All items to be brushed satin stainless steel (Grade 316).', unit: 'unit', qty: 45, price: 320.00, done: 37, extra: false, contractor: 'C3' },
        { id: 'E.03', brief: 'Security entrance doors, Class 3 anti-burglary', fullDesc: '', unit: 'unit', qty: 8, price: 1850.00, done: 6, extra: false, contractor: 'C3' },
        { id: 'E.04', brief: 'Motorised aluminium external shutters', fullDesc: '', unit: 'unit', qty: 28, price: 380.00, done: 18, extra: false, contractor: 'C3' },
      ],
    },
    {
      id: 'F',
      label: 'Plumbing & Drainage',
      items: [
        { id: 'F.01', brief: 'Hot & cold water supply pipework (multi-layer)', fullDesc: 'Supply and install hot and cold water distribution pipework throughout all units using multi-layer composite pipe (AL-PE-X) with push-fit fittings. Includes manifold distribution system with isolation valves per circuit, pressure testing to 10 bar, flushing, and commissioning. All pipework to be insulated to current Part L requirements. As-fitted drawings to be provided on completion.', unit: 'lump', qty: 1, price: 18500, done: 1, extra: false, contractor: 'C2' },
        { id: 'F.02', brief: 'Internal drainage & soil pipework, PVC', fullDesc: 'Supply and install above-ground soil, waste, and vent pipework in uPVC (BS EN 1329) for all 8 bathrooms, kitchen, and utility areas. Includes all fittings, access covers, and connections to existing below-ground drainage. Pipework to be clipped at centres specified in BS EN 12056. Acoustic insulation wrap to all soil stacks passing through habitable rooms.', unit: 'lump', qty: 1, price: 8750, done: 1, extra: false, contractor: 'C2' },
        { id: 'F.03', brief: 'Bathroom fittings & sanitary ware (8 bathrooms)', fullDesc: '', unit: 'lump', qty: 1, price: 22400, done: 0, extra: false, contractor: 'C2' },
        { id: 'F.EX1', brief: 'External rainwater harvesting tank', fullDesc: 'EXTRA WORK — client instruction ref. CI-007 dated 03/10/2024. Supply and install 10,000-litre underground polyethylene rainwater harvesting tank, complete with: inlet filter, overflow to soakaway, submersible pump, control panel, and distribution pipework to garden irrigation taps (4 no.). Excavation, backfill, and reinstatement of paved surface included.', unit: 'lump', qty: 0, price: 4800, done: 1, extra: true, contractor: 'C2' },
      ],
    },
    {
      id: 'G',
      label: 'Electrical Installation',
      items: [
        { id: 'G.01', brief: 'Full electrical installation, 8 units', fullDesc: '', unit: 'lump', qty: 1, price: 28500, done: 0, extra: false, contractor: 'C2' },
        { id: 'G.02', brief: 'TV, data & structured cabling Cat.6', fullDesc: '', unit: 'lump', qty: 1, price: 4800, done: 0, extra: false, contractor: 'C2' },
      ],
    },
    {
      id: 'H',
      label: 'Site Management & Safety',
      items: [
        { id: 'H.01', brief: 'Health & safety plan implementation (PSC)', fullDesc: '', unit: 'lump', qty: 1, price: 12500, done: 1, extra: false, contractor: 'C1' },
      ],
    },
  ],
};
