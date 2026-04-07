import styles from "@/app/styles/blog.module.css";
import AppImage from "@/app/components/ui/AppImage";
import { FiClock as ClockIcon, FiUser as UserIcon } from "react-icons/fi";
import { notFound } from "next/navigation";

async function fetchBlog(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/${id}`, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await fetchBlog(id);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.content?.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const blog = await fetchBlog(id);
  if (!blog) notFound();

  return (
    <article className={styles.blogPost}>
      {blog.image && (
        <div className={styles.blogPostImage}>
          <AppImage src={blog.image} alt={blog.title} sizes="(min-width: 48em) 860px, 100vw" priority />
        </div>
      )}
      <div className={styles.blogPostContent}>
        <div className={styles.blogMeta}>
          {blog.category && <span className={styles.blogCategory}>{blog.category}</span>}
          {blog.author && <span><UserIcon /> {blog.author}</span>}
          {blog.readTime && <span><ClockIcon /> {blog.readTime}</span>}
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
        <h1>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </article>
  );
}
