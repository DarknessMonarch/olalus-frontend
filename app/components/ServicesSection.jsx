"use client";

import { useState, useEffect, useRef } from "react";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/services.module.css";
import { useServicesStore } from "@/app/store/Services";
import { ICON_REGISTRY } from "@/app/lib/iconRegistry";

function ServicesSkeleton() {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.skeletonHeader}>
        <div className={`${styles.skeletonLabel} skeleton`} />
        <div className={`${styles.skeletonHeading} skeleton`} />
      </div>
      <div className={styles.serviceContent}>
        <div className={styles.serviceListWrapper}>
          <div className={styles.serviceList}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${styles.skeletonItem} skeleton`} />
            ))}
          </div>
        </div>
        <div className={`${styles.skeletonDisplay} skeleton`} />
      </div>
    </section>
  );
}

export default function ServicesSection() {
  const { services, fetchServices } = useServicesStore();
  const [selected, setSelected] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        const overflow = el.scrollHeight > el.clientHeight + 4;
        setHasOverflow(overflow);
        setIsScrolledToEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
      } else {
        const overflow = el.scrollWidth > el.clientWidth + 4;
        setHasOverflow(overflow);
        setIsScrolledToEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [services]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      setIsScrolledToEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
    } else {
      setIsScrolledToEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    }
  };

  if (services.length === 0) return <ServicesSkeleton />;

  const active = services[selected];
  const showHint = hasOverflow && !isScrolledToEnd;

  return (
    <section className={styles.servicesSection}>
      <SectionLabel text="Our Services" heading="We Provide The Following" center={true} />
      <div className={styles.serviceContent}>
        <div className={styles.serviceListWrapper}>
          <div className={styles.serviceList} ref={listRef} onScroll={handleScroll}>
            {services.map((service, i) => {
              const Icon = ICON_REGISTRY[service.icon];
              return (
                <button
                  key={service._id}
                  className={`${styles.serviceItem} ${i === selected ? styles.serviceItemActive : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <div className={styles.serviceIconWrap}>
                    {Icon ? <Icon /> : null}
                  </div>
                  <h4>{service.title}</h4>
                </button>
              );
            })}
          </div>

          <div className={`${styles.scrollHint} ${showHint ? "" : styles.hidden}`}>
            <span className={styles.scrollHintArrow}>›</span>
            <span>Scroll for more</span>
          </div>
        </div>

        <div className={styles.serviceDisplay}>
          <div className={styles.serviceImage}>
            <AppImage src={active.image} alt={active.title} />
          </div>
          <div className={styles.serviceDescription}>
            <h3>{active?.title}</h3>
            <p>{active?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
