"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; Icon: LucideIcon };

type SidebarProps = {
  items: NavItem[];
  className?: string;
  headerOffsetClass?: string;
};

const normalize = (href: string) => (href === "/" ? "/" : href.replace(/\/+$/, ""));

export default function Sidebar({
  items,
  className = "",
  headerOffsetClass = "pt-20",
}: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    const h = normalize(href);
    return h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(h + "/");
  };

  return (
    <nav
      aria-label="Menu lateral"
      className={[
        "sidebar group fixed left-0 top-0 z-40 hidden md:flex h-screen w-20 hover:w-56 flex-col",
        headerOffsetClass,
        "bg-white border-r transition-all duration-300 ease-out overflow-hidden",
        className,
      ].join(" ")}
    >
      <ul className="w-full space-y-2">
        {items.map(({ label, href, Icon }) => {
          const key = `${normalize(href)}__${label}`;
          const active = isActive(href);

          return (
            <li key={key}>
              <Link
                href={href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={[
                  "sidebar-item relative flex items-center h-10",
                  "pl-7 pr-4",                // 🔒 padding fixo — ícone não se move
                  "transition-all duration-200",
                  "cursor-pointer",
                ].join(" ")}
              >
                {/* faixa cinza: só com sidebar aberta + item hover (regras no CSS global) */}
                <span aria-hidden="true" className="hover-bg absolute inset-y-0 left-0 bg-gray-100" />

                {/* Ícone preto sempre — fica fixo por causa do pl-7 constante */}
                <Icon className="relative z-10 w-6 h-6 text-black flex-shrink-0" />

                {/* Texto preto — não ocupa espaço quando fechado; aparece quando a sidebar abre */}
                <span
                  className={[
                    "relative z-10 ml-4 text-black font-medium whitespace-nowrap overflow-hidden",
                    // fechado: escondido e sem largura
                    "max-w-0 opacity-0",
                    // aberto (hover na sidebar): revela e ganha largura
                    "group-hover:max-w-[180px] group-hover:opacity-100",
                    "transition-all duration-200",
                  ].join(" ")}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
