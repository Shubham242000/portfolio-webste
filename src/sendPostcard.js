// Where postcards from the "Let's talk" modal go.
//
// There is no backend yet. Once there is one, set VITE_POSTCARD_ENDPOINT (e.g. "/api/postcard")
// and every postcard is POSTed there as JSON:
//   { message, anonymous, name, email, stamp, postmark: { city, timeZone }, sentAt }
// `name` and `email` are null when the visitor sends anonymously.
//
// Without an endpoint, local dev pretends the send worked (and logs the payload) so the flow can be
// tried end to end; a production build refuses, so a deploy can't silently drop messages.

const ENDPOINT = import.meta.env.VITE_POSTCARD_ENDPOINT;

export const CONTACT_EMAIL = "shubhamshrivastava2000@gmail.com";

export async function sendPostcard(payload) {
  if (ENDPOINT) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Postcard endpoint answered ${response.status}`);
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[postcard] no VITE_POSTCARD_ENDPOINT set; pretending to send:", payload);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  throw new Error("Postcards aren't wired up yet");
}
