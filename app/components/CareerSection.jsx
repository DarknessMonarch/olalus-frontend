"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useJobsStore } from "@/app/store/Jobs";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/career.module.css";
import {
  MdLocationOn as LocationIcon,
  MdOutlineWorkOutline as WorkIcon,
} from "react-icons/md";
import { FiArrowRight as ArrowRight, FiClock as ClockIcon } from "react-icons/fi";

const TYPE_CLASS = {
  "full-time": styles.badgeFull,
  "part-time": styles.badgePart,
  "contract": styles.badgeContract,
};

const DEFAULT_JOBS = [
  {
    _id: "1",
    title: "Registered Nurse (RN)",
    type: "full-time",
    location: "Philadelphia, PA",
    description: "Provide skilled nursing care to clients in their homes. Assess patient conditions, administer medications, and coordinate with the care team.",
    requirements: ["Valid PA RN license", "Minimum 1 year home health experience", "Strong communication skills"],
  },
  {
    _id: "2",
    title: "Home Health Aide (HHA)",
    type: "part-time",
    location: "Pennsylvania (Multiple Counties)",
    description: "Assist clients with activities of daily living including personal care, light housekeeping, and companionship under the direction of a nurse.",
    requirements: ["HHA certification", "Compassionate and reliable", "Valid driver's license"],
  },
  {
    _id: "3",
    title: "Physical Therapist",
    type: "full-time",
    location: "Lancaster, PA",
    description: "Develop and implement individualised therapy plans to help clients regain mobility and independence in their homes.",
    requirements: ["PA PT license", "Experience with geriatric patients", "Excellent documentation skills"],
  },
];

export default function CareerSection() {
  const { jobs, loading, fetchJobs } = useJobsStore();

  useEffect(() => { fetchJobs(); }, []);

  if (loading && jobs.length === 0) {
    return (
      <section className={styles.careerSection}>
        <div className={`${styles.skeletonBanner} skeleton`} />
        <div className={styles.jobsArea}>
          <div className={`${styles.skeletonTitle} skeleton`} />
          <div className={styles.jobGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${styles.skeletonCard} skeleton`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayJobs = jobs.length > 0 ? jobs : DEFAULT_JOBS;

  return (
    <section className={styles.careerSection}>
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <SectionLabel text="Careers" />
          <h1 className={styles.heroHeading}>Wanna Be Part<br />Of The Family?</h1>
          <p className={styles.heroText}>
            We thank you for your interest in joining our staff. Olalus Community Healthcare Services
            is always in search of growth through people. Explore our open positions below.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{displayJobs.length}+</span>
              <span className={styles.statLabel}>Open Positions</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Dedicated to Care</span>
            </div>
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <AppImage
            src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg"
            alt="Healthcare team"
            sizes="380px"
          />
        </div>
      </div>

      <div className={styles.jobsArea}>
        <h2 className={styles.jobsHeading}>Open Positions</h2>

        {displayJobs.length === 0 ? (
          <div className={styles.empty}>
            <WorkIcon className={styles.emptyIcon} />
            <p>No open positions at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.jobGrid}>
            {displayJobs.map((job, i) => (
              <Link key={job._id || i} href={`/career/${job._id}`} className={styles.jobCard}>
                <div className={styles.jobCardTop}>
                  <span className={`${styles.typeBadge} ${TYPE_CLASS[job.type] || styles.badgeFull}`}>
                    {job.type?.replace("-", " ")}
                  </span>
                  <span className={styles.arrowBtn}><ArrowRight /></span>
                </div>

                <h3 className={styles.jobTitle}>{job.title}</h3>

                <div className={styles.jobMeta}>
                  {job.location && <span><LocationIcon /> {job.location}</span>}
                  <span><ClockIcon /> {job.type?.replace("-", " ")}</span>
                </div>

                <p className={styles.jobExcerpt}>
                  {job.description?.substring(0, 120)}...
                </p>

                {job.requirements?.length > 0 && (
                  <ul className={styles.reqPreview}>
                    {job.requirements.slice(0, 2).map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                )}

                <div className={styles.cardCta}>
                  View Position <ArrowRight className={styles.ctaArrow} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
