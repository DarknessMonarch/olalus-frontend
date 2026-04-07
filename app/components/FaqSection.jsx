"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/app/styles/faq.module.css";
import { useFaqsStore } from "@/app/store/Faqs";
import SectionLabel from "@/app/components/ui/SectionLabel";

const DEFAULT_FAQS = [
  {
    _id: "1",
    question: "Which Insurance Do You Accept?",
    answer:
      "Medicare\nPersonal Funds or Private Pay\nWorker's Compensation\nVA / Veterans Aid\nSelected Private Insurances (please call to verify)",
  },
  {
    _id: "2",
    question: "Do You Cover Emergency Situations?",
    answer:
      "Yes, we have emergency protocols in place to handle urgent care situations. Our staff is trained to respond quickly and appropriately to any emergency that may arise during home care.",
  },
  {
    _id: "3",
    question: "Are You Also In Charge Of Getting The Medications Needed?",
    answer:
      "Medication management is provided by our licensed nurses. Any changes to medication must be coordinated with the client's physician. Our nurses ensure all medications are administered safely and correctly.",
  },
  {
    _id: "4",
    question: "What Areas Do You Serve?",
    answer:
      "We serve clients across multiple Pennsylvania counties. Please contact us with your location to confirm service availability in your area.",
  },
  {
    _id: "5",
    question: "How Do I Get Started With Your Services?",
    answer:
      "Getting started is simple. Contact our office to schedule a free consultation\nWe will assess your care needs and create a personalised care plan\nA dedicated caregiver will be assigned based on your requirements\nCare services begin at your preferred start date",
  },
];

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const bodyRef = useRef(null);
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

      <div
        className={styles.faqAnswerWrap}
        style={{ maxHeight: isOpen ? bodyRef.current?.scrollHeight + "px" : "0px" }}
      >
        <div ref={bodyRef} className={styles.faqAnswer}>
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

export default function FaqSection() {
  const { faqs, loading, fetchFaqs } = useFaqsStore();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => { fetchFaqs(); }, []);

  const displayFaqs = faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  if (loading && faqs.length === 0) {
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

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <SectionLabel text="FAQs" heading="We've Got Answers" center={true} />
      </div>

      <div className={styles.faqList}>
        {displayFaqs.map((faq, i) => (
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
