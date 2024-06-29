import { useEffect } from "react";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import anime from "animejs";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
import { MediaCollagePlaceholderSVG, MediaCollageSVG } from "./SVGComponents";
import LinkBtn from "../../../../utilities/actionBtn/LinkBtn";
import { Transition } from "react-transition-group";

const namespace = "about-me-pg";
const AboutMeHeader = ({
  isVisible,
  headerRef,
}: {
  isVisible: boolean;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const initialDelayTime = 100;
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
  const words = title.split(" ");
  return (
    <h2
      ref={headerRef}
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
          {Array(words.length)
            .fill(0)
            .map((_, idx) => {
              const currLetters = words[idx];
              const letters = Array(currLetters.length)
                .fill(0)
                .map((e, idx) => {
                  return currLetters[idx] !== " " ? (
                    <span
                      key={`${currLetters[idx]}-${idx}`}
                      className={`${namespace}-letter`}
                      style={{
                        transformOrigin: "0 0",
                        display: "inline-block",
                      }}
                    >
                      {currLetters[idx]}
                    </span>
                  ) : (
                    <span key={`${currLetters[idx]}-${idx}`}>
                      {currLetters[idx]}
                    </span>
                  );
                });
              return (
                <div key={`${currLetters}-${idx}`} style={{ display: "flex" }}>
                  {letters}
                </div>
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

  const mediaContainerStyle = {
    transition: `opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  };
  const mediaContainerTransitionStyles: {
    [key: string]: React.CSSProperties;
  } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <Transition in={isVisible} nodeRef={mediaRef} timeout={300}>
      {(state) => (
        <div
          ref={mediaRef}
          className={`${namespace}-media-content`}
          style={{
            ...mediaContainerStyle,
            ...mediaContainerTransitionStyles[state],
          }}
        >
          {/* {isVisible && <MediaCollageSVG />}
      {!isVisible && <MediaCollagePlaceholderSVG />} */}

          <MediaCollageSVG />
        </div>
      )}
    </Transition>
  );
};
const AboutMeBanner = () => {
  const smallWindowWidth = useWindowWidth(576);
  const media = <MediaContent />;
  const { ref: headerRef, isVisible } = useIntersectionWrapper();

  return (
    <div id={namespace}>
      <AboutMeHeader isVisible={isVisible} headerRef={headerRef} />
      <div id={`${namespace}-inner-container`}>
        {smallWindowWidth && media}
        <TextContent isVisible={isVisible} />
      </div>
    </div>
  );
};
export default AboutMeBanner;
