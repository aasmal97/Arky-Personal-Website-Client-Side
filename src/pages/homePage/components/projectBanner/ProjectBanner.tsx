import LineDividerSVG from "../../../../utilities/lineDivider/LineDivider";
import useElementSize from "../../../../hooks/useElementSize";
import { Link } from "react-router-dom";
import Carousel from "../../../../utilities/carousel/Carousel";
import { useEffect } from "react";
import anime from "animejs";
import WaveSvg from "../../../../utilities/waveSvg/WaveSVG";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import TypingAnimation from "../../../../utilities/typingAnimation/TypingAnimation";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
const namespace = "project-banner";
const TextContent = () => {
  const { ref: textRef, isVisible } = useIntersectionWrapper();
  const [squareRef, { width, height }] = useElementSize();
  const title = "Impactful Projects";
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
      <LineDividerSVG
        width={width + width * 0.05}
        styles={{
          lineHeight: height / 20,
          lineColor: "white",
          circleColors: ["#3ac2ff", "#ff5050", "#FFC83A"],
        }}
        circleRadius={height / 7.5}
      />
      <p
        style={{ width: width + width * 0.05 }}
        className={isVisible ? "visible" : ""}
      >
        My dream is to one day create something that can change and greatly
        impact the world. That’s why I love working on meaningful projects,
        especially related to{" "}
        <TypingAnimation
          namespace={namespace}
          strArr={["education.", "health.", "technology."]}
        />
      </p>
      <Link to="/projects">See Projects</Link>
    </div>
  );
};
const ProjectCaro = () => {
  const smallWindowWidth = useWindowWidth(992);
  return (
    <div className={`${namespace}-carousel`}>
      <WaveSvg
        namespace={namespace}
        orientation={smallWindowWidth ? "right" : "bottom"}
      />
      <Carousel namespace={namespace} />
    </div>
  );
};
const ProjectBanner = () => {
  return (
    <div id={`${namespace}`}>
      <TextContent />
      <ProjectCaro />
    </div>
  );
};
export default ProjectBanner;
