"use client";

import { useState } from "react";
import { toast } from "sonner";
import styles from "@/app/styles/physical.module.css";
import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

const YesNo = ({ question, name, value, onChange }) => (
  <div>
    <p className={styles.questionText}>{question}</p>
    <div className={styles.radioOptions}>
      {["yes", "no"].map((v) => (
        <label key={v} className={styles.radioOption}>
          <input type="radio" name={name} value={v} checked={value === v} onChange={onChange} />
          {v === "yes" ? "Yes" : "No"}
        </label>
      ))}
    </div>
  </div>
);

export default function PhysicalPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    dateOfExam: "",
    employeeName: "",
    physicianName: "",
    physicianPhone: "",
    physicianAddress: "",
    contagiousDisease: "",
    contagiousDiseaseExplanation: "",
    freeOfCommunicableDisease: "",
    medicalIssues: "",
    medicalIssuesExplanation: "",
    canLift40Pounds: "",
    canLift40PoundsExplanation: "",
    tbTestGiven: "",
    tbTestNotGivenReason: "",
    tbTestResultsMm: "",
    tbTestResult: "",
    physicianSignature: "",
    physicianSignatureDate: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.employeeName || !form.physicianName || !form.dateOfExam) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/physical-exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.message || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.physicalPage}>
        <div className={styles.physicalHeader}>
          <h1>Form Submitted</h1>
        </div>
        <div className={styles.physicalBody}>
          <div className={styles.successBanner}>
            <h3>Physical Examination Record Submitted</h3>
            <p>
              The physical examination record has been received. Our HR team will review the results and follow up if additional information is needed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.physicalPage}>
      <div className={styles.physicalHeader}>
        <h1>Physical Examination Record</h1>
        <p>
          Employee Physical Examination Record and TB Testing — to be completed before the start of work.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.physicalBody}>

        {/* ── EMPLOYEE INFORMATION ──────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Employee Information</h2>
          <div className={styles.formRow}>
            <FormInput label="Date of Physical Examination" name="dateOfExam" type="date" value={form.dateOfExam} onChange={handleChange} required />
          </div>
          <FormInput label="Employee's Full Name" name="employeeName" value={form.employeeName} onChange={handleChange} placeholder="Full legal name" required />
        </section>

        {/* ── PHYSICIAN INFORMATION ─────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Physician Information</h2>
          <div className={styles.formRow}>
            <FormInput label="Physician's Name" name="physicianName" value={form.physicianName} onChange={handleChange} placeholder="Dr. Full Name" required />
            <FormInput label="Phone Number" name="physicianPhone" type="tel" value={form.physicianPhone} onChange={handleChange} placeholder="(610) 000-0000" />
          </div>
          <FormInput label="Physician's Address" name="physicianAddress" value={form.physicianAddress} onChange={handleChange} placeholder="Street, City, State, Zip" />
        </section>

        {/* ── PHYSICIAN ASSESSMENT ──────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Physician Assessment</h2>
          <p className={styles.sectionSubtitle}>To be completed by Physician / Nurse Practitioner</p>

          {/* Question 1 */}
          <div className={styles.questionBlock}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>1.</span>
              <YesNo question="Are there any contagious diseases present?" name="contagiousDisease" value={form.contagiousDisease} onChange={handleChange} />
            </div>
            {form.contagiousDisease === "yes" && (
              <FormInput as="textarea" name="contagiousDiseaseExplanation" label="Please explain" value={form.contagiousDiseaseExplanation} onChange={handleChange} placeholder="Describe the condition..." rows={3} />
            )}
          </div>

          {/* Question 2 */}
          <div className={styles.questionBlock}>
            <span className={styles.questionNumber}>2.</span>
            <YesNo question="Free of Communicable Disease?" name="freeOfCommunicableDisease" value={form.freeOfCommunicableDisease} onChange={handleChange} />
          </div>

          {/* Question 3 */}
          <div className={styles.questionBlock}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>3.</span>
              <YesNo question="Does this staff have any other medical issues which might interfere with the health, safety or well-being of individuals with whom he/she may come into direct contact with?" name="medicalIssues" value={form.medicalIssues} onChange={handleChange} />
            </div>
            {form.medicalIssues === "yes" && (
              <FormInput as="textarea" name="medicalIssuesExplanation" label="Please explain" value={form.medicalIssuesExplanation} onChange={handleChange} placeholder="Describe the medical issues..." rows={3} />
            )}
          </div>

          {/* Question 4 */}
          <div className={styles.questionBlock}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>4.</span>
              <YesNo question="Does this staff have the ability to bend or lift at least 40 pounds?" name="canLift40Pounds" value={form.canLift40Pounds} onChange={handleChange} />
            </div>
            {form.canLift40Pounds === "no" && (
              <FormInput name="canLift40PoundsExplanation" label="Please explain" value={form.canLift40PoundsExplanation} onChange={handleChange} placeholder="Explain limitations..." />
            )}
          </div>

          {/* Question 5 — TB Test */}
          <div className={styles.tbSection}>
            <p className={styles.tbTitle}>
              5. One Step Mantoux Tuberculin Skin Test (PPD) — required and should be done 30 days prior to work.
            </p>

            <div>
              <YesNo question="A. Mantoux TB (PPD) test given?" name="tbTestGiven" value={form.tbTestGiven} onChange={handleChange} />
            </div>

            {form.tbTestGiven === "no" && (
              <FormInput name="tbTestNotGivenReason" label="If not given, why?" value={form.tbTestNotGivenReason} onChange={handleChange} placeholder="Reason test was not given" />
            )}

            {form.tbTestGiven === "yes" && (
              <div className={styles.tbResults}>
                <FormInput name="tbTestResultsMm" label="Results (mm)" type="number" value={form.tbTestResultsMm} onChange={handleChange} placeholder="e.g. 0" min="0" />
                <div>
                  <p className={styles.tbResultLabel}>Result:</p>
                  <div className={styles.tbCheckOptions}>
                    {["positive", "negative"].map((v) => (
                      <label key={v} className={styles.radioOption}>
                        <input type="radio" name="tbTestResult" value={v} checked={form.tbTestResult === v} onChange={handleChange} />
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── PHYSICIAN SIGNATURE ───────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Physician Signature</h2>
          <p className={styles.signatureNote}>
            This form is not complete until the results are read and reported. Please apply office stamp where required.
          </p>
          <div className={styles.formRow}>
            <FormInput label="Physician / Nurse Practitioner Name (type full name as signature)" name="physicianSignature" value={form.physicianSignature} onChange={handleChange} placeholder="Full name as signature" required />
            <FormInput label="Date" name="physicianSignatureDate" type="date" value={form.physicianSignatureDate} onChange={handleChange} required />
          </div>
        </section>

        <div className={styles.formActions}>
          <FormButton type="submit" loading={loading} variant="primary">
            Submit Examination Record
          </FormButton>
        </div>
      </form>
    </div>
  );
}
