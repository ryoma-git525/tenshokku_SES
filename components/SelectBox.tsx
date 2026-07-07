"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SelectOption } from "@/types";

type SelectBoxProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export function SelectBox({ id, label, value, placeholder, options, onChange }: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-500">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-[60px] w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-left text-base font-semibold text-ink shadow-[0_10px_30px_rgba(15,23,42,0.04)] outline-none transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] focus:border-ink focus:ring-4 focus:ring-slate-900/5 active:scale-[0.99]"
      >
        <span className={selectedLabel ? "text-ink" : "text-slate-400"}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 text-slate-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl animate-float-in">
          <ul role="listbox" aria-labelledby={id} className="space-y-1">
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                      selected ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{option.label}</span>
                    {selected ? <Check aria-hidden="true" className="h-4 w-4 text-white" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
