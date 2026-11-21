import { lazy, Suspense } from "react";
import { usePostcardLauncher } from "./usePostcardLauncher";
import DecodeText from "../DecodeText";
import QuoteBlock from "../QuoteBlock";

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
        <button
          type="button"
          className="contact-cta"
          aria-haspopup="dialog"
          onClick={postcard.show}
          onPointerEnter={loadPostcardModal}
          onFocus={loadPostcardModal}
          onTouchStart={loadPostcardModal}
        >
          <span className="contact-cta-text">Let’s talk</span><span className="contact-cta-arrow" aria-hidden="true">↗</span>
        </button>
        <p className="contact-note">Always happy to talk code, swap travel tips, or share a playlist.</p>
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
