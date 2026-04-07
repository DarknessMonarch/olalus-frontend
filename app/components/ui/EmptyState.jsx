import styles from "@/app/styles/emptyState.module.css";

/**
 * EmptyState — shared component for sections with no content.
 * Props:
 *   icon        — React icon component (e.g. WorkIcon from react-icons)
 *   title       — primary message (required)
 *   description — optional subtitle
 */
export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className={styles.emptyState}>
      {Icon && <Icon className={styles.icon} />}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
