import type { SalaryRange, SimulationResult, SimulatorAnswers } from "@/types";

const experienceRanges: Record<string, SalaryRange> = {
  "1年未満": { min: 0, max: 30 },
  "1年": { min: 20, max: 50 },
  "2年": { min: 30, max: 70 },
  "3年": { min: 50, max: 100 },
  "4年": { min: 70, max: 130 },
  "5年": { min: 90, max: 160 },
  "6年": { min: 100, max: 180 },
  "7年": { min: 110, max: 200 },
  "8年": { min: 120, max: 220 },
  "9年": { min: 130, max: 240 },
  "10年以上": { min: 140, max: 260 }
};

const roleRanges: Record<string, SalaryRange> = {
  バックエンド: { min: 60, max: 140 },
  フロントエンド: { min: 40, max: 120 },
  モバイル: { min: 50, max: 130 },
  インフラ: { min: 40, max: 120 },
  SRE: { min: 80, max: 180 },
  "AI・データ": { min: 90, max: 200 },
  "EM・マネージャー": { min: 100, max: 220 },
  その他: { min: 20, max: 80 }
};

const scopeRanges: Record<string, SalaryRange> = {
  実装メイン: { min: 20, max: 70 },
  設計も担当: { min: 70, max: 150 },
  技術選定まで担当: { min: 100, max: 220 },
  チームリード: { min: 120, max: 250 },
  マネジメント: { min: 140, max: 280 }
};

function getAgeRange(ageValue: string): SalaryRange {
  const age = Number(ageValue);

  if (age <= 24) return { min: -20, max: 30 };
  if (age <= 29) return { min: 20, max: 80 };
  if (age <= 34) return { min: 40, max: 100 };
  if (age <= 39) return { min: 30, max: 100 };
  if (age <= 49) return { min: 0, max: 80 };
  if (age <= 59) return { min: -20, max: 60 };
  return { min: -30, max: 40 };
}

function roundToTen(value: number) {
  return Math.round(value / 10) * 10;
}

function buildReasons(answers: SimulatorAnswers) {
  const reasons = [
    roleReason(answers.role),
    `実務${answers.experience}`,
    scopeReason(answers.scope)
  ];

  return reasons;
}

function scopeReason(scope: string) {
  const reasons: Record<string, string> = {
    実装メイン: "実装経験あり",
    設計も担当: "設計経験あり",
    技術選定まで担当: "技術選定あり",
    チームリード: "リード経験あり",
    マネジメント: "マネジメント経験あり"
  };

  return reasons[scope] ?? "担当範囲あり";
}

function roleReason(role: string) {
  const reasons: Record<string, string> = {
    バックエンド: "バックエンド経験",
    フロントエンド: "フロントエンド経験",
    モバイル: "モバイル開発経験",
    インフラ: "インフラ経験",
    SRE: "SRE経験",
    "AI・データ": "AI・データ経験",
    "EM・マネージャー": "EM・マネージャー経験",
    その他: "これまでの経験"
  };

  return reasons[role] ?? "経験領域あり";
}

function buildMessage(temperature: string) {
  if (temperature === "市場価値だけ知りたい") {
    return "まずは相場感を知るだけでも、次の選択肢を考えやすくなりそうです。";
  }

  if (temperature === "半年以内に転職したい") {
    return "気になる求人を少し見ておくと、動き出す時の手がかりになりそうです。";
  }

  if (temperature === "まだ迷っている") {
    return "迷っている段階でも、どんな選択肢があるかを軽く見るだけなら始めやすそうです。";
  }

  return "良い会社があれば、今の経験がどう見られるかを知るだけでも手がかりになりそうです。";
}

export function simulateSalary(answers: SimulatorAnswers): SimulationResult {
  const currentSalary = Number(answers.salary);
  const ranges = [
    experienceRanges[answers.experience],
    roleRanges[answers.role],
    scopeRanges[answers.scope],
    getAgeRange(answers.age)
  ];

  const total = ranges.reduce(
    (acc, range) => ({
      min: acc.min + range.min,
      max: acc.max + range.max
    }),
    { min: 0, max: 0 }
  );

  const expectedMin = Math.max(currentSalary, roundToTen(currentSalary + total.min));
  const expectedMax = Math.max(expectedMin + 40, roundToTen(currentSalary + total.max));

  return {
    currentSalary,
    expectedMin,
    expectedMax,
    reasons: buildReasons(answers),
    message: buildMessage(answers.temperature)
  };
}
