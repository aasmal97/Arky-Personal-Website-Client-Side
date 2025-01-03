import { useState, useRef, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Transition } from "react-transition-group";
import type { HobbiesDocumentWithDuration } from "../../hooks/useHobbiesImageInterval";
const transitionStyles: { [key: string]: { [key: string]: string } } = {
  entering: {
    opacity: "0",
  },
  entered: { opacity: "1" },
  exiting: { opacity: "1" },
  exited: { opacity: "0" },
};
const timeout = 500;
const ImageInCollage = ({
  id = "",
  children,
  namespace,
  placeholderSrc,
  description,
  src,
  duration,
  nextItem,
  clipPathEl,
  preserveAspectRatio = "xMidYMid meet",
  hidePlaceholderOnLoad = false,
}: {
  preserveAspectRatio?: string;
  duration?: number;
  nextItem?: () => Promise<HobbiesDocumentWithDuration>;
  description?: string;
  id?: string;
  namespace: string;
  placeholderSrc?: string;
  src: string;
  children: JSX.Element;
  clipPathEl?: JSX.Element;
  hidePlaceholderOnLoad?: boolean;
}) => {
  const [placeholderURL, setPlaceholderUrl] = useState(placeholderSrc);
  const [imgURL, setImgURL] = useState(src);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { x, y, height, width } = children.props;
  const nodeRef = useRef(null);
  const placeholderNodeRef = useRef(null);
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
  //add href after loading event listener, so that it will always trigger
  useEffect(() => {
    const placeholder = placeholderNodeRef.current as null | SVGImageElement;
    const img = nodeRef.current as null | SVGImageElement;
    if (placeholder && placeholderURL)
      placeholder.setAttribute("href", placeholderURL);
    if (img) img.setAttribute("href", imgURL);
  }, [placeholderURL, imgURL]);

  const onLoad = (e: React.SyntheticEvent<SVGImageElement, Event>) => {
    setLoaded(true);
    if (!nextItem || !duration) return;
    const id = setTimeout(async () => {
      const result = await nextItem();
      unstable_batchedUpdates(() => {
        setLoaded(false);
        setPlaceholderLoaded(false);
        setTimeout(() => {
          unstable_batchedUpdates(() => {
            setImgURL(
              `${process.env.REACT_APP_MEDIA_FILES_URL}/${result.imgURL}`
            );
            setPlaceholderUrl(
              `${process.env.REACT_APP_MEDIA_FILES_URL}/${result.placeholderURL}`
            );
          });
        }, timeout * 2.5);
      });
    }, duration);
    timeoutRef.current = id;
  };

  const defaultStyles: { [key: string]: string } = {
    transition: `${timeout}ms opacity ease-out`,
    // visibility: loaded ? "visible" : "hidden",
  };
  const defaultProps = {
    clipPath: `url(#${namespace}-clip-path-${id})`,
    x: x,
    y: y,
    height: height,
    width: width,
    preserveAspectRatio: preserveAspectRatio,
  };
  const hidePlaceholderStyles: React.CSSProperties = hidePlaceholderOnLoad
    ? {
        opacity: placeholderLoaded ? (loaded ? 0 : 1) : 0,
        visibility: placeholderLoaded
          ? loaded
            ? "hidden"
            : "visible"
          : "hidden",
      }
    : {};
  return (
    <>
      <clipPath id={`${namespace}-clip-path-${id}`}>
        <>{clipPathEl ? clipPathEl : children}</>
      </clipPath>
      <filter id={`${namespace}-filter-blur-${id}`}>
        <feGaussianBlur stdDeviation="5" in="SourceGraphic" result="BLUR" />
      </filter>
      {!loaded && children}
      <image
        {...defaultProps}
        filter={`url(#${namespace}-filter-blur-${id})`}
        ref={placeholderNodeRef}
        onLoad={onPlaceHolderLoad}
        style={{ ...hidePlaceholderStyles }}
      >
        <desc>{description}</desc>
      </image>
      <Transition nodeRef={nodeRef} in={loaded} timeout={timeout}>
        {(state) => {
          return (
            <image
              {...defaultProps}
              ref={nodeRef}
              onLoad={onLoad}
              style={{
                ...defaultStyles,
                ...transitionStyles[state],
              }}
            >
              <desc>{description}</desc>
            </image>
          );
        }}
      </Transition>
    </>
  );
};
export default ImageInCollage;
