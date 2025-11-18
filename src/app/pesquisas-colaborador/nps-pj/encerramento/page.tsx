"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, FolderGit, FileUp, FileSliders, FileInput } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageMain } from "@/components/layout/page";
import SurveyHeader from "@/components/survey-header/page";

export default function EncerramentoPesquisa() {
  const router = useRouter();

  return (
    <PageMain>
      {/* Cabeçalho */}
      <SurveyHeader
                    title="NPS - PJ"
                    category="Serviços"
                    categoryVariant="clima"
                    deadline="13/01/2026"
                  />

      {/* Texto */}
      <div className="space-y-4 text-black text-base leading-relaxed">
        <p>
          Agradecemos por dedicar seu tempo para responder à pesquisa NPS - PJ.
        </p>

        <p>
          Sua opinião é essencial para aprimorarmos continuamente a qualidade
          dos nossos serviços e o relacionamento com nossos parceiros. As
          informações compartilhadas nos ajudarão a entender melhor suas
          necessidades, expectativas e desafios, permitindo que possamos evoluir
          juntos e fortalecer nossa parceria.
        </p>

        <p>
          Nosso compromisso é oferecer experiências cada vez mais consistentes,
          soluções eficazes e um atendimento de excelência. Obrigado por fazer
          parte dessa jornada e por contribuir para o nosso crescimento mútuo!
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
