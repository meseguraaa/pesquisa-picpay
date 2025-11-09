"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, FolderGit, FileUp, FileSliders, Check } from "lucide-react";

// === Modelo dinâmico de perguntas ===
type Pergunta = {
  titulo: string;
  descricao: string;
  opcoes: string[];
};

const perguntas: Pergunta[] = [
  {
    titulo: "Liderança",
    descricao:
      "Como você avalia a comunicação interna entre as equipes e a liderança na empresa?",
    opcoes: [
      "Excelente – as informações são claras e circulam com facilidade.",
      "Boa – há comunicação, mas pode melhorar em alguns pontos.",
      "Regular – às vezes as informações chegam de forma incompleta ou tardia.",
      "Ruim – a comunicação é falha e causa retrabalho ou desmotivação.",
    ],
  },
  // ➕ Pode adicionar quantas quiser; o progresso e a validação se ajustam automaticamente.
];

// Estado de cada pergunta
type Resposta = { opcao: number | null; texto: string };

export default function FormularioPesquisaClima2025() {
  const [respostas, setRespostas] = useState<Resposta[]>(
    perguntas.map(() => ({ opcao: null, texto: "" }))
  );

  // --- Regras dinâmicas ---
  const concluidas = useMemo(
    () =>
      respostas.filter((r) => r.opcao !== null && r.texto.trim().length >= 3)
        .length,
    [respostas]
  );

  const total = perguntas.length;
  const targetProgress = Math.round((concluidas / total) * 50);

  // 🔥 Animação suave do progresso (exibido)
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const start = progress;
    const end = targetProgress;
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
  }, [targetProgress]);

  const formValido = concluidas === total;

  const onChangeRadio = (qIndex: number, optIndex: number) => {
    setRespostas((prev) => {
      const next = [...prev];
      next[qIndex] = { ...next[qIndex], opcao: optIndex };
      return next;
    });
  };

  const onChangeTexto = (
    qIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const v = e.target.value;
    if (v.length > 500) return;
    setRespostas((prev) => {
      const next = [...prev];
      next[qIndex] = { ...next[qIndex], texto: v };
      return next;
    });
  };

  const handleContinue = () => {
    console.log("Continuar com respostas:", respostas);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 h-16 px-4 bg-white shadow-sm">
        <Image
          src="/assets/logo_picpay.png"
          alt="Logo PicPay"
          width={32}
          height={32}
        />
        <h1 className="text-3xl font-bold text-[#21C25E]">Pesquisa</h1>
      </header>

      {/* SIDEBAR */}
      <nav
        aria-label="Menu lateral"
        className="
          group fixed left-0 top-0 z-40
          hidden md:flex h-screen w-20 hover:w-56
          flex-col pt-20
          bg-white border-r
          transition-all duration-300 ease-out
          overflow-hidden cursor-pointer
        "
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
      <main className="pt-[84px] pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white">
          {/* Cabeçalho: Título + (Categoria/Data) */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-semibold">
                Pesquisa de Clima - 2025
              </h2>
              <div className="mt-2 sm:mt-0 flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
                <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                  Clima Organizacional
                </span>
                <span className="text-black font-semibold text-sm">
                  Até: 20/02/2026
                </span>
              </div>
            </div>

            {/* Progresso dinâmico (animado) */}
            <div className="mt-10">
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

          {/* Lista dinâmica de perguntas */}
          <section className="bg-white mt-10 space-y-10">
            {perguntas.map((q, qIndex) => {
              const r = respostas[qIndex];
              const textoLen = r.texto.length;
              const valida = r.opcao !== null && r.texto.trim().length >= 3;

              return (
                <div key={qIndex}>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {q.titulo}
                  </h3>

                  <p className="text-black text-sm leading-relaxed mb-4">
                    {q.descricao}
                  </p>

                  {/* Alternativas (radio custom com Lucide Check) */}
                  <div className="space-y-3">
                    {q.opcoes.map((label, optIndex) => (
                      <label
                        key={optIndex}
                        className="flex items-start gap-3 cursor-pointer select-none"
                      >
                        <input
                          type="radio"
                          name={`pergunta_${qIndex}`}
                          checked={r.opcao === optIndex}
                          onChange={() => onChangeRadio(qIndex, optIndex)}
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

                  {/* Separador pontilhado */}
                  <div className="my-5 border-t border-dashed border-gray-500" />

                  {/* Campo aberto */}
                  <p className="text-black text-sm leading-relaxed mb-3">
                    Quais características ou atitudes você considera mais
                    importantes em um líder para inspirar e engajar sua equipe?
                  </p>

                  <textarea
                    id={`observacoes_${qIndex}`}
                    name={`observacoes_${qIndex}`}
                    rows={4}
                    value={r.texto}
                    onChange={(e) => onChangeTexto(qIndex, e)}
                    maxLength={500}
                    className="w-full rounded-sm border border-gray-500 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#21C25E]"
                    placeholder="Digite seu texto"
                  />

                  {/* ✅ Aviso à esquerda, contador à direita */}
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span
                      className={
                        valida
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
                </div>
              );
            })}
          </section>

          {/* Ação */}
          <div className="mt-10">
            <Button
              onClick={handleContinue}
              disabled={!formValido}
              className={`w-full h-12 text-base rounded-[10px] transition-colors flex items-center justify-center gap-2
                ${
                  formValido
                    ? "bg-[#333333] text-white hover:bg-[#222222]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              Continuar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
