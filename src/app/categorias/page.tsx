"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import { PageMain } from "@/components/layout/page";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ------ Tipos & Mock ------
type Categoria = {
  id: string;
  nome: string;
  criadoPor: string;
  data: string;
  utilizada: boolean;
  quantidade: number;
};

const CATEGORIAS_MOCK: Categoria[] = [
  {
    id: "1",
    nome: "Clima Organizacional",
    criadoPor: "Bruno Hernandes Leal",
    data: "12/11/2025",
    utilizada: true,
    quantidade: 1,
  },
  {
    id: "2",
    nome: "Serviço",
    criadoPor: "Nataly Barreto",
    data: "30/10/2025",
    utilizada: true,
    quantidade: 1,
  },
  {
    id: "3",
    nome: "Treinamento",
    criadoPor: "Leonardo Zimmermann",
    data: "23/10/2025",
    utilizada: true,
    quantidade: 2,
  },
];

// ------ Página ------
export default function PesquisasAdminConfig01Page() {
  const [categorias] = useState<Categoria[]>(CATEGORIAS_MOCK);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novaCategoriaNome, setNovaCategoriaNome] = useState("");

  const handleEditar = (id: string) => console.log("Editar categoria:", id);

  const handleConfirmar = () => {
    // apenas fecha o modal
    setIsDialogOpen(false);
    setNovaCategoriaNome("");
  };

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        <Card className="bg-white shadow-none border-none">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
                  Categorias
                </h1>
                <p className="text-black text-left">
                  Crie as categorias que serão associadas às
                  pesquisas-colaborador.
                </p>
              </div>

              {/* Modal */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Button
                  className="gap-2 whitespace-nowrap"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Adicionar <Plus size={16} />
                </Button>

                <DialogContent className="max-w-xl w-full rounded-[15px] p-8">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-semibold text-black">
                      Adicionar categoria
                    </DialogTitle>
                  </DialogHeader>

                  {/* Campo */}
                  <div className="w-full mb-6">
                    <Input
                      placeholder="Digite o nome da categoria"
                      value={novaCategoriaNome}
                      onChange={(e) => setNovaCategoriaNome(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* Botão Confirmar */}
                  <div className="w-full flex justify-end">
                    <Button onClick={handleConfirmar}>Confirmar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          {/* Tabela */}
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto rounded-[12px]">
              <Table className="w-full border-collapse text-base">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-[#D9D9D9]">
                    <TableHead className="w-[28%] text-left text-black font-medium pl-0 text-base">
                      Nome da categoria
                    </TableHead>
                    <TableHead className="w-[28%] text-left text-black font-medium text-base">
                      Criado por
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Data
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Utilizada
                    </TableHead>
                    <TableHead className="w-[10%] text-center text-black font-medium text-base">
                      Quantidade
                    </TableHead>
                    <TableHead className="w-[6%]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {categorias.map((cat) => (
                    <TableRow
                      key={cat.id}
                      className="border-b border-[#F5F5F5] hover:bg-transparent transition-none text-base"
                    >
                      <TableCell className="text-left text-black pl-0">
                        {cat.nome}
                      </TableCell>
                      <TableCell className="text-left text-black">
                        {cat.criadoPor}
                      </TableCell>
                      <TableCell className="text-center text-black">
                        {cat.data}
                      </TableCell>
                      <TableCell className="text-center text-black">
                        {cat.utilizada ? "Sim" : "Não"}
                      </TableCell>
                      <TableCell className="text-center text-black">
                        {cat.quantidade}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditar(cat.id)}
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageMain>
  );
}
