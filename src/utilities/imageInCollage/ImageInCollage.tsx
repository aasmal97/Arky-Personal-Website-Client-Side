import { useState, useRef } from "react";
import { Transition } from "react-transition-group";
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
}: {
  description?: string;
  id: string;
  namespace: string;
  placeholderSrc?: string;
  src: string;
  children: JSX.Element;
}) => {
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { x, y, height, width } = children.props;
  const nodeRef = useRef(null);
  const onPlaceHolderLoad = (
    e: React.SyntheticEvent<SVGImageElement, Event>
  ) => {
    setPlaceholderLoaded(true);
  };
  const onLoad = (e: React.SyntheticEvent<SVGImageElement, Event>) => {
    setLoaded(true);
  };
  const timeout = 3000;
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
        href={placeholderSrc}
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
            href={src}
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
