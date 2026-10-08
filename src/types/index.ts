export interface Lesson {
  id: string;
  title: string;
  knowledgePoints: string[];
  videoUrl: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Semester {
  id: string;
  title: string;
  units: Unit[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  semesters: Semester[];
}

export interface Question {
  type: 'single_choice' | 'true_false' | 'fill_blank';
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface PracticeResult {
  questionIndex: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  score: number;
  comment: string;
  explanation: string;
}

export interface WrongQuestion {
  id: string;
  subject: string;
  lessonId: string;
  lessonTitle: string;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  knowledgePoint: string;
  createdAt: number;
}

export interface Stats {
  totalPractices: number;
  totalQuestions: number;
  totalCorrect: number;
  correctRate: number;
  avgScore: number;
  wrongCount: number;
}

export interface StudyRecord {
  id: string;
  subject: string;
  lessonId: string;
  lessonTitle: string;
  action: string;
  createdAt: number;
}
