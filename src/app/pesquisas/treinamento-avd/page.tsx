import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  House,
  FolderGit,
  FileUp,
  FileSliders,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function TreinamentoAVD() {
  return (
    <div className="min-h-screen bg-white">
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
                  <span
                    className="
                      absolute top-1/2 -translate-y-1/2 left-16
                      text-gray-800 font-medium whitespace-nowrap
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                    "
                  >
                    {label}
                  </span>
                </Link>
              ) : (
                <a className="relative block w-full h-10 hover:bg-gray-100 transition-colors">
                  <Icon className="absolute top-1/2 -translate-y-1/2 left-7 w-6 h-6 text-gray-700" />
                  <span
                    className="
                      absolute top-1/2 -translate-y-1/2 left-16
                      text-gray-800 font-medium whitespace-nowrap
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                    "
                  >
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
          {/* CABEÇALHO — Título + Categoria + Data (responsivo) */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">Treinamento AVD</h2>
            <div className="flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
              <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                Treinamento
              </span>
              <span className="text-black font-semibold text-sm">
                Até: 30/03/2026
              </span>
            </div>
          </div>

          {/* Imagem */}
          <Image
            src="/assets/capa_pesquisa_interna_04.png"
            alt="Capa da Pesquisa"
            width={1200}
            height={189}
            className="w-full h-auto max-h-[189px] object-cover rounded-[12px] mb-6"
          />

          {/* Texto */}
          <div className="space-y-4 text-black text-base leading-relaxed">
            <p>
              Agradecemos por participar da Pesquisa de Clima - 2025. Sua
              contribuição é essencial para o crescimento e fortalecimento da
              nossa cultura organizacional.
            </p>
            <p>
              Cada resposta compartilhada nos ajuda a compreender melhor o que
              está funcionando bem e onde podemos evoluir juntos. Nosso objetivo
              é construir um ambiente de trabalho cada vez mais colaborativo,
              acolhedor e inspirador, onde todos se sintam valorizados e
              motivados a alcançar seu melhor potencial.
            </p>
            <p>
              Com base nos resultados, desenvolveremos planos de ação voltados
              ao bem-estar, à comunicação e ao engajamento das equipes. A sua
              voz faz a diferença — ela é o ponto de partida para melhorias
              reais e duradouras.
              <p>
                Obrigado por dedicar seu tempo e por contribuir para que nossa
                empresa continue sendo um ótimo lugar para trabalhar!
              </p>
            </p>
          </div>

          {/* Botão */}
          <div className="mt-8 flex justify-center gap-4">
            {/* Botão VOLTAR */}
            <Button
              asChild
              className="px-8 py-6 text-lg rounded-[10px] border border-[#333333] bg-white text-[#333333] hover:bg-[#f2f2f2] transition-colors flex items-center gap-2"
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5 text-[#333333]" /> Voltar
              </Link>
            </Button>

            {/* Botão INICIAR */}
            <Button
              asChild
              className="px-8 py-6 text-lg rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] transition-colors flex items-center gap-2"
            >
              <Link href="/pesquisas/treinamento-avd/formulario">
                Iniciar <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
