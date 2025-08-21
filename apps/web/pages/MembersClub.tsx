import { Header } from "../components/Members/Header";
import { HeroSection } from "../components/Members/HeroSection";
import { BenefitsSection } from "../components/Members/BenefitsSection";
import { PropertiesSection } from "../components/Members/PropertiesSection";
import { ProcessSection } from "../components/Members/ProcessSection";
import { ContactSection } from "../components/Members/ContactSection";
import { Footer } from "../components/Members/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <PropertiesSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
