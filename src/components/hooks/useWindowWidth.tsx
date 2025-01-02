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
      if (window.innerWidth < width) setWidth(false);
      else if (window.innerWidth >= width) setWidth(true);
    };
    const debouncedHandleResize = debounce(resize, 100);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);

    // Remove event listener on cleanup
    return () => cleanup();
  }, [width]);
  return windowWidth;
};
export default useWindowWidth;
