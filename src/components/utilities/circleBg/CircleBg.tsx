import useElementSize from "../../hooks/useElementSize";
import { useEffect, useState } from "react";
const CircleBg = ({
  primaryStrokeColor = "#464646",
  fillStrokeColor = "#86681e",
}: {
  fillStrokeColor?: string;
  primaryStrokeColor?: string;
}) => {
  const [setRef, size] = useElementSize();
  const verticalSize = size.height;
  const horizontalSize = size.width;
  const ratio = horizontalSize / verticalSize;
  const svgWidth = 1200;
  const svgHeight = 940;
  const circleRadius =
    ratio < 0.8 ? (svgWidth - 2) / 2 : (svgHeight * 0.8383) / 2;
  const circleDiameter = circleRadius * 2 * Math.PI;
  const [offset, setOffset] = useState(circleDiameter);
  const [currPercentage, setCurrPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = Math.round(window.scrollY);
      const currY = document.body.clientHeight - window.innerHeight;
      const currPercentage = scrollY / currY;
      const fillInWidth = circleDiameter * currPercentage;
      const offset = Math.max(0, circleDiameter - fillInWidth - 1);
      setOffset(offset); // Adjust this value to change the speed of the fill
      if (offset === 0) return setCurrPercentage(3);
      else if (currPercentage > 0.66) return setCurrPercentage(2);
      else if (currPercentage > 0.33) return setCurrPercentage(1);
      else return setCurrPercentage(0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [circleDiameter]);
  const circleCenterX = svgWidth / 2;
  const circleCenterY = svgHeight - 2 - (svgHeight * 0.98) / 2;

  const circleGeneralProps = {
    cx: circleCenterX,
    cy: circleCenterY,
    r: circleRadius,
  };
  const circleStrokeProps = {
    strokeDasharray: circleDiameter,
    strokeDashoffset: offset,
    stroke: fillStrokeColor,
    "transform-origin": `${circleCenterX} ${circleCenterY}`,
    transform: `rotate(-90)`,
  };
  const linePropsStyles = {
    transition: "stroke 0.3s ease-in-out",
  };
  return (
    <div
      ref={setRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        zIndex: 0,
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <svg
        width={"100%"}
        height={"100%"}
        viewBox="0 0 1200 940"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle {...circleGeneralProps} stroke={primaryStrokeColor} />
        <circle {...circleGeneralProps} {...circleStrokeProps} />
        <line
          x2={circleCenterX}
          y2={-verticalSize}
          x1={circleCenterX}
          y1={circleCenterY}
          stroke={currPercentage >= 3 ? fillStrokeColor : primaryStrokeColor}
          style={linePropsStyles}
        />
        <line
          x1={circleCenterX}
          y1={circleCenterY}
          x2={-svgWidth}
          y2={-svgWidth * -0.582 + 826.043}
          stroke={currPercentage >= 2 ? fillStrokeColor : primaryStrokeColor}
          style={linePropsStyles}
        />
        <line
          x1={svgWidth * 2}
          y1={svgWidth * 2 * 0.582 + 129.80329411765}
          x2={circleCenterX}
          y2={circleCenterY}
          stroke={currPercentage >= 1 ? fillStrokeColor : primaryStrokeColor}
          style={linePropsStyles}
        />
      </svg>
    </div>
  );
};
export default CircleBg;
