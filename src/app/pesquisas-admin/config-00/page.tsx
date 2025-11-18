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
import { useRouter } from "next/navigation";

// ------ Tipos & Mock ------
type PesquisaConfig01 = {
  id: string;
  nome: string;
  criadoPor: string;
  data: string;
  status: boolean;
  quantidade: number;
};

const PESQUISAS_CONFIG01_MOCK: PesquisaConfig01[] = [
  {
    id: "1",
    nome: "Pesquisa de Clima - 2025",
    criadoPor: "Bruno Hernandes Leal",
    data: "10/11/2025",
    status: true,
    quantidade: 5.798,
  },
  {
    id: "2",
    nome: "Primeira Liderança - T01",
    criadoPor: "Nataly Barreto",
    data: "31/10/2025",
    status: true,
    quantidade: 27,
  },
  {
    id: "3",
    nome: "NPS - PJ",
    criadoPor: "Leonardo Zimmermann",
    data: "22/10/2025",
    status: true,
    quantidade: 876,
  },
  {
    id: "4",
    nome: "Treinamento AVD",
    criadoPor: "Leonardo Zimmermann",
    data: "09/10/2025",
    status: true,
    quantidade: 1.231,
  },
  {
    id: "5",
    nome: "Onboarding de Novos Colaboradores",
    criadoPor: "Fabio Adriano Pereira",
    data: "25/9/2025",
    status: false,
    quantidade: 45,
  },
  {
    id: "6",
    nome: "Comunicação Interna",
    criadoPor: "Karine Nascimento",
    data: "19/08/2025",
    status: false,
    quantidade: 5.433,
  },
  {
    id: "7",
    nome: "Saúde e Bem-Estar",
    criadoPor: "Alencar Petroli",
    data: "19/08/2025",
    status: false,
    quantidade: 5.433,
  },
  {
    id: "8",
    nome: "Inovação e Melhoria Contínua",
    criadoPor: "Nataly Barreto",
    data: "02/08/2025",
    status: false,
    quantidade: 398,
  },
  {
    id: "9",
    nome: "Atendimento ao Cliente",
    criadoPor: "Bruno Hernandes Leal",
    data: "17/07/2025",
    status: false,
    quantidade: 398,
  },
  {
    id: "10",
    nome: "Diversidade e Inclusão",
    criadoPor: "Priscilla Vieira",
    data: "01/07/2025",
    status: false,
    quantidade: 556,
  },
];

// ------ Página ------
// Renomeado conforme pedido
export default function PesquisasAdminConfig01Page() {
  const [itens] = useState<PesquisaConfig01[]>(PESQUISAS_CONFIG01_MOCK);

  const handleEditar = (id: string) =>
    console.log("Editar item (pesquisas-config):", id);
  const router = useRouter();

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        {/* Cabeçalho + ação (layout da imagem) */}
        <Card className="bg-white shadow-none border-none">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
                  Pesquisas
                </h1>
                <p className="text-black text-left">
                  Crei e gerencie suas pesquisas.
                </p>
              </div>

              <Button
                className="gap-2 whitespace-nowrap"
                onClick={() => router.push("/pesquisas-admin/config-01")}
              >
                Adicionar <Plus size={16} />
              </Button>
            </div>
          </CardHeader>

          {/* Tabela */}
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto rounded-[12px]">
              <Table className="w-full border-collapse text-base">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-[#D9D9D9]">
                    <TableHead className="w-[28%] text-left text-black font-medium pl-0 text-base">
                      Nome da pesquisa
                    </TableHead>
                    <TableHead className="w-[28%] text-left text-black font-medium text-base">
                      Criado por
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Data de criação
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Stauts
                    </TableHead>
                    <TableHead className="w-[10%] text-center text-black font-medium text-base">
                      Qtd. de pessoas
                    </TableHead>
                    <TableHead className="w-[6%]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {itens.map((pes) => (
                    <TableRow
                      key={pes.id}
                      className="border-b border-[#F5F5F5] hover:bg-transparent transition-none text-base"
                    >
                      <TableCell className="text-left text-black pl-0">
                        {pes.nome}
                      </TableCell>
                      <TableCell className="text-left text-black">
                        {pes.criadoPor}
                      </TableCell>
                      <TableCell className="text-center text-black">
                        {pes.data}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          pes.status ? "text-[#21C25E]" : "text-[#DC2626]"
                        }`}
                      >
                        {pes.status ? "Ativa" : "Inativa"}
                      </TableCell>
                      <TableCell className="text-center text-black">
                        {pes.quantidade}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditar(pes.id)}
                            aria-label={`Editar ${pes.nome} (config)`}
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={`Excluir ${pes.nome} (config)`}
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
