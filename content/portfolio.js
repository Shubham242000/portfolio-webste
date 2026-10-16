export const experience = [
  { company: "PayPay India", role: "Software Development Engineer II", period: "Jul 2026 — Present", place: "Gurugram, India", href: "https://paypay.co.in/", summary: "Working on the Consumer D2C app, building high-impact customer flows including Gift Vouchers and Stamp Cards." },
  { company: "Tellius", role: "Software Development Engineer II", period: "Jun 2025 — Jul 2026", place: "Bengaluru, India · Hybrid", href: "https://tellius.com/", summary: "Built the React frontend for Kaiya Architect, a conversational data-modelling workflow, plus real-time analytics and a streaming UI layer for AI answers.", caseStudy: { title: "AI that draws its own charts", line: "Removed a whole chart-translation layer so the AI’s output renders straight in React, with answers starting in under 200ms.", date: "Sep 2026", href: "https://medium.com/@shubhamshrivastava2000/when-an-abstraction-became-a-bottleneck-in-our-ai-visualization-pipeline-fcab8577fb43" }, outcomes: ["Handled five concurrent AI stream types with sub-200ms perceived response latency.", "Removed an intermediate chart format so LLM output could render directly in React.", "Integrated real-time speech-to-text capabilities for voice-driven product interactions.", "Kept enterprise dashboards responsive at 60fps with virtualization and incremental rendering.", "Architected multi-provider SAML 2.0 SSO, reducing authentication support tickets by 30%."] },
  { company: "Bajaj Finserv Health", role: "Software Development Engineer", period: "Aug 2022 — Jun 2025", place: "Pune, India", href: "https://www.bajajfinservhealth.in/", summary: "Progressed from Intern to full-time SDE, building patient journeys, platform performance, SEO, and shared frontend foundations.", caseStudy: { title: "Pages that load instantly", line: "Incremental Static Regeneration with device-aware Next.js middleware made pages 70% faster.", date: "Sep 2024", href: "https://medium.com/@shubhamshrivastava2000/incremental-static-regeneration-middleware-rewrites-nextjs-6e405ea78ab3" }, outcomes: ["Improved load times by 70% through Next.js ISR and a more thoughtful delivery strategy.", "Increased appointments by 40% by leading the end-to-end OPD booking experience.", "Scaled organic traffic beyond 100K users/month with Core Web Vitals and structured-data improvements.", "Helped evolve a monolith into a microfrontend architecture for greater team autonomy.", "Led the Medicard flow, reduced re-renders with React Profiler/custom hooks, and improved API visibility with ELK dashboards."] },
  { company: "Robofied", early: true, role: "Web Development Intern", period: "Oct 2021 — Dec 2021", place: "Remote", href: "https://robofied.com/", summary: "Developed responsive React interfaces and reusable dashboard components for internal products.", outcomes: ["Made complex data flows predictable with Redux, Redux-Saga, and Context API.", "Improved responsiveness through memoization and render optimisations."] },
  { company: "Nirvann Applications", early: true, role: "Web Development Intern", period: "Feb 2021 — Apr 2021", place: "Remote", href: "https://utsavapp.in/", summary: "Worked with startup teams to establish responsive digital experiences across three brands.", outcomes: ["Delivered accessible interfaces with React, Bootstrap, and vanilla JavaScript.", "Reduced initial load time by 30% using dynamic imports and memoization."] },
];


// Trip photos live in public/trips as <file>-sm.jpg (cards) and <file>-lg.jpg (full view).
// `focus` is the CSS object-position used when a photo is cropped into a card.
export const postcards = [
  { place: "Lansdowne", file: "lansdowne", width: 760, height: 570, focus: "62% 70%" },
  { place: "Kodaikanal", file: "kodaikanal", width: 760, height: 570, focus: "50% 60%" },
  { place: "Pondicherry", file: "pondicherry", width: 570, height: 760, focus: "50% 55%" },
  { place: "Goa", file: "goa", width: 570, height: 760, focus: "35% 60%" },
  { place: "Thailand", file: "thailand", width: 570, height: 760, focus: "50% 50%" },
  { place: "Mysore", file: "mysore", width: 628, height: 760, focus: "50% 70%" },
  { place: "Chikkamagaluru", file: "chikkamagaluru", width: 570, height: 760, focus: "60% 70%" },
];

// The player uses Apple's official 30-second preview clip (from the iTunes Search API:
// itunes.apple.com/lookup?id=<apple track id>&country=in → previewUrl, artworkUrl100) and links to Spotify for the full song.
export const onRepeat = {
  title: "Yeh Duniya",
  artist: "Curtain Blue",
  previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/61/a2/b7/61a2b78a-0f19-ed45-5752-28cf22d8d646/mzaf_8138752179632452915.plus.aac.p.m4a",
  artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/86/b0/c5/86b0c58c-cb2b-bf54-1baf-48484b68b21b/1200214833657.jpg/200x200bb.jpg",
  spotifyUrl: "https://open.spotify.com/track/3afNMElBBtkRPyR79DMyMJ",
};

export const capabilities = [
  ["Frontend systems", "React, Next.js, Vue.js, TypeScript, JavaScript"],
  ["Backend integration", "Node.js, NestJS, REST APIs, SSE, WebSockets"],
  ["State & architecture", "Redux, Redux-Saga, Context API, microfrontends"],
  ["Product performance", "Core Web Vitals, ISR, Lighthouse, rendering strategy"],
  ["UI engineering", "Design systems, accessibility, Material UI, Emotion"],
  ["Delivery & tooling", "Git, Azure, NGINX, Docker, CI/CD"],
];
