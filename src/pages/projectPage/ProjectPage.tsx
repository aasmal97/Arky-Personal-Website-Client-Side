import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useElementSize from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
import PaginationBtns from "../../utilities/paginationBtns/PaginationBtns";
import axios from "axios";
import { unstable_batchedUpdates } from "react-dom";
const namespace = "project-pg";
const waveStyles: { [key: string]: string } = {
  top: "0",
  left: "0",
  position: "absolute",
  width: "100%",
  overflow: "hidden",
  zIndex: "0",
};
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
export type ProjectFetchData = {
  data: ProjectCardProps[];
  numberPerFetch: number;
  collectionCount: number;
};
const countPerPage = 10;
export const fetchProjectData = async (
  page: string | number,
  countPerPage: number
): Promise<ProjectFetchData | undefined> => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_AWS_GATEWAY_API}/projects`,
      params: {
        countPerPage: countPerPage,
        page: page,
      },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
const ProjectCard = ({
  appURL,
  imgURL,
  placeholderURL,
  projectName,
  githubURL,
  description,
}: ProjectCardProps) => {
  return (
    <div className={`${namespace}-project-card`}>
      <div className={`${namespace}-project-card-img`}>
        <LazyImage alt={""} placeholderSrc={placeholderURL} src={imgURL} />
      </div>
      <div className={`${namespace}-text-content`}>
        <div className={`${namespace}-project-urls`}>
          <a href={githubURL} target="_blank" rel="noopener noreferrer">
            <GithubIcon />
          </a>
          <a href={appURL} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLink} />
          </a>
        </div>
        <div className={`${namespace}-text-content-inner`}>
          <h4>{projectName}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
const initialSlides: ProjectCardProps[] = [
  {
    projectName: "Window Actions the world may never know",
    imgURL: " ",
    placeholderURL: " ",
    description:
      "This app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the followingThis app does the following",
    githubURL: "https://github.com/aasmal97",
    id: "dwedw",
  },
  {
    projectName: "Window Actions",
    imgURL: " ",
    placeholderURL: " ",
    description: "This app does the following",
    githubURL: "https://github.com/aasmal97",
    id: "feferfre",
  },
];

const ExploreAllBanner = ({ slides }: { slides: ProjectCardProps[] }) => {
  return (
    <>
      <h3 id={`${namespace}-explore-more-header`}>Explore All</h3>
      <div id={`${namespace}-explore-more`}>
        {slides.map((slide) => {
          return <ProjectCard key={slide.id} {...slide} />;
        })}
      </div>
    </>
  );
};
const ProjectPage = () => {
  const [waveRef, waveSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  const [paginationIdx, setPaginationIdx] = useState(0);
  const [endBtn, setEndBtn] = useState(100);
  const navigate = useNavigate();
  const params = useParams();
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const [slides, setSlides] = useState<ProjectCardProps[]>(initialSlides);
  const onChange = async (e: { prev: number; curr: number }) => {
    navigate(`/projects/${e.curr}`);
  };
  useEffect(() => {
    const idx = params.page ? parseInt(params.page) : 1;
    //we return to default settings
    if (Number.isNaN(idx)) navigate("/projects");
    else setPaginationIdx(idx);
  }, [params.page, navigate]);
  //set data
  useEffect(() => {
    fetchProjectData(
      params.page ? params.page.toString() : 1,
      countPerPage
    ).then((res) => {
      if (!res) return;
      const pages = Math.ceil(res.collectionCount / res.numberPerFetch);
      unstable_batchedUpdates(() => {
        setSlides(res.data);
        setEndBtn(pages);
      });
    });
  }, [params.page]);
  return (
    <div id={`${namespace}`}>
      <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
        <WaveBg id="project-wave" />
      </div>
      <div id={`${namespace}-inner`}>
        <h2 ref={headerRef}>Projects</h2>
        <div id={`${namespace}-carousel`} style={{ minHeight: caroHeight }}>
          <Carousel numSlidesPerView={1} namespace={namespace} />
        </div>
        <ExploreAllBanner slides={slides} />
        <PaginationBtns
          namespace={namespace}
          btnInterval={2}
          endBtn={endBtn}
          activeBtn={paginationIdx}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default ProjectPage;
