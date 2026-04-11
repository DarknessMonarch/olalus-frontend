"use client";

import { useEffect } from "react";
import styles from "@/app/styles/policy.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { usePolicyStore } from "@/app/store/Policy";

export default function NonDiscriminationSection() {
  const { policies, loading, fetchPolicy } = usePolicyStore();
  const policy = policies["non-discrimination"];

  useEffect(() => {
    if (!policy) fetchPolicy("non-discrimination");
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

  return (
    <section className={styles.policySection}>
      <div className={styles.header}>
        <SectionLabel text="Legal" heading={policy?.title || "Non-Discrimination Policy"} center={true} />
        {policy?.effectiveDate && (
          <p className={styles.meta}>Effective Date: {policy.effectiveDate}</p>
        )}
      </div>
      {policy?.content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      )}
    </section>
  );
}
