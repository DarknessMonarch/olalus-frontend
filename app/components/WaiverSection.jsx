"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/waiver.module.css";
import { useWaiversStore } from "@/app/store/Waivers";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { FaStethoscope as StethoscopeIcon } from "react-icons/fa";

function WaiverSkeleton() {
  return (
    <section className={styles.waiverSection}>
      <div className={styles.skeletonHeader}>
        <div className={`${styles.skeletonLabel} skeleton`} />
        <div className={`${styles.skeletonHeading} skeleton`} />
      </div>
      <div className={`${styles.skeletonPara} skeleton`} />
      <div className={styles.tabContainer}>
        <div className={styles.tabRow}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${styles.skeletonTab} skeleton`} />
          ))}
        </div>
        <div className={`${styles.skeletonPanel} skeleton`} />
      </div>
    </section>
  );
}

export default function WaiverSection() {
  const { waiverSection, loading, fetchWaivers } = useWaiversStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { fetchWaivers(); }, []);

  if (loading || !waiverSection || !waiverSection.programs?.length) return <WaiverSkeleton />;

  const { heading, description, programs } = waiverSection;
  const activeProgram = programs[activeIndex];

  return (
    <section className={styles.waiverSection}>
      <SectionLabel text="Waiver" heading={heading} center={true} />
      <p>{description}</p>

      <div className={styles.tabContainer}>
        <div className={styles.tabRow}>
          {programs.map((program, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <StethoscopeIcon className={styles.tabIcon} />
              <span>{program.title}</span>
            </button>
          ))}
        </div>
        <div className={styles.descPanel}>
          <p>{activeProgram?.description}</p>
        </div>
      </div>
    </section>
  );
}
