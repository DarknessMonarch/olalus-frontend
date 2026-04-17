"use client";

import styles from "@/app/styles/map.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";

export default function MapSection({ branches }) {
  const address = branches?.[0]?.address;

  if (!address) return null;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&iwloc=&z=14`;

  return (
    <div className={styles.mapSection}>
      <div className={styles.mapHeader}>
        <SectionLabel text="Find Us" heading="Our Location" center={true} />
      </div>
      <div className={styles.mapFrame}>
        <iframe
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Olalus Location Map"
          allowFullScreen
        />
      </div>
    </div>
  );
}