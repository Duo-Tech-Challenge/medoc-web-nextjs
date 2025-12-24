import { Features, Hero, Info, Navbar, SearchSection, StatsSection, CTASection, Footer } from "@/components/organisms";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans relative">
      <Navbar />
      <Hero />
      <Info />
      <Features />
      <SearchSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
