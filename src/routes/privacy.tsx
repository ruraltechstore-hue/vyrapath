import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { contactInfo } from "@/data/site";

const contactEmails = contactInfo.emails.join(" or ");

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — VYRAPATH" }, { name: "description", content: "How VYRAPATH collects, uses and protects your information." }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <LegalLayout title="Privacy Policy" subtitle="How we handle your information.">
      <p>This Privacy Policy explains what information VYRAPATH collects when you use our website and services, how we use it, and the choices you have. This page is maintained by VYRAPATH and describes practices controlled by our team.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you submit (name, email, phone, domain of interest).</li>
        <li>Content you share for us to work on (resume drafts, portfolio links, LinkedIn URLs).</li>
        <li>Basic analytics such as pages visited and referring source.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To deliver the services you purchase.</li>
        <li>To respond to your enquiries within our published response window.</li>
        <li>To improve the site and our offerings.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share data only with service providers strictly necessary to operate our business (e.g. payment processors), under confidentiality obligations.</p>
      <h2>ATS Score Checker</h2>
      <p>Files uploaded to the ATS Score Checker are processed entirely in your browser. Nothing is uploaded to our servers.</p>
      <h2>Your choices</h2>
      <p>You may request access to, correction of, or deletion of your personal information at any time by emailing {contactEmails}.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email {contactEmails}.</p>
    </LegalLayout>
  ),
});
