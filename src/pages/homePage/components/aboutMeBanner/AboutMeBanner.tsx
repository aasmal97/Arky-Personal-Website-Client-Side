import { useEffect } from "react";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import anime from "animejs";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
import {
  MediaCollagePlaceholderSVG,
  MediaCollageSVG,
} from "./SVGComponents";
import LinkBtn from "../../../../utilities/actionBtn/LinkBtn";
const namespace = "about-me-pg";
const AboutMeHeader = ({ isVisible }: { isVisible: boolean }) => {
  useEffect(() => {
    const initialDelayTime = 500;
    if (isVisible)
      anime.timeline().add({
        targets: `.${namespace}-text-header .${namespace}-letter`,
        rotateY: [-90, 0],
        duration: 1300,
        delay: (el, i) => 45 * i + initialDelayTime,
      });
    return () => {
      anime.remove(`.${namespace}-text-header .${namespace}-letter`);
    };
  }, [isVisible]);
  const title = "I’m also human :)";
  return (
    <h2
      className={`${namespace}-text-header`}
      aria-label={title}
      style={{ position: "relative" }}
    >
      <span
        className={`${namespace}-text-wrapper`}
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
        }}
      >
        <span className={`${namespace}-letters`}>
          {Array(title.length)
            .fill(0)
            .map((e, idx) => {
              return title[idx] !== " " ? (
                <span
                  key={`${title[idx]}-${idx}`}
                  className={`${namespace}-letter`}
                  style={{
                    transformOrigin: "0 0",
                    display: "inline-block",
                  }}
                >
                  {title[idx]}
                </span>
              ) : (
                <span key={`${title[idx]}-${idx}`}>{title[idx]}</span>
              );
            })}
        </span>
      </span>
    </h2>
  );
};
const TextContent = ({ isVisible }: { isVisible: boolean }) => {
  const smallWindowWidth = useWindowWidth(576);

  return (
    <div className={`${namespace}-text-content`}>
      <p className={`${isVisible ? "visible" : ""}`}>
        <span>I</span> enjoy playing and watching football (sorry SOCCER for my
        compatriots), along with chess and billiards. On the odd day, you can
        also catch me accidentally butchering my mother’s Ecuadorian recipes
        (After all, cooking is just chemistry... right?)
      </p>
      {!smallWindowWidth && <MediaContent />}

      <div className={`${namespace}-action-btns`}>
        <LinkBtn to="about">My Story</LinkBtn>
        <LinkBtn to="/contact">Contact Me</LinkBtn>
      </div>
    </div>
  );
};

const MediaContent = () => {
  const { ref: mediaRef, isVisible } = useIntersectionWrapper();
  return (
    <div ref={mediaRef} className={`${namespace}-media-content`}>
      {isVisible && <MediaCollageSVG />}
      {!isVisible && <MediaCollagePlaceholderSVG />}
    </div>
  );
};
const AboutMeBanner = () => {
  const smallWindowWidth = useWindowWidth(576);
  const media = <MediaContent />;
  const { ref: textRef, isVisible } = useIntersectionWrapper();
  return (
    <div id={namespace}>
      <AboutMeHeader isVisible={isVisible} />
      <div id={`${namespace}-inner-container`} ref={textRef}>
        {smallWindowWidth && media}
        <TextContent isVisible={isVisible} />
      </div>
    </div>
  );
};
export default AboutMeBanner;
