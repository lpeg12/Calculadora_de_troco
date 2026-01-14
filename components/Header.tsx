
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-emerald-600 text-white py-8 px-4 shadow-lg mb-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="bg-white/20 p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Calculadora de Troco</h1>
        <p className="text-emerald-50 opacity-90 text-lg max-w-md">
          Calcule o troco exato e receba sugestões para facilitar o pagamento e poupar moedas.
        </p>
      </div>
    </header>
  );
};

export default Header;
