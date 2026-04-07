import styles from "@/app/styles/FormButton.module.css";

export default function FormButton({
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  children,
}) {
  const variantClass =
    variant === "outline"
      ? styles.btnOutline
      : variant === "secondary"
      ? styles.btnSecondary
      : styles.btnPrimary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.btn} ${variantClass}`}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
