import { createElement, cloneElement } from "react";
import useElementSize from "../../hooks/useElementSize";
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
  isVisible = true,
  elementType,
  pathTracings,
  innerText,
  children,
  id,
  animationDelay,
}: {
  isVisible?: boolean;
  id: string;
  innerText?: string;
  elementType: string;
  animationDelay?: number;
  pathTracings: JSX.Element[];
  children: JSX.Element;
}) => {
  const delay = animationDelay ? animationDelay : 0.5;

  const animation = (
    <style scoped>
      {`@keyframes letter-animation {
    0% {
        stroke-dashoffset: 2600;
    }
    100% {
        stroke-dashoffset: 0;
    }
  }
  .${id}-letter-paths{
    opacity: 0;
    stroke-dasharray: 350%;
    stroke-dashoffset: 350%;
    stroke-width: 3%;
  }
  .${id}-letter-paths.visible{
    opacity: 1;
    animation: letter-animation ${delay}s ease-out forwards;
  }
  `}
    </style>
  );
  const [setRef, size] = useElementSize();
  const innerEl = (
    <div style={styles}>
      <div ref={setRef}>{innerText}</div>
    </div>
  );
  const pathJSXElement = traverseTree(children);
  const pathEl = pathJSXElement
    ? cloneElement(pathJSXElement, {
        fill: "white",
      })
    : "";
  const definitions = (
    <defs>
      <clipPath id={`${id}-clip-path`}>{pathEl}</clipPath>
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
      {pathTracings.map((path, idx) => {
        return (
          <g key={idx} strokeWidth={40} clipPath={`url(#${id}-clip-path)`}>
            {animation}
            {cloneElement(path, {
              className: `${id}-letter-paths ${isVisible ? "visible" : ""}`,
              style: {
                animationDelay: `${(idx * delay) / pathTracings.length}s`,
              },
            })}
          </g>
        );
      })}
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
  return wrapper;
};
export default LineDrawText;
