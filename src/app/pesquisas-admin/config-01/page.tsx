"use client";

import { useState } from "react";
import { PageMain } from "@/components/layout/page";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import ImageCropField from "@/components/image-crop-field/image-crop-field";
import SurveyStepper from "@/components/survey-stepper/survey-stepper";
import { SurveyDateFields } from "@/components/survey-date-fields/survey-date-fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PesquisasAdminConfig02Page() {
  const router = useRouter();

  // ===== Estados do formulário =====
  const [criador, setCriador] = useState("bruno");

  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [categoria, setCategoria] = useState("");

  const [descricaoBreve, setDescricaoBreve] = useState("");
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [mensagemEncerramento, setMensagemEncerramento] = useState("");

  const [tipoDisponibilizacao, setTipoDisponibilizacao] = useState<
    "" | "hierarquia" | "cpf"
  >("");

  // validade da imagem vem do componente
  const [imagemValida, setImagemValida] = useState(false);

  // ===== Validações textuais =====
  const nomeValido = nome.trim().length >= 3;
  const descricaoBreveValida = descricaoBreve.trim().length >= 3;
  const descricaoCompletaValida = descricaoCompleta.trim().length >= 3;
  const mensagemEncerramentoValida = mensagemEncerramento.trim().length >= 3;

  const dataInicioValida = dataInicio.trim().length > 0;
  const categoriaValida = categoria.trim().length > 0;
  const tipoDisponibilizacaoValida = tipoDisponibilizacao !== "";

  const formValido =
    nomeValido &&
    imagemValida &&
    dataInicioValida &&
    categoriaValida &&
    descricaoBreveValida &&
    descricaoCompletaValida &&
    mensagemEncerramentoValida &&
    tipoDisponibilizacaoValida;

  // Estilo focus verde
  const focusGreen =
    "bg-white border-black " +
    "focus:border-[#21C25E] focus:ring-2 focus:ring-[#21C25E] focus:outline-none " +
    "focus-visible:border-[#21C25E] focus-visible:ring-2 focus-visible:ring-[#21C25E] focus-visible:outline-none";

  const handleContinuar = () => {
    if (!formValido) return;

    // AGORA: vai para o passo 2 (perguntas) já carregando o tipo na URL
    router.push(
      `/pesquisas-admin/config-02?tipo=${encodeURIComponent(
        tipoDisponibilizacao
      )}`
    );
  };

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
            Pesquisas
          </h1>
        </div>

        <div className="bg-white mt-6">
          {/* Stepper */}
          <SurveyStepper currentStep={1} />

          {/* Formulário */}
          <div className="space-y-6 mt-8">
            {/* Criador */}
            <div className="space-y-1.5">
              <Label htmlFor="criador">Criador</Label>
              <Select value={criador} onValueChange={setCriador}>
                <SelectTrigger
                  id="criador"
                  className={`w-full border-black ${focusGreen}`}
                >
                  <SelectValue placeholder="Selecione o criador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bruno">Bruno Hernandes Leal</SelectItem>
                  <SelectItem value="outro">Outro usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nome */}
            <div className="space-y-1.5">
              <Label htmlFor="nome">
                Título da pesquisa <span className="text-red-500">*</span>
              </Label>

              <Input
                id="nome"
                placeholder="Digite o nome da pesquisa"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={focusGreen}
              />

              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span
                  className={
                    nomeValido
                      ? "opacity-0 select-none"
                      : "text-gray-500 transition-opacity"
                  }
                >
                  Escreva pelo menos 3 caracteres.
                </span>
                <span
                  className={
                    nome.length >= 200 ? "text-red-500" : "text-gray-500"
                  }
                >
                  {nome.length} / 200
                </span>
              </div>
            </div>

            {/* Imagem */}
            <ImageCropField
              focusClassName={focusGreen}
              onValidChange={setImagemValida}
            />

            {/* Datas */}
            <SurveyDateFields
              focusClassName={focusGreen}
              dataInicio={dataInicio}
              onDataInicioChange={setDataInicio}
              dataFim={dataFim}
              onDataFimChange={setDataFim}
            />

            {/* Categoria */}
            <div className="space-y-1.5">
              <Label htmlFor="categoria">
                Categoria <span className="text-red-500">*</span>
              </Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger
                  id="categoria"
                  className={`w-full border-black ${focusGreen}`}
                >
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clima">Clima Organizacional</SelectItem>
                  <SelectItem value="servico">Serviço</SelectItem>
                  <SelectItem value="treinamento">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descrição breve */}
            <div className="space-y-1.5">
              <Label htmlFor="descricaoBreve">
                Descrição breve <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="descricaoBreve"
                maxLength={120}
                value={descricaoBreve}
                onChange={(e) => setDescricaoBreve(e.target.value)}
                placeholder="Digite a descrição breve da pesquisa"
                className={`min-h-24 resize-none ${focusGreen}`}
              />
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span
                  className={
                    descricaoBreveValida
                      ? "opacity-0 select-none"
                      : "text-gray-500 transition-opacity"
                  }
                >
                  Escreva pelo menos 3 caracteres.
                </span>
                <span
                  className={
                    descricaoBreve.length >= 120
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {descricaoBreve.length} / 120
                </span>
              </div>
            </div>

            {/* Descrição completa */}
            <div className="space-y-1.5">
              <Label htmlFor="descricaoCompleta">
                Descrição completa <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="descricaoCompleta"
                maxLength={1000}
                value={descricaoCompleta}
                onChange={(e) => setDescricaoCompleta(e.target.value)}
                placeholder="Digite a descrição completa da pesquisa"
                className={`min-h-[140px] resize-none ${focusGreen}`}
              />
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span
                  className={
                    descricaoCompletaValida
                      ? "opacity-0 select-none"
                      : "text-gray-500 transition-opacity"
                  }
                >
                  Escreva pelo menos 3 caracteres.
                </span>
                <span
                  className={
                    descricaoCompleta.length >= 1000
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {descricaoCompleta.length} / 1000
                </span>
              </div>
            </div>

            {/* Mensagem de encerramento */}
            <div className="space-y-1.5">
              <Label htmlFor="mensagemEncerramento">
                Mensagem de encerramento <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="mensagemEncerramento"
                maxLength={1000}
                value={mensagemEncerramento}
                onChange={(e) => setMensagemEncerramento(e.target.value)}
                placeholder="Digite a mensagem de encerramento"
                className={`min-h-[120px] resize-none ${focusGreen}`}
              />
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span
                  className={
                    mensagemEncerramentoValida
                      ? "opacity-0 select-none"
                      : "text-gray-500 transition-opacity"
                  }
                >
                  Escreva pelo menos 3 caracteres.
                </span>
                <span
                  className={
                    mensagemEncerramento.length >= 1000
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {mensagemEncerramento.length} / 1000
                </span>
              </div>
            </div>

            {/* Tipo de disponibilização */}
            <div className="space-y-2">
              <Label>
                Tipo de disponibilização
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <RadioGroup
                className="flex flex-wrap gap-6"
                value={tipoDisponibilizacao}
                onValueChange={(value) =>
                  setTipoDisponibilizacao(value as "hierarquia" | "cpf")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hierarquia" id="hierarquia" />
                  <Label htmlFor="hierarquia" className="font-normal">
                    Hierarquia
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cpf" id="cpf" />
                  <Label htmlFor="cpf" className="font-normal">
                    CPF
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Ações */}
            <div className="pt-4 w-full flex justify-end mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-black text-black bg-white hover:bg-gray-100 rounded-[10px] px-6"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </Button>

                <Button
                  type="button"
                  onClick={handleContinuar}
                  disabled={!formValido}
                  className="rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] flex items-center justify-center gap-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
}
