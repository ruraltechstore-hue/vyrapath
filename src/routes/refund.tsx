import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { contactInfo } from "@/data/site";

const contactEmails = contactInfo.emails.join(" or ");

export const Route = createFileRoute("/refund")({
  head: () => ({ meta: [{ title: "Refund & Cancellation Policy — VYRAPATH" }, { name: "description", content: "Our refund and cancellation terms." }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <LegalLayout title="Refund & Cancellation Policy" subtitle="Fair refunds. Clear conditions.">
      <p>We want you to be happy with what we deliver. Here's how refunds and cancellations work.</p>
      <h2>Before work begins</h2>
      <p>If you cancel before we start work, you receive a full refund minus payment-processing fees.</p>
      <h2>After drafts are shared</h2>
      <p>Once we've delivered a first draft, partial refunds are available at our discretion based on the work completed. We'll always try to resolve concerns with additional revisions first.</p>
      <h2>Subscription plans</h2>
      <p>Monthly subscriptions can be cancelled anytime. No refunds for the current billing period, but you retain access for what you've paid.</p>
      <h2>Applications for Job Roles</h2>
      <p>Once applications have been submitted, that portion of the package is non-refundable.</p>
      <h2>How to request</h2>
      <p>Email {contactEmails} with your order details. We'll respond within 3 business days.</p>
    </LegalLayout>
  ),
});
