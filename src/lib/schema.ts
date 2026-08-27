export interface SalMilestone {
  id: string;
  label: string;
  triggerType: 'signing' | 'start' | 'percent' | 'date' | 'final';
  triggerPct: number | null;
  triggerDate?: string;
  /**
   * Come è definito l'importo della milestone:
   *  - 'pct' (default): è una percentuale del budget. Se il budget cambia,
   *    l'importo in euro si riproporziona.
   *  - 'eur': è una cifra forfettaria pattuita. Resta quella qualunque cosa
   *    succeda al budget; la percentuale diventa un valore derivato.
   * Assente = 'pct', così le milestone già salvate non cambiano comportamento.
   */
  amountMode?: 'pct' | 'eur';
  pct: number;        // % of budget/fee — autoritativa solo in modalità 'pct'
  fixedAmt?: number;  // importo in euro — autoritativo in modalità 'eur'
  paid?: boolean;     // manually certified as paid
  paidDate?: string;  // ISO date of actual payment
  /**
   * Detrae l'acconto (la milestone con triggerType 'signing') dall'importo di
   * QUESTA milestone. Vincolo: al massimo UNA milestone per fornitore/tecnico
   * può averlo attivo, e mai la milestone di acconto stessa.
   * L'importo lordo (pct / fixedAmt) resta quello certificato dal SAL sui
   * lavori eseguiti; il netto da incassare è lordo − acconto.
   */
  deductDeposit?: boolean;
}

export interface Technician {
  id: string;
  name: string;
  role: string;    // e.g. "Architect", "Structural Engineer"
  contact: string;
  fee: number;     // total technical fee (net ex. VAT), manually entered
  sal: SalMilestone[];
}

export interface Contractor {
  id: string;
  name: string;
  trade: string;
  contact: string;
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
