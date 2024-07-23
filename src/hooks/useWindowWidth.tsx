import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const useWindowWidth = (width = 576) => {
  const [windowWidth, setWidth] = useState(window.innerWidth >= width);
  useEffect(() => {
    let isMount = true;
    const resize = () => {
      if (isMount) {
        if (window.innerWidth < width) setWidth(false);
        else if (window.innerWidth >= width) setWidth(true);
      }
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
