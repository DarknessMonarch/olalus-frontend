import Link from "next/link";
import AppImage from "@/app/components/ui/AppImage";
import styles from "@/app/styles/notfound.module.css";
import { HiArrowLeft as BackIcon } from "react-icons/hi";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.heading}>Wrong Ward!</h1>
        <p className={styles.sub}>
          Our doctor searched everywhere but couldn&apos;t find this page. It
          may have been moved or no longer exists.
        </p>
        <Link href="/" className={styles.btn}>
          <BackIcon className={styles.btnIcon} />
          Back to Home
        </Link>
      </div>

      <div className={styles.imageWrap}>
        <AppImage
          src="/assets/notfound.png"
          alt="Doctor not found"
          sizes="(max-width: 768px) 260px, 420px"
          priority
        />
      </div>
    </section>
  );
}
