// Vercel Function behind the "Let's talk" postcard: validates the postcard, adds the sender's rough
// location from Vercel's geo headers, and inserts a row into the Supabase `messages` table.
//
// Env vars (must be set in Vercel → Project → Settings → Environment Variables; the deployed
// function doesn't read the repo's .env):
//   VITE_POSTCARD_ENDPOINT         https://<project>.supabase.co/rest/v1/messages
//   VITE_SUPABASE_PUBLISHABLE_KEY  the project's publishable key (RLS still allows only inserts)
//
// Location comes from the request IP, so it's approximate (and wrong behind a VPN). Postcards with
// no name and no email only keep the country, so leaving both blank stays meaningfully anonymous.

const MAX_MESSAGE = 5000;
const MAX_FIELD = 200;

// Vercel URL-encodes these header values (e.g. "S%C3%A3o%20Paulo").
function geoHeader(request, name) {
  const value = request.headers.get(name);
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

const json = (body, status) => Response.json(body, { status });

export async function POST(request) {
  const { POSTCARD_ENDPOINT, SUPABASE_KEY } = process.env;
  // above is from vercel dashboard env, not from this repo. 
  if (!POSTCARD_ENDPOINT || !SUPABASE_KEY) return json({ error: "Postcards aren't configured" }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const anonymous = !name && !email;

  if (!message || message.length > MAX_MESSAGE) return json({ error: "Message is missing or too long" }, 400);
  if (name.length > MAX_FIELD || email.length > MAX_FIELD) return json({ error: "Field too long" }, 400);

  const row = {
    message,
    name: name || null,
    email: email || null,
    country: geoHeader(request, "x-vercel-ip-country"),
    region: anonymous ? null : geoHeader(request, "x-vercel-ip-country-region"),
    city: anonymous ? null : geoHeader(request, "x-vercel-ip-city"),
  };

  const response = await fetch(POSTCARD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    console.error("Supabase insert failed", response.status, await response.text());
    return json({ error: "Couldn't save the postcard" }, 502);
  }
  return new Response(null, { status: 204 });
}
