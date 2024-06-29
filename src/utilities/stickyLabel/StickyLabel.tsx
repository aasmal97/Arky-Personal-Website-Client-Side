import { useEffect, useRef, useState } from "react";
import { debounce, join, split, reverse } from "lodash";
const reverseWords = (str: string) => join(reverse(split(str, " ")), " ");

const RotatedStickyLabel = ({ children }: { children: string }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [oneLine, setOneLine] = useState(false);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const checkLines = () => {
      const container = containerRef.current;
      if (!container) return;
      const style = window.getComputedStyle(container);
      const lineHeight = parseInt(style.getPropertyValue("line-height"), 10);
      const height = container.offsetWidth;
      const width = container.offsetHeight;
      console.log(height, lineHeight);
      if (height > lineHeight) {
        setOneLine(false);
      } else {
        setOneLine(true);
      }
      setHeight(width);
    };
    const debouncedCheckLines = debounce(checkLines, 500);
    debouncedCheckLines();
    window.addEventListener("resize", debouncedCheckLines);
    return () => {
      window.removeEventListener("resize", debouncedCheckLines);
    };
  }, []);
  return (
    <div
      className="sticky-label"
      style={{
        position: "sticky",
        top: "0.3em",
        left: 0,
        transform: "rotate(180deg)",
        writingMode: "vertical-lr",
        letterSpacing: "0.12em",
        lineHeight: "1.625em",
        display: "flex",
        justifyContent: "end",
        maxHeight: "100vh",
        height: height ? `calc(${height + 1}px, 100%)` : "auto",
        // overflow: "hidden",
      }}
    >
      <p ref={containerRef}>{oneLine ? children : reverseWords(children)}</p>
    </div>
  );
};
export default RotatedStickyLabel;
