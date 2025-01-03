import { useEffect, useState } from "react";
import { type LazyLoadImageProps } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
  const [LazyLoadImage, setLazyLoadImage] =
    useState<React.FunctionComponent<LazyLoadImageProps> | null>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    import("react-lazy-load-image-component").then((pkg) => {
      setLazyLoadImage(() => pkg.LazyLoadImage);
    });
  }, []);
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
  return LazyLoadImage ? (
    <LazyLoadImage
      wrapperProps={{
        className: "lazy-img-wrapper",
        style: load ? loadedStyles : nonLoadedStyles,
      }}
      onLoad={() => setLoad(true)}
      className={className}
      src={src}
      placeholderSrc={placeholderSrc}
      useIntersectionObserver
      effect="blur"
      alt={alt}
    />
  ) : (
    <></>
  );
};
export default LazyImage;
