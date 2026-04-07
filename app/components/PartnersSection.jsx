"use client";

import { useEffect } from "react";
import styles from "@/app/styles/partners.module.css";
import { usePartnersStore } from "@/app/store/Partners";

export default function PartnersSection() {
  const { partners, fetchPartners } = usePartnersStore();

  useEffect(() => { fetchPartners(); }, []);

  const displayNames = partners.length > 0
    ? partners.map((p) => p.name)
    : ["Branch", "Branch", "BRANCH", "Branch", "BRANCH", "Branch", "Branch"];

  const loopItems = [...displayNames, ...displayNames, ...displayNames];

  return (
    <section className={styles.partnersSection}>
      <div className={styles.track}>
        {loopItems.map((name, i) => (
          <div key={i} className={styles.partner}>
            <span>{name}</span>
            <span className={styles.separator} aria-hidden="true">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
