import emailjs from "@emailjs/browser";

// ── EmailJS Configuration ──────────────────────────────────────────
// Create an account at https://www.emailjs.com/ and fill in these values.
// 1. Add a Gmail service → copy the Service ID
// 2. Create 3 email templates (quote, configurator-quote, newsletter) → copy Template IDs
// 3. Copy your Public Key from Account → General
export const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
export const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export const TEMPLATE_IDS = {
  quote: "YOUR_QUOTE_TEMPLATE_ID",
  configuratorQuote: "YOUR_CONFIGURATOR_QUOTE_TEMPLATE_ID",
  newsletter: "YOUR_NEWSLETTER_TEMPLATE_ID",
} as const;

type TemplateKey = keyof typeof TEMPLATE_IDS;

export async function sendEmail(
  template: TemplateKey,
  params: Record<string, string>,
) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    TEMPLATE_IDS[template],
    params,
    EMAILJS_PUBLIC_KEY,
  );
}
