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

export default function PesquisaClima2025() {
  return (
    <div className="min-h-screen bg-white">
      {/* MAIN */}
      <main className=" pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white">
          {/* CABEÇALHO — Título + Categoria + Data (responsivo) */}
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

          {/* Imagem */}
          <Image
            src="/assets/capa_pesquisa_interna_01.png"
            alt="Capa da Pesquisa"
            width={1200}
            height={189}
            className="w-full h-auto max-h-[189px] object-cover rounded-[12px] mb-6"
          />

          {/* Texto */}
          <div className="space-y-4 text-black text-base leading-relaxed">
            <p>
              A Pesquisa de Clima - 2025 tem como objetivo compreender a
              percepção dos colaboradores sobre o ambiente de trabalho, a
              cultura organizacional e as práticas de gestão da empresa. Por
              meio dessa iniciativa, buscamos identificar pontos fortes e
              oportunidades de melhoria que contribuam para o desenvolvimento de
              um ambiente mais colaborativo, inclusivo e motivador.
            </p>
            <p>
              A pesquisa abrange temas como comunicação interna, reconhecimento,
              liderança, engajamento, equilíbrio entre vida pessoal e
              profissional, além de condições de trabalho.
            </p>
            <p>
              Os resultados obtidos servirão de base para a construção de planos
              de ação voltados ao bem-estar e à satisfação da equipe,
              fortalecendo o comprometimento e a produtividade coletiva.
            </p>
            <p>
              A participação de todos é fundamental para garantirmos um
              diagnóstico preciso e promovermos uma cultura organizacional cada
              vez mais saudável, transparente e alinhada aos valores da empresa.
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
              <Link href="/pesquisas/pesquisa-clima-2025/formulario">
                Iniciar <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
