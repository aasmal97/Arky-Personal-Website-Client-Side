import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import "react-lazy-load-image-component/src/effects/opacity.css";
// import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { useState } from "react";
const LazyImage = ({
  className,
  src,
  placeholderSrc,
  alt,
}: {
  className?: string;
  src: string;
  placeholderSrc: string;
  alt: string;
}) => {
  const [load, setLoad] = useState(false);
  const loadedStyles = {
    backgroundImage: `url(${placeholderSrc})`,
    display: "inline-block",
    color: "transparent",
  };
  const nonLoadedStyles = {
    backgroundImage: `url(${placeholderSrc})`,
    filter: `blur(8px)`,
    color: "transparent",
    display: "inline-block",
  };
  return (
    <LazyLoadImage
      wrapperProps={{
        className: "lazy-img-wrapper",
        style: load ? loadedStyles : nonLoadedStyles,
      }}
      afterLoad={() => setLoad(true)}
      className={className}
      src={src}
      placeholderSrc={placeholderSrc}
      useIntersectionObserver
      effect="blur"
      alt={alt}
    />
  );
};
export default LazyImage;
