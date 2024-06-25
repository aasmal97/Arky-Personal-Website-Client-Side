import useElementSize from "../../../../hooks/useElementSize";
import { Link } from "react-router-dom";
import Carousel from "../../../../utilities/carousel/Carousel";
import { useEffect } from "react";
import anime from "animejs";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import TypingAnimation from "../../../../utilities/typingAnimation/TypingAnimation";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
import useProjectDocs from "../../../../hooks/useProjectDocs";
import { LoadingIconCircleRotation } from "../../../../utilities/loadingIcon/LoadingIcon";
import { ProjectSlide } from "../../../projectPage/ProjectPage";
import RotatedStickyLabel from "../../../../utilities/stickyLabel/StickyLabel";
import ProjectItem from "../../../../utilities/projectItem/ProjectItem";
const namespace = "project-banner";
const TextContent = () => {
  const { ref: textRef, isVisible } = useIntersectionWrapper();
  const [squareRef, _] = useElementSize();
  const title = "Projects";
  useEffect(() => {
    if (isVisible)
      anime.timeline().add({
        targets: `.${namespace}-letter`,
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: (el, i) => 50 * (i + 1),
      });
    return () => anime.remove(`.${namespace}-letter`);
  }, [isVisible]);
  return (
    <div className={`${namespace}-text-content`}>
      <h2
        ref={(el) => {
          squareRef(el);
          textRef.current = el;
        }}
        aria-label={title}
      >
        {Array(title.length)
          .fill(0)
          .map((e, idx) => {
            return title[idx] ? (
              <span
                key={`${title[idx]}-${idx}`}
                className={`${namespace}-letter`}
              >
                {title[idx]}
              </span>
            ) : (
              <span key={`${title[idx]}-${idx}`}>{title[idx]}</span>
            );
          })}
      </h2>
      <p className={isVisible ? "visible" : ""}>
        My dream is to use technology to change and impact the world. That’s why
        I love working on meaningful projects, especially related to{" "}
        <TypingAnimation
          namespace={namespace}
          strArr={["education.", "health.", "technology."]}
        />
      </p>
    </div>
  );
};
const ProjectSection = () => {
  const smallWindowWidth = useWindowWidth(992);
  const countPerPage = 4;
  const { slides: presentationSlides, status: presentationSlidesStatus } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: false,
    });
  return (
    <div className={`${namespace}-featured`}>
      <RotatedStickyLabel>Latest Projects</RotatedStickyLabel>
      <div className={`${namespace}-featured-container`}>
        {presentationSlidesStatus === "success" &&
          presentationSlides.map((slide) => {
            return <ProjectItem key={slide.id} data={slide} />;
          })}
      </div>

      {/* {presentationSlidesStatus === "success" && (
        <Carousel numSlidesPerView={1} namespace={namespace}>
          {presentationSlides.map((slide) => {
            return <ProjectSlide key={slide.id} slide={slide} responsive />;
          })}
        </Carousel>
      )} */}
      {presentationSlidesStatus === "loading" && (
        <LoadingIconCircleRotation
          className={`${namespace}-loading-dots`}
          nested={false}
          durationInterval={500}
          textColor="#3AC2FF"
          width="20%"
          center
        />
      )}
    </div>
  );
};
const ProjectBanner = () => {
  return (
    <div id={`${namespace}`}>
      <TextContent />
      <ProjectSection />
    </div>
  );
};
export default ProjectBanner;
