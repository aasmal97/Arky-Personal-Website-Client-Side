import anime from "animejs";
import { createElement, cloneElement, useEffect } from "react";
import useElementSize from "../../hooks/useElementSize";
const PathDefinitions = () => {
  return (
    <>
      <path d="M5 0V69H42" stroke="white" />
      <path
        d="M49.0417 45.5002H84.4999C84.4999 45.5002 86.4999 42 84.4999 36.5001C82.4999 31.0002 80.4999 29.5003 76.9999 27.5001C72.3852 24.8629 67.6096 24.2144 61.9999 26.0002C58.4999 27.1144 54.4999 30.5001 54.4999 30.5001C54.4999 30.5001 51.4999 33.2501 50.9999 35C49.9999 37 49.4999 41 49.4999 41C49.4999 41 49 45 49 46.5C49 48.5613 49.0494 50.4943 49.4999 53C49.9504 55.5057 50.2499 56.5 50.9999 58.5C52.5 62.5 54.5353 64.2527 54.5353 64.2527C57.5 68 65 70.5 65 70.5C69.0001 70.9998 74 71 76.9999 69.5002L87 64.2527"
        stroke="white"
      />
      <path
        d="M460.042 45.5057H495.5C495.5 45.5057 497.5 42.0055 495.5 36.5056C493.5 31.0057 491.5 29.5057 488 27.5056C483.385 24.8684 478.61 24.2199 473 26.0057C469.5 27.1199 465.5 30.5056 465.5 30.5056C465.5 30.5056 462.5 33.2556 462 35.0055C461 37.0055 460.5 41.0055 460.5 41.0055C460.5 41.0055 460 45.0055 460 46.5055C460 48.5668 460.049 50.4998 460.5 53.0055C460.95 55.5112 461.25 56.5055 462 58.5055C463.5 62.5055 465.535 64.2582 465.535 64.2582C468.5 68.0055 476 70.5055 476 70.5055C480 71.0053 485 71.0055 488 69.5057L498.5 64.2582"
        stroke="white"
      />
      <path d="M142 1V29" stroke="white" />
      <path
        d="M109 6C108.5 21.5 107.5 57.6 107.5 64C107.5 70.4 114.833 71 118.5 70.5L124.5 68.5V26.5H95.5"
        stroke="white"
      />
      <path
        d="M190.5 30.5C186.1 27.7 179.833 25.6667 177.5 25.5C175 25.3334 169.946 25.9713 167.5 27.5C163.5 30 162 32 163 38.5C164 45 173.5 46.5 174 47C174.4 47.4 182.167 50.8334 186 52.5C188 54.8334 189.5 57 188.5 62C188 66.5 179.333 70.3334 176 70.5C174.667 70.8334 171.1 71.1 167.5 69.5C163.9 67.9 158.167 64.8333 157.5 64.5"
        stroke="white"
      />
      <path
        d="M567 9.5C566.5 25 565.5 57.6 565.5 64C565.5 70.4 572.833 71 576.5 70.5L582.5 68.5V26.5H555.5"
        stroke="white"
      />
      <path
        d="M332 45.5C331.6 31.1 323.5 26.5 314.5 25.5C314.5 25.5 296.5 21.5 293.5 46C291 73.0001 314 70.5 314 70.5C330 69 332.4 59.9 332 45.5Z"
        stroke="white"
      />
      <path
        d="M280 15L276 11C262 3.33328 228 -0.500006 225.5 37.5C225.5 71.5 258 75 274.5 65L280 59.5"
        stroke="white"
      />
      <path
        d="M549.5 62C549 62.5 547 64.3 543 67.5C529 76 510.519 69 512 46.2163C513.584 21.8414 534.5 22.5 544 29.218L549.5 33"
        stroke="white"
      />
      <path
        d="M351.5 22V38M351.5 74.5V38M351.5 38C351.5 38 364 23.7892 371.5 24.9999C378.247 26.089 385.5 29.4999 385.5 35.4999C385.5 41.4999 385.5 74.5 385.5 74.5"
        stroke="white"
      />
      <path
        d="M407 22V38M407 74.5V38M407 38C407 38 419.5 23.7892 427 24.9999C433.747 26.089 441 29.4999 441 35.4999C441 41.4999 441 74.5 441 74.5"
        stroke="white"
      />
    </>
  );
};
const traverseTree = (
  el: React.FunctionComponentElement<any>
): React.FunctionComponentElement<any> | undefined => {
  const type = el.type;
  if (typeof type === "string" && type === "path") return el;
  const children = el.props.children;
  try {
    if (!children) return undefined;
    if (Array.isArray(children)) {
      for (let i = 0; i++; i < children.length) {
        const result = traverseTree(children[i]);
        if (result) return result;
      }
    } else return traverseTree(children);
  } catch (e) {
    return undefined;
  }
};
const styles: { [key: string]: string } = {
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  position: "absolute" /* Outside the DOM flow */,
  height: "1px; width: 1px" /* Nearly collapsed */,
  overflow: "hidden",
  clip: "rect(1px, 1px, 1px, 1px)",
};
const LineDrawText = ({
  elementType,
  strokeDashArray,
  innerText,
  children,
  id,
}: {
  id: string;
  strokeDashArray: number;
  innerText: string;
  elementType: string;
  children: JSX.Element;
}) => {
  const [setRef, size] = useElementSize();
  const innerEl = (
    <div style={styles}>
      <div ref={setRef}>{innerText}</div>
    </div>
  );
  //   const definitions = (
  //     <defs>
  //       <linearGradient id={`${id}-gradient`}>
  //         <stop offset="0%" stopColor="white" />
  //         <stop offset="100%" stopColor="rgba(0,0,0,0)" />
  //       </linearGradient>
  //     </defs>
  //   );
  const pathJSXElement = traverseTree(children);
  const pathEl = pathJSXElement
    ? cloneElement(pathJSXElement, {
        // fill: `url(#${id}-gradient)`,
        // style: {
        //   strokeDashArray: 200,
        // },
        fill: "white",
      })
    : "";
  const definitions = (
    <defs>
      <clipPath id={`${id}-clip-path`}>{pathEl}</clipPath>
      {/* <linearGradient id={`${id}-gradient`}>
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient> */}
    </defs>
  );
  const clonedSVG = cloneElement(
    children,
    {
      width: size.width,
      id: id,
    },
    <>
      {definitions}
      {/* {pathEl} */}
    </>
  );
  const wrapper = createElement(
    elementType,
    {
      style: { position: "relative" },
    },
    <>
      {innerEl}
      {clonedSVG}
    </>
  );

  useEffect(() => {
    // const animationFunc = async () => {
    //   const lineDraw = anime({
    //     targets: `#${clonedSVG.props.id} path`,
    //     strokeDashoffset: [anime.setDashoffset, 0],
    //     strokeDasharray: strokeDashArray,
    //     easing: "linear",
    //     duration: 5000,
    //     delay: 0,
    //   }).finished;
    //   const colorInFill = anime({
    //     targets: `#${clonedSVG.props.id} path`,
    //   });
    // };
    // animationFunc();
  }, [clonedSVG.props.id]);
  return wrapper;
};
export default LineDrawText;
