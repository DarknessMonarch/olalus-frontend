"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCommentsStore } from "@/app/store/Comments";
import { useTestimonialsStore } from "@/app/store/Testimonials";
import { useBannersStore } from "@/app/store/Banners";
import { useAboutStore } from "@/app/store/About";
import styles from "@/app/styles/home.module.css";
import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import PartnersSection from "@/app/components/PartnersSection";
import { FiPhone as PhoneIcon, FiArrowRight as ArrowRight } from "react-icons/fi";
import { RiTwitterXLine as XIcon } from "react-icons/ri";
import { FaLinkedinIn as LinkedInIcon, FaFacebookF as FacebookIcon, FaYoutube as YoutubeIcon, FaStar as StarIcon } from "react-icons/fa";
import { LiquidGlass } from "@liquidglass/react";

const FALLBACK_BANNERS = [
  {
    _id: "1",
    title: "Trusted Provider of your Home Care Needs.",
    description: "Olalus provides client-centered care that supports individuals to live safely and independently at home and in their communities. Their services include residential care, in-home and community support, nursing, respite care for families, household assistance, and community participation, all tailored to each client's needs and delivered by trained professionals to improve quality of life.",
    image: "https://images.pexels.com/photos/7446987/pexels-photo-7446987.jpeg",
  },
  {
    _id: "2",
    title: "Compassionate Care, Every Step of the Way.",
    description: "Our trained professionals deliver personalised in-home care, giving families peace of mind while helping clients live with dignity and independence.",
    image: "https://images.pexels.com/photos/5327654/pexels-photo-5327654.jpeg",
  },
];

const FALLBACK_INITIALS = ["J", "M", "S", "R"];

const FALLBACK_FEATURES = [
  "Each client gets a dedicated assistant",
  "24/7 support for you and your loved ones",
  "Personalised care plans tailored to your needs",
  "Certified professionals you can trust",
];

export default function Home() {
  const { commentStats, approvedComments, fetchCommentStats, fetchApprovedComments } = useCommentsStore();
  const { testimonials, fetchTestimonials } = useTestimonialsStore();
  const { banners, fetchBanners } = useBannersStore();
  const { about, fetchAbout } = useAboutStore();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    fetchCommentStats();
    fetchApprovedComments();
    fetchTestimonials();
    fetchBanners();
    fetchAbout();
  }, []);

  const bannerList = banners.length ? banners : FALLBACK_BANNERS;
  const currentBanner = bannerList[currentBannerIndex] || bannerList[0];

  const appointmentAvatar = about?.appointmentAvatar || null;
  const features = about?.appointmentFeatures?.length ? about.appointmentFeatures : FALLBACK_FEATURES;

  const all = [...approvedComments, ...testimonials];
  const reviewerInitials = all.length > 0
    ? all.slice(0, 4).map((r) => r.name?.charAt(0).toUpperCase() || "?")
    : FALLBACK_INITIALS;

  const rating = commentStats?.count > 0 ? commentStats.averageRating : 5.0;
  const filledStars = Math.round(rating);
  const reviewCount = commentStats?.count > 0 ? commentStats.count : null;

  useEffect(() => {
    if (bannerList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerList.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [bannerList.length]);

  useEffect(() => {
    if (features.length <= 1) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const goToAppointment = () => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.homeSectionWrapper}>
      <div className={`${styles.homeSection} skeleton`}>
        <div className={styles.heroImageWrapper}>
          <Image
            className={styles.heroImage}
            src={currentBanner.image}
            alt={currentBanner.title}
            fill
            sizes="100%"
            quality={100}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>

        <div className={styles.overlay}>
          <div className={styles.topContent}>
            <div className={styles.supportCircle}>
              <LiquidGlass borderRadius={99999} blur={0.5}>
                <div className={styles.supportText}>
                  <h1>24/7</h1>
                  <span>support</span>
                </div>
              </LiquidGlass>
            </div>
          </div>

          <div className={styles.middleContent}>
            <div className={styles.middleContentTop}>
              <div className={styles.qualityAssurance}>
                <LiquidGlass borderRadius={999} blur={0.5}>
                  <div className={styles.qualityAssuranceContent}>
                    <VerifiedIcon className={styles.verifiedIcon} />
                    <span>Trusted Community Healthcare Provider</span>
                  </div>
                </LiquidGlass>
              </div>
              <div className={styles.heroContent}>
                <LiquidGlass borderRadius={24} blur={0.5}>
                  <div className={styles.heroContentInner}>
                    <h1>{currentBanner.title}</h1>
                    <p>{currentBanner.description}</p>
                  </div>
                </LiquidGlass>
              </div>
              <div className={styles.actionsRow}>
                <Link href="/services" className={styles.exploreBtn}>
                  Explore Services <ArrowRight className={styles.arrowIcon} />
                </Link>
                <div className={styles.contactArea}>
                  <LiquidGlass borderRadius={32} blur={0.5}>
                    <div className={styles.phoneBtn}>
                      <span className={styles.phoneIconWrap}>
                        <PhoneIcon />
                      </span>
                      <span>+1 (610) 237-7199</span>
                    </div>
                  </LiquidGlass>
                </div>
              </div>
            </div>
            <div className={styles.appointmentCard}>
              <div className={styles.stackTop}>
                <LiquidGlass borderRadius={24} blur={0.5}>
                  <div className={styles.bookAppointment} onClick={goToAppointment} style={{ cursor: "pointer" }}>
                    <div className={styles.bookAvatarWrap}>
                      {appointmentAvatar ? (
                        <Image src={appointmentAvatar} alt="assistant" height={40} width={40} />
                      ) : (
                        <div className={styles.bookAvatarInitial}>O</div>
                      )}
                    </div>
                    <span>Book Appointment</span>
                    <span className={styles.bookArrow}>
                      <ArrowRight />
                    </span>
                  </div>
                </LiquidGlass>
              </div>

              <div className={styles.stackBottom}>
                <LiquidGlass borderRadius={24} blur={0.5}>
                  <div className={styles.dedicatedCard}>
                    <p className={styles.dedicatedText}>
                      {features[activeFeature]}
                    </p>
                    <div className={styles.dedicatedDots}>
                      {features.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveFeature(i)}
                          className={i === activeFeature ? styles.dedicatedDotActive : styles.dedicatedDot}
                          aria-label={`Feature ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </LiquidGlass>
                <div className={styles.backCardContainer}>
                  <div className={styles.backCard}>
                    <LiquidGlass borderRadius={24} blur={0.6}></LiquidGlass>
                  </div>
                  <div className={styles.backCardin}>
                    <LiquidGlass borderRadius={24} blur={0.6}></LiquidGlass>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatarStack}>
              {reviewerInitials.slice(0, 4).map((letter, i) => (
                <div key={i} className={styles.avatarItem}>
                  <span>{letter}</span>
                </div>
              ))}
            </div>
            <div className={styles.proofText}>
              <span className={styles.proofCount}>
                {reviewCount ? `${reviewCount}+ Verified Reviews` : "Trusted Community Care"}
              </span>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={styles.starIcon}
                    style={i >= filledStars ? { opacity: 0.35 } : {}}
                  />
                ))}
                <span>{rating.toFixed(1)} rating</span>
              </div>
            </div>
          </div>

          <div className={styles.bottomContent}>
            <div className={styles.bannerDots}>
              {bannerList.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentBannerIndex ? styles.dotActive : ""}`}
                  onClick={() => setCurrentBannerIndex(i)}
                />
              ))}
            </div>
            <div className={styles.socialIcons}>
              <div className={styles.socialIcon}><XIcon /></div>
              <div className={styles.socialIcon}><LinkedInIcon /></div>
              <div className={styles.socialIcon}><FacebookIcon /></div>
              <div className={styles.socialIcon}><YoutubeIcon /></div>
            </div>
          </div>
        </div>
      </div>
      <PartnersSection />
    </section>
  );
}
