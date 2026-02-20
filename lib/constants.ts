export const SITE_NAME = "A-Town Printers";

/** Phone number for WhatsApp and tel: links (E.164 without +). Replace with real number. */
export const CONTACT_PHONE = " 07508 729 279";

/** AI usage & accuracy notice (client-provided comprehensive disclaimer). */
export const AI_POLICY_TEXT = `To enhance your experience, A-Town Printers utilizes advanced AI technologies (including LLMs and image generators).

Content Origin: Some text and visual assets may be AI-generated.

No Professional Advice: AI-generated responses are not a substitute for professional advice. Always consult a qualified expert for legal, design, or print-related matters.

Liability: We are not responsible for any inaccuracies or "hallucinations" produced by our AI tools. Users interact with these features at their own risk.`;

/** Google Maps embed URL for footer. Replace with your business location embed from Google Maps (Share → Embed a map). */
export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4970.882551294935!2d-0.106778!3d51.468414!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876046365008cd3%3A0xb7b94fa166ee9f52!2sLangport%20House%2C%20London%20SW9%207HN%2C%20UK!5e0!3m2!1sen!2s!4v1771602617551!5m2!1sen!2s";

export const ROUTES = {
  home: "/",
  clothing: "/clothing",
  largeFormat: "/large-format",
  printMarketing: "/print-marketing",
  quote: "/quote",
  upload: "/upload",
} as const;
