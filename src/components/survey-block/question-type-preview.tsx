"use client";

import React from "react";
import { Star, Frown, Meh, Smile, Laugh } from "lucide-react";
import type { Pergunta, PerguntaMultipla } from "./survey-block";

type QuestionTypePreviewProps = {
  pergunta: Pergunta;
};

const faceFor = (n: number) => {
  if (n <= 2) return <Frown className="w-5 h-5" />;
  if (n <= 4) return <Meh className="w-5 h-5" />;
  if (n <= 7) return <Smile className="w-5 h-5" />;
  return <Laugh className="w-5 h-5" />;
};

export default function QuestionTypePreview({
  pergunta,
}: QuestionTypePreviewProps) {
  // MÚLTIPLA ESCOLHA
  if (pergunta.tipo === "multipla") {
    const p = pergunta as PerguntaMultipla;

    return (
      <>
        <p className="text-sm text-zinc-800 mb-3">{p.pergunta}</p>

        <div className="space-y-2">
          {p.alternativas.map((alt, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm text-zinc-900"
            >
              <div className="h-4 w-4 rounded-full border border-zinc-500" />
              <span>{alt}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  // DISSERTATIVA
  if (pergunta.tipo === "dissertativa") {
    return <p className="text-sm text-zinc-800 mb-3">{pergunta.pergunta}</p>;
  }

  // ESTRELAS
  if (pergunta.tipo === "estrelas") {
    return (
      <>
        <p className="text-sm text-black mb-3">{pergunta.pergunta}</p>

        <div className="inline-flex items-center gap-2 py-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5 text-[#238662]"
              fill="#238662"
              strokeWidth={1.5}
            />
          ))}
        </div>
      </>
    );
  }

  // NPS
  if (pergunta.tipo === "nps") {
    return (
      <>
        <p className="text-sm text-black mb-3">{pergunta.pergunta}</p>

        <div className="mt-2 grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 10 }, (_, idx) => {
            const n = idx + 1;
            return (
              <div
                key={n}
                className="group flex flex-col items-center justify-center gap-1 p-2 rounded-md border bg-white border-black text-black"
              >
                <span className="flex items-center justify-center h-6">
                  {faceFor(n)}
                </span>
                <span className="text-xs font-medium">{n}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  // fallback (não deveria cair aqui)
  return null;
}
