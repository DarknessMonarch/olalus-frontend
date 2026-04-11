"use client";

import { useEffect } from "react";
import styles from "@/app/styles/policy.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { usePolicyStore } from "@/app/store/Policy";

function parseParagraphs(html) {
  if (!html) return [];
  const stripped = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
  return stripped.split(/\n{1,}/).map((s) => s.trim()).filter(Boolean);
}

export default function PrivacyPolicySection() {
  const { policies, loading, fetchPolicy } = usePolicyStore();
  const policy = policies["privacy"];

  useEffect(() => {
    if (!policy) fetchPolicy("privacy");
  }, []);

  if (!policy && loading) {
    return (
      <section className={styles.policySection}>
        <div className={styles.header}>
          <div className={`${styles.skeletonLabel} skeleton`} />
          <div className={`${styles.skeletonHeading} skeleton`} />
        </div>
      </section>
    );
  }

  const paragraphs = parseParagraphs(policy?.content);

  return (
    <section className={styles.policySection}>
      <div className={styles.header}>
        <SectionLabel text="Legal" heading={policy?.title || "Privacy Policy"} center={true} />
        {policy?.effectiveDate && (
          <p className={styles.meta}>Effective Date: {policy.effectiveDate}</p>
        )}
      </div>
      {paragraphs.length > 0 && (
        <div className={styles.content}>
          {paragraphs.map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
        </div>
      )}
    </section>
  );
}
