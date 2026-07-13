ANALISI DEL FILE "SIMULAZIONE PREVENTIVO 2026.XLSX"

STRUTTURA
Il file contiene un solo foglio, Foglio1, nell'intervallo A1:M33.
Non risultano macro VBA, tabelle strutturate, grafici o nomi definiti.

FORMULE PRINCIPALI RICOSTRUITE
1. Totale annuale OLD
   B19 = 618.046,00 €
   Somma di assicurazione, conto corrente, amministrazione, adempimenti,
   contratto Techbau, pulizia, consumo idrico, energia parti comuni ed energia privata.

2. Totale annuale NEW
   C19 = 671.942,21 €
   Comprende anche portineria, assistenza bagnanti e videosorveglianza.

3. Contratto Techbau
   Base senza presidio: 206.531,00 €
   Con presidio 20 h: 264.031,00 €
   Con presidio 40 h: 321.531,00 €
   Sconto: 10%

   Scenario 20 h:
   - imponibile scontato: 237.627,90 €
   - con IVA 10%: 261.390,69 €
   - con IVA 22%: 289.906,04 €

   Scenario 40 h:
   - imponibile scontato: 289.377,90 €
   - con IVA 10%: 318.315,69 €
   - con IVA 22%: 353.041,04 €

4. Ripartizione per millesimi
   Quota = totale annuale NEW / 1.000 × millesimi
   - 5 millesimi: 3.359,71105 €
   - 3,74 millesimi: 2.513,0638654 €

5. Spesa una tantum
   Arredo piscina: 20.000,00 €
   Nel file è calcolata soltanto la quota del bilocale:
   20.000 / 1.000 × 3,74 = 74,80 €

CRITICITÀ TROVATE
1. Il valore del contratto Techbau in C9 non è collegato alle formule della tabella Techbau.
   È stato copiato manualmente dal risultato dello scenario 20 h con IVA 10%.
   Se cambi presidio o IVA nella tabella di destra, il totale generale non cambia automaticamente.
   Nell'app questo collegamento è automatico.

2. La quota dell'arredo piscina è presente soltanto per il bilocale.
   Manca il calcolo equivalente per il trilocale e per eventuali altre unità.
   Nell'app viene calcolata per ogni unità inserita.

3. Le due righe dello sconto hanno entrambe l'etichetta generica "Sconto 10%".
   Sono in realtà lo sconto dello scenario 20 h e lo sconto dello scenario 40 h.

4. Le formule di somma usano elenchi manuali di celle, per esempio
   SUM(C3+C4+C5+...). Aggiungendo una nuova voce nel foglio, questa non entra nel totale
   finché non viene modificata la formula. Nell'app ogni nuova voce entra automaticamente.

5. Portierato Techbau e "Varie ed inconvenienti" risultano rimossi e valgono zero.
   Nell'app sono disattivati per impostazione iniziale, ma possono essere riattivati.

6. Il file distingue il totale ricorrente dalle spese una tantum, ma non mostra un totale
   complessivo annuale + una tantum per ciascuna unità. Nell'app sono mostrati entrambi.
