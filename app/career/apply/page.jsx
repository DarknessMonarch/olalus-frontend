"use client";

import { Suspense, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import styles from "@/app/styles/apply.module.css";
import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

const emptyWork = () => ({
  employerName: "", address: "", cityStateZip: "", phone: "",
  lastSupervisor: "", employmentFrom: "", employmentTo: "",
  startPay: "", finalPay: "", lastJobTitle: "",
  reasonForLeaving: "", jobDuties: "",
});

const emptyRef = () => ({
  name: "", occupation: "", companyName: "",
  address: "", telephone: "", email: "", yearAcquainted: "",
});

const YesNo = ({ question, name, value, onChange }) => (
  <div className={styles.yesNoGroup}>
    <span className={styles.yesNoQuestion}>{question}</span>
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

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const jobPosition = searchParams.get("position") || "";

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [personal, setPersonal] = useState({
    lastName: "", firstName: "", middleName: "", maidenName: "",
    presentAddress: "", howLongInPA: "", telephone: "",
    ifUnder18Age: "", email: "",
  });

  const [employment, setEmployment] = useState({
    positionApplied: jobPosition,
    daysHoursAvailable: "", salaryDesired: "",
    hoursPerWeek: "", canWorkEvenings: "",
    employmentType: "", availableStartDate: "",
  });

  const [education, setEducation] = useState([
    { educationType: "High School", nameOfSchool: "", location: "", yearsCompleted: "", majorDegree: "" },
    { educationType: "College", nameOfSchool: "", location: "", yearsCompleted: "", majorDegree: "" },
    { educationType: "Professional / Graduate School", nameOfSchool: "", location: "", yearsCompleted: "", majorDegree: "" },
  ]);

  const [workExp, setWorkExp] = useState([emptyWork(), emptyWork(), emptyWork()]);

  const [additional, setAdditional] = useState({
    currentlyEmployed: "", contactCurrentEmployer: "",
    completedSelf: "yes", ifNotWho: "",
    convictedFelony: "", felonyExplanation: "",
    armedForces: "", armedForcesSpecialty: "",
    armedForcesDateEntered: "", armedForcesDischargeDate: "",
    nationalGuard: "", proofOfCitizenship: "",
    previouslyEmployedHere: "", previouslyEmployedWhen: "",
    relativesEmployed: "", relativesNames: "",
    reliableTransportation: "", canPerformEssentialFunctions: "",
    cannotPerformDescription: "",
  });

  const [refs, setRefs] = useState([emptyRef(), emptyRef(), emptyRef()]);

  const [waiver, setWaiver] = useState({
    initials1: "", initials2: "", initials3: "",
    signature: "", signatureDate: "",
  });

  const upPersonal = (e) => setPersonal((p) => ({ ...p, [e.target.name]: e.target.value }));
  const upEmployment = (e) => setEmployment((p) => ({ ...p, [e.target.name]: e.target.value }));
  const upAdditional = (e) => setAdditional((p) => ({ ...p, [e.target.name]: e.target.value }));
  const upWaiver = (e) => setWaiver((p) => ({ ...p, [e.target.name]: e.target.value }));

  const upEducation = (i, e) =>
    setEducation((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [e.target.name]: e.target.value } : row))
    );

  const upWork = (i, e) =>
    setWorkExp((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [e.target.name]: e.target.value } : row))
    );

  const upRef = (i, e) =>
    setRefs((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [e.target.name]: e.target.value } : row))
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personal.firstName || !personal.lastName || !personal.email || !employment.positionApplied) {
      toast.error("Please fill all required fields (name, email, position)");
      return;
    }
    if (!waiver.signature) {
      toast.error("Your signature is required to complete the application");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        firstName: personal.firstName,
        lastName: personal.lastName,
        email: personal.email,
        phone: personal.telephone,
        position: employment.positionApplied,
        personalInfo: personal,
        employmentDesired: employment,
        education,
        workExperience: workExp,
        additionalQuestions: additional,
        references: refs,
        waiver,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/jobs/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className={styles.applyPage}>
        <div className={styles.applyHeader}>
          <h1>Application Submitted</h1>
        </div>
        <div className={styles.applyBody}>
          <div className={styles.successBanner}>
            <h3>Thank you for applying!</h3>
            <p>
              We have received your application and will review it shortly. If your qualifications match our needs, we will contact you to arrange an interview.
            </p>
            <p>Thank you for your interest in joining Olalus Group, LLC.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.applyPage}>
      <div className={styles.applyHeader}>
        <h1>Employment Application</h1>
        <p>
          Please complete all sections of this application. All information provided will be kept confidential and used only for employment consideration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.applyBody}>

        {/* ── PERSONAL INFORMATION ──────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <div className={styles.formRow}>
            <FormInput label="Last Name" name="lastName" value={personal.lastName} onChange={upPersonal} placeholder="Last name" required />
            <FormInput label="First Name" name="firstName" value={personal.firstName} onChange={upPersonal} placeholder="First name" required />
            <FormInput label="Middle Name" name="middleName" value={personal.middleName} onChange={upPersonal} placeholder="Middle name" />
            <FormInput label="Maiden Name" name="maidenName" value={personal.maidenName} onChange={upPersonal} placeholder="Maiden name" />
          </div>
          <FormInput label="Present Address" name="presentAddress" value={personal.presentAddress} onChange={upPersonal} placeholder="Street, City, State, Zip" />
          <div className={styles.formRow}>
            <FormInput label="How Long in PA" name="howLongInPA" value={personal.howLongInPA} onChange={upPersonal} placeholder="e.g. 5 years" />
            <FormInput label="Telephone" name="telephone" type="tel" value={personal.telephone} onChange={upPersonal} placeholder="(610) 000-0000" />
          </div>
          <div className={styles.formRow}>
            <FormInput label="Email Address" name="email" type="email" value={personal.email} onChange={upPersonal} placeholder="you@example.com" required />
            <FormInput label="If Under 18, Please List Age" name="ifUnder18Age" value={personal.ifUnder18Age} onChange={upPersonal} placeholder="Age (if applicable)" />
          </div>
        </section>

        {/* ── EMPLOYMENT DESIRED ────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Employment Desired</h2>
          <div className={styles.formRow}>
            <FormInput label="Position(s) Applied For" name="positionApplied" value={employment.positionApplied} onChange={upEmployment} placeholder="Position title" required />
            <FormInput label="Days / Hours Available to Work" name="daysHoursAvailable" value={employment.daysHoursAvailable} onChange={upEmployment} placeholder="e.g. Mon–Fri, 9am–5pm" />
          </div>
          <div className={styles.formRow}>
            <FormInput label="Salary Desired" name="salaryDesired" value={employment.salaryDesired} onChange={upEmployment} placeholder="e.g. $18/hr" />
            <FormInput label="How Many Hours Can You Work Weekly" name="hoursPerWeek" value={employment.hoursPerWeek} onChange={upEmployment} placeholder="e.g. 40" />
          </div>
          <div className={styles.formRow}>
            <YesNo question="Can you work evenings?" name="canWorkEvenings" value={employment.canWorkEvenings} onChange={upEmployment} />
            <FormInput label="Date Available to Start" name="availableStartDate" type="date" value={employment.availableStartDate} onChange={upEmployment} />
          </div>
          <div className={styles.checkGroup}>
            <span className={styles.checkGroupLabel}>Employment Desired</span>
            <div className={styles.checkOptions}>
              {[
                { value: "full-time", label: "Full-Time Only" },
                { value: "part-time", label: "Part-Time Only" },
                { value: "full-or-part-time", label: "Full- or Part-Time" },
              ].map((opt) => (
                <label key={opt.value} className={styles.checkOption}>
                  <input type="radio" name="employmentType" value={opt.value} checked={employment.employmentType === opt.value} onChange={upEmployment} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ─────────────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((row, i) => (
            <div key={i} className={styles.educationRow}>
              <span className={styles.rowTypeLabel}>{row.educationType}</span>
              <FormInput name="nameOfSchool" label="Name of School" value={row.nameOfSchool} onChange={(e) => upEducation(i, e)} placeholder="School name" />
              <FormInput name="location" label="Location" value={row.location} onChange={(e) => upEducation(i, e)} placeholder="City, State" />
              <FormInput name="yearsCompleted" label="Years Completed" value={row.yearsCompleted} onChange={(e) => upEducation(i, e)} placeholder="e.g. 4" />
              <FormInput name="majorDegree" label="Major & Degree" value={row.majorDegree} onChange={(e) => upEducation(i, e)} placeholder="e.g. B.S. Nursing" />
            </div>
          ))}
        </section>

        {/* ── WORK EXPERIENCE ───────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <p className={styles.sectionNote}>
            Please list your work experience for the past five years beginning with your most recent job held. If self-employed, give firm name.
          </p>
          {workExp.map((exp, i) => (
            <div key={i} className={styles.experienceBlock}>
              <span className={styles.rowTypeLabel}>Employer {i + 1}</span>
              <div className={styles.formRow}>
                <FormInput name="employerName" label="Name of Employer" value={exp.employerName} onChange={(e) => upWork(i, e)} placeholder="Company name" />
                <FormInput name="address" label="Address" value={exp.address} onChange={(e) => upWork(i, e)} placeholder="Street address" />
              </div>
              <div className={styles.formRow}>
                <FormInput name="cityStateZip" label="City, State, Zip" value={exp.cityStateZip} onChange={(e) => upWork(i, e)} placeholder="City, State ZIP" />
                <FormInput name="phone" label="Phone Number" type="tel" value={exp.phone} onChange={(e) => upWork(i, e)} placeholder="(610) 000-0000" />
              </div>
              <div className={styles.formRow}>
                <FormInput name="lastSupervisor" label="Name of Last Supervisor" value={exp.lastSupervisor} onChange={(e) => upWork(i, e)} placeholder="Supervisor name" />
                <FormInput name="lastJobTitle" label="Your Last Job Title" value={exp.lastJobTitle} onChange={(e) => upWork(i, e)} placeholder="Job title" />
              </div>
              <div className={styles.formRow}>
                <FormInput name="employmentFrom" label="From" type="date" value={exp.employmentFrom} onChange={(e) => upWork(i, e)} />
                <FormInput name="employmentTo" label="To" type="date" value={exp.employmentTo} onChange={(e) => upWork(i, e)} />
                <FormInput name="startPay" label="Starting Pay" value={exp.startPay} onChange={(e) => upWork(i, e)} placeholder="e.g. $15/hr" />
                <FormInput name="finalPay" label="Final Pay" value={exp.finalPay} onChange={(e) => upWork(i, e)} placeholder="e.g. $18/hr" />
              </div>
              <FormInput name="reasonForLeaving" label="Reason for Leaving (be specific)" value={exp.reasonForLeaving} onChange={(e) => upWork(i, e)} placeholder="Reason for leaving" />
              <FormInput as="textarea" name="jobDuties" label="Jobs held, duties performed, skills used or learned, advancements or promotions" value={exp.jobDuties} onChange={(e) => upWork(i, e)} placeholder="Describe your duties, skills, and advancements..." rows={4} />
            </div>
          ))}
        </section>

        {/* ── ADDITIONAL QUESTIONS ──────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Additional Questions</h2>

          <YesNo question="Are you currently employed?" name="currentlyEmployed" value={additional.currentlyEmployed} onChange={upAdditional} />
          <YesNo question="May we contact your present employer?" name="contactCurrentEmployer" value={additional.contactCurrentEmployer} onChange={upAdditional} />
          <YesNo question="Did you complete this application yourself?" name="completedSelf" value={additional.completedSelf} onChange={upAdditional} />

          {additional.completedSelf === "no" && (
            <FormInput name="ifNotWho" label="If not, who did?" value={additional.ifNotWho} onChange={upAdditional} placeholder="Name of person who completed this form" />
          )}

          <YesNo question="Have you ever been convicted of a felony?" name="convictedFelony" value={additional.convictedFelony} onChange={upAdditional} />
          {additional.convictedFelony === "yes" && (
            <FormInput as="textarea" name="felonyExplanation" label="Please explain (number of convictions, nature of offense, sentence imposed, rehabilitation)" value={additional.felonyExplanation} onChange={upAdditional} placeholder="Explain..." rows={3} />
          )}

          <YesNo question="Have you ever been in the armed forces?" name="armedForces" value={additional.armedForces} onChange={upAdditional} />
          {additional.armedForces === "yes" && (
            <div className={styles.formRow}>
              <FormInput name="armedForcesSpecialty" label="Specialty" value={additional.armedForcesSpecialty} onChange={upAdditional} placeholder="Military specialty" />
              <FormInput name="armedForcesDateEntered" label="Date Entered" type="date" value={additional.armedForcesDateEntered} onChange={upAdditional} />
              <FormInput name="armedForcesDischargeDate" label="Discharge Date" type="date" value={additional.armedForcesDischargeDate} onChange={upAdditional} />
            </div>
          )}

          <YesNo question="Are you now a member of the National Guard?" name="nationalGuard" value={additional.nationalGuard} onChange={upAdditional} />
          <YesNo question="If hired, can you provide proof of U.S. citizenship or legal right to live and work in this country?" name="proofOfCitizenship" value={additional.proofOfCitizenship} onChange={upAdditional} />

          <YesNo question="Have you ever been employed with this company?" name="previouslyEmployedHere" value={additional.previouslyEmployedHere} onChange={upAdditional} />
          {additional.previouslyEmployedHere === "yes" && (
            <FormInput name="previouslyEmployedWhen" label="If yes, when?" value={additional.previouslyEmployedWhen} onChange={upAdditional} placeholder="Date / year" />
          )}

          <YesNo question="Do you have any friends or relatives employed by this company?" name="relativesEmployed" value={additional.relativesEmployed} onChange={upAdditional} />
          {additional.relativesEmployed === "yes" && (
            <FormInput name="relativesNames" label="Please provide their names and relationship to you" value={additional.relativesNames} onChange={upAdditional} placeholder="Name — Relationship" />
          )}

          <YesNo question="If hired, would you have a reliable means of transportation to and from work?" name="reliableTransportation" value={additional.reliableTransportation} onChange={upAdditional} />
          <YesNo question="Are you able to perform the essential functions and duties of the job for which you are applying?" name="canPerformEssentialFunctions" value={additional.canPerformEssentialFunctions} onChange={upAdditional} />
          {additional.canPerformEssentialFunctions === "no" && (
            <FormInput as="textarea" name="cannotPerformDescription" label="Please describe the functions or duties you are unable to perform" value={additional.cannotPerformDescription} onChange={upAdditional} placeholder="Describe limitations..." rows={3} />
          )}
        </section>

        {/* ── REFERENCES ────────────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>References</h2>
          <p className={styles.sectionNote}>
            Please list three persons not related to you who have knowledge of your work performance and/or personal qualifications within the last 6 years.
          </p>
          {refs.map((ref, i) => (
            <div key={i} className={styles.referenceBlock}>
              <span className={styles.rowTypeLabel}>Reference {i + 1}</span>
              <div className={styles.formRow}>
                <FormInput name="name" label="Name" value={ref.name} onChange={(e) => upRef(i, e)} placeholder="Full name" />
                <FormInput name="occupation" label="Occupation" value={ref.occupation} onChange={(e) => upRef(i, e)} placeholder="Their occupation" />
              </div>
              <div className={styles.formRow}>
                <FormInput name="companyName" label="Company Name" value={ref.companyName} onChange={(e) => upRef(i, e)} placeholder="Company name" />
                <FormInput name="address" label="Address" value={ref.address} onChange={(e) => upRef(i, e)} placeholder="Street, City, State" />
              </div>
              <div className={styles.formRow}>
                <FormInput name="telephone" label="Telephone" type="tel" value={ref.telephone} onChange={(e) => upRef(i, e)} placeholder="(610) 000-0000" />
                <FormInput name="email" label="Email" type="email" value={ref.email} onChange={(e) => upRef(i, e)} placeholder="email@example.com" />
                <FormInput name="yearAcquainted" label="Year Acquainted" value={ref.yearAcquainted} onChange={(e) => upRef(i, e)} placeholder="e.g. 2019" />
              </div>
            </div>
          ))}
        </section>

        {/* ── WAIVER ────────────────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Application Form Waiver</h2>
          <p className={styles.waiverIntro}>Please read each paragraph closely, initial each, and sign below.</p>

          {[
            {
              key: "initials1",
              text: "I hereby certify that I have not knowingly withheld any information that might adversely affect my chances for employment and that the answers given by me are true and correct to the best of my knowledge. I further certify that I, the undersigned applicant, have personally completed this application. I understand that any omission or misstatement of material fact on this application or any other document used to secure employment shall be grounds for rejection of this application or for immediate discharge if I am employed, regardless of the time elapsed before discovery.",
            },
            {
              key: "initials2",
              text: "I hereby authorize Olalus Group, LLC to thoroughly investigate my references, work records, education, driving record, credit history, criminal background and other matters related to my suitability for employment. I further authorize the employers, schools and other references I have listed to disclose to Olalus Group, LLC any and all documents, transcripts, letters, reports and other information related to these references, without giving me prior notice of such disclosure. I hereby release Olalus Group, LLC, my former employers, and all other persons, corporations, partnerships and associations from any and all claims, demands or liabilities arising out of or in any way related to such investigation or disclosures.",
            },
            {
              key: "initials3",
              text: 'I understand that nothing contained in the application, or conveyed during any interview which may be granted, or during my employment, if hired, is intended to create an employment contract between me and Olalus Group, LLC, other than one that is "at will." I understand and agree that if I am employed; my employment will be of an "at will" nature, whereby either the employee or the employer may terminate the employment relationship at any time, with or without cause or notice. I further understand that my employment, if hired, is for no definite or determinable period of time and may be terminated at any time, at the option of either myself or Olalus Group LLC, and that no promise or representation contrary to the foregoing is binding on the company unless made in writing and signed by me and the company\'s designated representative.',
            },
          ].map(({ key, text }) => (
            <div key={key} className={styles.waiverParagraph}>
              <p className={styles.waiverText}>{text}</p>
              <div className={styles.waiverInitialRow}>
                <span className={styles.waiverInitialLabel}>Initials:</span>
                <FormInput name={key} value={waiver[key]} onChange={upWaiver} placeholder="Your initials" />
              </div>
            </div>
          ))}

          <div className={styles.formRow}>
            <FormInput label="Signature (type your full legal name)" name="signature" value={waiver.signature} onChange={upWaiver} placeholder="Full name as signature" required />
            <FormInput label="Date" name="signatureDate" type="date" value={waiver.signatureDate} onChange={upWaiver} />
          </div>

          <p className={styles.eoNote}>
            Olalus Group, LLC is an equal employment opportunity employer. We adhere to a policy of making employment decisions without regard to race, color, religion, sex, sexual orientation, national origin, citizenship, age, or disability. We assure you that your opportunity for employment with Olalus Group, LLC depends solely on your qualifications.
          </p>
        </section>

        <div className={styles.formActions}>
          <FormButton type="submit" loading={loading} variant="primary">
            Submit Application
          </FormButton>
        </div>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyFormContent />
    </Suspense>
  );
}
