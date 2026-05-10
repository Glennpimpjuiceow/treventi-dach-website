import Hero from "@/components/Hero";
import IntroGate from "@/components/IntroGate";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <IntroGate>
      <main>
        <Hero />
        <TrustBar />
      </main>
    </IntroGate>
  );
}
