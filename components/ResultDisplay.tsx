
import React from 'react';
import { CalculationResult, FacilitationSuggestion } from '../types';
import { formatCurrency, calculateBreakdown } from '../utils/money';

interface ResultDisplayProps {
  result: CalculationResult | null;
  onApplySuggestion: (suggestion: FacilitationSuggestion) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onApplySuggestion }) => {
  if (!result) return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <p className="text-lg font-medium">Preencha os valores para ver o troco</p>
    </div>
  );

  const { changeAmount, breakdown, suggestions, paid, total } = result;

  if (paid < total) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-red-500 bg-red-50 border-2 border-red-100 rounded-2xl animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xl font-bold">Valor insuficiente!</p>
        <p className="mt-2 text-red-400">Faltam {formatCurrency(total - paid)}</p>
      </div>
    );
  }

  if (changeAmount === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-emerald-600 bg-emerald-50 border-2 border-emerald-100 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-bold">Troco Não Necessário!</p>
        <p className="mt-2 text-emerald-500 opacity-80 text-lg">Pagamento exato.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Change Header */}
      <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg text-center transform transition-all hover:scale-[1.02]">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">Troco Total</p>
        <h2 className="text-5xl font-extrabold">{formatCurrency(changeAmount)}</h2>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Sugestões de Facilitação
          </h3>
          <div className="grid gap-3">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onApplySuggestion(s)}
                className="group flex flex-col items-start p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all text-left shadow-sm active:scale-95"
              >
                <div className="flex justify-between w-full items-center mb-1">
                    <span className="font-bold text-amber-900 group-hover:text-amber-700">{s.description}</span>
                    <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold">Aplicar</span>
                </div>
                <p className="text-xs text-amber-700 leading-tight">{s.reason}</p>
                <p className="text-[10px] mt-2 font-medium text-amber-600 uppercase">Novo Troco: {formatCurrency(s.newChange)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Composição do Troco
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {breakdown.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-xl border ${item.denomination.type === 'nota' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold ${item.denomination.type === 'nota' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {item.count}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 leading-none">{item.denomination.label}</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter mt-1">{item.denomination.type}</p>
                </div>
              </div>
              <p className="font-bold text-slate-600">
                Total: {formatCurrency(item.denomination.value * item.count)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
