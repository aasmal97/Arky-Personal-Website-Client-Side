import WaveSvg  from "../waveSvg/WaveSVG";
const namespace = "wave-bg";
const WaveBg = ({
  id,
}: {
  id: string;
}) => {
  return (
    <>
      <WaveSvg
        namespace={namespace}
        orientation="top"
        clipPathId={`${namespace}-wave-${id}`}
        id={`${namespace}-wave-${id}`}
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
        id={`${namespace}-rotate-wave-${id}`}
        style={{
          clipPath: `url(#${namespace}-wave-${id})`,
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
export default WaveBg;
