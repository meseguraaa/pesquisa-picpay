import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PageMain } from "@/components/layout/page";
import SurveyHeader from "@/components/survey-header/page";

export default function npsPJ() {
  return (
    <PageMain>
      {/* CABEÇALHO — Título + Categoria + Data (responsivo) */}
      <SurveyHeader
              title="NPS - PJ"
              category="Serviços"
              categoryVariant="clima"
              deadline="13/01/2026"
            />

      {/* Imagem */}
      <Image
        src="/assets/capa_pesquisa_interna_03.png"
        alt="Capa da Pesquisa"
        width={1200}
        height={189}
        className="w-full h-auto max-h-[189px] object-cover rounded-[12px] mb-6"
      />

      {/* Texto */}
      <div className="space-y-4 text-black text-base leading-relaxed">
        <p>
          A pesquisa NPS - PJ tem como objetivo avaliar o nível de satisfação e
          lealdade dos nossos parceiros Pessoa Jurídica (PJ) em relação aos
          produtos, serviços e ao relacionamento com nossa empresa.
        </p>
        <p>
          Por meio desta pesquisa, buscamos compreender como tem sido a
          experiência dos nossos parceiros, identificar pontos fortes da nossa
          atuação e reconhecer oportunidades de melhoria que possam fortalecer
          nossa parceria.
        </p>
        <p>
          As respostas coletadas serão fundamentais para aprimorar nossos
          processos, atendimento e entrega de valor, garantindo que as soluções
          oferecidas continuem alinhadas às necessidades e expectativas dos
          nossos clientes corporativos.
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
          <Link href="/pesquisas-colaborador/nps-pj/formulario">
            Iniciar <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </PageMain>
  );
}
