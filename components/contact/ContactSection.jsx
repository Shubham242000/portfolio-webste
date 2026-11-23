import { lazy, Suspense } from "react";
import { usePostcardLauncher } from "./usePostcardLauncher";
import DecodeText from "../DecodeText";
import QuoteBlock from "../QuoteBlock";
import { CONTACT_EMAIL } from "../../src/sendPostcard";

// The postcard modal (and its styles and handwriting font) only loads once someone heads for the button.
const loadPostcardModal = () => import("./postcard/PostcardModal");
const PostcardModal = lazy(loadPostcardModal);

const ContactSection = () => {
  const postcard = usePostcardLauncher();

  return <>
    <section className="contact">
      <div className="contact-scenery" aria-hidden="true" />
      <DecodeText className="section-label" text="04 / Get in touch" />
      <div className="contact-stage">
        <h2>Have something meaningful to build?</h2>
        {/* The serious door: a plain email. */}
        <a className="contact-cta" href={`mailto:${CONTACT_EMAIL}`}>
          <span className="contact-cta-text">Let’s talk</span><span className="contact-cta-arrow" aria-hidden="true">↗</span>
        </a>
        <span className="contact-email">{CONTACT_EMAIL}</span>
        <span className="contact-or" aria-hidden="true">or</span>
        {/* The playful door: a postcard, styled like one (stamp, perforated edge, slight tilt). */}
        <button
          type="button"
          className="postcard-cta"
          aria-haspopup="dialog"
          onClick={postcard.show}
          onPointerEnter={loadPostcardModal}
          onFocus={loadPostcardModal}
          onTouchStart={loadPostcardModal}
        >
          <img className="postcard-cta-stamp" src="/trips/goa-sm.jpg" alt="" width="34" height="42" loading="lazy" />
          <span className="postcard-cta-text">
            <span className="postcard-cta-title">Write me a postcard</span>
            <span className="postcard-cta-sub">travel tips &amp; playlists welcome</span>
          </span>
        </button>
      </div>
      <QuoteBlock />
      <div className="contact-footer">
        <span>© {new Date().getFullYear()} Shubham Shrivastava</span>
        <div>
          <a href="https://github.com/Shubham242000" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/shubham-shrivastava-2000/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://medium.com/@shubhamshrivastava2000" target="_blank" rel="noreferrer">Writing</a>
          <a href="https://github.com/Shubham242000/portfolio-webste" target="_blank" rel="noreferrer">Source ↗</a>
        </div>
      </div>
    </section>
    {/* Rendered outside the section so the section's layout styles never touch the dialog. */}
    {postcard.mounted && <Suspense fallback={null}>
      <PostcardModal open={postcard.open} onClose={postcard.hide} />
    </Suspense>}
  </>;
};

export default ContactSection;
