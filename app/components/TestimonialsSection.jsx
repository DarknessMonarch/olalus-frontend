"use client";

import { useEffect } from "react";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/testimonials.module.css";
import { FaStar as StarIcon } from "react-icons/fa";
import { useTestimonialsStore } from "@/app/store/Testimonials";
import { useCommentsStore } from "@/app/store/Comments";


function TestimonialCard({ t }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.quoteIcon}>&ldquo;</div>
      <p>{t.content}</p>
      <div className={styles.reviewer}>
        {t.image ? (
          <div className={styles.reviewerImage}>
            <AppImage src={t.image} alt={t.name} sizes="40px" />
          </div>
        ) : (
          <div className={styles.reviewerInitial}>
            {t.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles.reviewerInfo}>
          <strong>{t.name}</strong>
          {t.position && <span>{t.position}</span>}
        </div>
        <div className={styles.stars}>
          {[...Array(t.rating || 5)].map((_, j) => (
            <StarIcon key={j} className={styles.starIcon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { testimonials, loading, fetchTestimonials } = useTestimonialsStore();
  const { approvedComments, fetchApprovedComments } = useCommentsStore();

  useEffect(() => {
    fetchTestimonials();
    fetchApprovedComments();
  }, [fetchApprovedComments, fetchTestimonials]);

  const all = [...approvedComments, ...testimonials];
  const row1 = [...all, ...all, ...all];
  const row2 = [...all, ...all, ...all];

  if (all.length === 0) {
    return (
      <section className={styles.testimonialsSection}>
        <div className={styles.header}>
          <div className={`${styles.skeletonLabel} skeleton`} />
          <div className={`${styles.skeletonHeading} skeleton`} />
        </div>
        <div className={styles.skeletonRow}>
          {[1, 2, 3].map((i) => <div key={i} className={`${styles.skeletonCard} skeleton`} />)}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.header}>
        <SectionLabel text="Testimonials" heading="What Our Patients Say" center={true} />
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.trackLeft}>
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
        <div className={styles.trackRight}>
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
