"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import styles from "@/app/styles/navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronDown as ChevronDown } from "react-icons/hi";
import { LiquidGlass } from "@liquidglass/react";
import { useState, useEffect, useRef, Suspense } from "react";
import { HiArrowRight as ArrowRight } from "react-icons/hi";
import { HiMenu as MenuIcon, HiX as CloseIcon } from "react-icons/hi";
import LanguageSelector from "@/app/components/LanguageSelector";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
];

const isActive = (pathname, link) => {
  if (link.exact) return pathname === link.href;
  return pathname === link.href || pathname.startsWith(link.href + "/");
};

const GLASS_PROPS = {
  borderRadius: 999,
  glassTintColor: "#ffd86e",
  glassTintOpacity: 18,
  frostBlurRadius: 10,
  innerShadowColor: "rgba(209,158,29,0.25)",
  innerShadowBlur: 8,
  innerShadowSpread: -2,
  noiseFrequency: 0.008,
  noiseStrength: 30,
};

const NavbarSkeleton = () => (
  <nav className={styles.nav}>
    <div className={styles.skeleton} />
  </nav>
);

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (idx) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(idx);
    setHoveredIdx(idx);
  };

  const handleMouseLeave = (idx) => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoveredIdx((prev) => (prev === idx ? null : prev));
    }, 150);
  };

  const goHome = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setHoveredIdx(null);
    router.push("/");
  };

  const renderNavLinks = ({ mobile = false } = {}) =>
    NAV_LINKS.map((link, idx) => {
      const active = isActive(pathname, link);
      const hasDropdown = !!link.dropdown;
      const isOpen = openDropdown === idx;
      const isHovered = hoveredIdx === idx;
      const showGlass = active || isHovered;

      const innerContent = (
        <div
          className={mobile ? styles.mobileNavItem : styles.navItems}
          ref={hasDropdown ? dropdownRef : null}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
        >
          <Link
            href={link.href}
            className={`${mobile ? styles.mobileNavLink : styles.navLink} ${active ? styles.activeLink : ""}`}
            onClick={mobile ? () => setMobileOpen(false) : undefined}
          >
            {active && <span className={styles.dot} />}
            {link.label}
            {hasDropdown && (
              <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
            )}
          </Link>
        </div>
      );

      return showGlass ? (
        <div key={link.href} className={mobile ? styles.mobileGlassWrapper : styles.plainItem}>
          <LiquidGlass
            width={mobile ? "100%" : "110px"}
            height={mobile ? "44px" : "40px"}
            {...GLASS_PROPS}
          >
            {innerContent}
          </LiquidGlass>
        </div>
      ) : (
        <div key={link.href} className={mobile ? styles.mobilePlainItem : styles.plainItem}>
          {innerContent}
        </div>
      );
    });

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.mobileNav}>
          <LiquidGlass width="100%" height="fit-content" {...GLASS_PROPS}>
            <div className={styles.mobileNavInner}>
              <Image onClick={goHome} src={Logo} alt="Logo" height={50} priority style={{ cursor: "pointer" }} />
              <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <MenuIcon />
              </button>
            </div>
          </LiquidGlass>
        </div>

        <Image onClick={goHome} src={Logo} alt="Logo" height={60} priority className={styles.desktopLogo} style={{ cursor: "pointer" }} />

        <div className={styles.navContainer}>
          {renderNavLinks()}
        </div>

        <div className={styles.navRight}>
          <LanguageSelector />
          <Link href="/#appointment" className={styles.ctaBtn}>
            <p>Book Appointment</p>
            <span className={styles.ctaIcon}><ArrowRight /></span>
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <nav className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileDrawerHeader}>
              <Image onClick={goHome} src={Logo} alt="Logo" height={50} style={{ cursor: "pointer" }} />
              <button className={styles.mobileClose} onClick={() => setMobileOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className={styles.mobileLinks}>
              {renderNavLinks({ mobile: true })}
            </div>

            <div className={styles.mobileFooter}>
              <div className={styles.lang}>
                <LanguageSelector />
              </div>
              <Link href="/#appointment" className={styles.ctaBtn} onClick={() => setMobileOpen(false)}>
                <p>Book Appointment</p>
                <span className={styles.ctaIcon}><ArrowRight /></span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarContent />
    </Suspense>
  );
}
