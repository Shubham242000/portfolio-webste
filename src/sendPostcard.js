// Where postcards from the "Let's talk" modal go: a row in the Supabase `messages` table.
//
// Configured in .env (Vite only exposes variables prefixed with VITE_ to browser code):
//   VITE_POSTCARD_ENDPOINT        https://<project>.supabase.co/rest/v1/messages
//   VITE_SUPABASE_PUBLISHABLE_KEY the project's publishable key (sb_publishable_…). It ships to every
//                                 visitor, so never put a secret or service_role key here.
// Each postcard is POSTed as JSON: { message, name, email }.
// `name` and `email` are null when the visitor sends anonymously.
//
// Without an endpoint, local dev pretends the send worked (and logs the payload) so the flow can be
// tried end to end; a production build refuses, so a deploy can't silently drop messages.

const ENDPOINT = import.meta.env.VITE_POSTCARD_ENDPOINT;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const CONTACT_EMAIL = "shubhamshrivastava2000@gmail.com";

export async function sendPostcard(payload) {
  console.log('p ', payload)
  if (ENDPOINT) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: API_KEY },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Postcard endpoint answered ${response.status}: ${await response.text()}`);
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[postcard] no VITE_POSTCARD_ENDPOINT set; pretending to send:", payload);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  throw new Error("Postcards aren't wired up yet");
}
