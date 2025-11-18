"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { ArrowLeft, ArrowRight, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import SurveyStepper from "@/components/survey-stepper/survey-stepper";
import {
  SurveyBlock,
  Bloco,
  TipoPergunta,
  Pergunta,
  PerguntaMultipla,
} from "@/components/survey-block/survey-block";

export default function Config02Client() {
  const router = useRouter();

  // Lê o ?tipo= da URL no client, sem usar useSearchParams
  const [tipoDisponibilizacao, setTipoDisponibilizacao] = useState<
    "hierarquia" | "cpf"
  >("hierarquia");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const tipoParam = params.get("tipo");
    const tipo =
      tipoParam === "cpf" || tipoParam === "hierarquia"
        ? (tipoParam as "cpf" | "hierarquia")
        : "hierarquia";

    setTipoDisponibilizacao(tipo);
  }, []);

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
      const p = pergunta as PerguntaMultipla;
      setModalAlternativas(p.alternativas.length ? p.alternativas : ["", ""]);
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
                const pMult = p as PerguntaMultipla;
                return {
                  ...pMult,
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
          } as PerguntaMultipla;
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

  const handleVoltar = () => {
    router.push("/pesquisas-admin/config-01");
  };

  // 🔒 trava: precisa ter pelo menos 1 bloco com pelo menos 1 pergunta
  const canContinue = blocos.some((b) => b.perguntas.length > 0);

  const handleContinuar = () => {
    if (!canContinue) return;

    router.push(
      `/pesquisas-admin/config-03?tipo=${encodeURIComponent(
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

        {/* Stepper */}
        <div className="bg-white mt-6">
          <SurveyStepper currentStep={2} />
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
            {blocos.map((bloco) => (
              <SurveyBlock
                key={bloco.id}
                bloco={bloco}
                focusGreen={focusGreen}
                getTipoLabel={getTipoLabel}
                onOpenEditName={handleOpenEdit}
                onExcluir={handleExcluir}
                onChangeTipo={handleChangeTipo}
                onEditarPergunta={openModalEditarPergunta}
                onRemoverPergunta={handleRemoverPergunta}
              />
            ))}
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

        {/* Modal genérico de pergunta */}
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
                  className={`min-h-24 resize-none ${focusGreen}`}
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
              onClick={handleVoltar}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Button>

            <Button
              type="button"
              onClick={handleContinuar}
              disabled={!canContinue}
              className="rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] flex items-center justify-center gap-2 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Continuar <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </PageMain>
  );
}
