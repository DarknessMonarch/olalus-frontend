"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Logo from "@/public/assets/logo.png";
import styles from "@/app/styles/footer.module.css";
import { usePathname } from "next/navigation";
import FaqSection from "@/app/components/FaqSection";
import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdEmail as EmailIcon, MdLocationOn as LocationIcon } from "react-icons/md";
import { IoCall as PhoneIcon } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import MapSection from "@/app/components/MapSection";
import { useAboutStore } from "@/app/store/About";
import { useContactInfoStore } from "@/app/store/ContactInfo";

const quickLinksLeft = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/blog", label: "Blog" },
];

const quickLinksRight = [
  { href: "/faq", label: "Faqs" },
  { href: "/resources", label: "Resources" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/non-discrimination", label: "Non-Discrimination Policy" },
];

const socials = [
  { icon: <FaFacebook />, href: "https://www.facebook.com/olalusgroupllc", label: "Facebook" },
  { icon: <FaXTwitter />, href: "https://twitter.com/olalusgroupllc", label: "X" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/olalusgroupllc", label: "LinkedIn" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@olalusgroupllc", label: "YouTube" },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const { about, fetchAbout } = useAboutStore();
  const { contactInfo, loading, fetchContactInfo } = useContactInfoStore();

  useEffect(() => {
    fetchAbout();
    fetchContactInfo();
  }, [fetchAbout, fetchContactInfo]);

  const phone = contactInfo?.phone;
  const fax = contactInfo?.fax;
  const email = contactInfo?.email;
  const address = contactInfo?.address;
  const workingDays = contactInfo?.workingDays;
  const workingHours = contactInfo?.workingHours;

  return (
    <>
      <FaqSection />
    <MapSection branches={about?.branches} />
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerMain}>

          <div className={styles.footerBrand}>
            <div className={styles.brandLogo}>
              <Image src={Logo} alt="Olalus" width={56} height={56} />
              <div className={styles.brandName}>
                <span className={styles.brandTitle}>OLALUS</span>
                <span className={styles.brandSub}>Community Healthcare Services</span>
              </div>
            </div>

            <p className={styles.brandDesc}>
              Devoted to Excellence care &amp; Individual Services
            </p>

            <div className={styles.brandDivider} />

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <LocationIcon className={styles.contactIcon} />
                {loading || !address
                  ? <span className={`${styles.skeletonLine} skeletonGold`} />
                  : <span>{address}</span>}
              </div>
              <div className={styles.contactItem}>
                <EmailIcon className={styles.contactIcon} />
                {loading || !email
                  ? <span className={`${styles.skeletonLine} skeletonGold`} />
                  : <span>{email}</span>}
              </div>
              <div className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} />
                {loading || !phone
                  ? <span className={`${styles.skeletonLine} skeletonGold`} />
                  : <span>{phone}{fax ? ` | Fax : ${fax}` : ""}</span>}
              </div>
            </div>

            <div className={styles.socialRow}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={styles.socialBtn}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.colHeading}>Quick Links</h4>
            <nav className={styles.linksGrid}>
              <div className={styles.linkCol}>
                {quickLinksLeft.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`${styles.navLink} ${pathname === l.href ? styles.activeLink : ""}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className={styles.linkCol}>
                {quickLinksRight.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`${styles.navLink} ${pathname === l.href ? styles.activeLink : ""}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <div className={styles.footerHours}>
            <h4 className={styles.colHeading}>Opening Hours</h4>
            <div className={styles.hoursCard}>
              <div className={styles.hoursRow}>
                {loading || !workingDays
                  ? <span className={`${styles.skeletonLine} skeletonGold`} />
                  : <span className={styles.hoursDay}>{workingDays}</span>}
                {loading || !workingHours
                  ? <span className={`${styles.skeletonLineShort} skeletonGold`} />
                  : <span className={styles.hoursTime}>{workingHours}</span>}
              </div>
              <p className={styles.hoursNote}>Closed on weekends &amp; public holidays</p>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <p>&copy; 2015 &ndash; {year} Olalus Group LLC. All rights reserved.</p>
          <p>Licensed &amp; Insured | Pennsylvania Home Care Agency</p>
        </div>
      </div>
    </footer>
    </>
  );
}
