import styles from "@/app/styles/policy.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";

const sections = [
  {
    title: "Our Commitment",
    body: "Olalus Community Healthcare Services is committed to providing high-quality home healthcare services to all individuals without regard to race, color, national origin, age, disability, or sex. We comply with all applicable federal and state civil rights laws and do not discriminate, exclude, or treat people differently because of these characteristics.",
  },
  {
    title: "Federal Civil Rights Laws",
    items: [
      "Title VI of the Civil Rights Act of 1964 — no discrimination based on race, color, or national origin",
      "Section 504 of the Rehabilitation Act of 1973 — no discrimination based on disability in programs receiving federal financial assistance",
      "The Age Discrimination Act of 1975 — no discrimination based on age",
      "Section 1557 of the Affordable Care Act — no discrimination in health programs based on race, color, national origin, sex, age, or disability",
      "The Americans with Disabilities Act (ADA) — equal access for individuals with disabilities",
    ],
  },
  {
    title: "Language Access Services",
    body: "Olalus provides free language assistance services to individuals with limited English proficiency (LEP). You are entitled to receive qualified interpreters (in-person or by telephone) and written translated materials in your preferred language at no cost to you.",
  },
  {
    title: "Accessibility for People with Disabilities",
    items: [
      "Accessible communication formats (large print, audio) upon request",
      "Reasonable accommodations for service delivery in the home setting",
      "Staff trained in disability-aware, person-centered care",
      "Compliance with ADA standards in all client interactions",
    ],
  },
  {
    title: "Pennsylvania State Protections",
    items: [
      "Race, color, religious creed, ancestry, national origin",
      "Sex, gender identity, or sexual orientation",
      "Age (40 and over)",
      "Physical or mental disability",
      "Use of guide or support animals",
      "Familial status",
    ],
    note: "The Pennsylvania Human Relations Act prohibits discrimination on the basis of:",
  },
  {
    title: "How to File a Grievance",
    body: "If you believe that Olalus has discriminated against you, you may file a grievance in writing, verbally, or via email. We will investigate all complaints and respond within 30 days. You may also file a civil rights complaint with the U.S. Department of Health and Human Services, Office for Civil Rights at 1-800-368-1019, or the Pennsylvania Human Relations Commission at 717-787-4410.",
  },
];

export default function NonDiscriminationSection() {
  return (
    <section className={styles.policySection}>
      <div className={styles.header}>
        <SectionLabel
          text="Legal"
          heading="Non-Discrimination Policy"
          center={true}
        />
        <p className={styles.meta}>Effective Date: January 1, 2024</p>
      </div>

      <div className={styles.content}>
        {sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>{i + 1}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
            </div>
            <div className={styles.cardBody}>
              {s.note && <p>{s.note}</p>}
              {s.body && <p>{s.body}</p>}
              {s.items && (
                <ul className={styles.list}>
                  {s.items.map((item, j) => (
                    <li key={j}>
                      <span className={styles.listDot} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        <div className={styles.contactBox}>
          <p className={styles.contactTitle}>Questions or Complaints?</p>
          <p><strong>Olalus Community Healthcare Services — Compliance Officer</strong></p>
          <p>320 Macdade Blvd., Suite 103, Collingdale, PA 19023</p>
          <p>Phone: <a href="tel:6102377199">610-237-7199</a> &nbsp;|&nbsp; Fax: 610-237-3488</p>
          <p>Email: <a href="mailto:olalusnursing@aol.com">olalusnursing@aol.com</a></p>
          <p>Hours: Monday – Friday, 8:30 AM – 4:30 PM</p>
        </div>
      </div>
    </section>
  );
}
