// export const DATA = {
//   question: "When you face a challenge, the first thing you do is…",
//   answers: [
//     'Listen to the inner signal where the "knot" of energy is.',
//     'Break the task into steps and take action',
//     'Gather facts and analyze the causes.',
//     'Seek support or reach out to loved ones.',
//     'Look for a creative way to turn it into an opportunity.',
//     'See who else can benefit and how to be helpful.',
//     'Change the environment, experiment.'
//   ]
// }

export type TData = {
  step: number;
  question: string;
  answers: TAnswer[]
}

export type TAnswer = {
  type: 'A'| 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  text: string;
}

// export const DATA: TData = {
//   'step-1': {
//     question: "When you face a challenge, the first thing you do is…",
//     answers: [
//       {
//         type: 'A',
//         text: 'Listen to the inner signal where the "knot" of energy is.'
//       },
//       {
//         type: 'B',
//         text: 'Break the task into steps and take action'
//       },
//       {
//         type: 'C',
//         text: 'Gather facts and analyze the causes.'
//       },
//       {
//         type: 'D',
//         text: 'Seek support or reach out to loved ones.'
//       },
//       {
//         type: 'E',
//         text: 'Look for a creative way to turn it into an opportunity.'
//       },
//       {
//         type: 'F',
//         text: 'See who else can benefit and how to be helpful.'
//       },
//       {
//         type: 'G',
//         text: 'Change the environment, experiment.'
//       },
//     ]
//   },
//   'step-2': {
//     question: "What is the main guiding principle in your life?",
//     answers: [
//       {
//         type: 'A',
//         text: 'Intuition'
//       },
//       {
//         type: 'B',
//         text: 'Result.'
//       },
//       {
//         type: 'C',
//         text: 'Understanding.'
//       },
//       {
//         type: 'D',
//         text: 'Love.'
//       },
//       {
//         type: 'E',
//         text: 'Self-realization.'
//       },
//       {
//         type: 'F',
//         text: 'Service.'
//       },
//       {
//         type: 'G',
//         text: 'Freedom.'
//       },
//     ]
//   },
//   'step-3': {
//     question: "How do you make important decisions?",
//     answers: [
//       {
//         type: 'A',
//         text: 'Body: "yes/no."'
//       },
//       {
//         type: 'B',
//         text: 'The most direct path to the goal.'
//       },
//       {
//         type: 'C',
//         text: 'Logical model.'
//       },
//       {
//         type: 'D',
//         text: 'Heart.'
//       },
//       {
//         type: 'E',
//         text: 'Visualize the picture and move toward it.'
//       },
//       {
//         type: 'F',
//         text: 'Check for benefit to others.'
//       },
//       {
//         type: 'G',
//         text: 'Try several routes.'
//       },
//     ]
//   },
//   'step-4': {
//     question: "When it's tough, what pulls you together?",
//     answers: [
//       {
//         type: 'A',
//         text: 'Mindfulness ritual.'
//       },
//       {
//         type: 'B',
//         text: 'Action/training.'
//       },
//       {
//         type: 'C',
//         text: 'Time for reflection.'
//       },
//       {
//         type: 'D',
//         text: 'Heartfelt conversation.'
//       },
//       {
//         type: 'E',
//         text: 'Creativity.'
//       },
//       {
//         type: 'F',
//         text: 'Helping someone.'
//       },
//       {
//         type: 'G',
//         text: 'Change of scenery.'
//       },
//     ]
//   },
//   'step-5': {
//     question: "What makes you feel fulfilled?",
//     answers: [
//       {
//         type: 'A',
//         text: 'Insights.'
//       },
//       {
//         type: 'B',
//         text: 'Completed tasks.'
//       },
//       {
//         type: 'C',
//         text: 'Understanding.'
//       },
//       {
//         type: 'D',
//         text: 'Closeness.'
//       },
//       {
//         type: 'E',
//         text: 'Creating something new.'
//       },
//       {
//         type: 'F',
//         text: 'Gratitude from people.'
//       },
//       {
//         type: 'G',
//         text: 'New horizons.'
//       },
//     ]
//   },
//   'step-6': {
//     question: "How do you feel your mission?",
//     answers: [
//       {
//         type: 'A',
//         text: 'To transform consciousness.'
//       },
//       {
//         type: 'B',
//         text: 'To lead and protect.'
//       },
//       {
//         type: 'C',
//         text: 'To pass on knowledge.'
//       },
//       {
//         type: 'D',
//         text: 'To heal with love.'
//       },
//       {
//         type: 'E',
//         text: 'To create forms for the world.'
//       },
//       {
//         type: 'F',
//         text: 'To be a guide of meaning.'
//       },
//       {
//         type: 'G',
//         text: 'To expand the boundaries of possibility.'
//       },
//     ]
//   },
//   'step-7': {
//     question: "Which phrase is closest to you?",
//     answers: [
//       {
//         type: 'A',
//         text: 'The world is a reflection of my energy.'
//       },
//       {
//         type: 'B',
//         text: 'Strength is in action.'
//       },
//       {
//         type: 'C',
//         text: 'Understanding frees.'
//       },
//       {
//         type: 'D',
//         text: 'Love is my language.'
//       },
//       {
//         type: 'E',
//         text: 'I create my reality.'
//       },
//       {
//         type: 'F',
//         text: 'To serve is to shine.'
//       },
//       {
//         type: 'G',
//         text: 'The path opens before the one who walks.'
//       },
//     ]
//   },
// }

export const DATA: TData[] = [
  {
    step: 1,
    question: "When you face a challenge, the first thing you do is…",
    answers: [
      {
        type: 'A',
        text: 'Listen to the inner signal where the "knot" of energy is.'
      },
      {
        type: 'B',
        text: 'Break the task into steps and take action'
      },
      {
        type: 'C',
        text: 'Gather facts and analyze the causes.'
      },
      {
        type: 'D',
        text: 'Seek support or reach out to loved ones.'
      },
      {
        type: 'E',
        text: 'Look for a creative way to turn it into an opportunity.'
      },
      {
        type: 'F',
        text: 'See who else can benefit and how to be helpful.'
      },
      {
        type: 'G',
        text: 'Change the environment, experiment.'
      },
    ]
  },
  {
    step: 2,
    question: "What is the main guiding principle in your life?",
    answers: [
      {
        type: 'A',
        text: 'Intuition'
      },
      {
        type: 'B',
        text: 'Result.'
      },
      {
        type: 'C',
        text: 'Understanding.'
      },
      {
        type: 'D',
        text: 'Love.'
      },
      {
        type: 'E',
        text: 'Self-realization.'
      },
      {
        type: 'F',
        text: 'Service.'
      },
      {
        type: 'G',
        text: 'Freedom.'
      },
    ]
  },
  {
    step: 3,
    question: "How do you make important decisions?",
    answers: [
      {
        type: 'A',
        text: 'Body: "yes/no."'
      },
      {
        type: 'B',
        text: 'The most direct path to the goal.'
      },
      {
        type: 'C',
        text: 'Logical model.'
      },
      {
        type: 'D',
        text: 'Heart.'
      },
      {
        type: 'E',
        text: 'Visualize the picture and move toward it.'
      },
      {
        type: 'F',
        text: 'Check for benefit to others.'
      },
      {
        type: 'G',
        text: 'Try several routes.'
      },
    ]
  },
  {
    step: 4,
    question: "When it's tough, what pulls you together?",
    answers: [
      {
        type: 'A',
        text: 'Mindfulness ritual.'
      },
      {
        type: 'B',
        text: 'Action/training.'
      },
      {
        type: 'C',
        text: 'Time for reflection.'
      },
      {
        type: 'D',
        text: 'Heartfelt conversation.'
      },
      {
        type: 'E',
        text: 'Creativity.'
      },
      {
        type: 'F',
        text: 'Helping someone.'
      },
      {
        type: 'G',
        text: 'Change of scenery.'
      },
    ]
  },
  {
    step: 5,
    question: "What makes you feel fulfilled?",
    answers: [
      {
        type: 'A',
        text: 'Insights.'
      },
      {
        type: 'B',
        text: 'Completed tasks.'
      },
      {
        type: 'C',
        text: 'Understanding.'
      },
      {
        type: 'D',
        text: 'Closeness.'
      },
      {
        type: 'E',
        text: 'Creating something new.'
      },
      {
        type: 'F',
        text: 'Gratitude from people.'
      },
      {
        type: 'G',
        text: 'New horizons.'
      },
    ]
  },
  {
    step: 6,
    question: "How do you feel your mission?",
    answers: [
      {
        type: 'A',
        text: 'To transform consciousness.'
      },
      {
        type: 'B',
        text: 'To lead and protect.'
      },
      {
        type: 'C',
        text: 'To pass on knowledge.'
      },
      {
        type: 'D',
        text: 'To heal with love.'
      },
      {
        type: 'E',
        text: 'To create forms for the world.'
      },
      {
        type: 'F',
        text: 'To be a guide of meaning.'
      },
      {
        type: 'G',
        text: 'To expand the boundaries of possibility.'
      },
    ]
  },
  {
    step: 7,
    question: "Which phrase is closest to you?",
    answers: [
      {
        type: 'A',
        text: 'The world is a reflection of my energy.'
      },
      {
        type: 'B',
        text: 'Strength is in action.'
      },
      {
        type: 'C',
        text: 'Understanding frees.'
      },
      {
        type: 'D',
        text: 'Love is my language.'
      },
      {
        type: 'E',
        text: 'I create my reality.'
      },
      {
        type: 'F',
        text: 'To serve is to shine.'
      },
      {
        type: 'G',
        text: 'The path opens before the one who walks.'
      },
    ]
  }
]