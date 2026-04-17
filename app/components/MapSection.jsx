"use client";

import { useEffect } from "react";
import styles from "@/app/styles/map.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { useContactInfoStore } from "@/app/store/ContactInfo";

export default function MapSection() {
  const { contactInfo, fetchContactInfo } = useContactInfoStore();

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const address = contactInfo?.address;

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