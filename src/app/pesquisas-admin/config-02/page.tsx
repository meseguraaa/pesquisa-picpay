"use client";

import { useState } from "react";
import Link from "next/link";

import { PageMain } from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Pencil,
  Trash2,
  Star,
  Frown,
  Meh,
  Smile,
  Laugh,
} from "lucide-react";

type TipoPergunta = "multipla" | "dissertativa" | "estrelas" | "nps";

type PerguntaBase = {
  id: string;
  tipo: TipoPergunta;
  pergunta: string;
};

type PerguntaMultipla = PerguntaBase & {
  tipo: "multipla";
  alternativas: string[];
};

type PerguntaDissertativa = PerguntaBase & {
  tipo: "dissertativa";
};

type PerguntaEstrelas = PerguntaBase & {
  tipo: "estrelas";
};

type PerguntaNps = PerguntaBase & {
  tipo: "nps";
};

type Pergunta =
  | PerguntaMultipla
  | PerguntaDissertativa
  | PerguntaEstrelas
  | PerguntaNps;

type Bloco = {
  id: string;
  nome: string;
  tipoPergunta: string; // valor atual do select
  perguntas: Pergunta[];
};

const faceFor = (n: number) => {
  if (n <= 2) return <Frown className="w-5 h-5" />;
  if (n <= 4) return <Meh className="w-5 h-5" />;
  if (n <= 7) return <Smile className="w-5 h-5" />;
  return <Laugh className="w-5 h-5" />;
};

export default function PesquisasAdminConfig03Page() {
  const [blocos, setBlocos] = useState<Bloco[]>([]);

  // ----- Adicionar bloco -----
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [nomeBloco, setNomeBloco] = useState("");

  // ----- Editar bloco (nome) -----
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBlocoId, setEditingBlocoId] = useState<string | null>(null);
  const [editingNome, setEditingNome] = useState("");

  // ----- Modal genérico de pergunta -----
  const [isPerguntaDialogOpen, setIsPerguntaDialogOpen] = useState(false);
  const [modalTipo, setModalTipo] = useState<TipoPergunta | null>(null);
  const [modalBlocoId, setModalBlocoId] = useState<string | null>(null);
  const [editingPerguntaId, setEditingPerguntaId] = useState<string | null>(
    null
  );
  const [modalPergunta, setModalPergunta] = useState("");
  const [modalAlternativas, setModalAlternativas] = useState<string[]>([]); // só usado em múltipla

  const focusGreen =
    "bg-white border-black " +
    "focus:border-[#21C25E] focus:ring-2 focus:ring-[#21C25E] focus:outline-none " +
    "focus-visible:border-[#21C25E] focus-visible:ring-2 focus-visible:ring-[#21C25E] focus-visible:outline-none";

  // ------- Adicionar bloco -------
  const handleAddConfirmar = () => {
    const nome = nomeBloco.trim();
    if (!nome) return;

    setBlocos((prev) => [
      ...prev,
      {
        id: String(Date.now() + Math.random()),
        nome,
        tipoPergunta: "",
        perguntas: [],
      },
    ]);

    setIsAddDialogOpen(false);
    setNomeBloco("");
  };

  // ------- Editar nome do bloco -------
  const handleOpenEdit = (id: string) => {
    const bloco = blocos.find((b) => b.id === id);
    if (!bloco) return;

    setEditingBlocoId(bloco.id);
    setEditingNome(bloco.nome);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirmar = () => {
    const novoNome = editingNome.trim();
    if (!novoNome || !editingBlocoId) return;

    setBlocos((prev) =>
      prev.map((b) => (b.id === editingBlocoId ? { ...b, nome: novoNome } : b))
    );

    setIsEditDialogOpen(false);
    setEditingBlocoId(null);
    setEditingNome("");
  };

  // ------- Abrir modal para NOVA pergunta (sempre vazio) -------
  const openModalNovaPergunta = (blocoId: string, tipo: TipoPergunta) => {
    setModalBlocoId(blocoId);
    setModalTipo(tipo);
    setEditingPerguntaId(null);
    setModalPergunta("");
    setModalAlternativas(tipo === "multipla" ? ["", ""] : []);
    setIsPerguntaDialogOpen(true);
  };

  // ------- Abrir modal para EDITAR pergunta específica -------
  const openModalEditarPergunta = (blocoId: string, perguntaId: string) => {
    const bloco = blocos.find((b) => b.id === blocoId);
    if (!bloco) return;

    const pergunta = bloco.perguntas.find((p) => p.id === perguntaId);
    if (!pergunta) return;

    setModalBlocoId(blocoId);
    setModalTipo(pergunta.tipo);
    setEditingPerguntaId(pergunta.id);
    setModalPergunta(pergunta.pergunta);

    if (pergunta.tipo === "multipla") {
      setModalAlternativas(
        pergunta.alternativas.length ? pergunta.alternativas : ["", ""]
      );
    } else {
      setModalAlternativas([]);
    }

    setIsPerguntaDialogOpen(true);
  };

  // ------- Tipo de pergunta (via select) -------
  const handleChangeTipo = (id: string, value: string) => {
    setBlocos((prev) =>
      prev.map((b) => (b.id === id ? { ...b, tipoPergunta: value } : b))
    );

    if (
      value === "multipla" ||
      value === "dissertativa" ||
      value === "estrelas" ||
      value === "nps"
    ) {
      openModalNovaPergunta(id, value as TipoPergunta);
    }
  };

  // ------- Remover pergunta específica -------
  const handleRemoverPergunta = (blocoId: string, perguntaId: string) => {
    setBlocos((prev) =>
      prev.map((b) =>
        b.id === blocoId
          ? {
              ...b,
              perguntas: b.perguntas.filter((p) => p.id !== perguntaId),
            }
          : b
      )
    );
  };

  // ------- Handlers do modal (múltipla) -------
  const handleAddAlternativa = () => {
    setModalAlternativas((prev) => [...prev, ""]);
  };

  const handleChangeAlternativa = (index: number, value: string) => {
    setModalAlternativas((prev) =>
      prev.map((alt, i) => (i === index ? value : alt))
    );
  };

  const handleRemoveAlternativa = (index: number) => {
    setModalAlternativas((prev) => prev.filter((_, i) => i !== index));
  };

  // ------- Validação da pergunta (por tipo) -------
  const modalPerguntaTrim = modalPergunta.trim();
  const alternativasTrim = modalAlternativas.map((a) => a.trim());

  const isPerguntaValida = (() => {
    if (!modalTipo) return false;
    const hasPergunta = modalPerguntaTrim.length >= 3;

    if (!hasPergunta) return false;

    if (modalTipo === "multipla") {
      return (
        alternativasTrim.length >= 2 &&
        alternativasTrim.every((a) => a.length >= 3)
      );
    }

    // dissertativa / estrelas / nps: só valida pergunta
    return true;
  })();

  const handlePerguntaConfirmar = () => {
    if (!modalBlocoId || !modalTipo) return;
    if (!isPerguntaValida) return;

    setBlocos((prev) =>
      prev.map((b) => {
        if (b.id !== modalBlocoId) return b;

        // EDITAR pergunta existente
        if (editingPerguntaId) {
          return {
            ...b,
            perguntas: b.perguntas.map((p) => {
              if (p.id !== editingPerguntaId) return p;

              if (modalTipo === "multipla" && p.tipo === "multipla") {
                return {
                  ...p,
                  pergunta: modalPerguntaTrim,
                  alternativas: alternativasTrim,
                } as PerguntaMultipla;
              }

              return {
                ...p,
                pergunta: modalPerguntaTrim,
              } as Pergunta;
            }),
            tipoPergunta: "",
          };
        }

        // NOVA pergunta
        let novaPergunta: Pergunta;
        const id = String(Date.now() + Math.random());

        if (modalTipo === "multipla") {
          novaPergunta = {
            id,
            tipo: "multipla",
            pergunta: modalPerguntaTrim,
            alternativas: alternativasTrim,
          };
        } else if (modalTipo === "dissertativa") {
          novaPergunta = {
            id,
            tipo: "dissertativa",
            pergunta: modalPerguntaTrim,
          };
        } else if (modalTipo === "estrelas") {
          novaPergunta = {
            id,
            tipo: "estrelas",
            pergunta: modalPerguntaTrim,
          };
        } else {
          novaPergunta = {
            id,
            tipo: "nps",
            pergunta: modalPerguntaTrim,
          };
        }

        return {
          ...b,
          perguntas: [...b.perguntas, novaPergunta],
          tipoPergunta: "",
        };
      })
    );

    // limpar estados do modal
    setIsPerguntaDialogOpen(false);
    setModalBlocoId(null);
    setModalTipo(null);
    setEditingPerguntaId(null);
    setModalPergunta("");
    setModalAlternativas([]);
  };

  // ------- Excluir bloco (só se não tiver perguntas) -------
  const handleExcluir = (id: string) => {
    setBlocos((prev) => prev.filter((b) => b.id !== id));
  };

  // ------- Helpers de UI -------
  const getTipoLabel = (tipo: TipoPergunta) => {
    switch (tipo) {
      case "multipla":
        return "Múltipla escolha";
      case "dissertativa":
        return "Dissertativa";
      case "estrelas":
        return "Estrelas de 1 a 5";
      case "nps":
        return "NPS (1 a 10)";
      default:
        return "";
    }
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

        {/* Stepper */}
        <div className="bg-white mt-6">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              {[
                { step: 1, label: "Configuração" },
                { step: 2, label: "Perguntas" },
                { step: 3, label: "Disponibilizar" },
              ].map((item, index, arr) => (
                <div key={item.step} className="flex-1 flex items-center">
                  {index !== 0 && <div className="h-px bg-zinc-300 flex-1" />}

                  <div className="mx-3 shrink-0">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium
                        ${
                          item.step === 1
                            ? "border-[#21C25E] bg-[#21C25E] text-white"
                            : item.step === 2
                            ? "border-black bg-black text-white"
                            : "border-zinc-300 text-zinc-700"
                        }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {index !== arr.length - 1 && (
                    <div className="h-px bg-zinc-300 flex-1" />
                  )}
                </div>
              ))}
            </div>

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
        </div>

        {/* Blocos */}
        <div className="bg-white mt-6">
          <div className="space-y-4">
            {/* Adicionar bloco + modal */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <Button
                type="button"
                className="gap-2 whitespace-nowrap"
                onClick={() => setIsAddDialogOpen(true)}
              >
                Adicionar bloco <Plus size={16} />
              </Button>

              <DialogContent className="max-w-xl w-full rounded-[15px] p-8">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-black">
                    Adicionar bloco
                  </DialogTitle>
                </DialogHeader>

                <div className="w-full mb-6">
                  <Input
                    placeholder="Digite o nome do bloco"
                    value={nomeBloco}
                    onChange={(e) => setNomeBloco(e.target.value)}
                    className={`h-11 ${focusGreen}`}
                  />
                </div>

                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleAddConfirmar}
                    disabled={!nomeBloco.trim()}
                  >
                    Confirmar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Lista de blocos */}
            {blocos.map((bloco) => {
              const hasPergunta = bloco.perguntas.length > 0;

              return (
                <div
                  key={bloco.id}
                  className="w-full border border-[#E5E5E5] rounded-[15px] bg-white shadow-sm p-4"
                >
                  {/* Linha superior: nome + ações do bloco */}
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold text-black">
                        {bloco.nome}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Editar nome */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(bloco.id)}
                      >
                        <Pencil size={16} />
                      </Button>

                      {/* Excluir bloco (bloqueado se tiver pergunta) */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                                  Este bloco possui pelo menos uma pergunta
                                  cadastrada. Para excluir o bloco, primeiro
                                  remova todas as perguntas dele.
                                </AlertDialogDescription>
                              </>
                            ) : (
                              <>
                                <AlertDialogTitle>
                                  Excluir bloco
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o bloco{" "}
                                  <span className="font-medium">
                                    {bloco.nome}
                                  </span>
                                  ? Essa ação não poderá ser desfeita.
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
                                  onClick={() => handleExcluir(bloco.id)}
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
                      onValueChange={(v) => handleChangeTipo(bloco.id, v)}
                    >
                      <SelectTrigger
                        className={`h-11 w-full rounded-[10px] border px-3 text-sm ${focusGreen}`}
                      >
                        <SelectValue placeholder="Selecione o tipo de pergunta" />
                      </SelectTrigger>

                      <SelectContent className="rounded-[10px]">
                        <SelectItem value="multipla">
                          Múltipla escolha
                        </SelectItem>
                        <SelectItem value="dissertativa">
                          Dissertativa
                        </SelectItem>
                        <SelectItem value="estrelas">
                          Estrelas de 1 a 5
                        </SelectItem>
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
                                onClick={() =>
                                  openModalEditarPergunta(bloco.id, pergunta.id)
                                }
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
                                    <AlertDialogTitle>
                                      Remover pergunta
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja remover esta
                                      pergunta do bloco{" "}
                                      <span className="font-medium">
                                        {bloco.nome}
                                      </span>
                                      ? Essa ação não poderá ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-[#DC2626] hover:bg-[#b91c1c]"
                                      onClick={() =>
                                        handleRemoverPergunta(
                                          bloco.id,
                                          pergunta.id
                                        )
                                      }
                                    >
                                      Remover
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>

                          {/* Corpo da pergunta: preview por tipo */}
                          {pergunta.tipo === "multipla" && (
                            <>
                              <p className="text-sm text-zinc-800 mb-3">
                                {pergunta.pergunta}
                              </p>

                              <div className="space-y-2">
                                {pergunta.alternativas.map((alt, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-zinc-900"
                                  >
                                    <div className="h-4 w-4 rounded-full border border-zinc-500" />
                                    <span>{alt}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}

                          {pergunta.tipo === "dissertativa" && (
                            <>
                              <p className="text-sm text-zinc-800 mb-3">
                                {pergunta.pergunta}
                              </p>
                              <div className="border border-gray-500 rounded-[10px] bg-white px-3 py-2 text-sm text-gray-500">
                                Resposta aberta do colaborador...
                              </div>
                            </>
                          )}

                          {/* ⭐ ESTRELAS – ajustado pro estilo do outro formulário */}
                          {pergunta.tipo === "estrelas" && (
                            <>
                              <p className="text-sm text-black mb-3">
                                {pergunta.pergunta}
                              </p>

                              <div className="inline-flex items-center gap-2 py-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-5 w-5 text-[#238662]"
                                    fill="#238662"
                                    strokeWidth={1.5}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {/* 🔢 NPS – ajustado pro estilo do outro formulário */}
                          {pergunta.tipo === "nps" && (
                            <>
                              <p className="text-sm text-black mb-3">
                                {pergunta.pergunta}
                              </p>

                              <div className="mt-2 grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {Array.from({ length: 10 }, (_, idx) => {
                                  const n = idx + 1;
                                  return (
                                    <div
                                      key={n}
                                      className="
              group flex flex-col items-center justify-center gap-1 p-2 rounded-md border
              bg-white border-black text-black
            "
                                    >
                                      <span className="flex items-center justify-center h-6">
                                        {faceFor(n)}
                                      </span>
                                      <span className="text-xs font-medium">
                                        {n}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>

                              <p className="mt-2 text-[11px] text-gray-500">
                                Escala ilustrativa de 1 a 10 (NPS), apenas para
                                visualização.
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal de edição de bloco (nome) */}
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setEditingBlocoId(null);
              setEditingNome("");
            }
          }}
        >
          <DialogContent className="max-w-xl w-full rounded-[15px] p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold text-black">
                Editar bloco
              </DialogTitle>
            </DialogHeader>

            <div className="w-full mb-6">
              <Input
                placeholder="Digite o nome do bloco"
                value={editingNome}
                onChange={(e) => setEditingNome(e.target.value)}
                className={`h-11 ${focusGreen}`}
              />
            </div>

            <div className="w-full flex justify-end">
              <Button
                onClick={handleEditConfirmar}
                disabled={!editingNome.trim()}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal genérico de pergunta (multipla, dissertativa, estrelas, nps) */}
        <Dialog
          open={isPerguntaDialogOpen}
          onOpenChange={(open) => {
            setIsPerguntaDialogOpen(open);
            if (!open) {
              setModalBlocoId(null);
              setModalTipo(null);
              setEditingPerguntaId(null);
              setModalPergunta("");
              setModalAlternativas([]);
            }
          }}
        >
          <DialogContent className="w-full sm:max-w-[900px] max-w-[900px] rounded-[20px] p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold text-black">
                {modalTipo ? getTipoLabel(modalTipo) : "Pergunta"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Pergunta */}
              <div className="w-full">
                <Textarea
                  placeholder="Digite a pergunta"
                  value={modalPergunta}
                  onChange={(e) => setModalPergunta(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className={`min-h-[96px] resize-none ${focusGreen}`}
                />
                <div className="mt-1 text-xs text-zinc-500 text-right">
                  {modalPergunta.length} / 500
                </div>
              </div>

              {/* Alternativas - só para múltipla escolha */}
              {modalTipo === "multipla" && (
                <div className="space-y-3">
                  {modalAlternativas.map((alt, index) => {
                    const altTrim = alt.trim();
                    const isValida = altTrim.length >= 3;

                    return (
                      <div key={index} className="flex items-start gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Digite a alternativa"
                            value={alt}
                            onChange={(e) =>
                              handleChangeAlternativa(index, e.target.value)
                            }
                            maxLength={250}
                            className={`h-11 ${focusGreen} ${
                              alt.length > 0 && !isValida
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          />
                          <div className="mt-1 flex items-center justify-between text-[11px]">
                            <span className="text-red-500">
                              {alt.length > 0 && !isValida
                                ? "Mínimo de 3 caracteres"
                                : ""}
                            </span>
                            <span className="text-zinc-500">
                              {alt.length} / 250
                            </span>
                          </div>
                        </div>

                        {modalAlternativas.length > 2 && index >= 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 mt-1"
                            onClick={() => handleRemoveAlternativa(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-black text-black bg-white hover:bg-gray-100 rounded-[10px] px-4"
                      onClick={handleAddAlternativa}
                    >
                      Adicionar alternativa
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 w-full flex justify-end">
              <Button
                type="button"
                onClick={handlePerguntaConfirmar}
                disabled={!isPerguntaValida}
                className="rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] px-6 disabled:opacity-60"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Navegação */}
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

            <Link href="/pesquisas-admin/config-04">
              <Button
                type="button"
                className="rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] flex items-center justify-center gap-2 px-6"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageMain>
  );
}
