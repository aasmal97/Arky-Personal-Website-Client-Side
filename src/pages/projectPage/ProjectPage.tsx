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
import { unstable_batchedUpdates } from "react-dom";
import {
  ProjectCardProps,
  fetchProjectData,
} from "../../utilities/asyncActions/ProjectActions";
const toLocale = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
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

const countPerPage = 10;
const ProjectUrls = ({
  githubURL,
  appURL,
}: {
  githubURL?: string;
  appURL?: string;
}) => {
  return (
    <>
      <a
        className={`${namespace}-project-url`}
        href={githubURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
      <a
        className={`${namespace}-project-url`}
        href={appURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faLink} />
      </a>
    </>
  );
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
          <ProjectUrls githubURL={githubURL} appURL={appURL} />
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
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    projectName: "Window Actions",
    imgURL: " ",
    placeholderURL: " ",
    description: "This app does the following",
    githubURL: "https://github.com/aasmal97",
    id: "feferfre",
    startDate: new Date(),
    endDate: new Date(),
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
  const [caroSlides, setCaroSlides] =
    useState<ProjectCardProps[]>(initialSlides);
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
  useEffect(() => {
    fetchProjectData(1, 50, {
      startDate: {
        order: "ascending",
        date: new Date("").toString(),
      },
      endDate: {
        date: new Date().toString(),
      },
    });
  }, []);
  return (
    <div id={`${namespace}`}>
      <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
        <WaveBg id="project-wave" />
      </div>
      <div id={`${namespace}-inner`}>
        <h2 ref={headerRef}>Projects</h2>
        <div id={`${namespace}-carousel`} style={{ minHeight: caroHeight }}>
          <Carousel numSlidesPerView={1} namespace={namespace}>
            {caroSlides.map((slide) => {
              return (
                <div key={slide.id} className={`${namespace}-slide`}>
                  <div className={`${namespace}-slide-img-container`}>
                    <LazyImage
                      src={slide.imgURL}
                      placeholderSrc={slide.placeholderURL}
                      alt={""}
                    />
                  </div>
                  <div className={`${namespace}-slide-text-content`}>
                    <div className={`${namespace}-slide-first-row`}>
                      <h4>{slide.projectName}</h4>
                      <div className={`${namespace}-slide-project-urls`}>
                        <ProjectUrls
                          githubURL={slide.githubURL}
                          appURL={slide.appURL}
                        />
                      </div>
                    </div>

                    {(slide.endDate || slide.startDate) && (
                      <div className={`${namespace}-slide-dates`}>
                        {slide.startDate && (
                          <span>Started on {toLocale(slide.startDate)} </span>
                        )}
                        {slide.endDate && (
                          <span>Finished on {toLocale(slide.endDate)}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Carousel>
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
