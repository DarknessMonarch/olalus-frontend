
"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "@/app/styles/partners.module.css";
import { usePartnersStore } from "@/app/store/Partners";

function SkeletonTrack() {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.skeletonTrack}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
          <div key={i} className={`${styles.skeletonPill} skeleton`} />
        ))}
      </div>
    </section>
  );
}

export default function PartnersSection() {
  const { partners, loading, fetchPartners } = usePartnersStore();

  useEffect(() => { fetchPartners(); }, [fetchPartners]);

  // Loading or no data — always show skeleton
  if (loading || partners.length === 0) return <SkeletonTrack />;

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