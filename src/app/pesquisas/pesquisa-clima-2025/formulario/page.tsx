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
  Star,
  Frown,
  Meh,
  Smile,
  Laugh,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PageMain } from "@/components/layout/page";

/** ===== Tipos ===== */
type TipoPergunta = "radioTexto" | "estrelas" | "nps";

type Pergunta = {
  tipo: TipoPergunta;
  descricao: string;
  opcoes?: string[]; // para radioTexto
  textoLabel?: string; // label do campo aberto (radioTexto)
  maxEstrelas?: number; // para estrelas (default 5)
};

type Bloco = {
  nome: string;
  perguntas: Pergunta[];
};

type Resposta = {
  // para radioTexto
  opcao: number | null;
  texto: string;
  // para estrelas
  estrelas: number | null; // 1..maxEstrelas
  // para nps
  nps: number | null; // 1..10
};

/** ===== Blocos ===== */
const blocos: Bloco[] = [
  // Bloco 1 — igual ao que já tínhamos (rádio + texto)
  {
    nome: "Liderança",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao:
          "Como você avalia a comunicação interna entre as equipes e a liderança na empresa?",
        opcoes: [
          "Excelente – as informações são claras e circulam com facilidade.",
          "Boa – há comunicação, mas pode melhorar em alguns pontos.",
          "Regular – às vezes as informações chegam de forma incompleta ou tardia.",
          "Ruim – a comunicação é falha e causa retrabalho ou desmotivação.",
        ],
        textoLabel:
          "Quais atitudes você considera mais importantes em um líder para inspirar sua equipe?",
      },
    ],
  },
  // Bloco 2 — Ambiente com Estrelas e NPS
  {
    nome: "Ambiente",
    perguntas: [
      {
        tipo: "estrelas",
        descricao:
          "Como você avalia o ambiente físico e as condições de trabalho no dia a dia?",
        maxEstrelas: 5,
      },
      {
        tipo: "nps",
        descricao:
          "Em uma escala de 1 a 10, qual o seu nível de satisfação geral com o ambiente de trabalho?",
      },
    ],
  },
];

/** ===== Helpers ===== */
const initResposta = (p: Pergunta): Resposta => ({
  opcao: null,
  texto: "",
  estrelas: null,
  nps: null,
});

const isPerguntaValida = (p: Pergunta, r: Resposta) => {
  switch (p.tipo) {
    case "radioTexto":
      return r.opcao !== null && r.texto.trim().length >= 3;
    case "estrelas":
      return r.estrelas !== null && r.estrelas >= 1;
    case "nps":
      return r.nps !== null && r.nps >= 1 && r.nps <= 10;
    default:
      return false;
  }
};

export default function FormularioPesquisaClima2025() {
  /** ===== Estados ===== */
  const [step, setStep] = useState(0); // índice do bloco atual
  const [respostas, setRespostas] = useState<Resposta[][]>(
    blocos.map((b) => b.perguntas.map(initResposta))
  );

  /** ===== Dados do bloco atual ===== */
  const perguntasAtuais = blocos[step].perguntas;
  const respostasAtuais = respostas[step];

  /** ===== Validação do bloco atual ===== */
  const validasNoBloco = useMemo(() => {
    let ok = 0;
    for (let i = 0; i < perguntasAtuais.length; i++) {
      if (isPerguntaValida(perguntasAtuais[i], respostasAtuais[i])) ok++;
    }
    return ok;
  }, [perguntasAtuais, respostasAtuais]);

  const blocoValido = validasNoBloco === perguntasAtuais.length;

  /** ===== Progresso total (animado) ===== */
  // Cada bloco tem o mesmo peso
  const porBloco = 100 / blocos.length;

  // ✅ Progresso por bloco (sem parcial por pergunta)
  const progressoAlvo = useMemo(() => {
    const blocosAnteriores = step * porBloco; // blocos 100% concluídos
    const blocoAtual = blocoValido ? porBloco : 0; // só conta quando o bloco atual está válido
    return Math.round(blocosAnteriores + blocoAtual);
  }, [step, porBloco, blocoValido]);

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

  // 👇 rola para o topo sempre que o bloco mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [step]);

  /** ===== Handlers ===== */
  const setResposta = (perguntaIndex: number, patch: Partial<Resposta>) => {
    setRespostas((prev) => {
      const next = prev.map((blocoResp) => blocoResp.slice());
      next[step][perguntaIndex] = {
        ...next[step][perguntaIndex],
        ...patch,
      };
      return next;
    });
  };

  const onChangeRadio = (perguntaIndex: number, optIndex: number) => {
    setResposta(perguntaIndex, { opcao: optIndex });
  };

  const onChangeTexto = (
    perguntaIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const v = e.target.value;
    if (v.length > 500) return;
    setResposta(perguntaIndex, { texto: v });
  };

  const onChangeEstrelas = (perguntaIndex: number, valor: number) => {
    setResposta(perguntaIndex, { estrelas: valor });
  };

  const onChangeNps = (perguntaIndex: number, valor: number) => {
    setResposta(perguntaIndex, { nps: valor });
  };

  /** ===== UI Helpers ===== */
  const faceFor = (n: number) => {
    // mapeia 1..10 para um ícone expressivo
    if (n <= 2) return <Frown className="w-5 h-5" />;
    if (n <= 4) return <Meh className="w-5 h-5" />;
    if (n <= 7) return <Smile className="w-5 h-5" />;
    return <Laugh className="w-5 h-5" />;
  };

  const router = useRouter();

  const handleContinue = () => {
    if (!blocoValido) return;

    if (step < blocos.length - 1) {
      setStep((s) => s + 1);
    } else {
      // Último bloco → encerra
      router.push("/pesquisas/pesquisa-clima-2025/encerramento");
    }
  };

  const handleVoltar = () => {
    if (step === 0) {
      router.push("/pesquisas/pesquisa-clima-2025");
    } else {
      setStep((s) => s - 1);
    }
  };

  /** ===== Render ===== */
  return (
    <PageMain>
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold">
                Pesquisa de Clima - 2025
              </h2>
              <div className="mt-2 sm:mt-0 flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
                <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                  Clima Organizacional
                </span>
                <span className="text-black font-semibold text-sm">
                  Até: 01/12/2026
                </span>
              </div>
            </div>

            {/* Progresso (animado) */}
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

          {/* ===== Bloco atual ===== */}
          <section className="bg-white mt-10">
            <h3 className="text-xl font-semibold text-black mb-2">
              {blocos[step].nome}
            </h3>

            {perguntasAtuais.map((p, i) => {
              const r = respostasAtuais[i];
              const textoLen = r.texto.length;
              const validaPerg = isPerguntaValida(p, r);

              return (
                <div key={i} className="mb-10">
                  <p className="text-black text-sm leading-relaxed mb-4">
                    {p.descricao}
                  </p>

                  {/* ===== TIPOS ===== */}
                  {p.tipo === "radioTexto" && (
                    <>
                      {/* Alternativas (radio + Check Lucide) */}
                      <div className="space-y-3">
                        {p.opcoes!.map((label, optIndex) => (
                          <label
                            key={optIndex}
                            className="flex items-start gap-3 cursor-pointer select-none"
                          >
                            <input
                              type="radio"
                              name={`pergunta_${step}_${i}`}
                              checked={r.opcao === optIndex}
                              onChange={() => onChangeRadio(i, optIndex)}
                              className="peer sr-only"
                            />
                            <span
                              className="
                                mt-0.5 inline-flex h-5 w-5 items-center justify-center
                                rounded-full border border-black bg-white
                                transition-all duration-200
                                peer-checked:bg-[#238662] peer-checked:border-[#238662]
                                peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[#21C25E]
                                peer-checked:[&>svg]:opacity-100
                              "
                              aria-hidden="true"
                            >
                              <Check
                                className="h-3.5 w-3.5 opacity-0 text-white"
                                strokeWidth={3}
                              />
                            </span>
                            <span className="text-black text-sm leading-relaxed">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Separador */}
                      <div className="my-5 border-t border-dashed border-gray-500" />

                      {/* Campo aberto */}
                      <p className="text-black text-sm leading-relaxed mb-3">
                        {p.textoLabel ??
                          "Escreva um comentário complementar (mín. 3 caracteres)."}
                      </p>

                      <textarea
                        id={`observacoes_${step}_${i}`}
                        name={`observacoes_${step}_${i}`}
                        rows={4}
                        value={r.texto}
                        onChange={(e) => onChangeTexto(i, e)}
                        maxLength={500}
                        className="w-full rounded-sm border border-gray-500 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#21C25E]"
                        placeholder="Digite seu texto"
                      />

                      {/* Aviso + contador */}
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span
                          className={
                            validaPerg
                              ? "opacity-0 select-none"
                              : "text-gray-500 transition-opacity"
                          }
                        >
                          Escreva pelo menos 3 caracteres.
                        </span>
                        <span
                          className={
                            textoLen >= 500 ? "text-red-500" : "text-gray-500"
                          }
                        >
                          {textoLen} / 500
                        </span>
                      </div>
                    </>
                  )}

                  {p.tipo === "estrelas" && (
                    <div className="flex items-center gap-3">
                      {Array.from(
                        { length: p.maxEstrelas ?? 5 },
                        (_, idx) => idx + 1
                      ).map((n) => {
                        const active = (r.estrelas ?? 0) >= n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => onChangeEstrelas(i, n)}
                            className={`
                              h-8 w-8 flex items-center justify-center rounded
                              transition-colors
                              ${active ? "" : "hover:bg-gray-100"}
                            `}
                            aria-label={`${n} estrela(s)`}
                          >
                            <Star
                              className={`
                                w-6 h-6
                                ${
                                  active
                                    ? "fill-[#238662] stroke-[#238662]"
                                    : "fill-white stroke-black"
                                }
                              `}
                              strokeWidth={2}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {p.tipo === "nps" && (
                    <div className="mt-2 grid grid-cols-5 sm:grid-cols-10 gap-2">
                      {Array.from({ length: 10 }, (_, idx) => idx + 1).map(
                        (n) => {
                          const selected = r.nps === n;
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => onChangeNps(i, n)}
                              className={`
                                group flex flex-col items-center justify-center gap-1 p-2 rounded-md border
                                transition-colors
                                ${
                                  selected
                                    ? "bg-[#238662] border-[#238662] text-white"
                                    : "bg-white border-black text-black hover:bg-gray-100"
                                }
                              `}
                              aria-label={`NPS ${n}`}
                            >
                              <span
                                className={`
                                  flex items-center justify-center h-6
                                  ${selected ? "text-white" : "text-black"}
                                `}
                              >
                                {faceFor(n)}
                              </span>
                              <span className="text-xs font-medium">{n}</span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* ===== Ação ===== */}
          <div className="mt-6">
            <button
              onClick={handleContinue}
              disabled={!blocoValido}
              className={`w-full h-12 text-base rounded-[10px] transition-colors flex items-center justify-center gap-2
      ${
        blocoValido
          ? "bg-[#333333] text-white hover:bg-[#222222] cursor-pointer"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }
    `}
            >
              {step < blocos.length - 1 ? (
                <>
                  Continuar
                  <ArrowRight
                    className={`w-5 h-5 ${
                      blocoValido ? "text-white" : "text-gray-600"
                    }`}
                    strokeWidth={2}
                  />
                </>
              ) : (
                <>
                  Finalizar
                  <Check
                    className={`w-5 h-5 ${
                      blocoValido ? "text-white" : "text-gray-600"
                    }`}
                    strokeWidth={2}
                  />
                </>
              )}
            </button>
          </div>
    </PageMain>
  );
}
