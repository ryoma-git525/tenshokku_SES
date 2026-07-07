export type QuestionKey =
  | "age"
  | "salary"
  | "experience"
  | "role"
  | "scope"
  | "temperature";

export type SimulatorAnswers = Record<QuestionKey, string>;

export type SelectOption = {
  label: string;
  value: string;
};

export type Question = {
  key: QuestionKey;
  label: string;
  placeholder: string;
  options: SelectOption[];
};

export type SalaryRange = {
  min: number;
  max: number;
};

export type SimulationResult = {
  currentSalary: number;
  expectedMin: number;
  expectedMax: number;
  reasons: string[];
  message: string;
};

export type Service = {
  title: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  trackingImage: string;
  featured?: boolean;
};
