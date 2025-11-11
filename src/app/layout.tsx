import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import ClientLayoutShell from "@/components/cliente-layout-shell/cliente-layout-shell";

export const metadata: Metadata = {
  title: "PICPAY - Pesquisa",
  icons: { icon: "/assets/logo_picpay.png" },
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <Header />
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
