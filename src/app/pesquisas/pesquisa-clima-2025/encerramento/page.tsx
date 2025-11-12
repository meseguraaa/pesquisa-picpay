"use client";

import { PageMain } from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { FileInput } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EncerramentoPesquisa() {
  const router = useRouter();

  return (
    <PageMain>
          {/* Cabeçalho */}
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
          </div>

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
              reais e duradouras. Obrigado por dedicar seu tempo e por
              contribuir para que nossa empresa continue sendo um ótimo lugar
              para trabalhar!
            </p>

            <p>
              A sua voz faz a diferença — ela é o ponto de partida para
              melhorias reais e duradouras. Obrigado por dedicar seu tempo e por
              contribuir para que nossa empresa continue sendo um ótimo lugar
              para trabalhar!
            </p>
          </div>

          {/* Botão Home */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={() => router.push("/")}
              className="px-8 py-6 text-lg rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] transition-colors flex items-center gap-2 cursor-pointer"
            >
              Home
              <FileInput className="w-5 h-5" />
            </Button>
          </div>
    </PageMain>
  );
}
