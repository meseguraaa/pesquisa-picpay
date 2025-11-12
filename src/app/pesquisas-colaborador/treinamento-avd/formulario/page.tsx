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
  ArrowRight,
  ArrowLeft,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PageMain } from "@/components/layout/page";
import SurveyHeader from "@/components/survey-header/page";

/** ===== Tipos ===== */
type TipoPergunta = "radioTexto" | "texto" | "estrelas";

type Pergunta = {
  tipo: TipoPergunta;
  descricao: string;
  opcoes?: string[]; // para radioTexto
  textoLabel?: string; // se definido, o radio exige comentário
  maxEstrelas?: number; // para estrelas (default 5)
};

type Bloco = {
  nome: string;
  perguntas: Pergunta[];
};

type Resposta = {
  opcao: number | null; // radioTexto
  texto: string; // radioTexto (se textoLabel) / texto
  estrelas: number | null; // estrelas
};

/** ===== Blocos (AVD) ===== */
const blocos: Bloco[] = [
  {
    nome: "Avaliação Geral",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao:
          "Como você avalia a organização e a estrutura do treinamento AVD?",
        opcoes: ["Excelente", "Boa", "Regular", "Insatisfatória"],
        // sem textoLabel → não exige comentário
      },
      {
        tipo: "radioTexto",
        descricao:
          "O conteúdo apresentado foi relevante e aplicável à sua rotina de trabalho?",
        opcoes: [
          "Totalmente aplicável",
          "Parcialmente aplicável",
          "Pouco aplicável",
          "Nada aplicável",
        ],
      },
      {
        tipo: "radioTexto",
        descricao:
          "A didática e a clareza do instrutor durante o treinamento foram:",
        opcoes: ["Excelentes", "Boas", "Regulares", "Precárias"],
        // Para testar o campo aberto obrigatório, descomente a linha abaixo:
        // textoLabel: "Comente brevemente sua avaliação (mín. 3 caracteres):",
      },
    ],
  },
  {
    nome: "Engajamento e Impacto",
    perguntas: [
      {
        tipo: "estrelas",
        descricao:
          "Em uma escala de 1 a 5, como você avalia o seu nível de engajamento durante o treinamento? (1 = muito baixo | 5 = muito alto)",
        maxEstrelas: 5,
      },
      {
        tipo: "estrelas",
        descricao:
          "Em uma escala de 1 a 5, o quanto o treinamento contribuiu para o seu desenvolvimento profissional? (1 = não contribuiu | 5 = contribuiu muito)",
        maxEstrelas: 5,
      },
    ],
  },
  {
    nome: "Feedback e Sugestões",
    perguntas: [
      {
        tipo: "texto",
        descricao:
          "Quais pontos você considera mais positivos no treinamento AVD?",
      },
      {
        tipo: "texto",
        descricao:
          "Que melhorias você sugeriria para as próximas edições do treinamento?",
      },
    ],
  },
];

/** ===== Helpers ===== */
const initResposta = (): Resposta => ({
  opcao: null,
  texto: "",
  estrelas: null,
});

const isPerguntaValida = (p: Pergunta, r: Resposta) => {
  switch (p.tipo) {
    case "radioTexto":
      // Se houver textoLabel definido, exige opção + comentário ≥ 3
      if (p.textoLabel && p.textoLabel.trim().length > 0) {
        return r.opcao !== null && r.texto.trim().length >= 3;
      }
      // Senão, só exige uma opção marcada
      return r.opcao !== null;
    case "texto":
      return r.texto.trim().length >= 3;
    case "estrelas":
      return r.estrelas !== null && r.estrelas >= 1;
    default:
      return false;
  }
};

export default function FormularioTreinamentoAVD() {
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState<Resposta[][]>(
    blocos.map((b) => b.perguntas.map(() => initResposta()))
  );

  const perguntasAtuais = blocos[step].perguntas;
  const respostasAtuais = respostas[step];

  // validação do bloco atual
  const validasNoBloco = useMemo(() => {
    let ok = 0;
    for (let i = 0; i < perguntasAtuais.length; i++) {
      if (isPerguntaValida(perguntasAtuais[i], respostasAtuais[i])) ok++;
    }
    return ok;
  }, [perguntasAtuais, respostasAtuais]);

  const blocoValido = validasNoBloco === perguntasAtuais.length;

  /** ===== Progresso (≈33% por bloco) ===== */
  const porBloco = 100 / blocos.length; // 3 blocos → ~33.33
  const progressoAlvo = useMemo(() => {
    const blocosAnteriores = step * porBloco;
    const blocoAtual = blocoValido ? porBloco : 0;
    return Math.round(blocosAnteriores + blocoAtual);
  }, [step, porBloco, blocoValido]);

  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const start = progress;
    const end = progressoAlvo;
    if (start === end) return;

    const duration = 500;
    let raf = 0;
    let startTime = 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min(1, (ts - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + (end - start) * eased);
      setProgress(value);
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressoAlvo]);

  // rola para o topo sempre que o bloco mudar
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

  const onChangeRadio = (perguntaIndex: number, optIndex: number) => {
    setResposta(perguntaIndex, { opcao: optIndex });
  };

  const onChangeTexto = (
    perguntaIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const v = e.target.value;
    if (v.length > 500) return; // padronizado com 500
    setResposta(perguntaIndex, { texto: v });
  };

  const onChangeEstrelas = (perguntaIndex: number, valor: number) => {
    setResposta(perguntaIndex, { estrelas: valor });
  };

  const router = useRouter();

  const handleContinue = () => {
    if (!blocoValido) return;
    if (step < blocos.length - 1) {
      setStep((s) => s + 1);
    } else {
      router.push("/pesquisas-colaborador/treinamento-avd/encerramento");
    }
  };

  const handleVoltar = () => {
    if (step === 0) {
      router.push("/pesquisas-colaborador/treinamento-avd");
    } else {
      setStep((s) => s - 1);
    }
  };

  /** ===== Render ===== */
  return (
    <PageMain>
      {/* Cabeçalho */}
      <div className="mb-8">
        <SurveyHeader
                                  title="Treinamento AVD"
                                  category="Treinamento"
                                  categoryVariant="clima"
                                  deadline="30/03/2026"
                                />

        {/* Progresso + Voltar */}
        <div className="mt-10">
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
        <h3 className="text-xl font-semibold text-black mb-10">
          {blocos[step].nome}
        </h3>

        {perguntasAtuais.map((p, i) => {
          const r = respostasAtuais[i];
          const isLast = i === perguntasAtuais.length - 1;

          const textoLen = r.texto.length;
          const textoTrimLen = r.texto.trim().length;
          const textoValido = textoTrimLen >= 3;

          // Validação visual para o aviso, seguindo o segundo formulário:
          const avisoSomeRadioTexto =
            p.tipo === "radioTexto" && p.textoLabel
              ? r.opcao !== null && textoValido
              : true; // quando não exige texto, não mostra aviso

          const avisoSomeTexto = p.tipo === "texto" ? textoValido : true;

          return (
            <div key={i}>
              <p className="text-black text-sm leading-relaxed mb-4">
                {p.descricao}
              </p>

              {/* ===== TIPOS ===== */}
              {p.tipo === "radioTexto" && (
                <>
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
                          className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white transition-all duration-200 peer-checked:bg-[#238662] peer-checked:border-[#238662] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[#21C25E] peer-checked:[&>svg]:opacity-100"
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

                  {/* Campo aberto apenas quando houver textoLabel */}
                  {p.textoLabel && (
                    <>
                      <div className="my-5 border-t border-dashed border-gray-500" />

                      <p className="text-black text-sm leading-relaxed mb-3">
                        {p.textoLabel}
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

                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span
                          className={
                            avisoSomeRadioTexto
                              ? "opacity-0 select-none"
                              : "text-gray-600 transition-opacity"
                          }
                        >
                          Selecione uma opção e escreva pelo menos 3 caracteres.
                        </span>
                        <span
                          className={
                            textoLen >= 500 ? "text-red-500" : "text-gray-600"
                          }
                        >
                          {textoLen} / 500
                        </span>
                      </div>
                    </>
                  )}
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
                        className={`h-8 w-8 flex items-center justify-center rounded transition-colors ${
                          active ? "" : "hover:bg-gray-100"
                        }`}
                        aria-label={`${n} estrela(s)`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            active
                              ? "fill-[#238662] stroke-[#238662]"
                              : "fill-white stroke-black"
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {p.tipo === "texto" && (
                <>
                  {/* Mantemos o mesmo padrão visual do segundo formulário */}
                  <textarea
                    id={`texto_${step}_${i}`}
                    name={`texto_${step}_${i}`}
                    rows={4}
                    value={r.texto}
                    onChange={(e) => onChangeTexto(i, e)}
                    maxLength={500}
                    className="w-full rounded-sm border border-gray-500 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#21C25E]"
                    placeholder="Digite sua resposta (mín. 3 caracteres)"
                  />

                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span
                      className={
                        avisoSomeTexto
                          ? "opacity-0 select-none"
                          : "text-gray-600 transition-opacity"
                      }
                    >
                      Escreva pelo menos 3 caracteres.
                    </span>
                    <span
                      className={
                        textoLen >= 500 ? "text-red-500" : "text-gray-600"
                      }
                    >
                      {textoLen} / 500
                    </span>
                  </div>
                </>
              )}

              {/* separador entre perguntas */}
              {!isLast && (
                <div className="py-10">
                  <div className="w-full border-t border-dashed border-gray-400" />
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
          className={`w-full h-12 text-base rounded-[10px] transition-colors flex items-center justify-center gap-2 ${
            blocoValido
              ? "bg-[#333333] text-white hover:bg-[#222222] cursor-pointer"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
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
