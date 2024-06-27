import { useEffect, createElement } from "react";
import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import useElementSize from "../../../../hooks/useElementSize";
import DownloadButton from "../../../../utilities/downloadBtn/DownloadButton";
import anime from "animejs";
import { v4 as uuid } from "uuid";
import ActionBtn from "../../../../utilities/actionBtn/ActionBtn";
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
  const words = children.split(" ");
  const el = createElement(
    htmlTag,
    { className: `${namespace}-header` },
    <>
      {Array(words.length)
        .fill(0)
        .map((_, idx) => {
          const currLetters = words[idx];
          const letters = Array(currLetters.length)
            .fill(0)
            .map((_, i) => currLetters[i])
            .map((letter, idx) => {
              return currLetters !== " " ? (
                <span
                  key={`${currLetters}-${idx}`}
                  className={`${namespace}-letter-${id}`}
                  style={{ display: "inline-block" }}
                >
                  {currLetters[idx]}
                </span>
              ) : (
                <span key={`${currLetters}-${idx}`}>{currLetters}</span>
              );
            });
          return (
            <div key={`${currLetters}-${idx}`} style={{ display: "flex" }}>
              {letters}
            </div>
          );
        })}
    </>
  );
  return el;
};
const IntroBanner = () => {
  return (
    <div id={namespace}>
      <div className={`${namespace}-img-container`}>
        <div className={`${namespace}-img-wrapper`}>
          <LazyImage
            src={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/profile.png`}
            //src={process.env.REACT_APP_MEDIA_FILES_URL + "/homePg/profile-placeholder.png"}
            alt="Arky Asmal smiling, and standing with arms folded"
            placeholderSrc={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/profile-placeholder.png`}
          />
        </div>
      </div>
      <div className={`${namespace}-content`}>
        <div className={`${namespace}-title`}>
          <AnimateHeaders id={uuidArr[0]} htmlTag="h2">
            Welcome! I'm Arky
          </AnimateHeaders>
          <AnimateHeaders id={uuidArr[2]} htmlTag="h3">
            A Software Developer
          </AnimateHeaders>
        </div>
        <div className={`${namespace}-sub-content`}>
          <p>
            I provide technical, impactful and collaborative solutions to an
            application’s frontend, backend and cloud infrastructure
          </p>
          <DownloadButton
            fileName="ArkyAsmalCV"
            fileType="pdf"
            data={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/ArkyAsmalCV.pdf`}
          >
            {(props) => <ActionBtn props={props}>Download CV</ActionBtn>}
          </DownloadButton>
        </div>
      </div>
    </div>
  );
};
export default IntroBanner;
