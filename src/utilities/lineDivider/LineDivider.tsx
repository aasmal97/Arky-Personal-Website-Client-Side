import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
const colorAlgo = (pointerIdx: number, colors?: string[]) => {
  if (!colors) return;
  const remainder = pointerIdx % colors.length;
  const newColor = colors[remainder];
  const newPointerIdx = pointerIdx++;
  return {
    color: newColor,
    pointerIdx: newPointerIdx,
  };
};
const LineDividerSVG = ({
  width,
  circleRadius,
  numOfCircles = 5,
  styles = {
    lineColor: "white",
    circleColors: ["#3ac2ff", "#ff5050", "#FFC83A"],
  },
}: {
  width?: number;
  circleRadius?: number;
  numOfCircles?: number;
  styles?: {
    lineHeight?: number;
    lineColor?: string;
    circleColors?: string[];
  };
}) => {
  const [circleArr, setCircleArr] = useState(
    Array(numOfCircles - 1)
      .fill(0)
      .map(() => ({ id: uuid() }))
  );
  useEffect(() => {
    const newArr = Array(numOfCircles - 1)
      .fill(0)
      .map(() => ({ id: uuid() }));
    setCircleArr(newArr);
  }, [numOfCircles]);
  const currWidth = width ? width : 100;
  const currCircleRadius = circleRadius ? circleRadius : 4;
  return (
    <svg
      viewBox={`0 0 ${currWidth} ${currCircleRadius * 2}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={currCircleRadius}
        y1={currCircleRadius}
        x2={`${currWidth - currCircleRadius}`}
        y2={currCircleRadius}
        strokeWidth={styles.lineHeight}
        stroke={styles.lineColor}
      />
      {circleArr.map((circle, idx) => {
        return (
          <circle
            key={circle.id}
            cx={idx * (currWidth / circleArr.length) + currCircleRadius}
            cy={currCircleRadius}
            r={currCircleRadius}
            fill={colorAlgo(idx, styles.circleColors)?.color}
          />
        );
      })}
      <circle
        cx={currWidth - currCircleRadius}
        cy={currCircleRadius}
        r={currCircleRadius}
        fill={colorAlgo(circleArr.length, styles.circleColors)?.color}
      />
    </svg>
  );
};
export default LineDividerSVG;
