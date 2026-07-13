import {
  cloneDefaults,
  normalizeState,
  safeNumber,
  calculateBudget,
  calculateUnit
} from "./logic.js";

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
        <div><span>Totale complessivo</span><strong data-unit-result="total" data-unit-result-index="${index}">€ 0,00</strong></div>
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
    for (const field of ["annual", "oneTime", "total"]) {
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
  rows.push([], ["Unità", "Millesimi", "Quota annuale", "Quota una tantum", "Totale"]);
  for (const unit of state.units || []) {
    const result = calculateUnit(state, unit);
    rows.push([unit.name, result.millesimi, result.annual, result.oneTime, result.total]);
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
