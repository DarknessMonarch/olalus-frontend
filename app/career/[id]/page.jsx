"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useJobsStore } from "@/app/store/Jobs";
import styles from "@/app/styles/jobDetail.module.css";
import {
  MdLocationOn as LocationIcon,
  MdOutlineArrowBack as BackIcon,
} from "react-icons/md";
import { FiClock as ClockIcon, FiFileText as FileIcon, FiArrowRight as ArrowRight } from "react-icons/fi";

const TYPE_CLASS = {
  "full-time": styles.badgeFull,
  "part-time": styles.badgePart,
  "contract": styles.badgeContract,
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentJob, fetchJobById, loading } = useJobsStore();

  useEffect(() => {
    if (id) fetchJobById(id);
  }, [id]);

  const applyHref = currentJob
    ? `/career/apply?position=${encodeURIComponent(currentJob.title)}`
    : "/career/apply";

  if (loading) {
    return (
      <div className={styles.detailPage}>
        <div className={`${styles.skeleton} skeleton`} />
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className={styles.detailPage}>
        <div className={styles.notFound}>
          <h2>Position not found</h2>
          <p>This job listing may no longer be available.</p>
          <Link href="/career" className={styles.backLink}>
            <BackIcon /> Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <Link href="/career" className={styles.backLink}>
        <BackIcon /> All Positions
      </Link>

      <div className={styles.detailInner}>
        <div className={styles.mainCol}>
          <div className={styles.jobHeader}>
            <div className={styles.badges}>
              <span className={`${styles.typeBadge} ${TYPE_CLASS[currentJob.type] || styles.badgeFull}`}>
                {currentJob.type?.replace("-", " ")}
              </span>
              {currentJob.location && (
                <span className={styles.locationBadge}>
                  <LocationIcon /> {currentJob.location}
                </span>
              )}
              <span className={styles.timeBadge}>
                <ClockIcon /> {currentJob.type?.replace("-", " ")}
              </span>
            </div>

            <h1 className={styles.jobTitle}>{currentJob.title}</h1>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>About This Role</h2>
            <p className={styles.description}>{currentJob.description}</p>
          </div>

          {currentJob.requirements?.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Requirements</h2>
              <ul className={styles.reqList}>
                {currentJob.requirements.map((req, i) => (
                  <li key={i}>
                    <span className={styles.checkIcon}>✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.applyCard}>
            <h3>Interested in this role?</h3>
            <p>Submit a quick application or complete the full employment application to be considered.</p>

            <Link href={applyHref} className={styles.primaryBtn}>
              Apply Now <ArrowRight />
            </Link>

            <Link href="/career/apply" className={styles.outlineBtn}>
              <FileIcon /> Full Application
            </Link>
          </div>

          <div className={styles.detailCard}>
            <h4>Position Details</h4>
            <div className={styles.detailRow}>
              <span>Type</span>
              <span className={TYPE_CLASS[currentJob.type] || styles.badgeFull} style={{ padding: "2px 10px", borderRadius: "9999px", fontSize: "0.75rem" }}>
                {currentJob.type?.replace("-", " ")}
              </span>
            </div>
            {currentJob.location && (
              <div className={styles.detailRow}>
                <span>Location</span>
                <span>{currentJob.location}</span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span>Posted</span>
              <span>
                {currentJob.createdAt
                  ? new Date(currentJob.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
