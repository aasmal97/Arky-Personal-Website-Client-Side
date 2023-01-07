import useIntersectionObserver from "./useIntersectionObserver";
import { useRef } from "react";
const useIntersectionWrapper = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.05,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  return { ref, isVisible };
};
export default useIntersectionWrapper;
