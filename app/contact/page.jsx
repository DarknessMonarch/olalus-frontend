import ContactSection from "@/app/components/ContactSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import FaqSection from "@/app/components/FaqSection";
import SubscribeSection from "@/app/components/SubscribeSection";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Olalus Community Healthcare Services. We're here to help with any questions or concerns.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <TestimonialsSection />
      <FaqSection />
      <SubscribeSection />
    </>
  );
}
