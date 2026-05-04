export interface SalMilestone {
  id: string;
  label: string;
  triggerType: 'signing' | 'percent' | 'final';
  triggerPct: number | null;
  pct: number; // % of contractor budget
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
}

export interface ProjectData {
  info: ProjectInfo;
  contractors: Contractor[];
  categories: Category[];
}
