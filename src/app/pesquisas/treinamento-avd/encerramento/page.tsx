"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, FolderGit, FileUp, FileSliders, FileInput } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EncerramentoPesquisa() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">

      {/* SIDEBAR */}
      <nav
        aria-label="Menu lateral"
        className="group fixed left-0 top-0 z-40 hidden md:flex h-screen w-20 hover:w-56 flex-col pt-20 bg-white border-r transition-all duration-300 ease-out overflow-hidden cursor-pointer"
      >
        <ul className="w-full space-y-2">
          {[
            { label: "Home", Icon: House, href: "/" },
            { label: "Categoria", Icon: FolderGit, href: "#" },
            { label: "Pesquisa", Icon: FileUp, href: "#" },
            { label: "Relatório", Icon: FileSliders, href: "#" },
          ].map(({ label, Icon, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="relative block w-full h-10 hover:bg-gray-100 transition-colors"
              >
                <Icon className="absolute top-1/2 -translate-y-1/2 left-7 w-6 h-6 text-gray-700" />
                <span className="absolute top-1/2 -translate-y-1/2 left-16 text-gray-800 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* MAIN */}
      <main className=" pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white">
          {/* Cabeçalho */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-semibold">Treinamento AVD</h2>
            <div className="flex w-full justify-between sm:w-auto sm:justify-end sm:gap-4">
              <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full px-4 h-6 text-sm font-medium">
                Treinamento
              </span>
              <span className="text-black font-semibold text-sm">
                Até: 30/03/2026
              </span>
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-4 text-black text-base leading-relaxed">
            <p>
              Agradecemos pela sua participação na pesquisa do Treinamento AVD.
            </p>

            <p>
              Sua opinião é fundamental para aprimorarmos continuamente nossos
              programas de capacitação e garantir experiências de aprendizado
              cada vez mais relevantes e eficazes.
            </p>

            <p>
              As respostas ajudarão a identificar o que funcionou bem e quais
              aspectos podem ser aperfeiçoados para futuras turmas. Nosso
              compromisso é promover treinamentos que estimulem o crescimento
              profissional, o engajamento e a aplicação prática dos
              conhecimentos adquiridos.
            </p>

            <p>
              Obrigado por dedicar seu tempo e contribuir para a construção de
              uma cultura de aprendizado e desenvolvimento contínuo!
            </p>
          </div>

          {/* Botão Home */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={() => router.push("/")}
              className="px-8 py-6 text-lg rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] transition-colors flex items-center gap-2 cursor-pointer"
            >
              Home
              <FileInput className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
