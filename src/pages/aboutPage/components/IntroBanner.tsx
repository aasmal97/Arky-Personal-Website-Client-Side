import useElementSize from "../../../hooks/useElementSize";
import LazyImage from "../../../utilities/lazyComponents/LazyImg";
import LineDividerSVG from "../../../utilities/lineDivider/LineDivider";
import WaveSvg from "../../../utilities/waveSvg/WaveSVG";
import { useState, useEffect } from "react";
import text from "./introTextContent.txt";
import useLoadingState from "../../../hooks/useLoadingState";
import { v4 as uuid } from "uuid";
import LoadingIcon from "../../../utilities/loadingIcon/LoadingIcon";
const namespace = "about-pg";

const WaveBg = () => {
  return (
    <>
      <WaveSvg
        namespace={namespace}
        orientation="top"
        clipPathId={`${namespace}-intro-wave`}
        id={`${namespace}-intro-wave`}
        styles={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          bottom: "0",
        }}
        svgStyles={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          bottom: "0",
          zIndex: "-1",
        }}
      />
      <div
        id={`${namespace}-intro-rotate`}
        style={{
          clipPath: `url(#${namespace}-intro-wave)`,
          transform: "rotate(180deg)",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
        }}
      />
    </>
  );
};
const IntroLineDivider = () => (
  <div id={`${namespace}-intro-divider`}>
    <LineDividerSVG
      numOfCircles={4}
      circleRadius={2}
      styles={{
        lineColor: "white",
        circleColors: ["#3ac2ff", "#ff5050", "#FFC83A"],
        lineHeight: 0.5,
      }}
    />
  </div>
);
const calculateImgHeight = (waveHeight: number, headerHeight: number) => {
  return (waveHeight - headerHeight) * 1.8;
};
const extractLinksFromText = (text: string) => {
  // eslint-disable-next-line
  const matches = text.match(/\([^\(\)]+\)\[[^\[\]]+\]/g);
  // eslint-disable-next-line
  const extractWords = matches
    ? matches.map((a) => {
        // eslint-disable-next-line
        const removePara = a.replace(/[\(\)]/g, "");
        // eslint-disable-next-line
        const word = removePara.replace(/\[.+\]/g, "");
        return word;
      })
    : [];
  const extractLinks = matches
    ? matches.map((a) => {
        // eslint-disable-next-line
        const removeBrackets = a.replace(/[\[\]]/g, "");
        // eslint-disable-next-line
        const word = removeBrackets.replace(/\(.+\)/g, "");
        return word;
      })
    : [];
  const links = extractWords.map((w, idx) => (
    <a
      key={uuid()}
      target="_blank"
      rel="noopener noreferrer"
      href={
        extractLinks[idx] === "google query"
          ? `https://www.google.com/search?q=${w}`
          : extractLinks[idx] === "google maps"
          ? `https://www.google.com/maps/search/?api=1&query=${w}`
          : extractLinks[idx]
      }
    >
      {w}
    </a>
  ));
  const extractWordsIdxs = matches
    ? matches.map((a) => {
        const startIdx = text.indexOf(a);
        return {
          startIdx: startIdx,
          endIdx: startIdx + a.length,
        };
      })
    : [];
  const textArr: (string | JSX.Element)[] = [];
  let textIdx = 0;
  extractWordsIdxs.forEach((a, idx) => {
    if (textIdx < a.endIdx) {
      const result = text.substring(textIdx, a.startIdx);
      textArr.push(result);
    } else {
    }
    textArr.push(links[idx]);
    textIdx = a.endIdx;
  });
  if (textIdx !== text.length)
    textArr.push(text.substring(textIdx, text.length));
  return textArr;
};
const IntroParagraph = ({ text }: { text: string }) => {
  const result = extractLinksFromText(text);
  return (
    <p>
      {result[0] && typeof result[0] === "string" && (
        <span className={`${namespace}-text-first-letter`}>{result[0][0]}</span>
      )}
      {result.map((a, idx) => {
        if (typeof a === "string")
          return (
            <span key={uuid()}>{idx === 0 ? a.substring(1, a.length) : a}</span>
          );
        else return a;
      })}
    </p>
  );
};
const fetchTextFile = () =>
  fetch(text)
    .then((res) => res.text())
    .then((res) => res.split(/\n/));

const IntroBanner = () => {
  const [waveRef, waveSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  const [imgHeight, setImageHeight] = useState(
    calculateImgHeight(waveSize.height, headerSize.height)
  );
  const {
    status: textStatus,
    result: textResult,
    callFunction: textCallFunction,
  } = useLoadingState({
    asyncFunc: fetchTextFile,
  });
  useEffect(() => {
    setImageHeight(calculateImgHeight(waveSize.height, headerSize.height));
  }, [waveSize.height, headerSize.height]);
  useEffect(() => {
    textCallFunction();
  }, [textCallFunction]);
  return (
    <div id={`${namespace}-intro`}>
      <div
        ref={waveRef}
        id={`${namespace}-wave-bg`}
        style={{
          top: "0",
          left: "0",
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <WaveBg />
      </div>
      <div id={`${namespace}-intro-inner`}>
        <h2 ref={headerRef}>About</h2>
        <div id={`${namespace}-intro-img`} style={{ minHeight: imgHeight }}>
          <LazyImage src="" placeholderSrc="" alt="" />
        </div>
        <IntroLineDivider />
      </div>
      {textStatus === "loading" && <LoadingIcon />}
      {textStatus === "success" && (
        <div id={`${namespace}-intro-text-content`}>
          {Array.isArray(textResult) &&
            textResult.map((e) => {
              if (typeof e === "string")
                return <IntroParagraph key={e} text={e} />;
              else return null;
            })}
        </div>
      )}
    </div>
  );
};
export default IntroBanner;
