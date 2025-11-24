'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { QUIZ } from '@/components/sections/testModal/quiz_schemas';
import { calculateResult } from '@/utils/calculateTestResult';
import type { ArchetypeKey } from '@/types/ArchetypeKey';
import { useSubscribe } from './SubscribeContext';

type TestModalContextType = {
  isOpen: boolean;
  step: number;
  total: number;
  answers: Record<number, string>;
  currentQuestion: typeof QUIZ[number];
  result: ArchetypeKey | null;

  openTest: () => void;
  closeTest: () => void;
  next: () => void;
  prev: () => void;
  selectAnswer: (answer: ArchetypeKey) => void;
  showResult: () => void;
};

const TestModalContext = createContext<TestModalContextType | null>(null);

export const TestModalProvider = ({ children }: { children: ReactNode }) => {
  const total = QUIZ.length;
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, ArchetypeKey>>({});
  const [result, setResult] = useState<ArchetypeKey | null>(null)
  const {setArchetypeType} = useSubscribe();

  const currentQuestion = QUIZ[step - 1];

  // --- Открытие / закрытие модалки ---
  const openTest = () => setIsOpen(true);
  const closeTest = () => setIsOpen(false);

  // --- Шаги ---
  const next = () => {
    if (step < total) setStep(prev => prev + 1);
  };

  const prev = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  // --- Выбор ответа ---
  const selectAnswer = (answer: ArchetypeKey) => {
    setAnswers(prev => ({
      ...prev,
      [step]: answer,
    }));
  };

  const showResult = () => {
    console.log(calculateResult(answers))
    const result = calculateResult(answers).winner;
    setArchetypeType(result);
    setResult(result)
    
  }

  return (
    <TestModalContext.Provider
      value={{
        isOpen,
        step,
        total,
        currentQuestion,
        answers,
        result,
        openTest,
        closeTest,
        next,
        prev,
        selectAnswer,
        showResult,
      }}
    >
      {children}
    </TestModalContext.Provider>
  );
};

export const useTestModal = () => {
  const ctx = useContext(TestModalContext);
  if (!ctx) throw new Error("useTestModal must be used within TestModalProvider");
  return ctx;
};