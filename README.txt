SIMULAZIONE PREVENTIVO 2026 — PWA GRATUITA

CONTENUTO
- index.html: pagina principale dell'app
- bundle.js: logica e calcoli
- styles.css: grafica responsive per PC e iPhone
- manifest.webmanifest + service-worker.js: installazione e funzionamento offline
- icons/: icone dell'app
- ANALISI_EXCEL.txt: formule ricostruite e criticità trovate

COSA FA
- Riproduce i totali OLD e NEW del file Excel.
- Calcola automaticamente il contratto Techbau scegliendo:
  - presidio fisso 20 o 40 ore;
  - sconto percentuale;
  - IVA 10% o 22%.
- Collega il totale Techbau al preventivo generale senza copia manuale.
- Calcola le quote per millesimi di tutte le unità inserite.
- Separa la quota annuale dalle spese una tantum.
- Salva automaticamente i dati sul dispositivo.
- Esporta e importa un backup JSON.
- Esporta un riepilogo CSV.
- Permette la stampa o il salvataggio in PDF.
- Funziona offline dopo il primo caricamento da un sito HTTPS.

CONTROLLO DEI RISULTATI INIZIALI
- Totale OLD: 618.046,00 €
- Contratto Techbau, 20 ore, sconto 10%, IVA 10%: 261.390,69 €
- Totale NEW: 671.942,21 €
- Trilocale, 5 millesimi: quota annuale 3.359,71 €
- Bilocale, 3,74 millesimi: quota annuale 2.513,06 €
- Arredo piscina per il bilocale: 74,80 €

ANTEPRIMA SU PC
Puoi aprire index.html con un doppio clic. In questa modalità puoi provare calcoli e salvataggio locale, ma l'installazione PWA e il funzionamento offline completo richiedono la pubblicazione su HTTPS.

PUBBLICAZIONE GRATUITA SU GITHUB PAGES
1. Crea un account GitHub gratuito.
2. Crea un nuovo repository pubblico, ad esempio "preventivo-2026".
3. Carica nella cartella principale tutti i file di questa cartella, compresa la cartella icons.
4. Apri Settings > Pages.
5. In Build and deployment seleziona Deploy from a branch.
6. Seleziona il branch main e la cartella /(root), quindi salva.
7. Attendi la pubblicazione e apri l'indirizzo HTTPS generato.

INSTALLAZIONE SU IPHONE
1. Apri l'indirizzo pubblicato con Safari.
2. Tocca il pulsante Condividi.
3. Tocca "Aggiungi alla schermata Home".
4. Conferma con "Aggiungi".

DATI E PRIVACY
Non esiste un server o un database: i dati restano nel browser del dispositivo. Questo rende l'app gratuita, ma comporta un rischio concreto: cancellando i dati di Safari o cambiando iPhone senza backup, i dati vengono persi. Usa regolarmente il pulsante "Esporta backup".

AGGIORNAMENTI
Quando modifichi i file e li ripubblichi, cambia il valore CACHE_NAME dentro service-worker.js, ad esempio da preventivo-2026-v1 a preventivo-2026-v2. In caso contrario, l'iPhone potrebbe continuare a mostrare la versione precedente per un po'.
