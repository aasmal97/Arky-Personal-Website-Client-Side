import { useEffect, createElement } from "react";
import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import useElementSize from "../../../../hooks/useElementSize";
import DownloadButton from "../../../../utilities/downloadBtn/DownloadButton";
import anime from "animejs";
import { v4 as uuid } from "uuid";
const namespace = "home-pg-intro-banner";
const uuidArr = Array(3)
  .fill(0)
  .map(() => uuid());
const AnimateHeaders = ({
  id,
  htmlTag,
  children,
}: {
  id: string;
  htmlTag: string;
  children: string;
}) => {
  useEffect(() => {
    anime.timeline().add({
      targets: `.${namespace}-header .${namespace}-letter-${id}`,
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 4000,
      delay: (el, i) => 500 + 40 * i,
    });
    return () => {
      anime.remove(`.${namespace}-header .${namespace}-letter-${id}`);
    };
  }, [id]);
  const el = createElement(
    htmlTag,
    { className: `${namespace}-header` },
    <>
      {Array(children.length)
        .fill(0)
        .map((e, idx) => {
          return children[idx] !== " " ? (
            <span
              key={`${children[idx]}-${idx}`}
              className={`${namespace}-letter-${id}`}
              style={{ display: "inline-block" }}
            >
              {children[idx]}
            </span>
          ) : (
            <span key={`${children[idx]}-${idx}`}>{children[idx]}</span>
          );
        })}
    </>
  );
  return el;
};
const IntroBanner = () => {
  const [squareRef, { width }] = useElementSize();
  return (
    <div id={namespace}>
      <div className={`${namespace}-img-container`}>
        <LazyImage
          src={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/profile.png`}
          //src={process.env.REACT_APP_MEDIA_FILES_URL + "/homePg/profile-placeholder.png"}
          alt="Arky Asmal smiling, and standing with arms folded"
          placeholderSrc={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/profile-placeholder.png`}
        />
      </div>
      <div className={`${namespace}-content`}>
        <div ref={squareRef} className={`${namespace}-title`}>
          <AnimateHeaders id={uuidArr[0]} htmlTag="h2">
            I’m Arky Asmal
          </AnimateHeaders>
          <AnimateHeaders id={uuidArr[1]} htmlTag="h3">
            A Full-Stack Developer
          </AnimateHeaders>
          <AnimateHeaders id={uuidArr[2]} htmlTag="h3">
            based in New York
          </AnimateHeaders>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={`${namespace}-sub-content`}
        >
          <p style={{ width: width }}>
            Have a project requiring frontend work? Backend? Cloud
            infrastructure? Machine learning? Let's tackle it together.
          </p>
          <DownloadButton
            fileName="ArkyAsmalCV"
            fileType="pdf"
            data={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/ArkyAsmalCV.pdf`}
          >
            Download CV
          </DownloadButton>
        </div>
      </div>
    </div>
  );
};
export default IntroBanner;
