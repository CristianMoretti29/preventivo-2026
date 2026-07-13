export const DEFAULT_STATE = {
  schemaVersion: 1,
  title: "Simulazione Preventivo 2026",
  scenario: {
    presidioHours: 20,
    discountRate: 10,
    vatRate: 10
  },
  generalExpenses: [
    { id: "assicurazione", label: "Assicurazione", old: 30426, new: 29230.60, note: "" },
    { id: "conto", label: "Spese tenuta conto corrente", old: 500, new: 500, note: "" },
    { id: "amministrazione", label: "Amministrazione condominio", old: 34000, new: 34000, note: "" },
    { id: "fiscali", label: "Spese fiscali e adempimenti privacy", old: 1000, new: 1000, note: "" },
    { id: "varie-generali", label: "Varie", old: 0, new: 0, note: "" }
  ],
  serviceExpenses: [
    {
      id: "techbau",
      label: "Contratto Techbau",
      old: 245000,
      new: 0,
      note: "In attesa di riscontro riguardo il presidio e l’IVA applicata alle fatture",
      computed: true
    },
    { id: "pulizia", label: "Servizio di pulizia", old: 87120, new: 58084.68, note: "KIO Multiservizi" },
    { id: "portineria", label: "Servizio di portineria", old: 0, new: 33017.40, note: "KIO Multiservizi - 45H settimanali" },
    { id: "bagnanti", label: "Servizio di assistenza bagnanti", old: 0, new: 11006.84, note: "A.S.D. Aquareal - 7 giorni su 7 dalle 9 alle 19 - Dal 15 giugno al 15 settembre" },
    { id: "videosorveglianza", label: "Servizio di videosorveglianza", old: 0, new: 23712, note: "Axitea - Control room H24" }
  ],
  consumptionExpenses: [
    { id: "idrico", label: "Consumo idrico", old: 100000, new: 100000, note: "" },
    { id: "energia-comune", label: "Consumo energia elettrica parti comuni", old: 30000, new: 30000, note: "" },
    { id: "energia-private", label: "Consumo energia elettrica private", old: 90000, new: 90000, note: "" }
  ],
  oneTimeExpenses: [
    { id: "arredo-piscina", label: "Arredo piscina", old: 0, new: 20000, note: "" }
  ],
  contractItems: [
    { id: "impianti-elettrici", label: "Impianti elettrici e speciali", amount: 30000, note: "", included: true, kind: "base" },
    { id: "impianti-meccanici", label: "Impianti meccanici", amount: 50000, note: "", included: true, kind: "base" },
    { id: "fotovoltaico", label: "Impianto fotovoltaico", amount: 15820, note: "", included: true, kind: "base" },
    { id: "antincendio", label: "Presidi fissi antincendio", amount: 6000, note: "", included: true, kind: "base" },
    { id: "edile", label: "Edile", amount: 15820, note: "", included: true, kind: "base" },
    { id: "linee-vita", label: "Linee Vita", amount: 8678, note: "", included: true, kind: "base" },
    { id: "cancelli", label: "Cancelli carrai e pedonali", amount: 1650, note: "", included: true, kind: "base" },
    { id: "piscina", label: "Manutenzione piscina", amount: 12995, note: "", included: true, kind: "base" },
    { id: "verde", label: "Manutenzione verde", amount: 27891, note: "", included: true, kind: "base" },
    { id: "ascensori", label: "Ascensori - Servizio GOLD", amount: 21177, note: "", included: true, kind: "base" },
    { id: "portierato-techbau", label: "Portierato", amount: 0, note: "36.504,00 € rimossi", included: false, kind: "base" },
    { id: "derattizzazione", label: "Derattizzazione", amount: 16500, note: "Valutare se rimuovere per affidare il servizio a Global services", included: true, kind: "base" },
    { id: "varie-techbau", label: "Varie ed inconvenienti", amount: 0, note: "6.215,00 € rimossi", included: false, kind: "base" },
    { id: "presidio-20", label: "Presidio fisso 20 h", amount: 57500, note: "", included: true, kind: "presidio", hours: 20 },
    { id: "presidio-40", label: "Presidio fisso 40 h", amount: 115000, note: "", included: true, kind: "presidio", hours: 40 }
  ],
  units: [
    { id: "trilocale", name: "Trilocale", millesimi: 5 },
    { id: "bilocale", name: "Bilocale", millesimi: 3.74 }
  ],
  notes: {
    water: "4 UTENZE ATTIVE, UNA CHE SERVE LE SCALE A-B-C-D-E-F-G-H, UNA LE SCALE H ED I, UNA PER ANTINCENDIO AUTORIMESSA GRANDE ED UNA PER ANTINCENDIO AUTORIMESSA PICCOLA. A FINE ANNO AVREMO UNA STIMA MAGGIORMENTE REALISTICA DEL CONSUMO UNA VOLTA CHE CI SARÀ UNA MAGGIORE PERCENTUALE DI OCCUPAZIONE DELLE UNITÀ. A PREVENTIVO LA SPESA VIENE SUDDIVISA PER MILLESIMI, MENTRE A CONSUNTIVO VERRÀ SUDDIVISA PER IL REALE CONSUMO.",
    electricity: "14 POD ATTIVI. 10 PER LE SINGOLE SCALE CHE FORNISCONO ENERGIA ELETTRICA PER LE PARTI COMUNI (ILLUMINAZIONE E FORZA MOTRICE ASCENSORE) E PER LE PARTI PRIVATE. QUESTI POD ALIMENTANO I GRUPPI FRIGO/POMPE DI CALORE E LE CENTRALI IDRICHE CHE FORNISCONO ALL’INTERNO DEGLI APPARTAMENTI RISCALDAMENTO/RAFFRESCAMENTO ED ACQUA CALDA SANITARIA. I CONSUMI VERRANNO CHIESTI A PREVENTIVO SECONDO I MILLESIMI, MA VERRANNO CONSUNTIVATI SECONDO I REALI CONSUMI. GLI ALTRI 4 POD SERVONO: 1. AUTORIMESSA A 1ª PARTE; 2. AUTORIMESSA A 2ª PARTE; 3. AUTORIMESSA B; 4. PARCO."
  }
};

export function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

export function safeNumber(value) {
  const number = typeof value === "number" ? value : Number(String(value).replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

export function calculateContract(state) {
  const items = Array.isArray(state.contractItems) ? state.contractItems : [];
  const base = items
    .filter(item => item.kind !== "presidio" && item.included)
    .reduce((sum, item) => sum + safeNumber(item.amount), 0);

  const selectedHours = safeNumber(state.scenario?.presidioHours) || 20;
  const selectedPresidio = items.find(item => item.kind === "presidio" && safeNumber(item.hours) === selectedHours);
  const presidio = selectedPresidio && selectedPresidio.included ? safeNumber(selectedPresidio.amount) : 0;
  const gross = base + presidio;
  const discountRate = Math.max(0, safeNumber(state.scenario?.discountRate));
  const vatRate = Math.max(0, safeNumber(state.scenario?.vatRate));
  const discount = gross * discountRate / 100;
  const discounted = gross - discount;
  const vat = discounted * vatRate / 100;
  const total = discounted + vat;

  return { base, presidio, gross, discountRate, discount, discounted, vatRate, vat, total };
}

export function calculateBudget(state) {
  const contract = calculateContract(state);
  const recurringSections = [
    state.generalExpenses || [],
    state.serviceExpenses || [],
    state.consumptionExpenses || []
  ];

  let oldTotal = 0;
  let newTotal = 0;

  for (const section of recurringSections) {
    for (const item of section) {
      oldTotal += safeNumber(item.old);
      newTotal += item.computed ? contract.total : safeNumber(item.new);
    }
  }

  const oneTimeTotal = (state.oneTimeExpenses || [])
    .reduce((sum, item) => sum + safeNumber(item.new), 0);
  const delta = newTotal - oldTotal;
  const deltaPercent = oldTotal ? (delta / oldTotal) * 100 : 0;

  return { contract, oldTotal, newTotal, oneTimeTotal, delta, deltaPercent };
}

export function calculateUnit(state, unit) {
  const totals = calculateBudget(state);
  const millesimi = safeNumber(unit.millesimi);
  const annual = totals.newTotal / 1000 * millesimi;
  const oneTime = totals.oneTimeTotal / 1000 * millesimi;
  return { millesimi, annual, oneTime, total: annual + oneTime };
}

export function normalizeState(input) {
  const defaults = cloneDefaults();
  if (!input || typeof input !== "object") return defaults;

  const output = { ...defaults, ...input };
  output.scenario = { ...defaults.scenario, ...(input.scenario || {}) };
  output.notes = { ...defaults.notes, ...(input.notes || {}) };

  for (const key of ["generalExpenses", "serviceExpenses", "consumptionExpenses", "oneTimeExpenses", "contractItems", "units"]) {
    output[key] = Array.isArray(input[key]) ? input[key] : defaults[key];
  }

  return output;
}
