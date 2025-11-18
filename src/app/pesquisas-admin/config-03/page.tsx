"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageMain } from "@/components/layout/page";
import SurveyStepper from "@/components/survey-stepper/survey-stepper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";

type TipoDisponibilizacao = "hierarquia" | "cpf";

type FormProps = {
  focusClassName: string;
};

export default function PesquisasAdminConfig03Page() {
  const router = useRouter();

  const [tipoDisponibilizacao, setTipoDisponibilizacao] =
    useState<TipoDisponibilizacao>("hierarquia");

  // Lê o ?tipo= da URL no client, sem useSearchParams
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const raw = params.get("tipo");

    if (raw === "cpf") {
      setTipoDisponibilizacao("cpf");
    } else {
      setTipoDisponibilizacao("hierarquia");
    }
  }, []);

  const focusGreen =
    "bg-white border-black " +
    "focus:border-[#21C25E] focus:ring-2 focus:ring-[#21C25E] focus:outline-none " +
    "focus-visible:border-[#21C25E] focus-visible:ring-2 focus-visible:ring-[#21C25E] focus-visible:outline-none";

  const handleVoltar = () => {
    // volta para o passo anterior preservando o tipo
    router.push(
      `/pesquisas-admin/config-02?tipo=${encodeURIComponent(
        tipoDisponibilizacao
      )}`
    );
  };

  const handleFinalizar = () => {
    // depois você pode trocar essa rota pra tela final / lista
    router.push("/pesquisas-admin/config-00");
  };

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        {/* Cabeçalho */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
            Pesquisas
          </h1>
        </header>

        {/* Mesmo padrão da config-01: bg branco englobando stepper + formulário */}
        <div className="bg-white mt-6">
          {/* Stepper – passo 3: Disponibilizar */}
          <SurveyStepper currentStep={3} />

          {/* Formulário de acordo com o tipo de disponibilização */}
          <div className="space-y-6 mt-8">
            {tipoDisponibilizacao === "hierarquia" ? (
              <FormHierarquia focusClassName={focusGreen} />
            ) : (
              <FormCpf focusClassName={focusGreen} />
            )}

            {/* Botões de ação (baixo, alinhados à direita) */}
            <div className="pt-4 w-full flex justify-end mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="border-black text-black bg-white hover:bg-gray-100 px-6 rounded-[10px]"
                  onClick={handleVoltar}
                  type="button"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </Button>

                <Button
                  className="bg-[#333333] text-white hover:bg-[#222222] px-8 rounded-[10px]"
                  onClick={handleFinalizar}
                  type="button"
                >
                  Finalizar ✓
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
}

/* ========= FORMULÁRIO: HIERARQUIA (imagem 1) ========= */

function FormHierarquia({ focusClassName }: FormProps) {
  return (
    <div className="space-y-5">
      {/* Empresa */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Empresa</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione a(s) empresa(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="empresa-1">Empresa 1</SelectItem>
            <SelectItem value="empresa-2">Empresa 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Departamento */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Departamento</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dep-1">Departamento 1</SelectItem>
            <SelectItem value="dep-2">Departamento 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tribus */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Tribus</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione a(s) tribu(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tribu-1">Tribu 1</SelectItem>
            <SelectItem value="tribu-2">Tribu 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Squad */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Squad</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione a(s) squad(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="squad-1">Squad 1</SelectItem>
            <SelectItem value="squad-2">Squad 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cargo */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Cargo</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione o(s) cargo(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cargo-1">Cargo 1</SelectItem>
            <SelectItem value="cargo-2">Cargo 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Função */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Função</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione o(s) cargo(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="funcao-1">Função 1</SelectItem>
            <SelectItem value="funcao-2">Função 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ========= FORMULÁRIO: CPF (imagem 2) ========= */

function FormCpf({ focusClassName }: FormProps) {
  return (
    <div className="space-y-5">
      {/* CPF */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">CPF</Label>
        <Select>
          <SelectTrigger className={`w-full border-black ${focusClassName}`}>
            <SelectValue placeholder="Selecione o(s) departamento(s)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dep-1">Departamento 1</SelectItem>
            <SelectItem value="dep-2">Departamento 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lote por CPF */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Lote por CPF</Label>
        <div className="flex gap-3">
          <Input
            placeholder="Envie sua planilha"
            className={`flex-1 border-black ${focusClassName}`}
          />
          <Button
            className="whitespace-nowrap px-5 rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] flex items-center gap-2"
            type="button"
          >
            Adicionar <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
