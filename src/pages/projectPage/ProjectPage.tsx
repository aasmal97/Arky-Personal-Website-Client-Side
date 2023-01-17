import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useElementSize from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
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
const getBtnArray = (
  btnInterval: number,
  activeBtn: number,
  endBtn: number
) => {
  const arr = Array(btnInterval).fill(0);
  const btnArr: number[] = [activeBtn];
  let btnArrLeft = 0;
  let btnArrRight = 0;
  let currNum: number;

  const addRight = () => {
    btnArrRight++;
    currNum = btnArrRight + activeBtn;
    btnArr.push(currNum);
  };
  const addLeft = () => {
    btnArrLeft++;
    let currNum = activeBtn - btnArrLeft;
    btnArr.unshift(currNum);
  };
  const iter = arr.length - 1;
  for (let i = 0; i < iter; i++) {
    if (arr.length % 2 !== 0) {
      if (btnArr[btnArr.length - 1] + 1 <= endBtn) addRight();
      else if (btnArr[0] - 1 > 0) addLeft();
    } else {
      if (btnArr[0] - 1 > 0) addLeft();
      else if (btnArr[btnArr.length - 1] + 1 <= endBtn) addRight();
    }
    arr.pop();
  }
  return btnArr;
};
const PaginationBtns = ({
  onChange,
  endBtn,
  activeBtn,
  btnInterval,
}: {
  onChange?: (e: { prev: number; curr: number }) => void;
  btnInterval: number;
  endBtn: number;
  activeBtn?: number;
}) => {
  const [active, setActive] = useState(
    typeof activeBtn === "number" ? activeBtn : 1
  );
  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;

    const idx = target.dataset.idx ? parseInt(target.dataset.idx) : active;
    setActive(idx);
    if (onChange) onChange({ prev: active, curr: idx });
  };
  console.log(active);
  //this allows for an active number to be passed in from outside
  useEffect(() => {
    if (typeof activeBtn === "number") setActive(activeBtn);
  }, [activeBtn]);
  const btnArr = getBtnArray(btnInterval, active, endBtn);
  const ellipsis = (
    <span className={`${namespace}-pagination-ellipsis`}>...</span>
  );
  //   console.log(btnArr[0] !== 1 || btnArr[0] - 1 !== 1)
  return (
    <div id={`${namespace}-pagination`}>
      <button
        onClick={onBtnClick}
        data-idx={active - 1}
        disabled={active - 1 <= 0}
      >
        Prev
      </button>
      {btnArr[0] !== 1 && (
        <>
          <button onClick={onBtnClick} data-idx={1}>
            {1}
          </button>
          {btnArr[0] - 1 !== 1 && ellipsis}
        </>
      )}
      {btnArr.map((idx) => (
        <button key={idx} onClick={onBtnClick} data-idx={idx}>
          {idx}
        </button>
      ))}
      {btnArr[btnArr.length - 1] !== endBtn && (
        <>
          {btnArr[btnArr.length - 1] + 1 !== endBtn && ellipsis}
          <button onClick={onBtnClick} data-idx={endBtn}>
            {endBtn}
          </button>
        </>
      )}
      <button
        disabled={active + 1 >= endBtn}
        onClick={onBtnClick}
        data-idx={active + 1}
      >
        Next
      </button>
    </div>
  );
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
  const navigate = useNavigate();
  const params = useParams();
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const [slides, setSlides] = useState<ProjectCardProps[]>(initialSlides);
  const [endBtn, setEndBtn] = useState(1);
  useEffect(() => {
    const idx = params.page ? parseInt(params.page) : 0;
    //we return to default settings
    if (Number.isNaN(idx)) navigate("/projects");
    else setPaginationIdx(idx);
  }, [params.page, navigate]);
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
          btnInterval={3}
          endBtn={endBtn}
          activeBtn={paginationIdx}
        />
      </div>
    </div>
  );
};
export default ProjectPage;
