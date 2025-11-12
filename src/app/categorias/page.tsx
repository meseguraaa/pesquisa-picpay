"use client";
import { useMemo, useState } from "react";
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
export default function CategoriasPage() {
  const [categorias] = useState<Categoria[]>(CATEGORIAS_MOCK);
  const total = useMemo(() => categorias.length, [categorias]);
  const handleAdicionar = () => console.log("Adicionar categoria");
  const handleEditar = (id: string) => console.log("Editar categoria:", id);
  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        <Card className="bg-white shadow-none border-none">
          <CardHeader className="p-0 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
              Categorias
            </h1>
            <div className="flex items-center justify-between text-left">
              <p className="text-black">
                Crie as categorias que serão associadas às pesquisas.
              </p>
              <Button
                onClick={handleAdicionar}
                className="gap-2 whitespace-nowrap"
              >
                Adicionar <Plus size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto rounded-[12px]">
              <Table className="w-full border-collapse text-base">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-[#D9D9D9]">
                    <TableHead className="w-[28%] min-w-[200px] text-left text-black font-medium pl-0 text-base">
                      Nome
                    </TableHead>
                    <TableHead className="w-[28%] min-w-[200px] text-left text-black font-medium text-base">
                      Criado por
                    </TableHead>
                    <TableHead className="w-[14%] min-w-[120px] text-center text-black font-medium text-base">
                      Data
                    </TableHead>
                    <TableHead className="w-[14%] min-w-[120px] text-center text-black font-medium text-base">
                      Utilizada
                    </TableHead>
                    <TableHead className="w-[10%] min-w-[100px] text-center text-black font-medium text-base">
                      Quantidade
                    </TableHead>
                    <TableHead className="w-[6%] min-w-[90px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categorias.map((cat) => (
                    <TableRow
                      key={cat.id}
                      className="border-b border-[#F5F5F5] hover:bg-transparent transition-none text-base"
                    >
                      <TableCell className="font-normal text-left text-black pl-0 text-base">
                        {cat.nome}
                      </TableCell>
                      <TableCell className="text-left text-black text-base">
                        {cat.criadoPor}
                      </TableCell>
                      <TableCell className="text-center text-black text-base">
                        {cat.data}
                      </TableCell>
                      <TableCell className="text-center text-black text-base">
                        {cat.utilizada ? "Sim" : "Não"}
                      </TableCell>
                      <TableCell className="text-center text-black text-base">
                        {cat.quantidade}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditar(cat.id)}
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Excluir"
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
