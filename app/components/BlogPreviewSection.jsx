"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlogsStore } from "@/app/store/Blogs";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/blogPreview.module.css";
import { FiArrowRight as ArrowRight, FiClock as ClockIcon, FiUser as UserIcon } from "react-icons/fi";


const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

export default function BlogPreviewSection() {
  const { blogs, loading, fetchBlogs } = useBlogsStore();
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const preview = blogs.slice(0, 3);

  if (blogs.length === 0) {
    return (
      <section className={styles.blogPreviewSection}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={`${styles.skeletonLabel} skeleton`} />
            <div className={`${styles.skeletonHeading} skeleton`} />
          </div>
          <div className={`${styles.skeletonBtn} skeleton`} />
        </div>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={`${styles.skeletonImage} skeleton`} />
              <div className={styles.skeletonBody}>
                <div className={`${styles.skeletonMeta} skeleton`} />
                <div className={`${styles.skeletonTitle} skeleton`} />
                <div className={`${styles.skeletonText} skeleton`} />
                <div className={`${styles.skeletonTextShort} skeleton`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.blogPreviewSection}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <SectionLabel text="Blog" heading="Latest News & Updates" />
        </div>
        <button className={styles.viewAllBtn} onClick={() => router.push("/blog")}>
          View All Posts <ArrowRight className={styles.arrowIcon} />
        </button>
      </div>

      <div className={styles.grid}>
        {preview.map((post) => (
          <Link key={post._id} href={`/blog/${post._id}`} className={styles.card}>
            <div className={styles.cardImage}>
              <AppImage src={post.image} alt={post.title} sizes="(min-width: 48em) 33vw, 100vw" />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                {post.category && <span className={styles.category}>{post.category}</span>}
                <span className={styles.date}>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>
                {stripHtml(post.content).substring(0, 120)}...
              </p>
              <div className={styles.cardFooter}>
                {post.author && (
                  <span className={styles.author}><UserIcon /> {post.author}</span>
                )}
                {post.readTime && (
                  <span className={styles.readTime}><ClockIcon /> {post.readTime}</span>
                )}
                <span className={styles.readMore}>Read More <ArrowRight /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
