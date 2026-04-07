"use client";

import { useState, useEffect } from "react";
import { useAppointmentsStore } from "@/app/store/Appointments";
import { useServicesStore } from "@/app/store/Services";
import { useTestimonialsStore } from "@/app/store/Testimonials";
import { useCommentsStore } from "@/app/store/Comments";
import FormInput from "@/app/components/ui/FormInput";
import SectionLabel from "@/app/components/ui/SectionLabel";
import styles from "@/app/styles/appointment.module.css";
import { FiArrowRight as ArrowRight } from "react-icons/fi";
import { FaStar as StarIcon } from "react-icons/fa";
import { toast } from "sonner";

const TABS = ["Consultation", "Appointment"];
const EMPTY_CONSULTATION = { firstName: "", lastName: "", email: "", phone: "", message: "" };
const EMPTY_APPOINTMENT = { firstName: "", lastName: "", email: "", phone: "", serviceType: "", dateTime: "", message: "" };

const FALLBACK_TESTIMONIALS = [
  {
    _id: "f1",
    name: "Lauren Willis",
    content: "Olalus has been an absolute blessing for our family. The caregivers are professional, compassionate, and truly dedicated to my mother's wellbeing.",
    rating: 5,
    position: "Family Member",
  },
  {
    _id: "f2",
    name: "James Carter",
    content: "Outstanding service from start to finish. The team went above and beyond to ensure my father received the best possible care.",
    rating: 5,
    position: "Client's Son",
  },
];

export default function AppointmentSection() {
  const { submit, loading } = useAppointmentsStore();
  const { services, fetchServices } = useServicesStore();
  const { testimonials, fetchTestimonials } = useTestimonialsStore();
  const { approvedComments, fetchApprovedComments } = useCommentsStore();
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState(EMPTY_CONSULTATION);

  useEffect(() => {
    fetchServices();
    fetchTestimonials();
    fetchApprovedComments();
  }, []);

  const handleTabChange = (i) => {
    setActiveTab(i);
    setForm(i === 0 ? EMPTY_CONSULTATION : EMPTY_APPOINTMENT);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("Please fill in your first name, last name and email.");
      return;
    }
    const result = await submit({ ...form, type: activeTab === 0 ? "consultation" : "appointment" });
    if (result.success) {
      toast.success("Your request has been submitted! We'll be in touch soon.");
      setForm(activeTab === 0 ? EMPTY_CONSULTATION : EMPTY_APPOINTMENT);
    } else {
      toast.error(result.message || "Submission failed. Please try again.");
    }
  };

  const all = [...approvedComments, ...testimonials];
  const displayTestimonials = all.length >= 2 ? all.slice(0, 2) : FALLBACK_TESTIMONIALS;

  return (
    <section id="appointment" className={styles.appointmentSection}>
      <div className={styles.appointmentInner}>
        <div className={styles.formCard}>
          <div className={styles.tabs}>
            {TABS.map((tab, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.tab} ${i === activeTab ? styles.tabActive : ""}`}
                onClick={() => handleTabChange(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className={styles.formTitle}>
            Book Your {TABS[activeTab]} Today!
          </h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <FormInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required />
              <FormInput label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required />
            </div>

            <div className={styles.row}>
              <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              <FormInput label="Phone" name="phone" value={form.phone || ""} onChange={handleChange} placeholder="(234) 000-0000" />
            </div>

            {activeTab === 1 && (
              <div className={styles.row}>
                <FormInput label="Service Type" name="serviceType" as="select" value={form.serviceType || ""} onChange={handleChange}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s._id} value={s.title}>{s.title}</option>
                  ))}
                </FormInput>
                <FormInput label="Date & Time" name="dateTime" type="datetime-local" value={form.dateTime || ""} onChange={handleChange} />
              </div>
            )}

            <FormInput label="Message" name="message" as="textarea" value={form.message || ""} onChange={handleChange} rows={4} placeholder="Tell us about your care needs..." />

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Submitting..." : `Book ${TABS[activeTab]}`}
              {!loading && <ArrowRight className={styles.arrowIcon} />}
            </button>
          </form>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.sideColHeader}>
            <SectionLabel text="What clients say" heading="Trusted by Families" />
          </div>

          <div className={styles.testimonialList}>
            {displayTestimonials.map((t) => (
              <div key={t._id} className={styles.miniCard}>
                <p className={styles.miniQuote}>&ldquo;{t.content}&rdquo;</p>
                <div className={styles.miniReviewer}>
                  <div className={styles.miniInitial}>
                    {t.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.miniInfo}>
                    <strong>{t.name}</strong>
                    {t.position && <span>{t.position}</span>}
                  </div>
                  <div className={styles.miniStars}>
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <StarIcon key={j} className={styles.miniStar} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>200+</span>
              <span className={styles.statLabel}>Appointments</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>300+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>11+</span>
              <span className={styles.statLabel}>Years of Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
