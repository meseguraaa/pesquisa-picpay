import * as React from "react";
import { cn } from "@/lib/utils";
import { JSX } from "react";

type Size = "sm" | "md" | "lg" | "xl"; // escolha por página, se precisar

const sizeToMax = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
} as const;

type Props = React.PropsWithChildren<{
  className?: string;
  /** largura do container (default: lg => max-w-5xl) */
  size?: Size;
  /** remove o padding horizontal padrão (px-4) — use só em casos especiais */
  noGutter?: boolean;
  /** troca a tag HTML se quiser (default: main) */
  as?: keyof JSX.IntrinsicElements;
}>;

export function PageMain({
  children,
  className,
  size = "lg",
  noGutter = false,
  as: Tag = "main",
}: Props) {
  return (
    <Tag className={cn(noGutter ? "" : "px-4", className)}>
      <div className={cn(sizeToMax[size], "mx-auto")}>{children}</div>
    </Tag>
  );
}
