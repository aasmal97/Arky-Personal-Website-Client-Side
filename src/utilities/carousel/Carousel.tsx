import useWindowWidth from "../../hooks/useWindowWidth";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { v4 as uuid } from "uuid";
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

const Carousel = ({
  namespace,
}: //slides,
{
  namespace: string;
  slides: Slides;
}) => {
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(575);
  const slidesPerView = !smallWindowWidth ? 2 : !mediumWindowWidth ? 3 : 1;
  const spaceBetween = !smallWindowWidth ? 20: !mediumWindowWidth ? 30: 50
  return (
    <div className={`${namespace}-carousel-wrapper`}>
      <Swiper
        className={`${namespace}-carousel-inner-wrapper`}
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
          dynamicMainBullets: 2,
          clickable: true,
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide} className={`${namespace}-slide`}>
              <div className={`${namespace}-slide-inner`}>{slide}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Carousel;
