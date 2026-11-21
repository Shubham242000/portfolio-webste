import { useDecodeText } from "./useDecodeText";

// A label that "decodes" itself the first time it scrolls into view.
const DecodeText = ({ text, className }) => {
  const { ref, display } = useDecodeText(text);
  return <div ref={ref} className={className}>{display}</div>;
};

export default DecodeText;
