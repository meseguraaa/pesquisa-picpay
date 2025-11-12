"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  House,
  FolderGit,
  FileUp,
  FileSliders,
  Check,
  Frown,
  Meh,
  Smile,
  Laugh,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

/** ===== Tipos ===== */
type TipoPergunta = "nps";

type Pergunta = {
  tipo: TipoPergunta;
  descricao: string;
};

type Bloco = {
  nome: string;
  perguntas: Pergunta[];
};

type Resposta = {
  nps: number | null; // 1..10
};

/** ===== Blocos (somente NPS) ===== */
const blocos: Bloco[] = [
  {
    nome: "NPS",
    perguntas: [
      {
        tipo: "nps",
        descricao:
          "Em uma escala de 1 a 10, o quanto você recomendaria nossa empresa a outros negócios como uma parceira confiável e de qualidade?",
      },
    ],
  },
];

/** ===== Helpers ===== */
const initResposta = (): Resposta => ({ nps: null });

const isPerguntaValida = (p: Pergunta, r: Resposta) => {
  switch (p.tipo) {
    case "nps":
      return r.nps !== null && r.nps >= 1 && r.nps <= 10;
    default:
      return false;
  }
};

export default function FormularioPesquisaClima2025() {
  /** ===== Estados ===== */
  const [step] = useState(0); // só 1 bloco
  const [respostas, setRespostas] = useState<Resposta[][]>(
    blocos.map((b) => b.perguntas.map(() => initResposta()))
  );

  /** ===== Dados do bloco atual ===== */
  const perguntasAtuais = blocos[step].perguntas;
  const respostasAtuais = respostas[step];

  /** ===== Validação do bloco atual ===== */
  const blocoValido = useMemo(() => {
    // como só tem 1 pergunta, basta validar a única
    return isPerguntaValida(perguntasAtuais[0], respostasAtuais[0]);
  }, [perguntasAtuais, respostasAtuais]);

  /** ===== Progresso total (0 → 100 quando seleciona NPS) ===== */
  const progressoAlvo = blocoValido ? 100 : 0;

  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const start = progress;
    const end = progressoAlvo;
    if (start === end) return;

    const duration = 500; // ms
    let raf = 0;
    let startTime = 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min(1, (ts - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = Math.round(start + (end - start) * eased);
      setProgress(value);
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressoAlvo]);

  // (Mesmo com 1 bloco, mantive: se voltar de outra rota, rola pro topo)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [step]);

  /** ===== Handlers ===== */
  const setResposta = (perguntaIndex: number, patch: Partial<Resposta>) => {
    setRespostas((prev) => {
      const next = prev.map((blocoResp) => blocoResp.slice());
      next[step][perguntaIndex] = { ...next[step][perguntaIndex], ...patch };
      return next;
    });
  };

  const onChangeNps = (perguntaIndex: number, valor: number) => {
    setResposta(perguntaIndex, { nps: valor });
  };

  /** ===== UI Helpers ===== */
  const faceFor = (n: number) => {
    if (n <= 2) return <Frown className="w-5 h-5" />;
    if (n <= 4) return <Meh className="w-5 h-5" />;
    if (n <= 7) return <Smile className="w-5 h-5" />;
    return <Laugh className="w-5 h-5" />;
  };

  const router = useRouter();

  const handleFinalizar = () => {
    if (!blocoValido) return;
    router.push("/pesquisas/nps-pj/encerramento");
  };

  const handleVoltar = () => {
    router.push("/pesquisas/nps-pj");
  };

  /** ===== Render ===== */
  return (
    <div className="min-h-screen bg-white">
      {/* MAIN */}
      <main className=" pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold">NPS - PJ</h2>
              <div className="mt-2 sm:mt-0 flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
                <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                  Serviços
                </span>
                <span className="text-black font-semibold text-sm">
                  Até: 13/01/2026
                </span>
              </div>
            </div>

            {/* Progresso (0 → 100 quando seleciona NPS) */}
            <div className="mt-10">
              {/* Botão Voltar */}
              <div className="flex items-center mb-4">
                <button
                  onClick={handleVoltar}
                  className="flex items-center gap-2 text-[#333333] hover:text-[#238662] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Voltar</span>
                </button>
              </div>
              <div
                className={`mb-1 font-semibold text-sm ${
                  progress > 0 ? "text-[#238662]" : "text-gray-500"
                }`}
              >
                {progress}%
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#238662]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* ===== Bloco único NPS ===== */}
          <section className="bg-white mt-10">
            <h3 className="text-xl font-semibold text-black mb-2">
              {blocos[step].nome}
            </h3>

            {perguntasAtuais.map((p, i) => {
              const r = respostasAtuais[i];

              return (
                <div key={i}>
                  <p className="text-black text-sm leading-relaxed mb-4">
                    {p.descricao}
                  </p>

                  {/* NPS (1..10) */}
                  <div className="mt-2 grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {Array.from({ length: 10 }, (_, idx) => idx + 1).map(
                      (n) => {
                        const selected = r.nps === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => onChangeNps(i, n)}
                            className={`group flex flex-col items-center justify-center gap-1 p-2 rounded-md border transition-colors ${
                              selected
                                ? "bg-[#238662] border-[#238662] text-white"
                                : "bg-white border-black text-black hover:bg-gray-100"
                            }`}
                            aria-label={`NPS ${n}`}
                          >
                            <span
                              className={`flex items-center justify-center h-6 ${
                                selected ? "text-white" : "text-black"
                              }`}
                            >
                              {faceFor(n)}
                            </span>
                            <span className="text-xs font-medium">{n}</span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ===== Ação (somente FINALIZAR) ===== */}
          <div className="mt-6">
            <button
              onClick={handleFinalizar}
              disabled={!blocoValido}
              className={`w-full h-12 text-base rounded-[10px] transition-colors flex items-center justify-center gap-2 ${
                blocoValido
                  ? "bg-[#333333] text-white hover:bg-[#222222] cursor-pointer"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Finalizar
              <Check
                className={`w-5 h-5 ${
                  blocoValido ? "text-white" : "text-gray-600"
                }`}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
