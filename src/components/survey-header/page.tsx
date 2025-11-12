{/* CABEÇALHO — Título + Categoria + Data (responsivo) */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">Pesquisa de Clima - 2025</h2>
            <div className="flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
              <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                Clima Organizacional
              </span>
              <span className="text-black font-semibold text-sm">
                Até: 01/12/2026
              </span>
            </div>
          </div>// components/pesquisa/SurveyHeader.tsx
"use client";

import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils"; // se não tiver, pode trocar por uma simples concatenação

type CategoryVariant = "clima" | "servico" | "treinamento" | "default";

type SurveyHeaderProps = {
  title: string;
  category: string;
  deadline?: string | Date; // aceita "01/12/2026" ou Date
  categoryVariant?: CategoryVariant;
  className?: string;
};

const categoryStyles: Record<CategoryVariant, string> = {
  clima: "bg-[#21C25E] text-white",
  servico: "bg-[#1D4ED8] text-white",
  treinamento: "bg-[#9333EA] text-white",
  default: "bg-gray-200 text-gray-900",
};

function formatDate(d?: string | Date) {
  if (!d) return null;
  if (typeof d === "string") return d; // já vem em PT-BR (ex: 01/12/2026)
  try {
    return d.toLocaleDateString("pt-BR");
  } catch {
    return String(d);
  }
}

export default function SurveyHeader({
  title,
  category,
  deadline,
  categoryVariant = "default",
  className,
}: SurveyHeaderProps) {
  const deadlineText = formatDate(deadline);

  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>

      <div className="flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full px-4 h-6 text-sm font-medium",
            categoryStyles[categoryVariant]
          )}
        >
          {category}
        </span>

        {deadlineText && (
          <span className="inline-flex items-center gap-1 text-black font-semibold text-sm">
            <CalendarDays size={16} aria-hidden />
            <span>
              Até: {deadlineText}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
