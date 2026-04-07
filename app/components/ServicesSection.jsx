"use client";

import { useState, useEffect, useRef } from "react";
import AppImage from "@/app/components/ui/AppImage";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/services.module.css";
import { useServicesStore } from "@/app/store/Services";

import { Ri24HoursFill as HoursIcon } from "react-icons/ri";
import { RiNurseFill as NurseIcon } from "react-icons/ri";
import { MdSelfImprovement as RespiteIcon } from "react-icons/md";
import { MdHandshake as SupportIcon } from "react-icons/md";

const DEFAULT_SERVICES = [
  {
    _id: "1",
    title: "24 Hour Living Services",
    description:
      "Olalus feels it's essential to find ways to ease the caretaker frustrations that come with Alzheimer's disease and dementia-related disorders. These difficulties don't just affect the person living with the condition but also the entire family. Tied caregivers imagine living together so they all can support the person living with dementia. Olalus care staff finds way to provide quality of life that our clients deserve because each of our clients are unique, our dementia care program treats them uniquely.",
    Icon: HoursIcon,
    image: "https://images.pexels.com/photos/7446987/pexels-photo-7446987.jpeg",
  },
  {
    _id: "2",
    title: "Nursing Care",
    description:
      "Our professional nursing team provides comprehensive medical support and monitoring for clients who require skilled nursing care in the comfort of their own homes. We ensure safety and wellbeing at every step.",
    Icon: NurseIcon,
    image: "https://images.pexels.com/photos/5327654/pexels-photo-5327654.jpeg",
  },
  {
    _id: "3",
    title: "Respite Care",
    description:
      "We provide temporary relief to primary caregivers, giving them time to rest while ensuring their loved ones receive quality care. Our trained staff steps in to provide seamless, compassionate support.",
    Icon: RespiteIcon,
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  },
  {
    _id: "4",
    title: "Home & Community Support",
    description:
      "Our homemaker services assist clients with daily tasks including light housekeeping, preparing meals, using medications, shopping for groceries or clothes, and community participation activities that enable independent living.",
    Icon: SupportIcon,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
   
];

export default function ServicesSection() {
  const { services, fetchServices } = useServicesStore();
  const [selected, setSelected] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // Check for overflow on mount and when services change
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        const overflow = el.scrollHeight > el.clientHeight + 4;
        setHasOverflow(overflow);
        setIsScrolledToEnd(
          el.scrollTop + el.clientHeight >= el.scrollHeight - 8
        );
      } else {
        const overflow = el.scrollWidth > el.clientWidth + 4;
        setHasOverflow(overflow);
        setIsScrolledToEnd(
          el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
        );
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

  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES;
  const active = displayServices[selected];
  const showHint = hasOverflow && !isScrolledToEnd;

  return (
    <section className={styles.servicesSection}>
      <SectionLabel
        text="Our Services"
        heading="We Provide The Following"
        center={true}
      />
      <div className={styles.serviceContent}>
        <div className={styles.serviceListWrapper}>
          <div
            className={styles.serviceList}
            ref={listRef}
            onScroll={handleScroll}
          >
            {displayServices.map((service, i) => {
              const Icon = service.Icon;
              return (
                <button
                  key={i}
                  className={`${styles.serviceItem} ${i === selected ? styles.serviceItemActive : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <div className={styles.serviceIconWrap}>
                    {Icon ? <Icon /> : service.icon}
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