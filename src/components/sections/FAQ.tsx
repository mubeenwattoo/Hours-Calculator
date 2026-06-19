import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding"
      aria-labelledby="faq-heading"
    >
      <SiteContainer narrow>
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about calculating work hours, overtime, and break time."
        />

        <Accordion items={FAQ_ITEMS} />
      </SiteContainer>
    </section>
  );
}
