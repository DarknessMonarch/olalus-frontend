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

const CHECK_ITEMS = [
  "Residential care and community support tailored to individual needs",
  "Nursing and respite care for families in need",
  "Household assistance and community participation programs",
  "All services delivered by trained, certified professionals",
];

const DEFAULT_MISSION_PARAGRAPHS = [
  "Olalus Community Health Care Services is dedicated to providing the highest quality, client-centered, cost-effective home and community care solutions that promote independent living that enhance client's quality of life in the comfort and safety of their own homes.",
];

const DEFAULT_VISION_BULLETS = [
  "To be known and valued for providing the highest standard of in-home and community health care services.",
  "To be the provider of choice in the community.",
  "To be known as a business and company that embraces people with disabilities as equal partners and valued citizens.",
];

export default function AboutSection() {
  const { about, fetchAbout } = useAboutStore();
  const { submit, loading: submitting } = useContactStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  const missionHeading = about?.missionHeading || "Who we are";
  const missionParagraphs = about?.missionParagraphs?.length
    ? about.missionParagraphs
    : DEFAULT_MISSION_PARAGRAPHS;
  const missionImage =
    about?.missionImage ||
    "https://images.pexels.com/photos/5327654/pexels-photo-5327654.jpeg";

  const visionHeading = about?.visionHeading || "Our Vision";
  const visionBullets = about?.visionBullets?.length
    ? about.visionBullets
    : DEFAULT_VISION_BULLETS;
  const visionImage =
    about?.visionImage ||
    "https://images.pexels.com/photos/7446987/pexels-photo-7446987.jpeg";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
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
            src={visionImage}
            alt="Our team"
            sizes="(min-width: 48em) 40vw, 100vw"
          />

          <div className={`${styles.card} ${styles.cardTop}`}>
            <div className={styles.cardStat}>
              <h1>300 +</h1>
              <span>Care Takers</span>
            </div>
            <div className={styles.cardicon}>
              <AccountIcon />
            </div>
          </div>
          <div className={`${styles.card} ${styles.cardBottom}`}>
            <div className={styles.cardStat}>
              <h1>11 +</h1>
              <span>Years of Experience</span>
            </div>
            <div className={styles.cardicon}>
              <ExperienceIcon />
            </div>
          </div>
        </div>

        <div className={styles.aboutRight}>
          <SectionLabel text="About us" heading={missionHeading} />
          <p>
            Olalus Community Healthcare Services is dedicated to providing
            exceptional home care that empowers individuals to live safely and
            independently. We believe every person deserves dignified,
            professional care tailored to their unique needs.
          </p>
          <div className={styles.checkList}>
            {CHECK_ITEMS.map((item, i) => (
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
              <AppImage
                src={missionImage}
                alt="Mission"
                sizes="(min-width: 48em) 40vw, 100vw"
              />
            </div>
            <div className={styles.aboutMissionCard}>
              <div className={styles.aboutMissionCardHeader}>
                <SectionLabel text="Our Mission" heading={missionHeading}/>
              </div>

              <div className={styles.aboutMissionCardInner}>
                {missionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.aboutRow}>
            <div className={styles.aboutMissionCard}>
              <div className={styles.aboutMissionCardHeader}>
                <SectionLabel text="Our aim" heading={visionHeading}/>
              </div>

              <div className={styles.aboutMissionCardInner}>
                  {visionBullets.map((b, i) => (
                    <li key={i}>
                      <CheckIcon className={styles.checkIcon} />
                      {b}
                    </li>
                  ))}
              </div>
            </div>
            <div className={styles.aboutImage}>
              <AppImage
                src={visionImage}
                alt="Vision"
                sizes="(min-width: 48em) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
