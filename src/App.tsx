
import React, { useState } from 'react';
import CgpaCalculator from './components/CgpaCalculator';
import GradeCalculator from './components/GradeCalculator';

type CalculatorView = 'cgpa' | 'grade';

const App: React.FC = () => {
  const [view, setView] = useState<CalculatorView>('grade');

  const header = (
    <header className="w-full p-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        IITM DS Grade Calculator
      </h1>
      {/* Download button added below */}
      <a
        href="https://github.com/dipuda007/IIT-M-DS-COURSE-CGPA-CALCULATOR/releases/download/v1.0.0/CGPA-CALC.apk"
        download
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300"
      >
        Download Android App (APK)
      </a>
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
            <p>There can always be mistakes so don't trust blindly.</p>
        </footer>
    </div>
  );
};

export default App;
