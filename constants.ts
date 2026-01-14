
import { Denomination } from './types';

export const DENOMINATIONS: Denomination[] = [
  { value: 100, label: 'R$ 100', type: 'nota' },
  { value: 50, label: 'R$ 50', type: 'nota' },
  { value: 20, label: 'R$ 20', type: 'nota' },
  { value: 10, label: 'R$ 10', type: 'nota' },
  { value: 5, label: 'R$ 5', type: 'nota' },
  { value: 2, label: 'R$ 2', type: 'nota' },
  { value: 1, label: 'R$ 1', type: 'moeda' },
  { value: 0.5, label: '50 centavos', type: 'moeda' },
  { value: 0.25, label: '25 centavos', type: 'moeda' },
  { value: 0.1, label: '10 centavos', type: 'moeda' },
  { value: 0.05, label: '5 centavos', type: 'moeda' },
  { value: 0.01, label: '1 centavo', type: 'moeda' },
];
