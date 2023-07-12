import { LazyLoadImage } from "react-lazy-load-image-component";
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
  return (
    <LazyLoadImage
      wrapperProps={{
        style: {
          backgroundSize: "cover",
          backgroundImage: `url(${placeholderSrc})`,
          color: "transparent",
          display: "inline-block",
        },
      }}
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
