"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCommentsStore } from "@/app/store/Comments";
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

export default function Home() {
  const { commentStats, approvedComments, fetchCommentStats, fetchApprovedComments } = useCommentsStore();
  const { banners, fetchBanners } = useBannersStore();
  const { about, fetchAbout } = useAboutStore();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    fetchCommentStats();
    fetchApprovedComments();
    fetchBanners();
    fetchAbout();
  }, [fetchAbout, fetchApprovedComments, fetchBanners, fetchCommentStats]);

  const currentBanner = banners.length ? banners[currentBannerIndex] || banners[0] : null;

  const appointmentAvatar = about?.appointmentAvatar || null;
  const features = about?.appointmentFeatures?.length ? about.appointmentFeatures : [];

  const reviewerInitials = approvedComments.slice(0, 4).map((r) => r.name?.charAt(0).toUpperCase() || "?");

  const rating = commentStats?.count > 0 ? commentStats.averageRating : null;
  const filledStars = rating ? Math.round(rating) : 0;
  const reviewCount = commentStats?.count > 0 ? commentStats.count : null;

  const bannersLoaded = banners.length > 0;
  const aboutLoaded = about !== null && about !== undefined;
  const statsLoaded = commentStats !== null && commentStats !== undefined;

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    if (features.length <= 1) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
  }, [features.length]);

  const goToAppointment = () => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.homeSectionWrapper}>
      <div className={`${styles.homeSection} skeleton`}>
        {currentBanner?.image && (
          <div className={styles.heroImageWrapper}>
            <Image
              className={styles.heroImage}
              src={currentBanner.image}
              alt={currentBanner.title || ""}
              fill
              sizes="100%"
              quality={100}
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        )}

        <div className={styles.overlay}>
          {/* Top — 24/7 support circle */}
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

          {/* Middle content */}
          <div className={styles.middleContent}>
            <div className={styles.middleContentTop}>
              {/* Quality assurance badge */}
              <div className={styles.qualityAssurance}>
                <LiquidGlass borderRadius={999} blur={0.5}>
                  <div className={styles.qualityAssuranceContent}>
                    <VerifiedIcon className={styles.verifiedIcon} />
                    <span>Trusted Community Healthcare Provider</span>
                  </div>
                </LiquidGlass>
              </div>

              {/* Hero title + description */}
              <div className={styles.heroContent}>
                <LiquidGlass borderRadius={24} blur={0.5}>
                  <div className={styles.heroContentInner}>
                    {bannersLoaded ? (
                      <>
                        <h1>{currentBanner?.title}</h1>
                        <p>{currentBanner?.description}</p>
                      </>
                    ) : (
                      <>
                        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
                        <div className={`${styles.skeletonLine} ${styles.skeletonTitleShort}`} />
                        <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
                        <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
                        <div className={`${styles.skeletonLine} ${styles.skeletonTextShort}`} />
                      </>
                    )}
                  </div>
                </LiquidGlass>
              </div>

              {/* Action buttons */}
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

            {/* Appointment card */}
            <div className={styles.appointmentCard}>
              <div className={styles.stackTop}>
                <LiquidGlass borderRadius={24} blur={0.5}>
                  <div
                    className={styles.bookAppointment}
                    onClick={goToAppointment}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.bookAvatarWrap}>
                      {appointmentAvatar ? (
                        <Image src={appointmentAvatar} alt="assistant" height={40} width={40} />
                      ) : aboutLoaded ? (
                        <div className={styles.bookAvatarInitial}>O</div>
                      ) : (
                        <div className={`${styles.skeletonCircle} ${styles.skeletonAvatar}`} />
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
                    {features.length > 0 ? (
                      <>
                        <p className={styles.dedicatedText}>{features[activeFeature]}</p>
                        <div className={styles.dedicatedDots}>
                          {features.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveFeature(i)}
                              className={
                                i === activeFeature
                                  ? styles.dedicatedDotActive
                                  : styles.dedicatedDot
                              }
                              aria-label={`Feature ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
                        <div className={`${styles.skeletonLine} ${styles.skeletonTextShort}`} />
                        <div className={styles.dedicatedDots}>
                          {[0, 1, 2].map((i) => (
                            <div key={i} className={styles.skeletonDot} />
                          ))}
                        </div>
                      </>
                    )}
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

          {/* Social proof / reviews */}
          <div className={styles.socialProof}>
            {statsLoaded && approvedComments.length > 0 ? (
              <>
                <div className={styles.avatarStack}>
                  {reviewerInitials.map((letter, i) => (
                    <div key={i} className={styles.avatarItem}>
                      <span>{letter}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.proofText}>
                  <span className={styles.proofCount}>
                    {reviewCount ? `${reviewCount}+ Verified Reviews` : "Trusted Community Care"}
                  </span>
                  {rating !== null && (
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
                  )}
                </div>
              </>
            ) : !statsLoaded ? (
              <>
                <div className={styles.avatarStack}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`${styles.skeletonCircle} ${styles.skeletonAvatarSm}`} />
                  ))}
                </div>
                <div className={styles.proofText}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonProofCount}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonStars}`} />
                </div>
              </>
            ) : null}
          </div>

          <div className={styles.bottomContent}>
            <div className={styles.bannerDots}>
              {bannersLoaded ? (
                banners.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === currentBannerIndex ? styles.dotActive : ""}`}
                    onClick={() => setCurrentBannerIndex(i)}
                  />
                ))
              ) : (
                [0, 1].map((i) => (
                  <div key={i} className={`${styles.dot} ${styles.skeletonDotWide}`} />
                ))
              )}
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