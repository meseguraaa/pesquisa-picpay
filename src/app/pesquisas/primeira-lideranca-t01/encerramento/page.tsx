"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, FolderGit, FileUp, FileSliders, FileInput } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageMain } from "@/components/layout/page";

export default function EncerramentoPesquisa() {
  const router = useRouter();

  return (
    <PageMain>
      {/* Cabeçalho */}
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

      {/* Texto */}
      <div className="space-y-4 text-black text-base leading-relaxed">
        <p>
          Agradecemos por participar da pesquisa Primeira Liderança. Sua
          contribuição é fundamental para aprimorarmos nossos programas de
          desenvolvimento e fortalecer a cultura de liderança da empresa.
        </p>

        <p>
          As respostas fornecidas ajudarão a identificar os principais desafios,
          necessidades e oportunidades de crescimento dos novos líderes,
          permitindo que possamos oferecer treinamentos e ferramentas ainda mais
          eficazes.
        </p>

        <p>
          Nosso objetivo é formar líderes preparados para inspirar, engajar e
          conduzir suas equipes com empatia, clareza e propósito.
        </p>

        <p>
          Acreditamos que a liderança é um processo contínuo de aprendizado e
          evolução, e sua participação é um passo importante nessa jornada
          coletiva. Muito obrigado por dedicar seu tempo e compartilhar suas
          percepções — juntos, construiremos uma liderança mais forte, humana e
          transformadora.
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
