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
import { PageMain } from "@/components/layout/page";

export default function PesquisaClima2025() {
  return (
    <PageMain>
      {/* CABEÇALHO — Título + Categoria + Data (responsivo) */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Primeira Liderança - T01</h2>
        <div className="flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
          <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
            Treinamento
          </span>
          <span className="text-black font-semibold text-sm">
            Até: 07/12/2025
          </span>
        </div>
      </div>

      {/* Imagem */}
      <Image
        src="/assets/capa_pesquisa_interna_02.png"
        alt="Capa da Pesquisa"
        width={1200}
        height={189}
        className="w-full h-auto max-h-[189px] object-cover rounded-[12px] mb-6"
      />

      {/* Texto */}
      <div className="space-y-4 text-black text-base leading-relaxed">
        <p>
          Agradecemos por participar da Pesquisa de Clima - 2025. Sua
          contribuição é essencial para o crescimento e fortalecimento da nossa
          cultura organizacional.
        </p>
        <p>
          Cada resposta compartilhada nos ajuda a compreender melhor o que está
          funcionando bem e onde podemos evoluir juntos. Nosso objetivo é
          construir um ambiente de trabalho cada vez mais colaborativo,
          acolhedor e inspirador, onde todos se sintam valorizados e motivados a
          alcançar seu melhor potencial.
        </p>
        <p>
          Com base nos resultados, desenvolveremos planos de ação voltados ao
          bem-estar, à comunicação e ao engajamento das equipes. A sua voz faz a
          diferença — ela é o ponto de partida para melhorias reais e
          duradouras.
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
          <Link href="/pesquisas/primeira-lideranca-t01/formulario">
            Iniciar <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </PageMain>
  );
}
