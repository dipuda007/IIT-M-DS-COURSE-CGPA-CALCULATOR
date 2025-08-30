export enum AssessmentComponent {
  GAA = 'Graded Assignments Average (GAA)',
  GAA1 = 'Objective Assignments (GAA1)',
  GAA2 = 'Programming Assignments (GAA2)',
  Qz1 = 'Quiz 1',
  Qz2 = 'Quiz 2',
  ET = 'End Term Exam',
  OPPE1 = 'OPPE 1',
  OPPE2 = 'OPPE 2',
  PE1 = 'Programming Exam 1',
  PE2 = 'Programming Exam 2',
  KA = 'Kaggle Assignments',
  ROE = 'Remote Online Exam (ROE)',
  GA = 'Graded Assignments (GA)',
  F = 'End Term Exam',
  Asgn1 = 'Assignment 1',
  Asgn2 = 'Assignment 2',
  Asgn3 = 'Assignment 3',
  P1 = 'Take Home Project 1',
  P2 = 'Take Home Project 2',
  GAA3 = 'Week 7 Programming Assignment',
  OP = 'Online Proctored Exam (OPE/OPPE)',
  GLA = 'Graded Lab Assignments (GLA)',
  // Degree specific
  GP1 = 'Group Project Milestone 1-3',
  GP2 = 'Group Project Milestone 4-6',
  PP = 'Project Presentation',
  CP = 'Course Participation',
  Qz3 = 'Quiz 3',
  NPPE1 = 'NPPE 1',
  NPPE2 = 'NPPE 2',
  NPPE3 = 'NPPE 3',
  Viva = 'Viva',
  GAAP = 'Graded Programming Assignments Avg',
}

export type Scores = Partial<Record<keyof typeof AssessmentComponent, number>>;

export interface Course {
  name: string;
  level: 'Foundation' | 'Diploma' | 'Degree';
  components: (keyof typeof AssessmentComponent)[];
  calculateTotal: (scores: Scores) => number;
  hasEndTerm: boolean;
  credits: number;
}

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export const GRADE_POINTS: Record<Grade, number> = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 4,
};

export const GRADE_MIN_SCORES: Record<Grade, number> = {
  S: 90,
  A: 80,
  B: 70,
  C: 60,
  D: 50,
  E: 40,
};