"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageMain } from "@/components/layout/page";

// ------ Tipos & Mock ------
type PesquisaConfig01 = {
  id: string;
  nome: string;
  qtd_total: number;
  qtd_resp: number;
  qtd_no_resp: number;
  qtd_por_resp: string;
  qtd_por_no_resp: string;
};

const PESQUISAS_CONFIG01_MOCK: PesquisaConfig01[] = [
  {
    id: "1",
    nome: "Pesquisa de Clima - 2025",
    qtd_total: 5798,
    qtd_resp: 3950,
    qtd_no_resp: 1848,
    qtd_por_resp: "68,13%",
    qtd_por_no_resp: "31,87%",
  },
  {
    id: "2",
    nome: "Primeira Liderança - T01",
    qtd_total: 27,
    qtd_resp: 23,
    qtd_no_resp: 4,
    qtd_por_resp: "85,19%",
    qtd_por_no_resp: "14,81%",
  },
  {
    id: "3",
    nome: "NPS - PJ",
    qtd_total: 876,
    qtd_resp: 620,
    qtd_no_resp: 256,
    qtd_por_resp: "70,77%",
    qtd_por_no_resp: "29,23%",
  },
  {
    id: "4",
    nome: "Treinamento AVD",
    qtd_total: 1231,
    qtd_resp: 720,
    qtd_no_resp: 511,
    qtd_por_resp: "58,48%",
    qtd_por_no_resp: "41,52%",
  },
  {
    id: "5",
    nome: "Onboarding de Novos Colaboradores",
    qtd_total: 45,
    qtd_resp: 43,
    qtd_no_resp: 2,
    qtd_por_resp: "95,56%",
    qtd_por_no_resp: "4,44%",
  },
  {
    id: "6",
    nome: "Comunicação Interna",
    qtd_total: 5433,
    qtd_resp: 4500,
    qtd_no_resp: 933,
    qtd_por_resp: "82,84%",
    qtd_por_no_resp: "17,16%",
  },
  {
    id: "7",
    nome: "Saúde e Bem-Estar",
    qtd_total: 5433,
    qtd_resp: 5432,
    qtd_no_resp: 1,
    qtd_por_resp: "99,98%",
    qtd_por_no_resp: "0,02%",
  },
  {
    id: "8",
    nome: "Inovação e Melhoria Contínua",
    qtd_total: 398,
    qtd_resp: 250,
    qtd_no_resp: 148,
    qtd_por_resp: "62,81%",
    qtd_por_no_resp: "37,19%",
  },
  {
    id: "9",
    nome: "Atendimento ao Cliente",
    qtd_total: 398,
    qtd_resp: 342,
    qtd_no_resp: 56,
    qtd_por_resp: "85,93%",
    qtd_por_no_resp: "14,07%",
  },
  {
    id: "10",
    nome: "Diversidade e Inclusão",
    qtd_total: 556,
    qtd_resp: 460,
    qtd_no_resp: 96,
    qtd_por_resp: "82,73%",
    qtd_por_no_resp: "17,27%",
  },
];

// helper pra decidir a cor da linha
function getRowNumberColor(percentStr: string) {
  const valor = Number(
    percentStr.replace("%", "").replace(".", "").replace(",", ".")
  ); // "85,93%" -> 85.93
  return valor >= 80 ? "text-[#21C25E]" : "text-[#DC2626]";
}

// ------ Página ------
export default function Relatorios() {
  const [itens] = useState<PesquisaConfig01[]>(PESQUISAS_CONFIG01_MOCK);

  return (
    <PageMain>
      <div className="w-full max-w-6xl">
        <Card className="bg-white shadow-none border-none">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
                  Relatórios
                </h1>
                <p className="text-black text-left">
                  Acompanhe o desempenho das suas pesquisas com nossos
                  relatórios detalhados.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="w-full overflow-x-auto rounded-[12px]">
              <Table className="w-full border-collapse text-base">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-[#D9D9D9]">
                    <TableHead className="w-[28%] text-left text-black font-medium pl-0 text-base">
                      Nome da pesquisa
                    </TableHead>
                    <TableHead className="w-[28%] text-center text-black font-medium text-base">
                      Colaboradores
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Respondidos
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      Não respondidos
                    </TableHead>
                    <TableHead className="w-[14%] text-center text-black font-medium text-base">
                      % Respondidos
                    </TableHead>
                    <TableHead className="w-[10%] text-center text-black font-medium text-base">
                      % Não respondidos
                    </TableHead>
                    <TableHead className="w-[6%]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {itens.map((pes) => {
                    const numberColor = getRowNumberColor(pes.qtd_por_resp);

                    return (
                      <TableRow
                        key={pes.id}
                        className="border-b border-[#F5F5F5] hover:bg-transparent transition-none text-base"
                      >
                        {/* Nome fica sempre preto */}
                        <TableCell className="text-left text-black pl-0">
                          {pes.nome}
                        </TableCell>

                        {/* Números com cor condicional */}
                        <TableCell className={`text-center ${numberColor}`}>
                          {pes.qtd_total}
                        </TableCell>
                        <TableCell className={`text-center ${numberColor}`}>
                          {pes.qtd_resp}
                        </TableCell>
                        <TableCell className={`text-center ${numberColor}`}>
                          {pes.qtd_no_resp}
                        </TableCell>
                        <TableCell className={`text-center ${numberColor}`}>
                          {pes.qtd_por_resp}
                        </TableCell>
                        <TableCell className={`text-center ${numberColor}`}>
                          {pes.qtd_por_no_resp}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <p className="text-black text-sm text-right mt-2">
            Para mais detalhes sobre os dados consulte o seu R.H.
          </p>
        </Card>
      </div>
    </PageMain>
  );
}
