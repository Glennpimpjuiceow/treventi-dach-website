import AboutTreventi from "@/components/AboutTreventi";
import BespokeSketch from "@/components/BespokeSketch";
import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import IntroGate from "@/components/IntroGate";
import Messebau from "@/components/Messebau";
import TrustBar from "@/components/TrustBar";
import WerkstattVideo from "@/components/WerkstattVideo";

export default function Home() {
  return (
    <IntroGate>
      <main>
        <Hero />
        <TrustBar />
        <AboutTreventi />
        <WerkstattVideo />
        <Messebau />
        <Collection />
        <BespokeSketch />
      </main>
    </IntroGate>
  );
}
