"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "@/app/styles/partners.module.css";
import { usePartnersStore } from "@/app/store/Partners";

const FALLBACK = ["Partner", "Partner", "Partner", "Partner", "Partner", "Partner"];

export default function PartnersSection() {
  const { partners, fetchPartners } = usePartnersStore();

  useEffect(() => { fetchPartners(); }, []);

  const items = partners.length > 0 ? partners : FALLBACK.map((name) => ({ name }));
  const loopItems = [...items, ...items, ...items];

  return (
    <section className={styles.partnersSection}>
      <div className={styles.track}>
        {loopItems.map((p, i) => (
          <div key={i} className={styles.partner}>
            {p.logo ? (
              <div className={styles.partnerLogo}>
                <Image src={p.logo} alt={p.name} fill sizes="120px" style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <span>{p.name}</span>
            )}
            <span className={styles.separator} aria-hidden="true">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
