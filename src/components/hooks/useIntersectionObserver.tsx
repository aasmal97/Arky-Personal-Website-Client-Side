import type { RefObject } from "react";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  timeout?: number;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
    timeout = 400,
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };
  const debounceEntry = useMemo(
    () => debounce(updateEntry, timeout),
    [timeout]
  );

  useEffect(
    () => {
      const node = elementRef?.current; // DOM Ref
      const hasIOSupport = !!window.IntersectionObserver;

      if (!hasIOSupport || frozen || !node) return;

      const observerParams = { threshold, root, rootMargin };
      const observer = new IntersectionObserver(debounceEntry, observerParams);

      observer.observe(node);

      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen]
  );

  return entry;
}

export default useIntersectionObserver;
