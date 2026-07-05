"use client";

import { ArrowDown, Check } from "lucide-react";
import type { SimulationResult } from "@/types";

type ResultCardProps = {
  result: SimulationResult;
  onReset: () => void;
};

export function ResultCard({ result, onReset }: ResultCardProps) {
  const increaseMin = result.expectedMin - result.currentSalary;
  const increaseMax = result.expectedMax - result.currentSalary;

  return (
    <div className="animate-float-in overflow-hidden rounded-[2.5rem] border border-white/14 bg-white/[0.08] shadow-[0_44px_150px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
      <div className="relative px-5 py-10 text-center sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />
        <div className="relative">
          <div className="mx-auto flex h-2 w-20 rounded-full bg-cyan-200/80 shadow-[0_0_32px_rgba(125,211,252,0.26)]" aria-hidden="true" />

          <div className="mt-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-white/45">見てみると...</p>

            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              あなたの経験は、
              <br />
              思っている以上に選択肢があります！
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-[1fr_auto_1.45fr] sm:items-center">
            <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-sm font-semibold text-white/42">今のお給料</p>
              <p className="mt-3 text-4xl font-semibold leading-none text-white sm:text-5xl">
                {result.currentSalary}
                <span className="ml-1 text-xl text-white/42">万円</span>
              </p>
            </div>

            <div className="flex justify-center text-white/28 sm:rotate-[-90deg]">
              <ArrowDown aria-hidden="true" className="h-8 w-8" />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/16 bg-slate-950/72 p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.30)] sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/60 to-transparent"
              />
              <p className="text-sm font-medium text-white/50">見にいけそうな年収</p>
              <p className="mt-3 text-5xl font-semibold leading-none tracking-normal text-cyan-200 sm:text-7xl">
                {result.expectedMin}〜{result.expectedMax}
                <span className="ml-1 text-2xl text-cyan-100/70 sm:text-3xl">万円</span>
              </p>
              <p className="mt-4 text-sm font-medium text-white/42">
                あなたの経験なら、{increaseMin}〜{increaseMax}万円を目指せる求人も十分ありそうです。
              </p>
            </div>
          </div>

          <div className="mx-auto mt-9 max-w-xl rounded-3xl border border-white/12 bg-white/[0.07] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <h3 className="text-sm font-semibold text-white/48">良さそうに見えたポイント</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {result.reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-200/14 text-cyan-100 ring-1 ring-cyan-100/20">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-10 max-w-2xl text-left">
            <p className="text-lg font-medium leading-9 text-white/70">
              「本当にそんな求人あるの？」
              <br className="hidden sm:block" />
              そう思ったら、まずはあなたと近い経験の人が選んでいる求人を見てみませんか。
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-lg text-xs leading-6 text-white/36">
            あくまでざっくりの目安です。実際の年収は経験内容・企業・面接結果によって変わります。
          </p>

          <button
            type="button"
            onClick={onReset}
            className="mt-8 text-sm font-semibold text-white/40 underline-offset-4 transition hover:text-white hover:underline active:scale-[0.98]"
          >
            条件を変えてもう一度やってみる
          </button>
        </div>
      </div>
    </div>
  );
}
