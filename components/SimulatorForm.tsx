"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LOADING_MESSAGES, QUESTIONS } from "@/lib/constants";
import { simulateSalary } from "@/lib/simulation";
import type { QuestionKey, SimulationResult, SimulatorAnswers } from "@/types";
import { ResultCard } from "./ResultCard";
import { ServiceBanner } from "./ServiceBanner";
import { SelectBox } from "./SelectBox";

const emptyAnswers: SimulatorAnswers = {
  age: "",
  salary: "",
  experience: "",
  role: "",
  scope: "",
  temperature: ""
};

type Stage = "question" | "analysis" | "result";

export function SimulatorForm() {
  const [answers, setAnswers] = useState<SimulatorAnswers>(emptyAnswers);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [stage, setStage] = useState<Stage>("question");
  const [messageIndex, setMessageIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const complete = useMemo(() => Object.values(answers).every(Boolean), [answers]);

  useEffect(() => {
    const savedAnswers = window.localStorage.getItem("engineer-salary-answers");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers) as SimulatorAnswers);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("engineer-salary-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (stage !== "analysis") return;

    setMessageIndex(0);
    setAnalysisProgress(0);
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 920);

    const progressTimer = window.setInterval(() => {
      setAnalysisProgress((current) => Math.min(current + 3, 95));
    }, 95);

    return () => {
      window.clearInterval(messageTimer);
      window.clearInterval(progressTimer);
    };
  }, [stage]);

  function updateAnswer(key: QuestionKey, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit() {
    if (!complete || stage === "analysis") return;

    setResult(null);
    setShowConfetti(false);
    setStage("analysis");

    window.setTimeout(() => {
      setAnalysisProgress(95);
    }, 3000);

    window.setTimeout(() => {
      const nextResult = simulateSalary(answers);
      window.localStorage.setItem("engineer-salary-result", JSON.stringify(nextResult));
      setResult(nextResult);
      setAnalysisProgress(100);

      window.setTimeout(() => {
        setStage("result");
        window.setTimeout(() => {
          stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 140);

        window.setTimeout(() => {
          setShowConfetti(true);
        }, 460);
      }, 520);

      window.setTimeout(() => setShowConfetti(false), 2600);
    }, 3500);
  }

  function handleReset() {
    setAnswers(emptyAnswers);
    setResult(null);
    setStage("question");
    setMessageIndex(0);
    setAnalysisProgress(0);
    setShowConfetti(false);
    window.localStorage.removeItem("engineer-salary-result");
    window.localStorage.removeItem("engineer-salary-answers");

    window.setTimeout(() => {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <>
      {showConfetti ? <Confetti /> : null}

      <div ref={stageRef}>
        {stage === "question" ? (
          <QuestionScreen
            answers={answers}
            complete={complete}
            onChange={updateAnswer}
            onSubmit={handleSubmit}
          />
        ) : null}

        {stage === "analysis" ? (
          <AnalysisScreen message={LOADING_MESSAGES[messageIndex]} progress={analysisProgress} />
        ) : null}

        {stage === "result" && result ? (
          <ResultScreen result={result} onReset={handleReset} />
        ) : null}
      </div>
    </>
  );
}

type QuestionScreenProps = {
  answers: SimulatorAnswers;
  complete: boolean;
  onChange: (key: QuestionKey, value: string) => void;
  onSubmit: () => void;
};

function QuestionScreen({ answers, complete, onChange, onSubmit }: QuestionScreenProps) {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
          30秒でできる 年収シミュレーター
        </p>
        <h1 className="mt-7 text-[2.7rem] font-semibold leading-[1.04] tracking-normal text-ink sm:text-7xl">
          もし今転職したら、
          <br />
          年収いくらくらいになりそう？
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-slate-500 sm:text-xl">
          気になったので、30秒でできるシミュレーターを作ってみました。
        </p>
      </div>

      <div className="mx-auto mt-12 w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white/72 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          {QUESTIONS.map((question) => (
            <SelectBox
              key={question.key}
              id={question.key}
              label={question.label}
              value={answers[question.key]}
              placeholder={question.placeholder}
              options={question.options}
              onChange={(value) => onChange(question.key, value)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!complete}
          className="mt-8 flex min-h-[62px] w-full items-center justify-center gap-3 rounded-full bg-ink px-6 text-base font-semibold text-white shadow-[0_18px_55px_rgba(17,24,39,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(17,24,39,0.28)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-white disabled:shadow-none sm:mx-auto sm:w-auto sm:min-w-80"
        >
          結果を見てみる
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>

        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-6 text-slate-400">
          結果は簡易シミュレーションです。実際の年収は経験内容・希望条件・企業によって変わります。
        </p>
      </div>
    </section>
  );
}

type AnalysisScreenProps = {
  message: string;
  progress: number;
};

function AnalysisScreen({ message, progress }: AnalysisScreenProps) {
  return (
    <section className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
      <div className="animate-float-in mx-auto w-full max-w-xl text-center">
        <h2 className="text-2xl font-semibold tracking-normal text-ink sm:text-4xl">
          少しだけ確認しています
        </h2>
        <div className="mx-auto mt-8 h-3 overflow-hidden rounded-full bg-slate-200/70">
          <div
            className="h-full rounded-full bg-slate-950 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-6 min-h-7 text-base font-medium text-slate-500 sm:text-lg">{message}</p>
      </div>
    </section>
  );
}

type ResultScreenProps = {
  result: SimulationResult;
  onReset: () => void;
};

function ResultScreen({ result, onReset }: ResultScreenProps) {
  return (
    <section className="relative min-h-svh overflow-hidden bg-[linear-gradient(145deg,#111827_0%,#172033_42%,#0f2d2d_100%)] px-5 pb-8 pt-16 text-white sm:px-8 sm:pt-20 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      <div className="relative mx-auto max-w-5xl">
        <ResultCard result={result} onReset={onReset} />
        <ServiceBanner />
      </div>
    </section>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 46 }, (_, index) => ({
    id: index,
    x: `${Math.round(Math.cos(index) * (90 + (index % 8) * 22))}px`,
    y: `${Math.round(-150 - (index % 7) * 30)}px`,
    r: `${index * 31}deg`,
    color: ["#57c7a0", "#ffd166", "#ff7a6b", "#6bb7ff", "#172033"][index % 5],
    left: `${6 + ((index * 11) % 88)}%`,
    delay: `${(index % 10) * 0.035}s`
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-[20vh] z-50 h-64">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute h-3 w-2 rounded-sm"
          style={{
            left: piece.left,
            top: "140px",
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            "--x": piece.x,
            "--y": piece.y,
            "--r": piece.r
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
