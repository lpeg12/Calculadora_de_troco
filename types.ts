
export interface Denomination {
  value: number;
  label: string;
  type: 'nota' | 'moeda';
}

export interface ChangeBreakdown {
  denomination: Denomination;
  count: number;
}

export interface FacilitationSuggestion {
  extraAmount: number;
  newTotalPaid: number;
  newChange: number;
  description: string;
  reason: string;
}

export interface CalculationResult {
  total: number;
  paid: number;
  changeAmount: number;
  breakdown: ChangeBreakdown[];
  suggestions: FacilitationSuggestion[];
}
