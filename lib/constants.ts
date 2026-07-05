import type { Question, Service } from "@/types";

const ageOptions = [
  ...Array.from({ length: 42 }, (_, index) => {
    const age = index + 18;
    return { label: `${age}歳`, value: String(age) };
  }),
  { label: "60歳以上", value: "60" }
];

export const QUESTIONS: Question[] = [
  {
    key: "age",
    label: "年齢",
    placeholder: "31歳",
    options: ageOptions
  },
  {
    key: "salary",
    label: "今のお給料",
    placeholder: "650万円",
    options: [
      300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000
    ].map((salary) => ({
      label: salary === 1000 ? "1000万円以上" : `${salary}万円`,
      value: String(salary)
    }))
  },
  {
    key: "experience",
    label: "エンジニア歴",
    placeholder: "5年",
    options: [
      "1年未満",
      "1年",
      "2年",
      "3年",
      "4年",
      "5年",
      "6年",
      "7年",
      "8年",
      "9年",
      "10年以上"
    ].map((value) => ({ label: value, value }))
  },
  {
    key: "role",
    label: "今のお仕事",
    placeholder: "バックエンド",
    options: [
      "バックエンド",
      "フロントエンド",
      "モバイル",
      "インフラ",
      "SRE",
      "AI・データ",
      "EM・マネージャー",
      "その他"
    ].map((value) => ({ label: value, value }))
  },
  {
    key: "scope",
    label: "普段どこまで担当してる？",
    placeholder: "設計も担当",
    options: ["実装メイン", "設計も担当", "技術選定まで担当", "チームリード", "マネジメント"].map(
      (value) => ({ label: value, value })
    )
  },
  {
    key: "temperature",
    label: "今の気持ちは？",
    placeholder: "良い会社があれば転職したい",
    options: [
      "市場価値だけ知りたい",
      "良い会社があれば転職したい",
      "半年以内に転職したい",
      "まだ迷っている"
    ].map((value) => ({ label: value, value }))
  }
];

export const LOADING_MESSAGES = [
  "今の経験を見ています...",
  "近い年収帯を探しています...",
  "求人データを確認しています...",
  "もう少しで結果が出ます..."
];

export const SERVICES: Service[] = [
  {
    title: "エンジニア転職",
    href: "https://meiko-career.jp/lp3/engineer/",
    image: "/banners/strategy-career.png",
    featured: true
  },
  {
    title: "他の転職先",
    href: "#",
    image: "/banners/other-career.png"
  },
  {
    title: "副業",
    href: "#",
    image: "/banners/sidejob.png"
  }
];
