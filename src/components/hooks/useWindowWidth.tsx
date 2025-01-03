import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const defaultWidth = (width: number) => {
  try {
    const val = window.innerWidth >= width;
    return val;
  } catch (err) {
    return false;
  }
};
const useWindowWidth = (width = 576) => {
  const [windowWidth, setWidth] = useState(defaultWidth(width));
  useEffect(() => {
    let isMount = true;
    const resize = () => {
      if (!isMount) return;
      if (window.innerWidth < width || window.outerWidth < width)
        setWidth(false);
      else if (window.innerWidth >= width && window.outerWidth >= width)
        setWidth(true);
    };
    const debouncedHandleResize = debounce(resize, 300);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("orientationchange", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("orientationchange", debouncedHandleResize);
    // Remove event listener on cleanup
    return () => cleanup();
  }, [width]);
  return windowWidth;
};
export default useWindowWidth;
