import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useElementSize from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
const namespace = "project-pg";
const calculateImgHeight = (waveHeight: number, headerHeight: number) => {
  return (waveHeight - headerHeight) * 1.8;
};

export type ProjectCardProps = {
  generalURL?: string;
  appURL?: string;
  imgURL: string;
  placeholderURL: string;
  projectName?: string;
  githubURL?: string;
  id: string;
  description?: string;
};

const ProjectCard = ({
  generalURL,
  appURL,
  imgURL,
  placeholderURL,
  projectName,
  githubURL,
  id,
  description,
}: ProjectCardProps) => {
  return (
    <div className={`${namespace}-project-card`}>
      <LazyImage
        alt={description ? description : ""}
        placeholderSrc={placeholderURL}
        src={imgURL}
      />
      <div className={`${namespace}-project-urls`}>
        <a href={githubURL} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
        <a href={appURL} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLink} />
        </a>
      </div>
      <div className={`${namespace}-text-content`}>
        <h4>{projectName}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};
const ProjectPage = () => {
  const [waveRef, waveSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  return (
    <div id={`${namespace}`}>
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
        <WaveBg id="project-wave" />
      </div>
      <div id={`${namespace}-inner`}>
        <h2 ref={headerRef}>Projects</h2>
        <div id={`${namespace}-carousel`} style={{ minHeight: caroHeight }}>
          <Carousel numSlidesPerView={1} namespace={namespace} />
        </div>
        <h3>Explore More</h3>
        <div id={`${namespace}-explore-more`}></div>
      </div>
    </div>
  );
};
export default ProjectPage;
