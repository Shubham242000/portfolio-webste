// Ink illustration with its background cut away, so it sits directly on the page in both themes.
// Full-resolution file for 2× screens, an 800px one for 1× screens.
const Portrait = () => <img
  className="hero-photo"
  src="/portrait.webp"
  srcSet="/portrait-800.webp 800w, /portrait.webp 1254w"
  sizes="(max-width: 680px) 300px, 500px"
  alt="Ink illustration of Shubham Shrivastava"
  width="1254"
  height="1219"
  fetchPriority="high"
  decoding="async"
/>;

export default Portrait;
