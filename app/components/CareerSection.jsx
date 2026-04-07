"use client";

import Link from "next/link";
import { useEffect } from "react";
import Banner from "@/public/assets/banner.png";
import { useJobsStore } from "@/app/store/Jobs";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/career.module.css";
import {
  MdLocationOn as LocationIcon,
  MdOutlineWorkOutline as WorkIcon,
} from "react-icons/md";
import { FiArrowRight as ArrowRight, FiClock as ClockIcon } from "react-icons/fi";
import EmptyState from "@/app/components/ui/EmptyState";

const TYPE_CLASS = {
  "full-time": styles.badgeFull,
  "part-time": styles.badgePart,
  "contract": styles.badgeContract,
};

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

  return (
    <section className={styles.careerSection}>
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <SectionLabel text="Careers" />
          <h1 className={styles.heroHeading}>Wanna Be Part Of The Family?</h1>
          <p className={styles.heroText}>
            We thank you for your interest in joining our staff. We are always in search of growth through people. Explore our open positions below.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{jobs.length}+</span>
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
            src={Banner}
            alt="Healthcare team"
            sizes="380px"
          />
        </div>
      </div>

      <div className={styles.jobsArea}>
        <h2 className={styles.jobsHeading}>Open Positions</h2>

        {jobs.length === 0 ? (
          <EmptyState
            icon={WorkIcon}
            title="No open positions yet"
            description="We're always growing — check back soon for new opportunities!"
          />
        ) : (
          <div className={styles.jobGrid}>
            {jobs.map((job, i) => (
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
