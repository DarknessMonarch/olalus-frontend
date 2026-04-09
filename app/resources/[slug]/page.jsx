import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/app/styles/resources.module.css";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { MdOutlineArrowBack as BackIcon } from "react-icons/md";
import { FiDownload as DownloadIcon, FiArrowUpRight as ExternalIcon } from "react-icons/fi";

const TYPE_LABELS = {
  "client-form": "Client Form",
  "service-guide": "Service Guide",
  "therapy-portal": "Therapy Portal",
};

async function fetchResource(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/resources/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resource = await fetchResource(slug);
  if (!resource) return { title: "Resource Not Found" };
  return {
    title: resource.title,
    description: resource.description,
  };
}

export default async function ResourceDetailPage({ params }) {
  const { slug } = await params;
  const resource = await fetchResource(slug);
  if (!resource) notFound();

  const typeLabel = TYPE_LABELS[resource.type] || "Resource";

  return (
    <div className={styles.detailPage}>
      <Link href="/resources" className={styles.backLink}>
        <BackIcon /> All Resources
      </Link>

      <div className={styles.detailHero}>
        <div className={styles.detailHeroMeta}>
          <SectionLabel text="Resources" />
          <span className={styles.detailTypeBadge}>{typeLabel}</span>
        </div>

        <h1 className={styles.detailTitle}>{resource.title}</h1>

        {resource.description && (
          <p className={styles.detailDescription}>{resource.description}</p>
        )}

        {(resource.pdfUrl || resource.link) && (
          <div className={styles.detailActions}>
            {resource.pdfUrl && (
              <a
                href={resource.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
              >
                <DownloadIcon /> Download PDF
              </a>
            )}
            {resource.link && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalBtn}
              >
                Visit Link <ExternalIcon />
              </a>
            )}
          </div>
        )}
      </div>

      {resource.content && (
        <div className={styles.detailContent}>
          <SectionLabel text={typeLabel} heading="Details" />
          <p>{resource.content}</p>
        </div>
      )}
    </div>
  );
}
