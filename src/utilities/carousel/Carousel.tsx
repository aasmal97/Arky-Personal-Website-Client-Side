import useWindowWidth from "../../hooks/useWindowWidth";
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { v4 as uuid } from "uuid";
import useIntersectionWrapper from "../../hooks/useIntersectionWrapper";
const slides = Array(9)
  .fill(0)
  .map(() => uuid());

export type Slides = {
  generalURL?: string;
  appURL?: string;
  imgURL: string;
  placeholderURL: string;
  projectName?: string;
  githubURL?: string;
}[];
const swiperKeys = [uuid(), uuid()];
const Carousel = ({
  namespace,
  //slides
}:
{
  namespace: string;
  slides: Slides;
}) => {
  const { ref: caroRef, isVisible } = useIntersectionWrapper();
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(575);
  const slidesPerView = !smallWindowWidth ? 2 : !mediumWindowWidth ? 3 : 1;
  const spaceBetween = !smallWindowWidth ? 20 : !mediumWindowWidth ? 30 : 50;
  const children = slides.map((slide) => {
    return (
      <SwiperSlide key={slide} className={`${namespace}-slide`}>
        <div className={`${namespace}-slide-inner`}>{slide}</div>
      </SwiperSlide>
    );
  });
  return (
    <div ref={caroRef} className={`${namespace}-carousel-wrapper`}>
      {isVisible && (
        <Swiper
          key={!mediumWindowWidth ? swiperKeys[0] : swiperKeys[1]}
          className={`${namespace}-carousel-inner-wrapper`}
          modules={[Autoplay, EffectFade, Pagination, Keyboard]}
          effect={!mediumWindowWidth ? "cards" : "fade"}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
            dynamicMainBullets: 2,
            clickable: true,
          }}
          allowTouchMove
          loop={true}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
        >
          {children}
        </Swiper>
      )}
    </div>
  );
};
export default Carousel;
