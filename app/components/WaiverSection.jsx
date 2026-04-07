"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/waiver.module.css";
import { useWaiversStore } from "@/app/store/Waivers";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { FaStethoscope as StethoscopeIcon } from "react-icons/fa";

const DEFAULT_WAIVERS = [
  {
    _id: "1",
    title: "Aging Waiver",
    description:
      "Provides services for individuals 60 years of age and older who are at risk of nursing facility placement. Supports are provided to help them remain in their homes and communities.",
  },
  {
    _id: "2",
    title: "Attendant Care / Act 150",
    description:
      "Provide services for mentally-alert Pennsylvanians between eighteen (18) and fifty-nine (59) years of age with physical disabilities to continue to live in their home and community with support and services.",
  },
  {
    _id: "3",
    title: "COMMCARE Waiver",
    description:
      "Designed for individuals with traumatic brain injury (TBI) who require community-based services to remain in or return to their homes and communities rather than residing in institutions.",
  },
  {
    _id: "4",
    title: "Independence Waiver",
    description:
      "Serves individuals 18-59 years of age with physical disabilities who need a nursing facility level of care but choose to live in the community with appropriate supports and services.",
  },
  {
    _id: "5",
    title: "LIFE (Living Independence for the Elderly)",
    description:
      "A managed care program for individuals 55 years of age and older who need a nursing facility level of care but choose to live in their community.",
  },
  {
    _id: "6",
    title: "OBRA Waiver",
    description:
      "Serves individuals 18-59 years of age with developmental disabilities who need an intermediate care facility level of care but choose to live in the community.",
  },
];

export default function WaiverSection() {
  const { waivers, fetchWaivers } = useWaiversStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { fetchWaivers(); }, []);

  const displayWaivers = waivers.length > 0 ? waivers : DEFAULT_WAIVERS;
  const activeWaiver = displayWaivers[activeIndex];

  return (
    <section className={styles.waiverSection}>
       <SectionLabel text="Waiver" heading="Our Waiver Programs" center={true} />
        <p>
          Olalus Community Health Care Services is qualified to provide the following Pennsylvania
          Waivers Programs. These waiver programs provide funding for supports and services to help
          individual to live in their homes and communities. Waivers offer an array of services and
          benefits such as choice of qualified providers, due process and health and safety each
          waiver has its own unique set of eligibility requirements and services.
        </p>

      <div className={styles.tabContainer}>
        <div className={styles.tabRow}>
          {displayWaivers.map((waiver, i) => (
            <button
              key={waiver._id || i}
              type="button"
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <StethoscopeIcon className={styles.tabIcon} />
              <span>{waiver.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.descPanel}>
          <p>{activeWaiver?.description}</p>
        </div>
      </div>
    </section>
  );
}
