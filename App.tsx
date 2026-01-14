
import React, { useState, useMemo } from 'react';
import Header from './components/Header.tsx';
import CalculatorForm from './components/CalculatorForm.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';
import { CalculationResult, FacilitationSuggestion } from './types.ts';
import { calculateBreakdown, getFacilitationSuggestions } from './utils/money.ts';

const App: React.FC = () => {
  const [totalStr, setTotalStr] = useState('');
  const [paidStr, setPaidStr] = useState('');

  const result = useMemo((): CalculationResult | null => {
    const total = parseFloat(totalStr);
    const paid = parseFloat(paidStr);

    if (isNaN(total) || isNaN(paid)) return null;

    const changeAmount = Math.max(0, paid - total);
    const roundedChange = Math.round(changeAmount * 100) / 100;

    return {
      total,
      paid,
      changeAmount: roundedChange,
      breakdown: calculateBreakdown(roundedChange),
      suggestions: getFacilitationSuggestions(total, paid)
    };
  }, [totalStr, paidStr]);

  const handleApplySuggestion = (suggestion: FacilitationSuggestion) => {
    setPaidStr(suggestion.newTotalPaid.toFixed(2));
  };

  const handleReset = () => {
    setTotalStr('');
    setPaidStr('');
  };

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header />
      
      <main className="flex-grow px-4 -mt-12 md:-mt-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="space-y-6">
            <CalculatorForm 
              total={totalStr} 
              paid={paidStr} 
              setTotal={setTotalStr} 
              setPaid={setPaidStr} 
            />
            
            <button 
                onClick={handleReset}
                className="w-full py-4 bg-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Limpar Valores
            </button>
          </div>

          <div className="lg:sticky lg:top-8">
            <ResultDisplay result={result} onApplySuggestion={handleApplySuggestion} />
          </div>

        </div>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Calculadora de Troco Inteligente.</p>
      </footer>
    </div>
  );
};

export default App;
