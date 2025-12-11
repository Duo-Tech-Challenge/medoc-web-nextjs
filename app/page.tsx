import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans relative">
      <Navbar />
      <Hero />
      <Info />
      <Features />
    </div>
  );
}
