
import React from 'react';

interface CalculatorFormProps {
  total: string;
  paid: string;
  setTotal: (val: string) => void;
  setPaid: (val: string) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ total, paid, setTotal, setPaid }) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-slate-100">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Valor Total da Compra (R$)
        </label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">R$</span>
            <input
                type="number"
                step="0.01"
                min="0"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                onFocus={handleFocus}
                placeholder="0,00"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-xl font-semibold text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Valor Pago pelo Cliente (R$)
        </label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">R$</span>
            <input
                type="number"
                step="0.01"
                min="0"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                onFocus={handleFocus}
                placeholder="0,00"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-xl font-semibold text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
        </div>
      </div>
      
      <div className="flex gap-2">
        {[2, 5, 10, 20, 50, 100].map((val) => (
            <button
                key={val}
                onClick={() => setPaid(val.toString())}
                className="flex-1 py-2 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200"
            >
                {val}
            </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorForm;
