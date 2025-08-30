
import React, { useState } from 'react';
import CgpaCalculator from './components/CgpaCalculator';
import GradeCalculator from './components/GradeCalculator';

type CalculatorView = 'cgpa' | 'grade';

const App: React.FC = () => {
  const [view, setView] = useState<CalculatorView>('grade');

  const header = (
    <header className="w-full p-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        IITM BS DS Grade Calculator
      </h1>
      <p className="text-sm text-gray-400 mt-2">Made by <a href="https://www.instagram.com/dipux94/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@dipuX94</a></p>
    </header>
  );

  const tabs = (
    <div className="flex justify-center mb-8 border-b border-gray-700">
      <button
        onClick={() => setView('grade')}
        className={`px-6 py-3 text-lg font-medium transition-colors duration-300 ${
          view === 'grade'
            ? 'text-white border-b-2 border-purple-500'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Subject Grade Calculator
      </button>
      <button
        onClick={() => setView('cgpa')}
        className={`px-6 py-3 text-lg font-medium transition-colors duration-300 ${
          view === 'cgpa'
            ? 'text-white border-b-2 border-purple-500'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        CGPA Calculator
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4">
      {header}
      <div className="w-full max-w-4xl mx-auto">
        {tabs}
        <main>
          {view === 'grade' && <GradeCalculator />}
          {view === 'cgpa' && <CgpaCalculator />}
        </main>
      </div>
       <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
            <p>Disclaimer: This is an unofficial tool. Formulas are based on the May 2025 Term document. Always verify with official sources.</p>
            <p>There can always be mistakes in -0.15 to +0.15 ranges or more so don't trust blindly.</p>
        </footer>
    </div>
  );
};

export default App;