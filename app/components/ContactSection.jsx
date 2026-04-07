"use client";

import { useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/contact.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { MdEmail as EmailIcon, MdLocationOn as LocationIcon } from "react-icons/md";
import { IoCallSharp as PhoneIcon } from "react-icons/io5";
import { FiClock as ClockIcon } from "react-icons/fi";
import { FaStar as StarIcon } from "react-icons/fa";

const RELATIONSHIP_OPTIONS = [
  "Client", "Family Member", "Client's Child", "Client's Spouse",
  "Healthcare Professional", "Community Member", "Other",
];

const INFO_CARDS = [
  {
    icon: PhoneIcon,
    label: "Emergency",
    lines: ["610-237-7199", "610-237-3488"],
  },
  {
    icon: LocationIcon,
    label: "Location",
    lines: ["320 Macdade Blvd., Suite 103", "Collingdale, PA 19023"],
  },
  {
    icon: EmailIcon,
    label: "Email",
    lines: ["olalusnursing@aol.com"],
  },
  {
    icon: ClockIcon,
    label: "Working Hours",
    lines: ["Mon-Fri 8:30am - 4:30pm"],
  },
];

export default function ContactSection() {
  const [tab, setTab] = useState("contact");

  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const [reviewForm, setReviewForm] = useState({ name: "", email: "", rating: 0, relationship: "", comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hovered, setHovered] = useState(0);

  const handleContactChange = (e) => setContactForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleReviewChange = (e) => setReviewForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setContactLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! We'll get back to you shortly.");
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.rating || !reviewForm.comment) {
      toast.error("Please fill in your name, rating, and comment");
      return;
    }
    setReviewLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      if (data.success) {
        setReviewSubmitted(true);
      } else {
        toast.error(data.message || "Failed to submit. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactHeader}>
        <SectionLabel
          text={tab === "contact" ? "Get In Touch" : "Share Your Experience"}
          heading={tab === "contact" ? "Reach to us for Inquiry" : "Leave a Review"}
          center={true}
        />
      </div>

      <div className={styles.tabRow}>
        <button
          className={`${styles.tabBtn} ${tab === "contact" ? styles.tabActive : ""}`}
          onClick={() => setTab("contact")}
        >
          Contact Us
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "review" ? styles.tabActive : ""}`}
          onClick={() => setTab("review")}
        >
          Leave a Review
        </button>
      </div>

      <div className={styles.contactBody}>
        {tab === "contact" ? (
          <form className={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className={styles.formRow}>
              <input type="text" name="name" placeholder="Your Name *" value={contactForm.name} onChange={handleContactChange} required />
              <input type="email" name="email" placeholder="Email Address *" value={contactForm.email} onChange={handleContactChange} required />
            </div>
            <input type="text" name="subject" placeholder="Subject" value={contactForm.subject} onChange={handleContactChange} />
            <textarea name="message" placeholder="Your Message *" value={contactForm.message} onChange={handleContactChange} rows={6} required />
            <button type="submit" className={styles.submitBtn} disabled={contactLoading}>
              {contactLoading ? "Sending..." : "Submit"}
            </button>
          </form>
        ) : reviewSubmitted ? (
          <div className={styles.reviewSuccess}>
            <h4>Thank you for your review!</h4>
            <p>Your comment has been submitted and is under review. It will be published once approved by our team.</p>
          </div>
        ) : (
          <form className={styles.contactForm} onSubmit={handleReviewSubmit}>
            <p className={styles.reviewNote}>Comments are reviewed before publishing. Approved comments appear on our testimonials section.</p>
            <div className={styles.formRow}>
              <input type="text" name="name" placeholder="Your Name *" value={reviewForm.name} onChange={handleReviewChange} required />
              <input type="email" name="email" placeholder="Email (optional)" value={reviewForm.email} onChange={handleReviewChange} />
            </div>
            <div className={styles.formRow}>
              <select name="relationship" value={reviewForm.relationship} onChange={handleReviewChange} className={styles.selectInput}>
                <option value="">Relationship to Client...</option>
                {RELATIONSHIP_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className={styles.ratingField}>
                <span className={styles.ratingLabel}>Your Rating *</span>
                <div className={styles.ratingPicker}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starBtn} ${star <= (hovered || reviewForm.rating) ? styles.starActive : ""}`}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setReviewForm((p) => ({ ...p, rating: star }))}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <StarIcon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <textarea name="comment" placeholder="Tell us about your experience... *" value={reviewForm.comment} onChange={handleReviewChange} rows={6} required />
            <button type="submit" className={styles.submitBtn} disabled={reviewLoading}>
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        <div className={styles.contactInfo}>
          {INFO_CARDS.map(({ icon: Icon, label, lines }) => (
            <div key={label} className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <Icon className={styles.infoIcon} />
              </div>
              <div className={styles.infoText}>
                <span>{label}</span>
                {lines.map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
