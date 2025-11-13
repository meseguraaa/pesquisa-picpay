"use client";

import { useState } from "react";
import { PageMain } from "@/components/layout/page";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

export default function PesquisasAdminConfig02Page() {
  const [descricaoBreve, setDescricaoBreve] = useState("");
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [mensagemEncerramento, setMensagemEncerramento] = useState("");

  const descricaoBreveValida = descricaoBreve.trim().length >= 3;
  const descricaoCompletaValida = descricaoCompleta.trim().length >= 3;
  const mensagemEncerramentoValida = mensagemEncerramento.trim().length >= 3;

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
              Pesquisas
            </h1>
          </div>
        </div>

        {/* Card principal */}
        <div className="bg-white mt-6">
          {/* Stepper */}
          <div className="w-full">
            {/* LINHA SUPERIOR: linha + círculos */}
            <div className="flex items-center justify-between w-full">
              {[
                { step: 1, label: "Configuração" },
                { step: 2, label: "Perguntas" },
                { step: 3, label: "Disponibilizar" },
              ].map((item, index, arr) => (
                <div key={item.step} className="flex-1 flex items-center">
                  {/* linha esquerda */}
                  {index !== 0 && <div className="h-px bg-zinc-300 flex-1" />}

                  {/* círculo */}
                  <div className="mx-3 shrink-0">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${
                        item.step === 1
                          ? "border-black bg-black text-white"
                          : "border-zinc-300 text-zinc-700"
                      }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* linha direita */}
                  {index !== arr.length - 1 && (
                    <div className="h-px bg-zinc-300 flex-1" />
                  )}
                </div>
              ))}
            </div>

            {/* LINHA INFERIOR: textos alinhados embaixo dos círculos */}
            <div className="flex justify-between mt-2 w-full">
              {[
                { step: 1, label: "Configuração" },
                { step: 2, label: "Perguntas" },
                { step: 3, label: "Disponibilizar" },
              ].map((item, index, arr) => (
                <div
                  key={item.step}
                  className={`flex-1 flex ${
                    index === 0
                      ? "justify-start"
                      : index === arr.length - 1
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  <span
                    className={`text-xs font-medium text-zinc-800 text-center ${
                      index === 0
                        ? "ml-3"
                        : index === arr.length - 1
                        ? "mr-3"
                        : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-6 mt-8">
            {/* Criador */}
            <div className="space-y-1.5">
              <Label htmlFor="criador">Criador</Label>
              <Select defaultValue="bruno">
                <SelectTrigger id="criador" className="w-full border-black">
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
                Nome<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="nome"
                placeholder="Digite o nome da pesquisa"
                className="bg-white border-black"
              />
            </div>

            {/* Imagem */}
            <div className="space-y-1.5">
              <Label htmlFor="imagem">
                Imagem<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  id="imagem"
                  placeholder="Envie sua imagem de capa"
                  className="bg-white flex-1 border-black"
                  readOnly
                />
                <Button type="button" className="gap-2 whitespace-nowrap">
                  Adicionar <Plus size={16} />
                </Button>
              </div>
              <p className="text-[11px] text-zinc-500">
                Largura 1134 x 637 pixels
              </p>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="dataInicio">
                  Data de início<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="dataInicio"
                    type="date"
                    className="bg-white border-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                {/* SEM asterisco, não obrigatória */}
                <Label htmlFor="dataFim">Data de fim</Label>
                <div className="relative">
                  <Input
                    id="dataFim"
                    type="date"
                    className="bg-white border-black"
                  />
                </div>
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-1.5">
              <Label htmlFor="categoria">
                Categoria<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select>
                <SelectTrigger id="categoria" className="w-full border-black">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clima">Clima Organizacional</SelectItem>
                  <SelectItem value="treinamento">Serviço</SelectItem>
                  <SelectItem value="outros">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descrição breve */}
            <div className="space-y-1.5">
              <Label htmlFor="descricaoBreve">Descrição breve</Label>
              <Textarea
                id="descricaoBreve"
                maxLength={120}
                value={descricaoBreve}
                onChange={(e) => setDescricaoBreve(e.target.value)}
                placeholder="Digite a descrição breve da pesquisa"
                className="min-h-24 resize-none bg-white border-black"
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
              <Label htmlFor="descricaoCompleta">Descrição completa</Label>
              <Textarea
                id="descricaoCompleta"
                maxLength={1000}
                value={descricaoCompleta}
                onChange={(e) => setDescricaoCompleta(e.target.value)}
                placeholder="Digite a descrição completa da pesquisa"
                className="min-h-[140px] resize-none bg-white border-black"
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
                Mensagem de encerramento
              </Label>
              <Textarea
                id="mensagemEncerramento"
                maxLength={1000}
                value={mensagemEncerramento}
                onChange={(e) => setMensagemEncerramento(e.target.value)}
                placeholder="Digite a mensagem de encerramento"
                className="min-h-[120px] resize-none bg-white border-black"
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
              <Label>Tipo de disponibilização</Label>
              <RadioGroup
                defaultValue="hierarquia"
                className="flex flex-wrap gap-6"
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
                  className=" rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] flex items-center justify-center gap-2 px-6"
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
