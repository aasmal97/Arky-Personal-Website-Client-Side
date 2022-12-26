import LineDividerSVG from "../../../../utilities/lineDivider/LineDivider";
import useElementSize from "../../../../hooks/useElementSize";
import { Link } from "react-router-dom";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import useTypingAnimation from "../../../../hooks/useTypingAnimation";
const namespace = "project-banner";
const WaveSvg = ({
  orientation = "right",
}: {
  orientation?: "bottom" | "right";
}) => {
  const right = (
    <svg viewBox="0 0 287 339" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.96232 339L9.92325 329.583C16.8042 320.167 30.726 301.333 26.4054 282.5C22.1649 263.667 -0.238117 244.833 0.0019145 226C0.321957 207.167 23.205 188.333 36.5668 169.5C49.9286 150.667 53.609 131.833 48.7284 113C43.7677 94.1667 30.1659 75.3333 26.5654 56.5C22.965 37.6667 29.3658 18.8333 32.5662 9.41667L35.7667 0H287V9.41667C287 18.8333 287 37.6667 287 56.5C287 75.3333 287 94.1667 287 113C287 131.833 287 150.667 287 169.5C287 188.333 287 207.167 287 226C287 244.833 287 263.667 287 282.5C287 301.333 287 320.167 287 329.583V339H2.96232Z"
        fill="#3AC2FF"
      />
    </svg>
  );
  const bottom = (
    <svg viewBox="0 0 282 142" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M-1.06096e-05 1.46568L7.83333 4.90976C15.6667 8.31426 31.3333 15.2024 47 13.0647C62.6667 10.9666 78.3334 -0.117814 94 0.000947244C109.667 0.159296 125.333 11.4812 141 18.0923C156.667 24.7033 172.333 26.5243 188 24.1095C203.667 21.6551 219.333 14.9253 235 13.1439C250.667 11.3625 266.333 14.5294 274.167 16.1129L282 17.6964L282 142H274.167C266.333 142 250.667 142 235 142C219.333 142 203.667 142 188 142C172.333 142 156.667 142 141 142C125.333 142 109.667 142 94 142C78.3334 142 62.6667 142 47 142C31.3333 142 15.6667 142 7.83333 142H-1.06096e-05L-1.06096e-05 1.46568Z"
        fill="#3AC2FF"
      />
    </svg>
  );
  return (
    <div className={`${namespace}-wave`}>
      {orientation === "bottom" && bottom}
      {orientation === "right" && right}
    </div>
  );
};
const TypingAnimation = () => {
  const { ref, currWord } = useTypingAnimation({
    strArr: ["education.", "health.", "technology."],
  });
  return (
    <span style={{ display: "inline-block", width: "100%" }}>
      <span className={`${namespace}-ani-container`} ref={ref}>{currWord}</span>
    </span>
  );
};
const TextContent = () => {
  const [squareRef, { width, height }] = useElementSize();

  return (
    <div className={`${namespace}-text-content`}>
      <h2 ref={squareRef}>Impactful Projects</h2>
      <LineDividerSVG
        width={width + width * 0.05}
        styles={{
          lineHeight: height / 20,
          lineColor: "white",
          circleColors: ["#3ac2ff", "#ff5050", "#FFC83A"],
        }}
        circleRadius={height / 7.5}
      />
      <p style={{ width: width + width * 0.05 }}>
        My dream is to one day create something that can change and greatly
        impact the world. That’s why I love working on meaningful projects,
        especially related to <TypingAnimation />
      </p>
      <Link to="/projects">See Projects</Link>
    </div>
  );
};
const Carousel = () => {
  const smallWindowWidth = useWindowWidth(992);
  return (
    <div className={`${namespace}-carousel`}>
      <WaveSvg orientation={smallWindowWidth ? "right" : "bottom"} />
    </div>
  );
};
const ProjectBanner = () => {
  return (
    <div id={`${namespace}`}>
      <TextContent />
      <Carousel />
    </div>
  );
};
export default ProjectBanner;
