"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "@/app/styles/resources.module.css";
import { useResourcesStore } from "@/app/store/Resources";
import SectionLabel from "@/app/components/ui/SectionLabel";
import {
  FiDownload as DownloadIcon,
  FiBook as GuideIcon,
  FiMonitor as PortalIcon,
  FiArrowRight as ArrowRight,
} from "react-icons/fi";
import { BsFilePdfFill as PdfIcon } from "react-icons/bs";

const TYPE_META = {
  "client-form": { icon: DownloadIcon, label: "Client Form" },
  "service-guide": { icon: GuideIcon, label: "Service Guide" },
  "therapy-portal": { icon: PortalIcon, label: "Therapy Portal" },
};

const DEFAULT_RESOURCES = [
  {
    _id: "1",
    slug: "client-forms",
    title: "Client Forms",
    description: "Download intake forms, consent documents, and service agreements for new and existing clients. All forms are available in accessible formats.",
    type: "client-form",
  },
  {
    _id: "2",
    slug: "service-guide",
    title: "Service Guide",
    description: "Full overview of all services offered, eligibility requirements, and how to get started with personalised home care.",
    type: "service-guide",
  },
  {
    _id: "3",
    slug: "therapy-portal",
    title: "Therapy Portal",
    description: "Access our therapy portal for session tracking, documentation, and communication with your care team.",
    type: "therapy-portal",
  },
];

export default function ResourcesSection() {
  const { resources, loading, fetchResources } = useResourcesStore();

  useEffect(() => { fetchResources(); }, []);

  if (loading && resources.length === 0) {
    return (
      <section className={styles.resourcesSection}>
        <div className={styles.header}>
          <div className={`${styles.skeletonLabel} skeleton`} />
          <div className={`${styles.skeletonHeading} skeleton`} />
        </div>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${styles.skeletonCard} skeleton`} />
          ))}
        </div>
      </section>
    );
  }

  const displayResources = resources.length > 0 ? resources : DEFAULT_RESOURCES;

  return (
    <section className={styles.resourcesSection}>
      <div className={styles.header}>
        <SectionLabel text="Resources" heading={<>Everything You Need,<br />In One Place</>} center={true} />
        <p className={styles.subText}>
          Access all the forms, guides, and portals you need to manage your care journey with ease.
        </p>
      </div>

      <div className={styles.grid}>
        {displayResources.map((resource, i) => {
          const meta = TYPE_META[resource.type] || TYPE_META["service-guide"];
          const Icon = meta.icon;
          const href = resource.slug ? `/resources/${resource.slug}` : `/resources/${resource._id}`;

          return (
            <Link key={resource._id || i} href={href} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={`${styles.iconWrap} ${styles[`type_${resource.type?.replace(/-/g, '_')}`]}`}>
                  <Icon className={styles.icon} />
                </div>
                <span className={`${styles.typeBadge} ${styles[`badge_${resource.type?.replace(/-/g, '_')}`]}`}>
                  {meta.label}
                </span>
              </div>

              <div className={styles.cardBody}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>

              <div className={styles.cardFooter}>
                {resource.pdfUrl && (
                  <span className={styles.pdfTag}>
                    <PdfIcon /> PDF available
                  </span>
                )}
                <span className={styles.cardLink}>
                  View Resource <ArrowRight className={styles.linkIcon} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
