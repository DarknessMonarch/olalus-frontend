import styles from "@/app/styles/FormInput.module.css";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  as = "input",
  rows = 4,
  disabled = false,
  readOnly = false,
  min,
  max,
  children,
}) {
  const fieldClass = `${styles.inputField}${error ? ` ${styles.inputError}` : ""}`;

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.inputLabel} htmlFor={name}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          className={fieldClass}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={fieldClass}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          className={fieldClass}
        />
      )}

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
