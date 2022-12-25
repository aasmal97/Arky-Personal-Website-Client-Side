import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import useElementSize from "../../../../hooks/useElementSize";
import DownloadButton from "../../../../utilities/downloadBtn/DownloadButton";
const namespace = "home-pg-intro-banner";
const IntroBanner = () => {
  const [squareRef, { width }] = useElementSize();
  return (
    <div id={namespace}>
      <div className={`${namespace}-img-container`}>
        <LazyImage src="" alt="" placeholderSrc="" />
      </div>
      <div className={`${namespace}-content`}>
        <div ref={squareRef} className={`${namespace}-title`}>
          <h2>I’m Arky Asmal</h2>
          <h3>A Full-Stack Developer</h3>
          <h3>based in New York</h3>
        </div>
        <p style={{ width: width }}>
          Have a project requiring front end work? Back end? Cloud
          infrastructure? Doesn’t matter. I’ll take on the challenge.
        </p>
        <DownloadButton
          fileName="Arky Asmal CV"
          fileType="doc"
          data={""}
        >Download CV</DownloadButton>
      </div>
    </div>
  );
};
export default IntroBanner;
