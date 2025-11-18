"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Pencil, Trash2 } from "lucide-react";
import QuestionTypePreview from "./question-type-preview";

/* ===== Tipos reaproveitáveis ===== */

export type TipoPergunta = "multipla" | "dissertativa" | "estrelas" | "nps";

export type PerguntaBase = {
  id: string;
  tipo: TipoPergunta;
  pergunta: string;
};

export type PerguntaMultipla = PerguntaBase & {
  tipo: "multipla";
  alternativas: string[];
};

export type PerguntaDissertativa = PerguntaBase & {
  tipo: "dissertativa";
};

export type PerguntaEstrelas = PerguntaBase & {
  tipo: "estrelas";
};

export type PerguntaNps = PerguntaBase & {
  tipo: "nps";
};

export type Pergunta =
  | PerguntaMultipla
  | PerguntaDissertativa
  | PerguntaEstrelas
  | PerguntaNps;

export type Bloco = {
  id: string;
  nome: string;
  tipoPergunta: string; // valor atual do select
  perguntas: Pergunta[];
};

/* ===== Props do componente ===== */

type SurveyBlockProps = {
  bloco: Bloco;
  focusGreen: string;
  getTipoLabel: (tipo: TipoPergunta) => string;

  onOpenEditName: (id: string) => void;
  onExcluir: (id: string) => void;
  onChangeTipo: (id: string, value: string) => void;
  onEditarPergunta: (blocoId: string, perguntaId: string) => void;
  onRemoverPergunta: (blocoId: string, perguntaId: string) => void;
};

export function SurveyBlock({
  bloco,
  focusGreen,
  getTipoLabel,
  onOpenEditName,
  onExcluir,
  onChangeTipo,
  onEditarPergunta,
  onRemoverPergunta,
}: SurveyBlockProps) {
  const hasPergunta = bloco.perguntas.length > 0;

  return (
    <div className="w-full border border-[#E5E5E5] rounded-[15px] bg-white shadow-sm p-4">
      {/* Linha superior: nome + ações do bloco */}
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex flex-col">
          <p className="text-base font-semibold text-black">{bloco.nome}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Editar nome */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenEditName(bloco.id)}
          >
            <Pencil size={16} />
          </Button>

          {/* Excluir bloco (bloqueado se tiver pergunta) */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md rounded-[15px]">
              <AlertDialogHeader>
                {hasPergunta ? (
                  <>
                    <AlertDialogTitle>
                      Não é possível excluir o bloco
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Este bloco possui pelo menos uma pergunta cadastrada. Para
                      excluir o bloco, primeiro remova todas as perguntas dele.
                    </AlertDialogDescription>
                  </>
                ) : (
                  <>
                    <AlertDialogTitle>Excluir bloco</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o bloco{" "}
                      <span className="font-medium">{bloco.nome}</span>? Essa
                      ação não poderá ser desfeita.
                    </AlertDialogDescription>
                  </>
                )}
              </AlertDialogHeader>

              <AlertDialogFooter>
                {hasPergunta ? (
                  <AlertDialogCancel>Entendi</AlertDialogCancel>
                ) : (
                  <>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#DC2626] hover:bg-[#b91c1c]"
                      onClick={() => onExcluir(bloco.id)}
                    >
                      Excluir
                    </AlertDialogAction>
                  </>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Select tipo de pergunta (para adicionar novas) */}
      <div className="flex flex-col gap-1">
        <Select
          value={bloco.tipoPergunta}
          onValueChange={(v) => onChangeTipo(bloco.id, v)}
        >
          <SelectTrigger
            className={`h-11 w-full rounded-[10px] border px-3 text-sm ${focusGreen}`}
          >
            <SelectValue placeholder="Selecione o tipo de pergunta" />
          </SelectTrigger>

          <SelectContent className="rounded-[10px]">
            <SelectItem value="multipla">Múltipla escolha</SelectItem>
            <SelectItem value="dissertativa">Dissertativa</SelectItem>
            <SelectItem value="estrelas">Estrelas de 1 a 5</SelectItem>
            <SelectItem value="nps">NPS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de perguntas deste bloco */}
      {bloco.perguntas.length > 0 && (
        <div className="mt-4 space-y-3">
          {bloco.perguntas.map((pergunta) => (
            <div
              key={pergunta.id}
              className="border border-dashed border-zinc-300 rounded-[12px] bg-[#FAFAFA] p-4"
            >
              {/* Header da pergunta */}
              <div className="flex items-start justify-between mb-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {getTipoLabel(pergunta.tipo)}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {/* Editar pergunta */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEditarPergunta(bloco.id, pergunta.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {/* Remover pergunta com confirmação */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="max-w-md rounded-[15px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover pergunta</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover esta pergunta do bloco{" "}
                          <span className="font-medium">{bloco.nome}</span>?
                          Essa ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#DC2626] hover:bg-[#b91c1c]"
                          onClick={() =>
                            onRemoverPergunta(bloco.id, pergunta.id)
                          }
                        >
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Preview da pergunta por tipo */}
              <QuestionTypePreview pergunta={pergunta} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SurveyBlock;
