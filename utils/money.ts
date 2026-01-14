
import { DENOMINATIONS } from '../constants';
import { ChangeBreakdown, FacilitationSuggestion } from '../types';

/**
 * Calculates how many notes and coins are needed for a given amount.
 */
export const calculateBreakdown = (amount: number): ChangeBreakdown[] => {
  let remaining = Math.round(amount * 100); // Work in cents to avoid float issues
  const breakdown: ChangeBreakdown[] = [];

  for (const denom of DENOMINATIONS) {
    const denomInCents = Math.round(denom.value * 100);
    const count = Math.floor(remaining / denomInCents);
    
    if (count > 0) {
      breakdown.push({ denomination: denom, count });
      remaining %= denomInCents;
    }
  }

  return breakdown;
};

/**
 * Formats a number as BRL currency.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Logic for suggesting customer contribution to ease the change.
 */
export const getFacilitationSuggestions = (total: number, paid: number): FacilitationSuggestion[] => {
  if (paid <= total) return [];

  const change = paid - total;
  const suggestions: FacilitationSuggestion[] = [];
  const cents = Math.round((change % 1) * 100);
  const paidCents = Math.round((paid % 1) * 100);
  const totalCents = Math.round((total % 1) * 100);

  // Strategy 1: Rounding cents to zero (the most common one)
  // Example: Total 13.40, Paid 20.00. Suggest asking for 0.40 extra to make it 7.00.
  if (totalCents > 0) {
    const extraToRoundCents = totalCents / 100;
    const newTotalPaid = paid + extraToRoundCents;
    const newChange = newTotalPaid - total;
    
    // Check if new change is "cleaner" (integer)
    if (Math.round((newChange % 1) * 100) === 0) {
      suggestions.push({
        extraAmount: extraToRoundCents,
        newTotalPaid,
        newChange,
        description: `Pedir mais ${formatCurrency(extraToRoundCents)}`,
        reason: `Para arredondar o troco para ${formatCurrency(newChange)} (sem moedas quebradas).`
      });
    }
  }

  // Strategy 2: Rounding to a multiple of 5 (getting a 5 note instead of random coins)
  // Example: Total 17.50, Paid 20.00. Change is 2.50. Ask for 2.50 to give a 5.00 note.
  const diffToNextFive = 5 - (change % 5);
  if (diffToNextFive > 0 && diffToNextFive < 5 && diffToNextFive !== totalCents/100) {
     // We only suggest if it's a "reasonable" extra amount, let's say up to R$ 5,00 or 25% of the total
     if (diffToNextFive <= 5) {
        const newTotalPaid = paid + diffToNextFive;
        const newChange = newTotalPaid - total;
        suggestions.push({
            extraAmount: diffToNextFive,
            newTotalPaid,
            newChange,
            description: `Pedir mais ${formatCurrency(diffToNextFive)}`,
            reason: `Para devolver uma nota de ${formatCurrency(5)} ou superior inteira.`
        });
     }
  }

  // Strategy 3: Dealing with specific small coins (0.05, 0.10, 0.25)
  // If change is 4.95, ask for 0.05 to give 5.00
  if (cents > 90) {
      const extra = (100 - cents) / 100;
      const newTotalPaid = paid + extra;
      const newChange = newTotalPaid - total;
      suggestions.push({
        extraAmount: extra,
        newTotalPaid,
        newChange,
        description: `Pedir mais ${formatCurrency(extra)}`,
        reason: `Para evitar devolver muitas moedas pequenas e dar ${formatCurrency(newChange)} redondo.`
      });
  }

  // Filter out duplicates and invalid ones
  return suggestions.filter((s, index, self) => 
    s.extraAmount > 0 && 
    index === self.findIndex(t => t.extraAmount === s.extraAmount)
  ).sort((a, b) => a.extraAmount - b.extraAmount);
};
