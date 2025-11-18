"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import { House, FolderGit, FileUp, FileSliders } from "lucide-react";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // define os ícones aqui dentro (lado client)
  const navItems = [
    { label: "Home", href: "/", Icon: House },
    { label: "Categoria", href: "/categorias", Icon: FolderGit },
    { label: "Pesquisa", href: "/pesquisas-admin/config-00", Icon: FileUp },
    { label: "Relatório", href: "/relatorios", Icon: FileSliders },
  ];

  const hideSidebarRoutes = ["/login", "/auth/callback", "/onboarding"];
  const hideSidebar = hideSidebarRoutes.includes(pathname);

  const dedup = <T, K extends string | number>(arr: T[], key: (x: T) => K) =>
    Array.from(new Map(arr.map((x) => [key(x), x])).values());

  const nav = dedup(navItems, (i) => `${i.href}__${i.label}`);

  return (
    <div className="min-h-screen bg-white">
      {!hideSidebar && <Sidebar items={nav} />}
      <div
        className={["pt-[84px]", hideSidebar ? "" : "md:ml-20", "px-4"].join(
          " "
        )}
      >
        {children}
      </div>
    </div>
  );
}
