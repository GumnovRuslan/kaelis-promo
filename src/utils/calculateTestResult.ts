const ARCHETYPES = {
  A: "Mage",
  B: "Warrior",
  C: "Sage",
  D: "Lover",
  E: "Creator",
  F: "Guide",
  G: "Explorer",
} as const;

type ArchetypeKey = keyof typeof ARCHETYPES;

export function calculateResult(answers: Record<number, ArchetypeKey>) {
  // 1. Подсчёт баллов
  const scores: Record<ArchetypeKey, number> = {
    A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0,
  };

  for (const step in answers) {
    const num = Number(step);
    const type = answers[num];

    if (!type) continue;

    if (num === 6) {
      scores[type] += 2; // двойные баллы
    } else {
      scores[type] += 1;
    }
  }

  // 2. Находим максимальный результат
  const maxScore = Math.max(...Object.values(scores));

  // Все лидеры
  let leaders = (Object.keys(scores) as ArchetypeKey[])
    .filter(k => scores[k] === maxScore);

  // Если победитель один — возвращаем
  if (leaders.length === 1) {
    return {
      winner: leaders[0],
      label: ARCHETYPES[leaders[0]],
      scores,
    };
  }

  // -----------------------
  // 💥 TIE BREAKERS
  // -----------------------

  // 1) приоритет вопроса №6
  const q6 = answers[6];
  if (q6 && leaders.includes(q6)) {
    return {
      winner: q6,
      label: ARCHETYPES[q6],
      scores,
    };
  }

  // 2) вопросы 2 и 7
  for (const q of [2, 7]) {
    const ans = answers[q];
    if (ans && leaders.includes(ans)) {
      leaders = [ans];
      return {
        winner: ans,
        label: ARCHETYPES[ans],
        scores,
      };
    }
  }

  // 3) вопросы 1 и 4
  for (const q of [1, 4]) {
    const ans = answers[q];
    if (ans && leaders.includes(ans)) {
      leaders = [ans];
      return {
        winner: ans,
        label: ARCHETYPES[ans],
        scores,
      };
    }
  }

  // 4) финальный приоритет
  const FINAL_PRIORITY: ArchetypeKey[] = ["A", "B", "C", "D", "E", "F", "G"];

  for (const arch of FINAL_PRIORITY) {
    if (leaders.includes(arch)) {
      return {
        winner: arch,
        label: ARCHETYPES[arch],
        scores,
      };
    }
  }

  // fallback (не должно случиться)
  return {
    winner: leaders[0],
    label: ARCHETYPES[leaders[0]],
    scores,
  };
}