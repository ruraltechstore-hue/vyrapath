import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { contactInfo } from "@/data/site";

const contactEmails = contactInfo.emails.join(" or ");

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — VYRAPATH" }, { name: "description", content: "The terms that govern your use of VYRAPATH services." }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <LegalLayout title="Terms & Conditions" subtitle="The rules that govern your use of our website and services.">
      <p>By purchasing a service or using this website, you agree to these Terms & Conditions.</p>
      <h2>Services</h2>
      <p>We provide resume, portfolio, LinkedIn and certification services as described on our pricing and services pages. Delivery timelines are estimates and may vary based on scope and your response time during revisions.</p>
      <h2>Client responsibilities</h2>
      <ul>
        <li>Provide accurate information for the resumes and profiles we create.</li>
        <li>Respond to revision requests within a reasonable window.</li>
        <li>Not misrepresent qualifications, credentials or experience.</li>
      </ul>
      <h2>No guarantees</h2>
      <p>We do not guarantee interviews, offers or interview calls. What we deliver is a high-quality set of career assets built to industry best practices.</p>
      <h2>Intellectual property</h2>
      <p>Once payment is complete, you own the final deliverables. Drafts and internal materials remain our property.</p>
      <h2>Limitation of liability</h2>
      <p>Our maximum liability for any claim is limited to the amount you paid for the service in question.</p>
      <h2>Contact</h2>
      <p>Questions? {contactEmails}.</p>
    </LegalLayout>
  ),
});
