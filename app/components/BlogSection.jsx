"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "@/app/styles/blog.module.css";
import { useBlogsStore } from "@/app/store/Blogs";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiArrowRight as ArrowRight, FiClock as ClockIcon, FiUser as UserIcon, FiFileText as ArticleIcon } from "react-icons/fi";
import EmptyState from "@/app/components/ui/EmptyState";


export default function BlogSection() {
  const { blogs, categories, loading, fetchBlogs, fetchCategories } = useBlogsStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.content?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, blogs]);

  const featured = filtered[0];
  const sidebar = filtered.slice(1, 6);

  if (blogs.length === 0) {
    return (
      <section className={styles.blogSection}>
        <div className={styles.blogHeader}>
          <div className={`${styles.skeletonLabel} skeleton`} />
          <div className={`${styles.skeletonHeading} skeleton`} />
        </div>
        <div className={styles.blogBody}>
          <div className={styles.mainBlog}>
            <div className={`${styles.skeletonFeatured} skeleton`} />
            <div className={`${styles.skeletonMeta} skeleton`} />
            <div className={`${styles.skeletonTitle} skeleton`} />
            <div className={`${styles.skeletonText} skeleton`} />
          </div>
          <div className={styles.sidebar}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${styles.skeletonSidePost} skeleton`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayCategories = categories.length > 0 ? categories : [];

  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  return (
    <section className={styles.blogSection}>
      <div className={styles.blogHeader}>
        <SectionLabel text="Blog" heading="Latest News & Updates" center={true} />
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.blogBody}>
        <div className={styles.mainBlog}>
          {!featured ? (
            <EmptyState
              icon={ArticleIcon}
              title="No articles found"
              description="Try a different search term, or check back soon for new articles!"
            />
          ) : (
            <>
              <div className={styles.featuredImage}>
                <AppImage src={featured.image} alt={featured.title} sizes="(min-width: 48em) 66vw, 100vw" />
              </div>
              <div className={styles.blogMeta}>
                {featured.category && (
                  <span className={styles.blogCategory}>{featured.category}</span>
                )}
                {featured.author && (
                  <span><UserIcon /> {featured.author}</span>
                )}
                {featured.readTime && (
                  <span><ClockIcon /> {featured.readTime}</span>
                )}
                <span>{formatDate(featured.publishedAt || featured.createdAt)}</span>
              </div>
              <h2>{featured.title}</h2>
              <p>{stripHtml(featured.content).substring(0, 280)}...</p>
              <Link href={`/blog/${featured._id}`} className={styles.readMore}>
                Read More <ArrowRight />
              </Link>
            </>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarBlock}>
            <h4>Recent Posts</h4>
            {sidebar.map((post, i) => (
              <Link key={post._id || i} href={`/blog/${post._id}`} className={styles.recentPost}>
                <div className={styles.postThumb}>
                  <AppImage src={post.image} alt={post.title} sizes="60px" />
                </div>
                <div className={styles.postInfo}>
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  <p>{post.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.sidebarBlock}>
            <h4>Categories</h4>
            {displayCategories.map((cat, i) => (
              <div key={i} className={styles.categoryItem}>
                <span className={styles.catName}>{cat.name || cat}</span>
                <span className={styles.catCount}>{cat.count || ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}