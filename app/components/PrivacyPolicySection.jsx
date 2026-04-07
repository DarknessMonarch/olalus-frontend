import styles from "@/app/styles/policy.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";

const sections = [
  {
    title: "Introduction",
    body: "Olalus Community Healthcare Services is committed to protecting the privacy and confidentiality of your personal and health information. As a licensed Pennsylvania Home Care Agency, we comply fully with HIPAA, the HITECH Act, and all applicable Pennsylvania state privacy laws.",
  },
  {
    title: "Information We Collect",
    items: [
      "Personal identification details — name, date of birth, address, phone number, email",
      "Health and medical information necessary to provide care services",
      "Insurance information including Medicare, Medicaid, and private insurance details",
      "Emergency contact information",
      "Employment-related information for prospective and current staff",
      "Website usage data collected via cookies or analytics tools",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "Provide, coordinate, and manage home healthcare services",
      "Process insurance claims and billing",
      "Communicate with your physicians, specialists, and care team",
      "Comply with legal, regulatory, and accreditation requirements",
      "Improve the quality and safety of our services",
      "Send appointment reminders and service-related communications",
    ],
  },
  {
    title: "Disclosure of Your Information",
    body: "We do not sell, rent, or trade your personal or health information. We may share your information only with healthcare providers directly involved in your care, insurance payers for billing, government agencies as required by law, or with your written authorization.",
  },
  {
    title: "Your Rights Under HIPAA",
    items: [
      "Access and obtain a copy of your health information",
      "Request corrections to inaccurate or incomplete records",
      "Request restrictions on how we use or share your information",
      "Receive an accounting of disclosures of your health information",
      "File a complaint if you believe your privacy rights have been violated",
    ],
  },
  {
    title: "Data Security",
    body: "We implement appropriate administrative, physical, and technical safeguards to protect your information from unauthorized access, alteration, disclosure, or destruction. Electronic health records are stored on secure, encrypted systems with role-based access controls.",
  },
  {
    title: "Website & Cookies",
    body: "Our website may use cookies and analytics tools (including Google Analytics) to improve user experience and understand site traffic. You may disable cookies through your browser settings; however, some features of the site may not function properly.",
  },
  {
    title: "Changes to This Policy",
    body: "We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes are posted constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPolicySection() {
  return (
    <section className={styles.policySection}>
      <div className={styles.header}>
        <SectionLabel
          text="Legal"
          heading="Privacy Policy"
          center={true}
        />
        <p className={styles.meta}>Last updated: January 1, 2024</p>
      </div>

      <div className={styles.content}>
        {sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>{i + 1}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
            </div>
            <div className={styles.cardBody}>
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
          <p className={styles.contactTitle}>Questions about this Policy?</p>
          <p><strong>Olalus Community Healthcare Services</strong></p>
          <p>320 Macdade Blvd., Suite 103, Collingdale, PA 19023</p>
          <p>Phone: <a href="tel:6102377199">610-237-7199</a> &nbsp;|&nbsp; Fax: 610-237-3488</p>
          <p>Email: <a href="mailto:olalusnursing@aol.com">olalusnursing@aol.com</a></p>
          <p>Hours: Monday – Friday, 8:30 AM – 4:30 PM</p>
        </div>
      </div>
    </section>
  );
}
