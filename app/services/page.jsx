import ServicesSection from "@/app/components/ServicesSection";
import WaiverSection from "@/app/components/WaiverSection";

export const metadata = {
  title: "Our Services",
  description: "Explore the full range of home healthcare services offered by Olalus Community Healthcare Services.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection />
      <WaiverSection />
    </>
  );
}
