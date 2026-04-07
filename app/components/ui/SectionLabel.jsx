import styles from "@/app/styles/sectionLabel.module.css";

export default function SectionLabel({ text, heading, center = false }) {
  return (
    <div className={`${styles.sectionLabelWrapper} ${center ? styles.center : ""}`}>
      <div className={styles.sectionLabel}>
        <span className={styles.labelLine} />
        <span>{text}</span>
      </div>
      {heading && <h2>{heading}</h2>}
    </div>
  );
}