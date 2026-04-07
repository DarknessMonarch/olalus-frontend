"use client";

import { useEffect } from "react";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/testimonials.module.css";
import { FaStar as StarIcon } from "react-icons/fa";
import { useTestimonialsStore } from "@/app/store/Testimonials";
import { useCommentsStore } from "@/app/store/Comments";

const DEFAULT_TESTIMONIALS = [
  { _id: "1", name: "Lauren Willis", content: "Olalus has been an absolute blessing for our family. The caregivers are professional, compassionate, and truly dedicated to my mother's wellbeing. We couldn't ask for better care.", rating: 5, position: "Family Member" },
  { _id: "2", name: "James Carter", content: "Outstanding service from start to finish. The team at Olalus went above and beyond to ensure my father received the best possible care in the comfort of his own home.", rating: 5, position: "Client's Son" },
  { _id: "3", name: "Maria Thompson", content: "I am so grateful for the Olalus team. They treated my grandmother with the utmost respect and dignity. Their dedication to quality care truly sets them apart.", rating: 5, position: "Client's Granddaughter" },
  { _id: "4", name: "Robert Johnson", content: "The nurses and aides from Olalus have been exceptional. They are punctual, caring, and always go the extra mile. Our family has peace of mind knowing dad is in good hands.", rating: 5, position: "Client's Son" },
  { _id: "5", name: "Sandra Williams", content: "From our very first consultation, Olalus demonstrated professionalism and genuine care. The personalised care plan they developed for my mother has made a world of difference.", rating: 5, position: "Family Member" },
  { _id: "6", name: "David Chen", content: "Highly recommend Olalus to anyone seeking quality home care. Their staff is well-trained, compassionate, and always available when needed. Truly exceptional service.", rating: 5, position: "Client's Nephew" },
];

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
  }, []);

  const all = [...approvedComments, ...testimonials];
  const source = all.length >= 3 ? all : DEFAULT_TESTIMONIALS;
  const row1 = [...source, ...source, ...source];
  const row2 = [...source, ...source, ...source];

  if (loading && all.length === 0) {
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
