import { Course, Scores } from '../types/index';

const foundationFormula = (scores: Scores): number => {
  const { GAA = 0, Qz1 = 0, Qz2 = 0, ET = 0 } = scores;
  const term1 = 0.6 * ET + 0.2 * Math.max(Qz1, Qz2);
  const term2 = 0.4 * ET + 0.2 * Qz1 + 0.3 * Qz2;
  return 0.1 * GAA + Math.max(term1, term2);
};

const pythonFormula = (scores: Scores): number => {
    const { GAA1 = 0, GAA2 = 0, Qz1 = 0, ET = 0, PE1 = 0, PE2 = 0 } = scores;
    const result = 0.1 * GAA1 + 0.1 * GAA2 + 0.1 * Qz1 + 0.4 * ET + 0.25 * Math.max(PE1, PE2) + 0.15 * Math.min(PE1, PE2);
    return Math.min(result, 100);
};

const mlPracticeFormula = (scores: Scores): number => {
    const { GAA = 0, ET = 0, OPPE1 = 0, OPPE2 = 0, KA = 0 } = scores;
    return 0.1 * GAA + 0.30 * ET + 0.20 * OPPE1 + 0.20 * OPPE2 + 0.20 * KA;
};

const bdmFormula = (scores: Scores): number => {
    const { GA = 0, Qz2 = 0, ROE = 0, F = 0 } = scores;
    return 0.3 * GA + 0.2 * Qz2 + 0.2 * ROE + 0.3 * F;
};

const degreeFormula = (scores: Scores): number => {
  const { GAA = 0, Qz1 = 0, Qz2 = 0, F = 0 } = scores;
  return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
};

const businessAnalyticsFormula = (scores: Scores): number => {
    const { Qz1 = 0, Qz2 = 0, Asgn1 = 0, Asgn2 = 0, Asgn3 = 0, F = 0 } = scores;
    const quizScore = (0.7 * Math.max(Qz1, Qz2) + 0.3 * Math.min(Qz1, Qz2)) / 100 * 20;
    const assignments = [Asgn1, Asgn2, Asgn3].sort((a, b) => b - a);
    const assignmentScore = (assignments[0] + assignments[1]) / 200 * 40;
    const endTermScore = F / 100 * 40;
    return quizScore + assignmentScore + endTermScore;
};

const tdsFormula = (scores: Scores): number => {
    const { GAA = 0, ROE = 0, P1 = 0, P2 = 0, F = 0 } = scores;
    return 0.15 * GAA + 0.2 * ROE + 0.2 * P1 + 0.2 * P2 + 0.25 * F;
};

const pdsaFormula = (scores: Scores): number => {
    const { GAA = 0, F = 0, PE1 = 0, PE2 = 0, Qz1 = 0, Qz2 = 0 } = scores;
    const peScore = 0.2 * Math.max(PE1, PE2) + 0.1 * Math.min(PE1, PE2);
    const quizScore = Math.max(0.25 * Math.max(Qz1, Qz2), 0.15 * Qz1 + 0.25 * Qz2);
    return 0.1 * GAA + 0.3 * F + peScore + quizScore;
};

const dbmsFormula = (scores: Scores): number => {
    const { GAA1 = 0, GAA2 = 0, GAA3 = 0, OP = 0, F = 0, Qz1 = 0, Qz2 = 0 } = scores;
    const gaas = 0.04 * GAA1 + 0.03 * GAA2 + 0.03 * GAA3;
    const finalComponent = Math.max(
        0.45 * F + 0.15 * Math.max(Qz1, Qz2),
        0.4 * F + 0.10 * Qz1 + 0.20 * Qz2
    );
    return gaas + 0.2 * OP + finalComponent;
};

const appDev1Formula = (scores: Scores): number => {
    const { GLA = 0, GA = 0, F = 0, Qz1 = 0, Qz2 = 0 } = scores;
    const finalComponent = Math.max(
        0.35 * F + 0.2 * Qz1 + 0.25 * Qz2,
        0.4 * F + 0.3 * Math.max(Qz1, Qz2)
    );
    return 0.15 * GLA + 0.05 * GA + finalComponent;
};

const appDev2Formula = (scores: Scores): number => {
    const { GAA1 = 0, GAA2 = 0, F = 0, Qz1 = 0, Qz2 = 0 } = scores;
    // Formula derived from marks distribution on page 19
    const totalQuizScore = ((Qz1 + Qz2)/200 * 50); // Assumes quizzes contribute to 50% of a component
    return (GAA1 / 100 * 5) + (GAA2 / 100 * 5) + (F / 100 * 40) + totalQuizScore;
};

const systemCommandsFormula = (scores: Scores): number => {
    // Simplified from page 18
    const { GAA = 0, F = 0, OP = 0 } = scores;
    return 0.15 * GAA + 0.4 * F + 0.45 * OP;
};

const javaFormula = (scores: Scores): number => {
    // Generic formula as one is not provided in detail
    const { GAA = 0, F = 0, OPPE1 = 0, Qz1 = 0 } = scores;
    return 0.1 * GAA + 0.4 * F + 0.3 * OPPE1 + 0.2 * Qz1;
};

const softwareEngineeringFormula = (scores: Scores): number => {
    const { GAA = 0, Qz2 = 0, F = 0, GP1 = 0, GP2 = 0, PP = 0, CP = 0 } = scores;
    return 0.05 * GAA + 0.2 * Qz2 + 0.4 * F + 0.1 * GP1 + 0.1 * GP2 + 0.1 * PP + 0.05 * CP;
};

const deepLearningPracticeFormula = (scores: Scores): number => {
    const { GA = 0, Qz1 = 0, Qz2 = 0, Qz3 = 0, NPPE1 = 0, NPPE2 = 0, NPPE3 = 0, Viva = 0 } = scores;
    return 0.1 * GA + 0.15 * Qz1 + 0.15 * Qz2 + 0.15 * Qz3 + 0.1 * NPPE1 + 0.1 * NPPE2 + 0.1 * NPPE3 + 0.15 * Viva;
};

const adsFormula = (scores: Scores): number => {
    const { GAA = 0, F = 0, Qz2 = 0 } = scores;
    return 0.2 * GAA + 0.45 * F + 0.35 * Qz2;
};

const mlopsFormula = (scores: Scores): number => {
    const { GAA = 0, F = 0, OPPE1 = 0, OPPE2 = 0 } = scores;
    // Bonus not included in calculation
    return 0.1 * GAA + 0.3 * F + 0.3 * OPPE1 + 0.3 * OPPE2;
};

const programmingInCFormula = (scores: Scores): number => {
    const { GAA = 0, GAAP = 0, Qz1 = 0, OPPE1 = 0, OPPE2 = 0, F = 0 } = scores;
    return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
};


export const COURSES: Course[] = [
  // Foundation
  {
    name: 'Mathematics for data science 1',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'English 1',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Computational Thinking',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Statistics for data science 1',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Mathematics for data science 2',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'English 2',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Statistics for data science 2',
    level: 'Foundation',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Intro to python programming',
    level: 'Foundation',
    components: ['GAA1', 'GAA2', 'Qz1', 'PE1', 'PE2'],
    calculateTotal: pythonFormula,
    hasEndTerm: true,
    credits: 4,
  },
  // Diploma
  {
    name: 'Machine Learning foundations',
    level: 'Diploma',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: foundationFormula,
    hasEndTerm: true,
    credits: 4,
  },
   {
    name: 'Machine Learning Techniques',
    level: 'Diploma',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: (scores: Scores): number => {
        const { GAA = 0, F = 0, Qz1 = 0, Qz2 = 0 } = scores;
        return 0.1 * GAA + 0.4 * F + Math.max(0.25 * Qz1 + 0.25 * Qz2, 0.4 * Math.max(Qz1, Qz2));
    },
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Machine Learning Practice',
    level: 'Diploma',
    components: ['GAA', 'OPPE1', 'OPPE2', 'KA'],
    calculateTotal: mlPracticeFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Business Data management',
    level: 'Diploma',
    components: ['GA', 'Qz2', 'ROE'],
    calculateTotal: bdmFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Business Analytics',
    level: 'Diploma',
    components: ['Qz1', 'Qz2', 'Asgn1', 'Asgn2', 'Asgn3'],
    calculateTotal: businessAnalyticsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Tools in Data Science',
    level: 'Diploma',
    components: ['GAA', 'ROE', 'P1', 'P2'],
    calculateTotal: tdsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Programming Data structures and algorithms using Python (PDSA)',
    level: 'Diploma',
    components: ['GAA', 'PE1', 'PE2', 'Qz1', 'Qz2'],
    calculateTotal: pdsaFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Database management system (DBMS)',
    level: 'Diploma',
    components: ['GAA1', 'GAA2', 'GAA3', 'OP', 'Qz1', 'Qz2'],
    calculateTotal: dbmsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Application development - 1',
    level: 'Diploma',
    components: ['GLA', 'GA', 'Qz1', 'Qz2'],
    calculateTotal: appDev1Formula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Application development - 2',
    level: 'Diploma',
    components: ['GAA1', 'GAA2', 'Qz1', 'Qz2'],
    calculateTotal: appDev2Formula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'System commands',
    level: 'Diploma',
    components: ['GAA', 'OP'],
    calculateTotal: systemCommandsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Java Programming',
    level: 'Diploma',
    components: ['GAA', 'OPPE1', 'Qz1'],
    calculateTotal: javaFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'BDM Project',
    level: 'Diploma',
    components: [],
    calculateTotal: () => 0,
    hasEndTerm: false,
    credits: 2,
  },
  {
    name: 'MLP Project',
    level: 'Diploma',
    components: [],
    calculateTotal: () => 0,
    hasEndTerm: false,
    credits: 2,
  },
  {
    name: 'App Dev 1 Project',
    level: 'Diploma',
    components: [],
    calculateTotal: () => 0,
    hasEndTerm: false,
    credits: 2,
  },
  {
    name: 'App Dev 2 Project',
    level: 'Diploma',
    components: [],
    calculateTotal: () => 0,
    hasEndTerm: false,
    credits: 2,
  },
  // Degree
  {
    name: 'Software Testing',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: degreeFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Software Engineering',
    level: 'Degree',
    components: ['GAA', 'Qz2', 'GP1', 'GP2', 'PP', 'CP'],
    calculateTotal: softwareEngineeringFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Deep Learning',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: degreeFormula, // Placeholder, uses standard formula
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'AI: Search Methods for Problem Solving',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: degreeFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Introduction to Big Data',
    level: 'Degree',
    components: ['GAA', 'OPPE1', 'OPPE2'],
    calculateTotal: (scores) => 0.1 * (scores.GAA || 0) + 0.3 * (scores.F || 0) + 0.2 * (scores.OPPE1 || 0) + 0.4 * (scores.OPPE2 || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Programming in C',
    level: 'Degree',
    components: ['GAA', 'GAAP', 'Qz1', 'OPPE1', 'OPPE2'],
    calculateTotal: programmingInCFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Deep Learning Practice',
    level: 'Degree',
    components: ['GA', 'Qz1', 'Qz2', 'Qz3', 'NPPE1', 'NPPE2', 'NPPE3', 'Viva'],
    calculateTotal: deepLearningPracticeFormula,
    hasEndTerm: false,
    credits: 4,
  },
  {
    name: 'Algorithms for Data Science (ADS)',
    level: 'Degree',
    components: ['GAA', 'Qz2'],
    calculateTotal: adsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'MLOPS',
    level: 'Degree',
    components: ['GAA', 'OPPE1', 'OPPE2'],
    calculateTotal: mlopsFormula,
    hasEndTerm: true,
    credits: 4,
  },
  // Adding more degree courses with the standard formula as a default
  {
    name: 'Strategies for Professional Growth',
    level: 'Degree',
    components: ['GAA', 'Qz2', 'GP1'], // Simplified
    calculateTotal: (s) => 0.15 * (s.GAA || 0) + 0.25 * (s.GP1 || 0) + 0.25 * (s.Qz2 || 0) + 0.35 * (s.F || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Algorithmic Thinking in Bioinformatics',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: (s) => 0.2 * (s.GAA || 0) + 0.2 * (s.Qz1 || 0) + 0.2 * (s.Qz2 || 0) + 0.4 * (s.F || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Managerial Economics',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: degreeFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Speech Technology',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2', 'Viva'],
    calculateTotal: (s) => 0.15 * (s.GAA || 0) + 0.15 * (s.Viva || 0) + 0.3 * (s.F || 0) + 0.2 * (s.Qz1 || 0) + 0.2 * (s.Qz2 || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Statistical Computing',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: degreeFormula,
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Advanced Algorithms',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: (s) => 0.15 * (s.GAA || 0) + 0.35 * (s.F || 0) + 0.25 * (s.Qz1 || 0) + 0.25 * (s.Qz2 || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Computer System Design',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2'],
    calculateTotal: (s) => 0.1 * (s.GAA || 0) + 0.4 * (s.F || 0) + 0.2 * (s.Qz1 || 0) + 0.25 * (s.Qz2 || 0),
    hasEndTerm: true,
    credits: 4,
  },
  {
    name: 'Mathematical Foundations of Generative AI',
    level: 'Degree',
    components: ['GAA', 'Qz1', 'Qz2', 'OPPE1'], // OPPE is one component
    calculateTotal: (s) => 0.2 * (s.GAA || 0) + 0.35 * (s.F || 0) + 0.1 * (s.Qz1 || 0) + 0.15 * (s.Qz2 || 0) + 0.2 * (s.OPPE1 || 0),
    hasEndTerm: true,
    credits: 4,
  },
];