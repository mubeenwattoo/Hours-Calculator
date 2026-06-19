import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Benefits } from "@/components/sections/Benefits";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { CTA } from "@/components/sections/CTA";
import { Examples } from "@/components/sections/Examples";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedTools } from "@/components/sections/RelatedTools";
import { SeoContent } from "@/components/sections/SeoContent";
import { FAQ_ITEMS, SITE_NAME, SITE_URL } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Free online hours calculator for work hours, overtime, and break time tracking.",
      inLanguage: "en-US",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Hours Calculator",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Calculate work hours, overtime, and break time instantly with this free online hours calculator.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <CalculatorSection />
        <Benefits />
        <HowItWorks />
        <Examples />
        <Features />
        <FAQ />
        <SeoContent />
        <RelatedTools />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
