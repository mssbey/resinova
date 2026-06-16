import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import CategorySection from "@/components/home/category-section";
import FeaturesSection from "@/components/home/features-section";
import ProductionSection from "@/components/home/production-section";
import FeaturedProducts from "@/components/home/featured-products";
import AcademySection from "@/components/home/academy-section";
import ReferencesSection from "@/components/home/references-section";
import WholesaleCTA from "@/components/home/wholesale-cta";
import CalculatorSection from "@/components/home/calculator-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturesSection />
        <CalculatorSection />
        <ProductionSection />
        <FeaturedProducts />
        <AcademySection />
        <ReferencesSection />
        <WholesaleCTA />
      </main>
      <Footer />
    </>
  );
}
