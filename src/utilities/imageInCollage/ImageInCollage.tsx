import { useState, useRef, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Transition } from "react-transition-group";
import { HobbiesDocumentWithDuration } from "../../hooks/useHobbiesImageInterval";
const transitionStyles: { [key: string]: { [key: string]: string } } = {
  entering: {
    opacity: "0",
  },
  entered: { opacity: "1" },
  exiting: { opacity: "1" },
  exited: { opacity: "0" },
};
const ImageInCollage = ({
  id,
  children,
  namespace,
  placeholderSrc,
  description,
  src,
  duration,
  nextItem,
}: {
  duration?: number;
  nextItem?: () => HobbiesDocumentWithDuration;
  description?: string;
  id: string;
  namespace: string;
  placeholderSrc?: string;
  src: string;
  children: JSX.Element;
}) => {
  const [placeholderURL, setPlaceholderUrl] = useState(placeholderSrc);
  const [imgURL, setImgURL] = useState(src);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { x, y, height, width } = children.props;
  const nodeRef = useRef(null);
  const onPlaceHolderLoad = (
    e: React.SyntheticEvent<SVGImageElement, Event>
  ) => {
    setPlaceholderLoaded(true);
  };
  //stop any active timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const onLoad = (e: React.SyntheticEvent<SVGImageElement, Event>) => {
    setLoaded(true);
    if (!nextItem || !duration) return;
    const id = setTimeout(() => {
      const result = nextItem();
      unstable_batchedUpdates(() => {
        setLoaded(false);
        setPlaceholderLoaded(false);
        setImgURL(result.imgURL);
        setPlaceholderUrl(result.placeholderURL);
      });
    }, duration);
    timeoutRef.current = id;
  };
  const timeout = 500;
  const defaultStyles: { [key: string]: string } = {
    transition: `${timeout}s opacity ease-out`,
    visibility: loaded ? "visible" : "hidden",
  };

  return (
    <>
      <clipPath id={`${namespace}-clip-path-${id}`}>
        <>{children}</>
      </clipPath>
      <filter id={`${namespace}-filter-blur-${id}`}>
        <feGaussianBlur stdDeviation="5" in="SourceGraphic" result="BLUR" />
      </filter>
      {!loaded && children}
      <image
        onLoad={onPlaceHolderLoad}
        clipPath={`url(#${namespace}-clip-path-${id})`}
        filter={`url(#${namespace}-filter-blur-${id})`}
        href={placeholderURL}
        style={{
          opacity: placeholderLoaded ? (loaded ? 0 : 1) : 0,
          visibility: placeholderLoaded
            ? loaded
              ? "hidden"
              : "visible"
            : "hidden",
        }}
        x={x}
        y={y}
        height={height}
        width={width}
        preserveAspectRatio="xMidYMid meet"
      >
        <desc>{description}</desc>
      </image>
      <Transition ref={nodeRef} inProp={loaded} timeout={timeout}>
        {(state) => (
          <image
            ref={nodeRef}
            onLoad={onLoad}
            clipPath={`url(#${namespace}-clip-path-${id})`}
            href={imgURL}
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
            }}
            x={x}
            y={y}
            height={height}
            width={width}
            preserveAspectRatio="xMidYMid meet"
          >
            <desc>{description}</desc>
          </image>
        )}
      </Transition>
    </>
  );
};
export default ImageInCollage;
