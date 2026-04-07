"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/styles/blog.module.css";
import { useBlogsStore } from "@/app/store/Blogs";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiArrowRight as ArrowRight, FiClock as ClockIcon, FiUser as UserIcon } from "react-icons/fi";

const DEFAULT_BLOGS = [
  {
    _id: "1",
    title: "Understanding Home Health Care: What to Expect",
    content: "<p>Home health care is a wide range of health care services that can be given in your home for an illness or injury. Home health care is usually less expensive, more convenient, and just as effective as care you get in a hospital or skilled nursing facility. Home health care services can include wound care for pressure sores, patient and caregiver education, intravenous or nutrition therapy, injections, and monitoring of serious illness and unstable health status.</p>",
    author: "Olalus Team",
    category: "Home Care",
    readTime: "5 min read",
    publishedAt: "2024-01-15",
    image: "https://images.pexels.com/photos/7551637/pexels-photo-7551637.jpeg",
  },
  {
    _id: "2",
    title: "Tips for Family Caregivers: Preventing Burnout",
    content: "<p>Caring for an elderly or disabled family member is a deeply meaningful but often exhausting responsibility. Caregiver burnout is real and affects millions of families across the country.</p>",
    author: "Healthcare Staff",
    category: "Caregiver Tips",
    readTime: "4 min read",
    publishedAt: "2024-02-10",
    image: "https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg",
  },
  {
    _id: "3",
    title: "Medicare and Home Health Benefits Explained",
    content: "<p>Medicare Part A and Part B cover eligible home health services if your doctor or other health care provider orders them. Learn what is covered and how to qualify.</p>",
    author: "Billing Team",
    category: "Insurance",
    readTime: "6 min read",
    publishedAt: "2024-03-05",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
  },
  {
    _id: "4",
    title: "Nutrition and Wellness for Seniors at Home",
    content: "<p>Proper nutrition is a cornerstone of healthy aging. Seniors who eat well tend to be more resilient, more energetic, and better able to manage chronic conditions.</p>",
    author: "Olalus Nurses",
    category: "Wellness",
    readTime: "5 min read",
    publishedAt: "2024-03-20",
    image: "https://images.pexels.com/photos/6823579/pexels-photo-6823579.jpeg",
  },
  {
    _id: "5",
    title: "Physical Therapy in the Home: How It Works",
    content: "<p>In-home physical therapy offers the convenience of receiving skilled therapy services in your own environment. This setting allows therapists to directly address the challenges you face in your daily life.</p>",
    author: "PT Department",
    category: "Therapy",
    readTime: "4 min read",
    publishedAt: "2024-04-01",
    image: "https://images.pexels.com/photos/5473181/pexels-photo-5473181.jpeg",
  },
  {
    _id: "6",
    title: "How to Choose the Right Home Care Agency",
    content: "<p>Selecting a home care agency is one of the most important decisions you can make for yourself or a loved one. Knowing what to look for can make the process less overwhelming.</p>",
    author: "Olalus Team",
    category: "Home Care",
    readTime: "7 min read",
    publishedAt: "2024-04-10",
    image: "https://images.pexels.com/photos/3844789/pexels-photo-3844789.jpeg",
  },
];

const DEFAULT_CATEGORIES = [
  { name: "Home Care", count: 2 },
  { name: "Caregiver Tips", count: 1 },
  { name: "Insurance", count: 1 },
  { name: "Wellness", count: 1 },
  { name: "Therapy", count: 1 },
];

export default function BlogSection() {
  const { blogs, categories, loading, fetchBlogs, fetchCategories } = useBlogsStore();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(DEFAULT_BLOGS);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    const source = blogs.length > 0 ? blogs : DEFAULT_BLOGS;
    if (!search.trim()) {
      setFiltered(source);
      return;
    }
    setFiltered(
      source.filter(
        (b) =>
          b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.content?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, blogs]);

  const featured = filtered[0];
  const sidebar = filtered.slice(1, 6);

  if (loading && blogs.length === 0) {
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
  const displayCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

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
            <div className={styles.noBlogs}>
              <p>No articles found. Check back soon!</p>
            </div>
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
