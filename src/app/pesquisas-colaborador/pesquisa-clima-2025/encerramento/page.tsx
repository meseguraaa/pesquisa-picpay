"use client";

import { PageMain } from "@/components/layout/page";
import SurveyHeader from "@/components/survey-header/page";
import { Button } from "@/components/ui/button";
import { FileInput } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EncerramentoPesquisa() {
  const router = useRouter();

  return (
    <PageMain>
          {/* Cabeçalho */}
          <SurveyHeader
                  title="Pesquisa de Clima - 2025"
                  category="Clima Organizacional"
                  categoryVariant="clima"
                  deadline="01/12/2026"
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
