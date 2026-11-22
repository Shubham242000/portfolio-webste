// Where postcards from the "Let's talk" modal go: POSTed as JSON { message, name, email } to the
// Vercel Function in api/postcard.js, which adds the sender's approximate location and stores the
// row in Supabase. `name` and `email` are null when the visitor sends anonymously.
//
// Plain `npm run dev` (Vite) doesn't serve /api, so in dev a missing endpoint is treated as a
// pretend send (the payload is logged) and the flow can still be tried end to end. Use `vercel dev`
// to exercise the real function locally.

export const CONTACT_EMAIL = "shubhamshrivastava2000@gmail.com";

export async function sendPostcard(payload) {
  const response = await fetch("/api/postcard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (import.meta.env.DEV && response.status === 404) {
    console.info("[postcard] /api/postcard isn't running (use `vercel dev`); pretending to send:", payload);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  if (!response.ok) throw new Error(`Postcard endpoint answered ${response.status}: ${await response.text()}`);
}
