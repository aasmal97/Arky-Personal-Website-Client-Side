import { useState } from "react";

const ImageInCollage = ({
  id,
  children,
  namespace,
}: {
  id: string;
  namespace: string;
  placeholderSrc?: string;
  src: string;
  children: JSX.Element;
}) => {
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { x, y, height, width } = children.props;
  const onPlaceHolderLoad = (
    e: React.SyntheticEvent<SVGImageElement, Event>
  ) => {
    setPlaceholderLoaded(true);
  };
  const onLoad = (e: React.SyntheticEvent<SVGImageElement, Event>) => {
    setLoaded(true);
  };
  return (
    <>
      <clipPath id={`${namespace}-clip-path-${id}`}>
        <>{children}</>
      </clipPath>
      {!loaded && children}
      <image
        onLoad={onPlaceHolderLoad}
        clipPath={`url(#${namespace}-clip-path-${id})`}
        href={""}
        style={{ visibility: placeholderLoaded ? "visible" : "hidden" }}
        x={x}
        y={y}
        height={height}
        width={width}
        preserveAspectRatio="xMidYMid meet"
      />
      <image
        onLoad={onLoad}
        clipPath={`url(#${namespace}-clip-path-${id})`}
        href={""}
        style={{ visibility: loaded ? "visible" : "hidden" }}
        x={x}
        y={y}
        height={height}
        width={width}
        preserveAspectRatio="xMidYMid meet"
      />
    </>
  );
};
export default ImageInCollage;
