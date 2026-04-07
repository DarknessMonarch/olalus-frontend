"use client";

import { useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/subscribe.module.css";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Subscribed! Thank you for staying connected.");
    setEmail("");
    setLoading(false);
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
