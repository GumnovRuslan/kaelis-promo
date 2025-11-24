import type { ArchetypeKey } from "@/types/ArchetypeKey";

export type TQuiz = {
  step: number;
  question: string;
  answers: TAnswer[]
}

export type TAnswer = {
  type: ArchetypeKey;
  text: string;
}

export const QUIZ: TQuiz[] = [
  {
    step: 1,
    question: "quest_1.question",
    answers: [
      {
        type: 'A',
        text: 'quest_1.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_1.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_1.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_1.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_1.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_1.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_1.answers.answer_g'
      },
    ]
  },
  {
    step: 2,
    question: "quest_2.question",
    answers: [
      {
        type: 'A',
        text: 'quest_2.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_2.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_2.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_2.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_2.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_2.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_2.answers.answer_g'
      },
    ]
  },
  {
    step: 3,
    question: "quest_3.question",
    answers: [
      {
        type: 'A',
        text: 'quest_3.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_3.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_3.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_3.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_3.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_3.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_3.answers.answer_g'
      },
    ]
  },
  {
    step: 4,
    question: "quest_4.question",
    answers: [
      {
        type: 'A',
        text: 'quest_4.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_4.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_4.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_4.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_4.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_4.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_4.answers.answer_g'
      },
    ]
  },
  {
    step: 5,
    question: "quest_5.question",
    answers: [
      {
        type: 'A',
        text: 'quest_5.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_5.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_5.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_5.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_5.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_5.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_5.answers.answer_g'
      },
    ]
  },
  {
    step: 6,
    question: "quest_6.question",
    answers: [
      {
        type: 'A',
        text: 'quest_6.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_6.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_6.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_6.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_6.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_6.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_6.answers.answer_g'
      },
    ]
  },
  {
    step: 7,
    question: "quest_7.question",
    answers: [
      {
        type: 'A',
        text: 'quest_7.answers.answer_a'
      },
      {
        type: 'B',
        text: 'quest_7.answers.answer_b'
      },
      {
        type: 'C',
        text: 'quest_7.answers.answer_c'
      },
      {
        type: 'D',
        text: 'quest_7.answers.answer_d'
      },
      {
        type: 'E',
        text: 'quest_7.answers.answer_e'
      },
      {
        type: 'F',
        text: 'quest_7.answers.answer_f'
      },
      {
        type: 'G',
        text: 'quest_7.answers.answer_g'
      },
    ]
  },
]

