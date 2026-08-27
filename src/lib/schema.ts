export interface SalMilestone {
  id: string;
  label: string;
  triggerType: 'signing' | 'start' | 'percent' | 'date' | 'final';
  triggerPct: number | null;
  triggerDate?: string;
  /**
   * Su cosa è calcolato l'importo della milestone:
   *  - 'pct' (default): percentuale dell'importo RIDETERMINATO. Se `baseAmt` è
   *    presente la percentuale si applica a quella fotografia e l'importo non si
   *    muove più; altrimenti segue il rideterminato corrente (milestone vecchie).
   *  - 'pctContract': percentuale dell'importo CONTRATTUALE, cioè quantità
   *    contrattata × prezzo delle sole voci a contratto, senza varianti né extra.
   *    È la base giusta per l'acconto, che si paga alla firma su quell'importo:
   *    varianti ed extra decisi dopo non lo spostano.
   *  - 'done': LAVORI ESEGUITI dalla ditta a oggi. La rata insegue il Value Done,
   *    come fa un SAL vero; l'importo lo scrive il sistema, non si digita.
   *  - 'eur': cifra forfettaria. Non si muove mai; la percentuale è derivata.
   * Assente = 'pct', così le milestone già salvate non cambiano comportamento.
   */
  amountMode?: 'pct' | 'pctContract' | 'done' | 'eur';
  pct: number;        // % della propria base — autoritativa nelle due modalità percentuali
  fixedAmt?: number;  // importo in euro — autoritativo in modalità 'eur'
  /**
   * Modalità 'pct': fotografia del rideterminato presa quando la milestone è
   * stata creata, con la data. È su questo che si applica la percentuale, così
   * un SAL già definito non si sposta più. Assente su quelle vecchie: in quel
   * caso si ricade sul rideterminato corrente, come prima.
   */
  baseAmt?: number;
  baseDate?: string;
  /**
   * Sottrae da QUESTA rata l'acconto (la milestone con trigger 'signing').
   * Serve soprattutto in modalità 'done': il SAL certifica tutti i lavori
   * eseguiti, e da lì va tolto l'anticipo già versato. Al massimo una milestone
   * per fornitore può averlo attivo, e mai l'acconto stesso.
   */
  deductDeposit?: boolean;
  paid?: boolean;     // manually certified as paid
  paidDate?: string;  // ISO date of actual payment
}

export interface Technician {
  id: string;
  name: string;
  role: string;    // e.g. "Architect", "Structural Engineer"
  contact: string;
  fee: number;     // total technical fee (net ex. VAT), manually entered
  /**
   * Aliquota IVA applicata ai pagamenti: 0 (fuori campo / esente), 10 o 22.
   * Sta sul soggetto e non sulla categoria di lavori perché è così che viene
   * fatturato. Assente = 10, il caso normale delle ristrutturazioni.
   */
  vatRate?: 0 | 10 | 22;
  sal: SalMilestone[];
}

export interface Contractor {
  id: string;
  name: string;
  trade: string;
  contact: string;
  /**
   * Aliquota IVA applicata ai pagamenti: 0 (fuori campo / esente), 10 o 22.
   * Sta sul soggetto e non sulla categoria di lavori perché è così che viene
   * fatturato. Assente = 10, il caso normale delle ristrutturazioni.
   */
  vatRate?: 0 | 10 | 22;
  sal: SalMilestone[];
}

export interface WorkItem {
  id: string;
  brief: string;      // short description shown in portal
  fullDesc: string;   // technical full description (admin only)
  unit: string;
  qty: number;        // contracted quantity
  price: number;      // unit price (net ex. VAT)
  done: number;       // quantity done so far
  variation?: number; // quantity variation delta (negative = reduction/minor costo, positive = increase); euro impact = variation × price
  complete: boolean;  // manually marked as complete (overrides In Progress status)
  extra: boolean;     // extra/variation work
  contractor: string; // contractor id
}

export interface Category {
  id: string;
  label: string;
  items: WorkItem[];
}

export interface ProjectInfo {
  id: string;
  name: string;
  location: string;
  clientName: string;
  clientEmail: string;
  architect: string;
  start: string;
  end: string;
  updated: string;
  updateNum: number;
  template?: boolean;
}

export interface ProgressUpdate {
  num: number;
  date: string;
  note: string;
}

export interface ProjectData {
  info: ProjectInfo;
  contractors: Contractor[];
  technicians: Technician[];
  categories: Category[];
  updates: ProgressUpdate[];
}
