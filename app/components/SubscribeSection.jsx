"use client";

import { useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/subscribe.module.css";
import { useNewsletterStore } from "@/app/store/Newsletter";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useNewsletterStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    const res = await subscribe(email.trim());
    if (res.success) {
      toast.success("Subscribed! Check your inbox for a confirmation email.");
      setEmail("");
    } else if (res.message?.toLowerCase().includes("already")) {
      toast.info("This email is already subscribed.");
    } else {
      toast.error(res.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className={styles.subscribeSection}>
      <div className={styles.subscribeInner}>

        <div className={styles.subscribeLeft}>
          <span className={styles.subscribeLabel}>Our Newsletter</span>
          <h2 className={styles.subscribeHeading}>
            Subscribe To Get<br />More Updates
          </h2>
        </div>

        <form className={styles.subscribeForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.subscribeInput}
            required
          />
          <button type="submit" className={styles.subscribeBtn} disabled={loading}>
            {loading ? "..." : "Subscribe"}
          </button>
        </form>

      </div>
    </section>
  );
}
