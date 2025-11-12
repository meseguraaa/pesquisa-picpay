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

      {/* Texto */}
      <div className="space-y-4 text-black text-base leading-relaxed">
        <p>Agradecemos pela sua participação na pesquisa do Treinamento AVD.</p>

        <p>
          Sua opinião é fundamental para aprimorarmos continuamente nossos
          programas de capacitação e garantir experiências de aprendizado cada
          vez mais relevantes e eficazes.
        </p>

        <p>
          As respostas ajudarão a identificar o que funcionou bem e quais
          aspectos podem ser aperfeiçoados para futuras turmas. Nosso
          compromisso é promover treinamentos que estimulem o crescimento
          profissional, o engajamento e a aplicação prática dos conhecimentos
          adquiridos.
        </p>

        <p>
          Obrigado por dedicar seu tempo e contribuir para a construção de uma
          cultura de aprendizado e desenvolvimento contínuo!
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
