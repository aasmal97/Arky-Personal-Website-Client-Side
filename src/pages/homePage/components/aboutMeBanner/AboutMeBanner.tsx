import { useEffect } from "react";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import anime from "animejs";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
import { BlobSVG, MediaCollagePlaceholderSVG, MediaCollageSVG, WaveSVG } from "./SVGComponents";
const namespace = "about-me-pg";

const TextContent = () => {
  const { ref: textRef, isVisible } = useIntersectionWrapper();
  const smallWindowWidth = useWindowWidth(992);
  const title = "I’m also human!";
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
  return (
    <div ref={textRef} className={`${namespace}-text-container`}>
      <WaveSVG orientation={smallWindowWidth ? "right" : "top"} />
      <div className={`${namespace}-text-content`}>
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
        <span className={isVisible ? "visible" : ""}>
          ( no not a Killers{" "}
          <a
            href="https://www.youtube.com/watch?v=RIZdjT1472Y"
            rel="noopener noreferrer"
            target={"_blank"}
          >
            reference
          </a>{" "}
          )
        </span>
        <p className={isVisible ? "visible" : ""}>
          <span>I</span> enjoy playing and watching football (sorry SOCCER for
          my compatriots), along with chess and billiards. Don’t worry, this
          doesn’t stem from my love of math or physics or anything... hehe. On
          the odd day, you can also catch me accidentally butchering my mother’s
          Ecuadorian recipes (After all, cooking is just chemistry right?
          Ha...ha...)
        </p>
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
      <div className={`${namespace}-media-inner`}>
        <div className={`${namespace}-blob`}>{ <BlobSVG />}</div>
      </div>
    </div>
  );
};
const AboutMeBanner = () => {
  const smallWindowWidth = useWindowWidth(992);
  const media = <MediaContent />;
  return (
    <div id={namespace}>
      {smallWindowWidth && media}
      <TextContent />
      {!smallWindowWidth && media}
    </div>
  );
};
export default AboutMeBanner;
