"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "@/app/styles/partners.module.css";
import { usePartnersStore } from "@/app/store/Partners";

export default function PartnersSection() {
  const { partners, fetchPartners } = usePartnersStore();

  useEffect(() => { fetchPartners(); }, [fetchPartners]);

  if (!partners) {
    return (
      <section className={styles.partnersSection}>
        <div className={styles.skeletonTrack}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`${styles.skeletonPill} skeleton`} />
          ))}
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  const loopItems = [...partners, ...partners, ...partners];

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