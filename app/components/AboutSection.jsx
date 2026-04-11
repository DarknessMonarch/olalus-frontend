"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/about.module.css";
import { FaHeartCircleCheck as CheckIcon } from "react-icons/fa6";
import { FaUser as AccountIcon } from "react-icons/fa";
import { FiBriefcase as ExperienceIcon } from "react-icons/fi";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { useAboutStore } from "@/app/store/About";
import { useContactStore } from "@/app/store/Contact";

function AboutSkeleton() {
  return (
    <>
      <section className={styles.aboutContent}>
        <div className={styles.aboutLeft}>
          <div className={`${styles.skeletonFill} skeleton`} />
          <div className={`${styles.card} ${styles.cardTop} skeleton`} />
          <div className={`${styles.card} ${styles.cardBottom} skeleton`} />
        </div>
        <div className={styles.aboutRight}>
          <div className={`${styles.skeletonLabel} skeleton`} />
          <div className={`${styles.skeletonHeading} skeleton`} />
          <div className={styles.checkList}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`${styles.skeletonCheck} skeleton`} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aboutMission}>
        <div className={styles.aboutMissionInner}>
          {[0, 1].map((ri) => (
            <div key={ri} className={styles.aboutRow}>
              <div className={styles.aboutImage}>
                <div className={`${styles.skeletonFill} skeleton`} />
              </div>
              <div className={styles.aboutMissionCard}>
                <div className={styles.aboutMissionCardHeader}>
                  <div className={`${styles.skeletonLabel} skeleton`} />
                  <div className={`${styles.skeletonHeading} skeleton`} />
                </div>
                <div className={styles.aboutMissionCardInner}>
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className={`${styles.skeletonLine} skeleton`} />
                  ))}
                  <div className={`${styles.skeletonLineShort} skeleton`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function AboutSection() {
  const { about, fetchAbout } = useAboutStore();
  const { submit } = useContactStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => { fetchAbout(); }, [fetchAbout]);

  if (!about) return <AboutSkeleton />;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    const data = await submit(form);
    if (data.success) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error(data.message || "Failed to send message");
    }
  };

  return (
    <>
      <section className={styles.aboutContent}>
        <div className={styles.aboutLeft}>
          <AppImage
            src={about.overviewImage}
            alt="Our team"
            sizes="(min-width: 48em) 40vw, 100vw"
          />
          <div className={`${styles.card} ${styles.cardTop}`}>
            <div className={styles.cardStat}>
              <h1>{about.statsCareTakers}</h1>
              <span>Care Takers</span>
            </div>
            <div className={styles.cardicon}><AccountIcon /></div>
          </div>
          <div className={`${styles.card} ${styles.cardBottom}`}>
            <div className={styles.cardStat}>
              <h1>{about.statsYears}</h1>
              <span>Years of Experience</span>
            </div>
            <div className={styles.cardicon}><ExperienceIcon /></div>
          </div>
        </div>

        <div className={styles.aboutRight}>
          <SectionLabel text="About us" heading={about.aboutHeading} />
          <p>{about.introParagraph}</p>
          <div className={styles.checkList}>
            {about.checkItems?.map((item, i) => (
              <div key={i} className={styles.checkItem}>
                <CheckIcon className={styles.checkIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aboutMission}>
        <div className={styles.aboutMissionInner}>
          <div className={styles.aboutRow}>
            <div className={styles.aboutImage}>
              <AppImage src={about.missionImage} alt="Mission" sizes="(min-width: 48em) 40vw, 100vw" />
            </div>
            <div className={styles.aboutMissionCard}>
              <div className={styles.aboutMissionCardHeader}>
                <SectionLabel text="Our Mission" heading={about.missionHeading} />
              </div>
              <div className={styles.aboutMissionCardInner}>
                {about.missionParagraphs?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
          <div className={styles.aboutRow}>
            <div className={styles.aboutMissionCard}>
              <div className={styles.aboutMissionCardHeader}>
                <SectionLabel text="Our aim" heading={about.visionHeading} />
              </div>
              <div className={styles.aboutMissionCardInner}>
                {about.visionBullets?.map((b, i) => (
                  <li key={i}><CheckIcon className={styles.checkIcon} />{b}</li>
                ))}
              </div>
            </div>
            <div className={styles.aboutImage}>
              <AppImage src={about.visionImage} alt="Vision" sizes="(min-width: 48em) 40vw, 100vw" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
