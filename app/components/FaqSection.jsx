"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/faq.module.css";
import { useFaqsStore } from "@/app/store/Faqs";
import SectionLabel from "@/app/components/ui/SectionLabel";

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const lines = faq.answer?.split("\n").filter(Boolean) ?? [];
  const isList = lines.length > 1;

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <span className={styles.toggleIcon} aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div className={`${styles.faqAnswerWrap} ${isOpen ? styles.faqAnswerOpen : ""}`}>
        <div className={styles.faqAnswer}>
          {isList ? (
            <ul className={styles.bulletList}>
              {lines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{faq.answer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FaqSkeleton() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <div className={`${styles.skeletonLabel} skeleton`} />
        <div className={`${styles.skeletonHeading} skeleton`} />
      </div>
      <div className={styles.faqList}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.skeletonItem}>
            <div className={`${styles.skeletonQ} skeleton`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FaqSection() {
  const { faqs, loading, fetchFaqs } = useFaqsStore();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  if (loading || faqs.length === 0) return <FaqSkeleton />;

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <SectionLabel text="FAQs" heading="We've Got Answers" center={true} />
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq._id || i}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  );
}