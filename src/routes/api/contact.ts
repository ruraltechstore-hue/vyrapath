import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { contactFormSchema } from "@/lib/contact-schema";
import { contactInfo } from "@/data/site";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
          console.error("WEB3FORMS_ACCESS_KEY is not configured");
          return Response.json(
            { success: false, message: "Contact form is not configured." },
            { status: 500 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { success: false, message: "Invalid request body." },
            { status: 400 },
          );
        }

        const parsed = contactFormSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { success: false, message: "Validation failed.", issues: parsed.error.issues },
            { status: 400 },
          );
        }

        const { name, mobile, email, domain, message, botcheck } = parsed.data;
        if (botcheck) {
          return Response.json({ success: true });
        }

        const supportEmail = contactInfo.emails[0];
        const composedMessage = [
          `Domain / field: ${domain}`,
          "",
          message,
          "",
          `— Submitted via VYRAPATH contact form`,
        ].join("\n");

        const web3Response = await fetch(WEB3FORMS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `VYRAPATH contact: ${name}`,
            from_name: name,
            name,
            email,
            phone: mobile,
            message: composedMessage,
            botcheck: "",
          }),
        });

        let result: { success?: boolean; message?: string };
        try {
          result = await web3Response.json();
        } catch {
          console.error("Web3Forms returned a non-JSON response", web3Response.status);
          return Response.json(
            { success: false, message: "Failed to send message. Please try again later." },
            { status: 502 },
          );
        }

        if (!web3Response.ok || !result.success) {
          console.error("Web3Forms error:", result.message ?? web3Response.status);
          return Response.json(
            { success: false, message: "Failed to send message. Please try again later." },
            { status: 502 },
          );
        }

        return Response.json({ success: true, to: supportEmail });
      },
    },
  },
});
