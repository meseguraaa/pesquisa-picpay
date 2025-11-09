// app/page.tsx (App Router)

export const metadata = {
  title: "PICPAY - Pesquisa",
  icons: { icon: "/assets/logo_picpay.png" },
};

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SendHorizontal,
  House,
  FolderGit,
  FileUp,
  FileSliders,
} from "lucide-react";

export default function Home() {
  const cards = [
    {
      img: "/assets/capa_pesquisa_01.png",
      title: "Pesquisa de Clima - 2025",
      category: "Clima Organizacional",
      description:
        "Avaliação anual da satisfação, engajamento e bem-estar dos colaboradores em 2025.",
      date: "01/12/2025",
      link: "/pesquisas/pesquisa-clima-2025", // destino do 1º card
    },
    {
      img: "/assets/capa_pesquisa_02.png",
      title: "Primeira Liderança - T01",
      category: "Treinamento",
      description:
        "Desenvolvimento de novas lideranças e fortalecimento de competências de gestão.",
      date: "30/11/2025",
    },
    {
      img: "/assets/capa_pesquisa_03.png",
      title: "NPS - PJ",
      category: "Serviços",
      description:
        "Avaliação da satisfação dos parceiros PJ com produtos e serviços oferecidos.",
      date: "31/12/2025",
    },
    {
      img: "/assets/capa_pesquisa_04.png",
      title: "Treinamento AVD",
      category: "Treinamento",
      description:
        "Capacitação prática para aprimorar habilidades e desempenho em atividades diárias.",
      date: "30/03/2026",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 h-16 px-4 bg-white shadow-sm">
        <Image
          src="/assets/logo_picpay.png"
          alt="Logo PicPay"
          width={32}
          height={32}
        />
        <h1 className="text-3xl font-bold text-[#21C25E]">Pesquisa</h1>
      </header>

      {/* SIDEBAR (desktop/tablet) */}
      <nav
        aria-label="Menu lateral"
        className="group fixed left-0 top-0 z-40 hidden md:flex h-screen w-20 hover:w-56 flex-col pt-20 bg-white border-r transition-all duration-300 ease-out overflow-hidden cursor-pointer"
      >
        <ul className="w-full space-y-2">
          {[
            { label: "Home", Icon: House },
            { label: "Categoria", Icon: FolderGit },
            { label: "Pesquisa", Icon: FileUp },
            { label: "Relatório", Icon: FileSliders },
          ].map(({ label, Icon }) => (
            <li key={label}>
              <a className="relative block w-full h-10 hover:bg-gray-100 transition-colors">
                <Icon className="absolute top-1/2 -translate-y-1/2 left-7 w-6 h-6 text-gray-700" />
                <span className="absolute top-1/2 -translate-y-1/2 left-16 text-gray-800 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* MAIN */}
      <main className="pt-[84px] pb-20 md:pb-10 md:ml-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Disponíveis */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className="p-0 overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-[15px] bg-[#F0F0F0]"
                >
                  <CardContent className="p-3 rounded-[15px] overflow-hidden">
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={800}
                      height={450}
                      className="w-full h-48 sm:h-56 object-cover rounded-[12px] mb-3"
                    />

                    <div className="w-full space-y-2">
                      <h3 className="text-xl font-normal text-black truncate">
                        {card.title}
                      </h3>

                      {/* Categoria + Data */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center justify-center text-white bg-[#21C25E] rounded-full w-40 h-6 font-medium">
                          {card.category}
                        </span>
                        <span className="text-black font-bold text-sm">
                          {card.date}
                        </span>
                      </div>

                      <p className="text-sm text-black font-normal line-clamp-2">
                        {card.description}
                      </p>

                      {/* Botão do 1º card vira Link; demais ficam desabilitados (como antes) */}
                      {index === 0 && card.link ? (
                        <Button
                          asChild
                          className="w-full mt-2 h-12 text-lg rounded-[10px] bg-[#333333] text-white hover:bg-[#222222] transition-colors flex items-center justify-center gap-2"
                        >
                          <Link href={card.link}>
                            Responder
                            <SendHorizontal className="w-6 h-6 fill-current stroke-none text-white" />
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-full mt-2 h-12 text-lg rounded-[10px] bg-gray-300 text-gray-600 cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Responder
                          <SendHorizontal className="w-6 h-6" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Respondidas */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Respondidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/assets/capa_pesquisa_01.png",
                "/assets/capa_pesquisa_02.png",
                "/assets/capa_pesquisa_03.png",
              ].map((img, index) => (
                <Card
                  key={index}
                  className="p-0 overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-[15px] bg-[#F0F0F0]"
                >
                  <CardContent className="p-3 rounded-[15px] overflow-hidden">
                    <Image
                      src={img}
                      alt={`Pesquisa respondida ${index + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-48 sm:h-56 object-cover rounded-[12px] mb-3"
                    />
                    <div className="w-full space-y-2">
                      <h3 className="text-xl font-normal text-black truncate">
                        Pesquisa Respondida
                      </h3>
                      <p className="text-sm text黑">
                        Respondida em 00/00/0000 - 00:00
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Não respondidas dentro do prazo */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Não respondidas dentro do prazo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/assets/capa_pesquisa_01.png",
                "/assets/capa_pesquisa_02.png",
                "/assets/capa_pesquisa_03.png",
              ].map((img, index) => (
                <Card
                  key={index}
                  className="p-0 overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-[15px] bg-[#F0F0F0]"
                >
                  <CardContent className="p-3 rounded-[15px] overflow-hidden">
                    <Image
                      src={img}
                      alt={`Pesquisa expirada ${index + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-48 sm:h-56 object-cover rounded-[12px] mb-3"
                    />
                    <div className="w-full space-y-2">
                      <h3 className="text-xl font-normal text-black truncate">
                        Pesquisa Expirada
                      </h3>
                      <p className="text-sm text-black">
                        Encerrada em 00/00/0000
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
