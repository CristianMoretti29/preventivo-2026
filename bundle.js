const DEFAULT_STATE = {
  schemaVersion: 2,
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
    { id: "presidio-0", label: "Nessun presidio fisso", amount: 0, note: "", included: true, kind: "presidio", hours: 0 },
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

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function safeNumber(value) {
  const number = typeof value === "number" ? value : Number(String(value).replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function calculateContract(state) {
  const items = Array.isArray(state.contractItems) ? state.contractItems : [];
  const base = items
    .filter(item => item.kind !== "presidio" && item.included)
    .reduce((sum, item) => sum + safeNumber(item.amount), 0);

  const selectedHours = safeNumber(state.scenario?.presidioHours);
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

function calculateBudget(state) {
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

function calculateUnit(state, unit) {
  const totals = calculateBudget(state);
  const millesimi = safeNumber(unit.millesimi);
  const annual = totals.newTotal / 1000 * millesimi;
  const oneTime = totals.oneTimeTotal / 1000 * millesimi;
  const monthly = annual / 12;
  return { millesimi, annual, oneTime, monthly };
}

function normalizeState(input) {
  const defaults = cloneDefaults();
  if (!input || typeof input !== "object") return defaults;

  const output = { ...defaults, ...input };
  output.scenario = { ...defaults.scenario, ...(input.scenario || {}) };
  output.notes = { ...defaults.notes, ...(input.notes || {}) };

  for (const key of ["generalExpenses", "serviceExpenses", "consumptionExpenses", "oneTimeExpenses", "contractItems", "units"]) {
    output[key] = Array.isArray(input[key]) ? input[key] : defaults[key];
  }

  // Migrazione dei dati già salvati: aggiunge lo scenario "0 ore"
  // senza cancellare o modificare le personalizzazioni esistenti.
  const hasZeroHours = output.contractItems.some(
    item => item.kind === "presidio" && safeNumber(item.hours) === 0
  );
  if (!hasZeroHours) {
    const zeroHoursItem = defaults.contractItems.find(
      item => item.kind === "presidio" && safeNumber(item.hours) === 0
    );
    if (zeroHoursItem) output.contractItems = [...output.contractItems, zeroHoursItem];
  }
  output.schemaVersion = defaults.schemaVersion;

  return output;
}


const STORAGE_KEY = "preventivo-condominio-2026-v1";
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
const percent = new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
let state = loadState();
let deferredInstallPrompt = null;
let toastTimer = null;

const expenseContainers = {
  generalExpenses: document.getElementById("generalExpenses"),
  serviceExpenses: document.getElementById("serviceExpenses"),
  consumptionExpenses: document.getElementById("consumptionExpenses"),
  oneTimeExpenses: document.getElementById("oneTimeExpenses")
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeState(JSON.parse(stored)) : cloneDefaults();
  } catch (error) {
    console.error("Impossibile leggere i dati salvati", error);
    return cloneDefaults();
  }
}

function saveState(message = "") {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (message) showToast(message);
  } catch (error) {
    console.error("Impossibile salvare i dati", error);
    showToast("Salvataggio non riuscito: esporta subito un backup.");
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numberValue(value) {
  const n = safeNumber(value);
  return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(6)));
}

function renderExpenseSection(sectionKey) {
  const container = expenseContainers[sectionKey];
  const items = state[sectionKey] || [];
  const canDelete = sectionKey !== "serviceExpenses";

  container.innerHTML = items.map((item, index) => {
    const computed = Boolean(item.computed);
    const deleteAllowed = canDelete || !computed;
    return `
      <article class="expense-row ${computed ? "computed" : ""}">
        <label class="field name-field">
          <span>Voce</span>
          <input type="text" value="${escapeHtml(item.label)}"
            data-section="${sectionKey}" data-index="${index}" data-field="label">
        </label>
        <label class="field">
          <span>OLD</span>
          <input type="number" step="0.01" inputmode="decimal" value="${numberValue(item.old)}"
            data-section="${sectionKey}" data-index="${index}" data-field="old">
        </label>
        <label class="field">
          <span>NEW</span>
          <input type="number" step="0.01" inputmode="decimal" value="${computed ? "0" : numberValue(item.new)}"
            data-section="${sectionKey}" data-index="${index}" data-field="new"
            ${computed ? 'data-computed-contract="true" readonly' : ""}>
        </label>
        <label class="field note-field">
          <span>Note</span>
          <input type="text" value="${escapeHtml(item.note)}"
            data-section="${sectionKey}" data-index="${index}" data-field="note">
        </label>
        <div class="row-actions">
          ${deleteAllowed ? `<button class="icon-button" type="button" aria-label="Elimina voce" data-delete-section="${sectionKey}" data-delete-index="${index}">×</button>` : ""}
        </div>
      </article>`;
  }).join("") + `
    <button class="secondary section-add" type="button" data-add-section="${sectionKey}">Aggiungi voce</button>`;
}

function renderContractItems() {
  const container = document.getElementById("contractItems");
  const selectedHours = safeNumber(state.scenario.presidioHours);

  container.innerHTML = (state.contractItems || []).map((item, index) => {
    const scenarioItem = item.kind === "presidio";
    const selected = scenarioItem && safeNumber(item.hours) === selectedHours;
    const disabledClass = item.included ? "" : "disabled";
    return `
      <article class="contract-item ${disabledClass} ${scenarioItem ? "scenario-item" : ""}" ${selected ? 'aria-current="true"' : ""}>
        <label class="checkbox-wrap" title="Includi nel calcolo">
          <input type="checkbox" ${item.included ? "checked" : ""}
            data-contract-index="${index}" data-contract-field="included">
        </label>
        <label class="field">
          <span>${scenarioItem ? `Scenario ${escapeHtml(item.hours)} ore${selected ? " — selezionato" : ""}` : "Voce"}</span>
          <input type="text" value="${escapeHtml(item.label)}"
            data-contract-index="${index}" data-contract-field="label">
        </label>
        <label class="field amount-field">
          <span>Importo</span>
          <input type="number" step="0.01" inputmode="decimal" value="${numberValue(item.amount)}"
            data-contract-index="${index}" data-contract-field="amount">
        </label>
        <label class="field note-field">
          <span>Note</span>
          <input type="text" value="${escapeHtml(item.note)}"
            data-contract-index="${index}" data-contract-field="note">
        </label>
      </article>`;
  }).join("");
}

function renderUnits() {
  const container = document.getElementById("units");
  container.innerHTML = (state.units || []).map((unit, index) => `
    <article class="unit-card">
      <div class="unit-inputs">
        <label class="field">
          <span>Unità</span>
          <input type="text" value="${escapeHtml(unit.name)}" data-unit-index="${index}" data-unit-field="name">
        </label>
        <label class="field">
          <span>Millesimi</span>
          <input type="number" step="0.01" min="0" inputmode="decimal" value="${numberValue(unit.millesimi)}"
            data-unit-index="${index}" data-unit-field="millesimi">
        </label>
        <button class="icon-button" type="button" aria-label="Elimina unità" data-delete-unit="${index}">×</button>
      </div>
      <div class="unit-results">
        <div><span>Quota annuale</span><strong data-unit-result="annual" data-unit-result-index="${index}">€ 0,00</strong></div>
        <div><span>Quota una tantum</span><strong data-unit-result="oneTime" data-unit-result-index="${index}">€ 0,00</strong></div>
        <div><span>Spesa mensile</span><strong data-unit-result="monthly" data-unit-result-index="${index}">€ 0,00</strong></div>
      </div>
    </article>`).join("");
}

function refreshCalculatedUI() {
  const totals = calculateBudget(state);
  document.getElementById("oldTotal").textContent = euro.format(totals.oldTotal);
  document.getElementById("newTotal").textContent = euro.format(totals.newTotal);
  document.getElementById("deltaTotal").textContent = `${totals.delta >= 0 ? "+" : ""}${euro.format(totals.delta)}`;
  document.getElementById("deltaPercent").textContent = `${totals.deltaPercent >= 0 ? "+" : ""}${percent.format(totals.deltaPercent)}%`;
  document.getElementById("oneTimeTotal").textContent = euro.format(totals.oneTimeTotal);

  const deltaCard = document.getElementById("deltaTotal").closest(".summary-card");
  deltaCard.classList.toggle("positive", totals.delta > 0);
  deltaCard.classList.toggle("negative", totals.delta < 0);

  document.getElementById("contractTotal").textContent = euro.format(totals.contract.total);
  document.getElementById("contractGross").textContent = euro.format(totals.contract.gross);
  document.getElementById("contractDiscount").textContent = `− ${euro.format(totals.contract.discount)}`;
  document.getElementById("contractDiscounted").textContent = euro.format(totals.contract.discounted);
  document.getElementById("contractVat").textContent = euro.format(totals.contract.vat);

  const computedInput = document.querySelector('[data-computed-contract="true"]');
  if (computedInput) computedInput.value = Number(totals.contract.total.toFixed(2));

  (state.units || []).forEach((unit, index) => {
    const result = calculateUnit(state, unit);
    for (const field of ["annual", "oneTime", "monthly"]) {
      const target = document.querySelector(`[data-unit-result="${field}"][data-unit-result-index="${index}"]`);
      if (target) target.textContent = euro.format(result[field]);
    }
  });
}

function renderAll() {
  Object.keys(expenseContainers).forEach(renderExpenseSection);
  renderContractItems();
  renderUnits();

  document.querySelectorAll('input[name="presidio"]').forEach(input => {
    input.checked = safeNumber(input.value) === safeNumber(state.scenario.presidioHours);
  });
  document.getElementById("discountRate").value = numberValue(state.scenario.discountRate);
  document.getElementById("vatRate").value = String(safeNumber(state.scenario.vatRate));
  document.getElementById("waterNote").value = state.notes.water || "";
  document.getElementById("electricityNote").value = state.notes.electricity || "";
  refreshCalculatedUI();
}

function addExpense(sectionKey) {
  state[sectionKey].push({
    id: `voce-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: "Nuova voce",
    old: 0,
    new: 0,
    note: ""
  });
  saveState();
  renderExpenseSection(sectionKey);
  refreshCalculatedUI();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function downloadBlob(filename, content, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  const text = String(value ?? "").replaceAll('"', '""');
  return `"${text}"`;
}

function exportCsv() {
  const totals = calculateBudget(state);
  const rows = [
    ["SIMULAZIONE PREVENTIVO 2026"],
    [],
    ["Sezione", "Voce", "OLD", "NEW", "Note"]
  ];

  const sections = [
    ["Spese generali", state.generalExpenses],
    ["Manutenzione e servizi", state.serviceExpenses],
    ["Consumi", state.consumptionExpenses],
    ["Spese una tantum", state.oneTimeExpenses]
  ];

  for (const [name, items] of sections) {
    for (const item of items || []) {
      rows.push([name, item.label, safeNumber(item.old), item.computed ? totals.contract.total : safeNumber(item.new), item.note || ""]);
    }
  }

  rows.push([], ["Totale OLD", totals.oldTotal], ["Totale NEW", totals.newTotal], ["Variazione", totals.delta]);
  rows.push([], ["Unità", "Millesimi", "Quota annuale", "Quota una tantum", "Spesa mensile"]);
  for (const unit of state.units || []) {
    const result = calculateUnit(state, unit);
    rows.push([unit.name, result.millesimi, result.annual, result.oneTime, result.monthly]);
  }

  const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(";")).join("\r\n");
  downloadBlob("preventivo-2026.csv", csv, "text/csv;charset=utf-8");
  showToast("CSV esportato.");
}

function registerEventListeners() {
  document.addEventListener("input", event => {
    const target = event.target;

    if (target.dataset.section) {
      const item = state[target.dataset.section]?.[Number(target.dataset.index)];
      if (!item || item.computed && target.dataset.field === "new") return;
      item[target.dataset.field] = ["old", "new"].includes(target.dataset.field) ? safeNumber(target.value) : target.value;
      saveState();
      refreshCalculatedUI();
      return;
    }

    if (target.dataset.contractIndex !== undefined) {
      const item = state.contractItems[Number(target.dataset.contractIndex)];
      if (!item) return;
      const field = target.dataset.contractField;
      item[field] = field === "amount" ? safeNumber(target.value) : field === "included" ? target.checked : target.value;
      saveState();
      if (field === "included") renderContractItems();
      refreshCalculatedUI();
      return;
    }

    if (target.dataset.unitIndex !== undefined) {
      const unit = state.units[Number(target.dataset.unitIndex)];
      if (!unit) return;
      unit[target.dataset.unitField] = target.dataset.unitField === "millesimi" ? safeNumber(target.value) : target.value;
      saveState();
      refreshCalculatedUI();
    }
  });

  document.addEventListener("change", event => {
    const target = event.target;
    if (target.name === "presidio") {
      state.scenario.presidioHours = safeNumber(target.value);
      saveState();
      renderContractItems();
      refreshCalculatedUI();
    }
  });

  document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.addSection) {
      addExpense(button.dataset.addSection);
      return;
    }

    if (button.dataset.deleteSection) {
      const section = button.dataset.deleteSection;
      state[section].splice(Number(button.dataset.deleteIndex), 1);
      saveState();
      renderExpenseSection(section);
      refreshCalculatedUI();
      return;
    }

    if (button.dataset.deleteUnit !== undefined) {
      state.units.splice(Number(button.dataset.deleteUnit), 1);
      saveState();
      renderUnits();
      refreshCalculatedUI();
    }
  });

  document.getElementById("discountRate").addEventListener("input", event => {
    state.scenario.discountRate = safeNumber(event.target.value);
    saveState();
    refreshCalculatedUI();
  });

  document.getElementById("vatRate").addEventListener("change", event => {
    state.scenario.vatRate = safeNumber(event.target.value);
    saveState();
    refreshCalculatedUI();
  });

  document.getElementById("waterNote").addEventListener("input", event => {
    state.notes.water = event.target.value;
    saveState();
  });

  document.getElementById("electricityNote").addEventListener("input", event => {
    state.notes.electricity = event.target.value;
    saveState();
  });

  document.getElementById("addUnitButton").addEventListener("click", () => {
    state.units.push({ id: `unita-${Date.now()}`, name: "Nuova unità", millesimi: 0 });
    saveState();
    renderUnits();
    refreshCalculatedUI();
  });

  document.getElementById("exportBackupButton").addEventListener("click", () => {
    downloadBlob("backup-preventivo-2026.json", JSON.stringify(state, null, 2), "application/json");
    showToast("Backup esportato.");
  });

  document.getElementById("importBackupInput").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      state = normalizeState(imported);
      saveState();
      renderAll();
      showToast("Backup importato.");
    } catch (error) {
      console.error(error);
      showToast("Il file selezionato non è un backup valido.");
    } finally {
      event.target.value = "";
    }
  });

  document.getElementById("exportCsvButton").addEventListener("click", exportCsv);
  document.getElementById("printButton").addEventListener("click", () => window.print());

  document.getElementById("resetButton").addEventListener("click", () => {
    const confirmed = window.confirm("Ripristinare tutti i valori originali dell’Excel? I dati correnti verranno sostituiti.");
    if (!confirmed) return;
    state = cloneDefaults();
    saveState();
    renderAll();
    showToast("Dati originali ripristinati.");
  });

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    document.getElementById("installButton").classList.remove("hidden");
  });

  document.getElementById("installButton").addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      showToast("Su iPhone usa Condividi → Aggiungi alla schermata Home.");
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    document.getElementById("installButton").classList.add("hidden");
  });
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  try {
    await navigator.serviceWorker.register("./service-worker.js");
  } catch (error) {
    console.error("Service worker non registrato", error);
  }
}

renderAll();
registerEventListeners();
registerServiceWorker();
