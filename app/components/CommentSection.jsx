"use client";

import { useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/comments.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { FaStar as StarIcon } from "react-icons/fa";

const RELATIONSHIP_OPTIONS = [
  "Client",
  "Family Member",
  "Client's Child",
  "Client's Spouse",
  "Healthcare Professional",
  "Community Member",
  "Other",
];

export default function CommentSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    relationship: "",
    comment: "",
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.comment) {
      toast.error("Please fill in your name, rating, and comment");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error(data.message || "Failed to submit. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.commentsSection}>
      <div className={styles.sectionHeader}>
        <SectionLabel text="Share Your Experience" heading="Leave a Review" />
      </div>

      <div className={styles.formCard}>
        {submitted ? (
          <div className={styles.successMsg}>
            <h4>Thank you for your review!</h4>
            <p>Your comment has been submitted and is under review. It will be published once approved by our team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Share Your Experience</h3>
            <p className={styles.note}>Comments are reviewed before publishing. Approved comments appear on our testimonials section.</p>

            <div className={styles.formRow}>
              <div className={styles.formField} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Your Name <span className={styles.required}>*</span></label>
                <input className={styles.textInput} name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
              </div>
              <div className={styles.formField} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Email (optional)</label>
                <input className={styles.textInput} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Relationship to Client</label>
                <select className={styles.textInput} name="relationship" value={form.relationship} onChange={handleChange}>
                  <option value="">Select relationship...</option>
                  {RELATIONSHIP_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Rating <span className={styles.required}>*</span></label>
                <div className={styles.ratingPicker}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starBtn} ${star <= (hovered || form.rating) ? styles.active : ""}`}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setForm((p) => ({ ...p, rating: star }))}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <StarIcon />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Your Comment <span className={styles.required}>*</span></label>
              <textarea
                className={`${styles.textInput} ${styles.textarea}`}
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us about your experience with Olalus Community Healthcare Services..."
                rows={4}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
