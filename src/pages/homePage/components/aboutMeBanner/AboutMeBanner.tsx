import useWindowWidth from "../../../../hooks/useWindowWidth";
const namespace = "about-me-pg";
const WaveSVG = ({
  orientation = "right",
}: {
  orientation?: "right" | "top";
}) => {
  const top = (
    <svg viewBox="0 0 324 228" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M324 217.6L315 220.725C306 223.812 288 230.062 270 226.746C252 223.431 234 210.626 216 210.169C198 209.712 180 221.678 162 211.694C144 201.709 126 169.85 108 153.273C90 136.696 72 135.4 54 138.411C36 141.383 18 148.624 9.00001 152.244L1.52588e-05 155.864L1.52588e-05 3.34197e-06H9.00001C18 3.34197e-06 36 3.34197e-06 54 3.34197e-06C72 3.34197e-06 90 3.34197e-06 108 3.34197e-06C126 3.34197e-06 144 3.34197e-06 162 3.34197e-06C180 3.34197e-06 198 3.34197e-06 216 3.34197e-06C234 3.34197e-06 252 3.34197e-06 270 3.34197e-06C288 3.34197e-06 306 3.34197e-06 315 3.34197e-06H324V217.6Z"
        fill="#FFC83A"
      />
    </svg>
  );
  const right = (
    <svg viewBox="0 0 213 319" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.43841 319L6.51511 310.139C3.62746 301.278 -2.21914 283.556 0.88241 265.833C3.98396 248.111 15.9624 230.389 16.3902 212.667C16.818 194.944 5.62386 177.222 14.9642 159.5C24.3045 141.778 54.1079 124.056 69.6156 106.333C85.1234 88.6111 86.3355 70.8889 83.5191 53.1667C80.7384 35.4444 73.9649 17.7222 70.5782 8.86111L67.1914 0L213 0V8.86111C213 17.7222 213 35.4444 213 53.1667C213 70.8889 213 88.6111 213 106.333C213 124.056 213 141.778 213 159.5C213 177.222 213 194.944 213 212.667C213 230.389 213 248.111 213 265.833C213 283.556 213 301.278 213 310.139V319H9.43841Z"
        fill="#FFC83A"
      />
    </svg>
  );
  return (
    <div className={`${namespace}-wave`}>
      {orientation === "right" && right}
      {orientation === "top" && top}
    </div>
  );
};
const TextContent = () => {
  const smallWindowWidth = useWindowWidth(992);

  return (
    <div className={`${namespace}-text-container`}>
      <WaveSVG orientation={smallWindowWidth ? "right" : "top"} />
      <div className={`${namespace}-text-content`}>
        <h2>I’m also human!</h2>
        <span>
          (no not a Killers{" "}
          <a
            href="https://www.youtube.com/watch?v=RIZdjT1472Y"
            rel="noopener noreferrer"
          >
            reference
          </a>{" "}
          )
        </span>
        <p>
          <span>I</span> enjoy playing and watching football (sorry SOCCER for
          my compatriots), along with chess and billiards. Don’t worry, this
          doesn’t stem from my love of math or physics or anything... hehe. On
          the odd day, you can also catch me accidentally butchering my mother’s
          Ecuadorian recipes (After all, cooking is just chemistry right?
          Ha...ha...)
        </p>
      </div>
    </div>
  );
};
const MediaContent = () => {
  return <div className={`${namespace}-media-content`}></div>;
};

const AboutMeBanner = () => {
  const smallWindowWidth = useWindowWidth(992);
  return (
    <div id={namespace}>
      {smallWindowWidth && <MediaContent />}
      <TextContent />
      {!smallWindowWidth && <MediaContent />}
    </div>
  );
};
export default AboutMeBanner;
