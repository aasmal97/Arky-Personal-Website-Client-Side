import useElementSize from "../../hooks/useElementSize";
import { useEffect, useState } from "react";

const CircleBg = ({
  primaryStrokeColor = "#464646",
  fillStrokeColor = "#7e631d",
}: {
  fillStrokeColor?: string;
  primaryStrokeColor?: string;
}) => {
  const [setRef, size] = useElementSize();
  const verticalSize = size.height;
  const horizontalSize = size.width;
  const ratio = horizontalSize / verticalSize;
  const circleRadius = ratio < 0.8 ? 1198 / 2 : 788 / 2;
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
      if (currPercentage > 0.66) return setCurrPercentage(2);
      else if (currPercentage > 0.33) return setCurrPercentage(1);
      else return setCurrPercentage(0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const circleCenterX = 1200 / 2;
  const circleCenterY = 938 - 788 / 2;
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
          style={linePropsStyles}
          y1={-verticalSize}
          x1={1200 / 2}
          x2={1200 / 2}
          y2={940 / 1.71}
          stroke={currPercentage >= 3 ? fillStrokeColor : primaryStrokeColor}
        />
        <line
          style={linePropsStyles}
          y1="-0.5"
          x2="775.99"
          y2="-0.5"
          transform="matrix(0.864838 0.502051 -0.502038 0.864846 600.329 550)"
          stroke={currPercentage >= 1 ? fillStrokeColor : primaryStrokeColor}
        />
        <line
          style={linePropsStyles}
          x1={1200 / 2}
          y1={940 / 1.71}
          x2={1200 / 2 - 671.11}
          y2="940"
          stroke={currPercentage >= 2 ? fillStrokeColor : primaryStrokeColor}
        />
      </svg>
    </div>
  );
};
export default CircleBg;
