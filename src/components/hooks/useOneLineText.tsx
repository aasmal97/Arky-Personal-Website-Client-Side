import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
const useOneLineText = () => {
  const [container, setContainer] = useState<HTMLParagraphElement | null>(null);
  const [oneLine, setOneLine] = useState(false);
  const [oneLineHeight, setOneLineHeight] = useState(0);
  const [currHeight, setCurrHeight] = useState(0);
  useEffect(() => {
    const checkLines = () => {
      if (!container) return;
      const style = window.getComputedStyle(container);
      const lineHeight = parseInt(style.getPropertyValue("line-height"), 10);
      const height = container.offsetWidth;
      const width = container.offsetHeight;
      if (height > lineHeight) {
        setOneLine(false);
      } else {
        setOneLine(true);
        setOneLineHeight(width);
      }
      setCurrHeight(height);
    };
    const debouncedCheckLines = debounce(checkLines, 500);
    debouncedCheckLines();
    window.addEventListener("resize", debouncedCheckLines);
    return () => {
      window.removeEventListener("resize", debouncedCheckLines);
    };
  }, [container]);
  return {
    setContainer,
    oneLine,
    oneLineHeight,
    currHeight,
  };
};
export default useOneLineText;
