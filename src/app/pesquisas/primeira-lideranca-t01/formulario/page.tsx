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
} from "lucide-react";
import { useRouter } from "next/navigation";

/** ===== Tipos ===== */
type TipoPergunta = "radioTexto" | "texto";

type Pergunta = {
  tipo: TipoPergunta;
  descricao: string;
  opcoes?: string[]; // para radioTexto
  textoLabel?: string; // label do campo aberto (se quiser customizar)
};

type Bloco = {
  nome: string;
  perguntas: Pergunta[];
};

type Resposta = {
  opcao: number | null; // radioTexto
  texto: string; // radioTexto / texto
};

/** ===== Blocos ===== */
const blocos: Bloco[] = [
  {
    nome: "Autoconhecimento e Desenvolvimento Pessoal",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao:
          "Como você avalia seu preparo para assumir responsabilidades de liderança?",
        opcoes: [
          "Muito preparado(a)",
          "Parcialmente preparado(a)",
          "Pouco preparado(a)",
          "Não me sinto preparado(a)",
        ],
        textoLabel:
          "Se quiser, descreva rapidamente um ponto forte ou algo a desenvolver (mín. 3 caracteres).",
      },
      {
        tipo: "radioTexto",
        descricao:
          "Com que frequência você busca feedback sobre seu desempenho profissional?",
        opcoes: ["Sempre", "Frequentemente", "Raramente", "Nunca"],
        textoLabel:
          "Comente brevemente como costuma pedir/receber feedback (mín. 3 caracteres).",
      },
      {
        tipo: "radioTexto",
        descricao:
          "O quanto você acredita que entende seu estilo de liderança e seus impactos na equipe?",
        opcoes: [
          "Completamente",
          "Parcialmente",
          "Pouco",
          "Não tenho clareza sobre isso",
        ],
        textoLabel: "Se desejar, dê um exemplo (mín. 3 caracteres).",
      },
    ],
  },
  {
    nome: "Comunicação e Relacionamento",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao:
          "Como você avalia sua capacidade de se comunicar de forma clara e assertiva com a equipe?",
        opcoes: ["Excelente", "Boa", "Regular", "Precisa melhorar"],
        textoLabel: "Escreva um exemplo prático (mín. 3 caracteres).",
      },
      {
        tipo: "radioTexto",
        descricao: "Quando há conflitos na equipe, como você costuma agir?",
        opcoes: [
          "Enfrento o problema de forma direta e construtiva",
          "Busco mediar o conflito, mas evito confrontos",
          "Deixo que os envolvidos resolvam sozinhos",
          "Evito me envolver",
        ],
        textoLabel: "Se quiser, descreva uma situação (mín. 3 caracteres).",
      },
    ],
  },
  {
    nome: "Gestão de Pessoas e Resultados",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao: "Como você define suas prioridades e metas com a equipe?",
        opcoes: [
          "De forma colaborativa, envolvendo todos",
          "Defino e comunico as metas sozinho(a)",
          "Recebo as metas e apenas as repasso",
          "As metas não são claramente definidas",
        ],
        textoLabel:
          "Comente rapidamente como acompanha as metas (mín. 3 caracteres).",
      },
      {
        tipo: "radioTexto",
        descricao:
          "Com que frequência você reconhece o bom desempenho dos membros da sua equipe?",
        opcoes: ["Sempre", "Frequentemente", "Raramente", "Nunca"],
        textoLabel:
          "Cite um formato de reconhecimento que você usa (mín. 3 caracteres).",
      },
      {
        tipo: "radioTexto",
        descricao:
          "Como você avalia sua habilidade em delegar tarefas de forma eficiente?",
        opcoes: ["Excelente", "Boa", "Regular", "Precisa melhorar"],
        textoLabel: "Dê um exemplo de delegação (mín. 3 caracteres).",
      },
    ],
  },
  {
    nome: "Cultura e Inspiração de Liderança",
    perguntas: [
      {
        tipo: "radioTexto",
        descricao:
          "O quanto você acredita que os valores da empresa orientam suas decisões como líder?",
        opcoes: ["Totalmente", "Parcialmente", "Pouco", "Nada"],
        textoLabel:
          "Como você conecta decisões aos valores? (mín. 3 caracteres).",
      },
      {
        tipo: "texto",
        descricao:
          "Quais atitudes ou comportamentos você considera essenciais para ser um(a) líder inspirador(a) e eficaz?",
      },
    ],
  },
];

/** ===== Helpers ===== */
const initResposta = (): Resposta => ({
  opcao: null,
  texto: "",
});

const isPerguntaValida = (p: Pergunta, r: Resposta) => {
  switch (p.tipo) {
    case "radioTexto":
      return r.opcao !== null && r.texto.trim().length >= 3;
    case "texto":
      return r.texto.trim().length >= 3;
    default:
      return false;
  }
};

export default function FormularioPrimeiraLiderancaT01() {
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

  /** ===== Progresso ===== */
  const porBloco = 100 / blocos.length; // 25
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
    if (v.length > 500) return;
    setResposta(perguntaIndex, { texto: v });
  };

  const router = useRouter();

  const handleContinue = () => {
    if (!blocoValido) return;
    if (step < blocos.length - 1) {
      setStep((s) => s + 1);
    } else {
      router.push("/pesquisas/primeira-lideranca-t01/encerramento");
    }
  };

  const handleVoltar = () => {
    if (step === 0) {
      router.push("/pesquisas/primeira-lideranca-t01");
    } else {
      setStep((s) => s - 1);
    }
  };

  /** ===== Render ===== */
  return (
    <div className="min-h-screen bg-white">
      {/* SIDEBAR */}
      <nav
        aria-label="Menu lateral"
        className="group fixed left-0 top-0 z-40 hidden md:flex h-screen w-20 hover:w-56 flex-col pt-20 bg-white border-r transition-all duration-300 ease-out overflow-hidden cursor-pointer"
      >
        <ul className="w-full space-y-2">
          {[
            { label: "Home", Icon: House, href: "/" },
            { label: "Categoria", Icon: FolderGit },
            { label: "Pesquisa", Icon: FileUp },
            { label: "Relatório", Icon: FileSliders },
          ].map(({ label, Icon, href }) => (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  className="relative block w-full h-10 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="absolute top-1/2 -translate-y-1/2 left-7 w-6 h-6 text-gray-700" />
                  <span className="absolute top-1/2 -translate-y-1/2 left-16 text-gray-800 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {label}
                  </span>
                </Link>
              ) : (
                <a className="relative block w-full h-10 hover:bg-gray-100 transition-colors">
                  <Icon className="absolute top-1/2 -translate-y-1/2 left-7 w-6 h-6 text-gray-700" />
                  <span className="absolute top-1/2 -translate-y-1/2 left-16 text-gray-800 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {label}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* MAIN */}
      <main className=" pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold">
                Primeira Liderança - T01
              </h2>
              <div className="mt-2 sm:mt-0 flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
                <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                  Treinamento
                </span>
                <span className="text-black font-semibold text-sm">
                  Até: 07/12/2025
                </span>
              </div>
            </div>

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
            <h3 className="text-xl font-semibold text-black mb-2">
              {blocos[step].nome}
            </h3>

            {perguntasAtuais.map((p, i) => {
              const r = respostasAtuais[i];
              const textoLen = r.texto.length;
              const validaPerg = isPerguntaValida(p, r);
              const isLast = i === perguntasAtuais.length - 1;

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

                      {/* linha interna (entre alternativas e campo aberto) */}
                      <div className="my-10 border-t border-dashed border-gray-500" />

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

                  {p.tipo === "texto" && (
                    <>
                      <textarea
                        id={`texto_${step}_${i}`}
                        name={`texto_${step}_${i}`}
                        rows={4}
                        value={r.texto}
                        onChange={(e) => onChangeTexto(i, e)}
                        maxLength={500}
                        className="w-full rounded-sm border border-gray-500 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#21C25E]"
                        placeholder="Digite sua resposta (mín. 3 e máx. 500 caracteres)"
                      />
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
        </div>
      </main>
    </div>
  );
}
