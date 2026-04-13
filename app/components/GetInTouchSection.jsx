"use client";

import { useEffect } from "react";
import styles from "@/app/styles/getInTouch.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { IoCallSharp as PhoneIcon } from "react-icons/io5";
import { MdLocationOn as LocationIcon, MdEmail as EmailIcon } from "react-icons/md";
import { FiClock as ClockIcon } from "react-icons/fi";
import { FaQuoteLeft as QuoteIcon } from "react-icons/fa";
import { useContactInfoStore } from "@/app/store/ContactInfo";

export default function GetInTouchSection() {
  const { contactInfo, loading, fetchContactInfo } = useContactInfoStore();

  useEffect(() => { fetchContactInfo(); }, [fetchContactInfo]);

  const cards = [
    {
      icon: PhoneIcon,
      label: "Emergency",
      lines: loading || !contactInfo
        ? null
        : [contactInfo.phone, contactInfo.fax].filter(Boolean),
    },
    {
      icon: LocationIcon,
      label: "Location",
      lines: loading || !contactInfo ? null : [contactInfo.address].filter(Boolean),
    },
    {
      icon: EmailIcon,
      label: "Email",
      lines: loading || !contactInfo ? null : [contactInfo.email].filter(Boolean),
    },
    {
      icon: ClockIcon,
      label: "Working Hours",
      lines: loading || !contactInfo
        ? null
        : [[contactInfo.workingDays, contactInfo.workingHours].filter(Boolean).join(" ")].filter(Boolean),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionLabel text="Get In Touch" heading="Reach Out To Us" center={true} />
        </div>

        <div className={styles.cardsRow}>
          {cards.map(({ icon: Icon, label, lines }) => (
            <div key={label} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon className={styles.icon} />
              </div>
              <span className={styles.cardLabel}>{label}</span>
              <div className={styles.cardLines}>
                {lines === null
                  ? <span className={`${styles.skeletonLine} skeletonGold`} />
                  : lines.map((line, i) => <span key={i}>{line}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quoteSection}>
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteContent}>
          <QuoteIcon className={styles.quoteIcon} />
          <p className={styles.quoteText}>
            Too often we underestimate the power of a touch, a smile, a kind word,
            a listening ear, an honest compliment, or the smallest act of caring.
          </p>
          <div className={styles.quoteDivider} />
          <span className={styles.quoteAuthor}>Leo Buscaglia</span>
        </div>
      </div>
    </section>
  );
}
