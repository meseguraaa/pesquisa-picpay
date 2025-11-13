"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PageMain } from "@/components/layout/page";

// ------ Tipos & Mock ------
type PesquisaConfig02 = {
  id: string;
  nome: string;
  criadoPor: string;
  data: string; // dd/mm/aaaa
  status: boolean; // ativa/inativa
  quantidade: number; // qtd pessoas
};

const PESQUISAS_CONFIG02_MOCK: PesquisaConfig02[] = [
  { id: "1", nome: "Pesquisa de Clima - 2025", criadoPor: "Bruno Hernandes Leal", data: "10/11/2025", status: true, quantidade: 5798 },
  { id: "2", nome: "Primeira Liderança - T01", criadoPor: "Nataly Barreto", data: "31/10/2025", status: true, quantidade: 27 },
  { id: "3", nome: "NPS - PJ", criadoPor: "Leonardo Zimmermann", data: "22/10/2025", status: true, quantidade: 876 },
  { id: "4", nome: "Treinamento AVD", criadoPor: "Leonardo Zimmermann", data: "09/10/2025", status: true, quantidade: 1231 },
  { id: "5", nome: "Onboarding de Novos Colaboradores", criadoPor: "Fabio Adriano Pereira", data: "25/09/2025", status: false, quantidade: 45 },
  { id: "6", nome: "Comunicação Interna", criadoPor: "Karine Nascimento", data: "19/08/2025", status: false, quantidade: 5433 },
  { id: "7", nome: "Saúde e Bem-Estar", criadoPor: "Alencar Petroli", data: "19/08/2025", status: false, quantidade: 5433 },
  { id: "8", nome: "Inovação e Melhoria Contínua", criadoPor: "Nataly Barreto", data: "02/08/2025", status: false, quantidade: 398 },
  { id: "9", nome: "Atendimento ao Cliente", criadoPor: "Bruno Hernandes Leal", data: "17/07/2025", status: false, quantidade: 398 },
  { id: "10", nome: "Diversidade e Inclusão", criadoPor: "Priscilla Vieira", data: "01/07/2025", status: false, quantidade: 556 },
];

// ------ Helpers ------
const formatNumber = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

type StatusFiltro = "todos" | "ativos" | "inativos";

// ------ Página: Config-02 ------
export default function PesquisasAdminConfig02Page() {
  const [itens, setItens] = useState<PesquisaConfig02[]>(PESQUISAS_CONFIG02_MOCK);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("todos");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const filtrados = useMemo(() => {
    const term = busca.trim().toLowerCase();
    return itens.filter((i) => {
      const matchBusca = !term || [i.nome, i.criadoPor, i.data].some((f) => f.toLowerCase().includes(term));
      const matchStatus =
        statusFiltro === "todos" ? true : statusFiltro === "ativos" ? i.status === true : i.status === false;
      return matchBusca && matchStatus;
    });
  }, [itens, busca, statusFiltro]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaCorrigida = Math.min(pagina, totalPaginas);
  const inicio = (paginaCorrigida - 1) * porPagina;
  const visiveis = filtrados.slice(inicio, inicio + porPagina);

  const toggleStatus = (id: string) => {
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, status: !i.status } : i)));
  };

  const handleEditar = (id: string) => console.log("Editar item (config-02):", id);
  const handleExcluir = (id: string) => console.log("Excluir item (config-02):", id);

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        {/* Cabeçalho + ação (mantém o layout base) */}
        <Card className="bg-white shadow-none border-none">
          <CardHeader className="p-0 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">Configuração – Etapa 02</h1>
                <p className="text-black text-left">Refine filtros, ative/desative pesquisas e gerencie entradas.</p>
              </div>

              {/* Ação principal em Dialog simples */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 whitespace-nowrap">
                    Adicionar <Plus size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[520px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar pesquisa</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nome" className="text-right">Nome</Label>
                      <Input id="nome" className="col-span-3" placeholder="Ex.: Pesquisa de Clima - 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="criador" className="text-right">Criado por</Label>
                      <Input id="criador" className="col-span-3" placeholder="Responsável" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="data" className="text-right">Data</Label>
                      <Input id="data" className="col-span-3" placeholder="dd/mm/aaaa" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3 flex items-center gap-3">
                        <Switch id="novo-status" defaultChecked />
                        <span className="text-sm text-muted-foreground">Ativa</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          {/* Filtros */}
          <CardContent className="p-0 mb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full sm:w-auto items-center gap-2">
                <div className="relative w-full sm:w-[320px]">
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <Input
                    value={busca}
                    onChange={(e) => {
                      setPagina(1);
                      setBusca(e.target.value);
                    }}
                    placeholder="Buscar por nome, criador ou data"
                    className="pl-8"
                    aria-label="Buscar pesquisas"
                  />
                </div>
                <Select
                  value={statusFiltro}
                  onValueChange={(v: StatusFiltro) => {
                    setPagina(1);
                    setStatusFiltro(v);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativos">Ativos</SelectItem>
                    <SelectItem value="inativos">Inativos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Indicador rápido */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full">{filtrados.length} resultado(s)</Badge>
              </div>
            </div>
          </CardContent>

          {/* Tabela */}
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto rounded-[12px]">
              <Table className="w-full border-collapse text-base">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-[#D9D9D9]">
                    <TableHead className="w-[30%] text-left text-black font-medium pl-0 text-base">Nome</TableHead>
                    <TableHead className="w-[25%] text-left text-black font-medium text-base">Criado por</TableHead>
                    <TableHead className="w-[15%] text-center text-black font-medium text-base">Data de criação</TableHead>
                    <TableHead className="w-[15%] text-center text-black font-medium text-base">Status</TableHead>
                    <TableHead className="w-[10%] text-center text-black font-medium text-base">Qtd. pessoas</TableHead>
                    <TableHead className="w-[5%]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {visiveis.map((pes) => (
                    <TableRow key={pes.id} className="border-b border-[#F5F5F5] hover:bg-transparent transition-none text-base">
                      <TableCell className="text-left text-black pl-0">{pes.nome}</TableCell>
                      <TableCell className="text-left text-black">{pes.criadoPor}</TableCell>
                      <TableCell className="text-center text-black">{pes.data}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-3">
                          <Badge
                            variant="outline"
                            className={pes.status ? "border-[#21C25E] text-[#21C25E]" : "border-[#DC2626] text-[#DC2626]"}
                          >
                            {pes.status ? "Ativa" : "Inativa"}
                          </Badge>
                          <Switch checked={pes.status} onCheckedChange={() => toggleStatus(pes.id)} aria-label={`Alternar status de ${pes.nome}`} />
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-black">{formatNumber(pes.quantidade)}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditar(pes.id)}
                            aria-label={`Editar ${pes.nome} (config-02)`}
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleExcluir(pes.id)}
                            aria-label={`Excluir ${pes.nome} (config-02)`}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {visiveis.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        Nenhum resultado para sua busca.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Paginação simples */}
            <div className="flex items-center justify-between py-4">
              <span className="text-sm text-muted-foreground">
                Exibindo <strong>{visiveis.length}</strong> de <strong>{filtrados.length}</strong>
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={paginaCorrigida === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
                </Button>
                <span className="text-sm">
                  Página <strong>{paginaCorrigida}</strong> de <strong>{totalPaginas}</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                  disabled={paginaCorrigida === totalPaginas}
                >
                  Próxima <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageMain>
  );
}
