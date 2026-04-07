import Image from "next/image";
import LogoImg from "@/public/assets/logo.png";
import styles from "@/app/styles/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingComponent}>
      <div className={styles.logoWrap}>
        <span className={styles.ringOuter} />
        <span className={styles.ringMid} />
        <span className={styles.glow} />
        <Image
          className={styles.logo}
          src={LogoImg}
          alt="Loading"
          width={110}
          height={110}
          priority
        />
      </div>
      <p className={styles.loadingText}>Loading</p>
    </div>
  );
}
