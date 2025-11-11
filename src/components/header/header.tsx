"use client";
import Image from "next/image";

type HeaderProps = {
  title?: string;
  logoSrc?: string;
  rightSlot?: React.ReactNode;
};

export default function Header({
  title = "Pesquisa",
  logoSrc = "/assets/logo_picpay.png",
  rightSlot,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 h-16 px-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <Image src={logoSrc} alt="Logo PicPay" width={32} height={32} />
        <h1 className="text-3xl font-bold text-[#21C25E]">{title}</h1>
      </div>
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </header>
  );
}
