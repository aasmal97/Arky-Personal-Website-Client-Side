import useElementSize, { Size } from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
import { ProjectDocument } from "../../utilities/types/RestApiTypes";
import { sortMixedStrings } from "../../helpers/sortMixedStrings";
import useProjectDocs from "../../hooks/useProjectDocs";
import seperateToWords from "../../helpers/seperateToWords";
import LoadingIcon, {
  LoadingIconCircleRotation,
} from "../../utilities/loadingIcon/LoadingIcon";
import { ComingSoonBanner } from "../../utilities/comingSoon/ComingSoonBanner";
import useWindowWidth from "../../hooks/useWindowWidth";
import { memo, useEffect } from "react";
import { LinkIcon } from "../../utilities/icons/LinkIcon";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
import ProjectItem from "../../utilities/projectItem/ProjectItem";
import { AnimateHeaders } from "../../utilities/animateHeaders/animateHeaders";
import { v4 as uuid } from "uuid";

const uuidArr = Array(3)
  .fill(0)
  .map(() => uuid());
const materialUITheme = createTheme({
  palette: {
    primary: {
      main: "#ff5050",
    },
    secondary: {
      main: "##3b3b3b",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
const toLocale = (date: string | Date) =>
  new Date(date).toLocaleDateString(
    (navigator && navigator.languages && navigator.languages?.[0]) || "en-us",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
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

const ProjectsPagination = ({
  onPrev,
  onNext,
  prevStartKey,
  startKey,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevStartKey: string | null | undefined;
  startKey: string | null;
}) => {
  return (
    <div className={`${namespace}-pagination`}>
      <Button
        style={{ textTransform: "none" }}
        variant="text"
        className={`${namespace}-pagination-btns-prev`}
        onClick={onPrev}
        aria-label="previous"
        disabled={typeof prevStartKey === "undefined"}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Prev
      </Button>
      <Button
        style={{ textTransform: "none" }}
        variant="text"
        className={`${namespace}-pagination-btns-next`}
        onClick={onNext}
        aria-label="next"
        disabled={!startKey}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
};
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
        href={appURL ? appURL : githubURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon />
      </a>
    </>
  );
};

const ProjectSlideTextContent = ({ slide }: { slide: ProjectDocument }) => {
  return (
    <div className={`${namespace}-slide-text-content`}>
      <div className={`${namespace}-slide-first-row`}>
        <h4>{seperateToWords(slide.projectName)}</h4>
        <div className={`${namespace}-slide-project-urls`}>
          <ProjectUrls githubURL={slide.githubURL} appURL={slide.appURL} />
        </div>
      </div>

      {(slide.endDate || slide.startDate) && (
        <div className={`${namespace}-slide-dates`}>
          {slide.startDate && (
            <div className={`${namespace}-slide-date`}>
              <span>Started on </span> &nbsp;
              <span>{toLocale(slide.startDate)}</span>
            </div>
          )}
          {slide.startDate && (
            <div className={`${namespace}-slide-date`}>
              <span>Started on </span> &nbsp;
              <span>{toLocale(slide.startDate)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export const ProjectSlide = ({
  slide,
  namespace = "project-pg",
  responsive,
}: {
  slide: ProjectDocument;
  namespace?: string;
  responsive?: boolean;
}) => {
  const sortedImages = slide.images
    ? sortMixedStrings(slide.images, "name")
    : null;
  return (
    <>
      <div className={`${namespace}-slide-img-container`}>
        {!sortedImages && <ComingSoonBanner />}
        {sortedImages && (
          <Carousel numSlidesPerView={1} namespace={namespace}>
            {sortedImages.map((img) => (
              <LazyImage
                alt={img.imgDescription ? img.imgDescription : ""}
                placeholderSrc={img.placeholderURL ? img.placeholderURL : ""}
                src={img.imgURL}
              />
            ))}
          </Carousel>
        )}
      </div>
      <ProjectSlideTextContent slide={slide} />
    </>
  );
};
const ExploreAllBanner = ({
  slides,
  status,
}: {
  slides: ProjectDocument[];
  status: "loading" | "success" | "failed";
}) => {
  const smallWindowWidth = useWindowWidth(576);
  return (
    <>
      <AnimateHeaders
        id={uuidArr[1]}
        namespace={`${namespace}-explore-more`}
        htmlTag="h3"
      >
        Explore
      </AnimateHeaders>
      <div id={`${namespace}-explore-more`}>
        {status === "success" &&
          slides.map((slide, idx) => {
            return (
              <ProjectItem
                key={slide.id}
                data={slide}
                slim={false}
                imgOrientation={idx % 2 === 0 ? "left" : "right"}
                smallWindowWidth={smallWindowWidth}
              />
            );
          })}
        {status === "loading" && (
          <LoadingIcon
            primaryFillColor={"#3AC2FF"}
            secondaryFillColor={"#909090"}
            faceFillColor={"#2e2e2e"}
            strokeColor={"#2e2e2e"}
            backgroundArmColor={"#2e2e2e"}
            laptopLogoColor={"white"}
            textColor={"white"}
            width="40%"
            background={{ color: "black" }}
            center
          />
        )}
      </div>
    </>
  );
};
const ProjectPageIntroSlides = ({ waveSize }: { waveSize: Size }) => {
  const smallWindowWidth = useWindowWidth(576);
  const countPerPage = 9;
  const { slides: presentationSlides, status: presentationSlidesStatus } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: false,
    });
  return (
    <div id={`${namespace}-carousel`}>
      {presentationSlidesStatus === "success" && (
        <Carousel numSlidesPerView={1} namespace={namespace}>
          {presentationSlides.map((slide) => {
            return (
              <ProjectSlide
                key={slide.id}
                slide={slide}
                namespace={namespace}
              />
            );
          })}
        </Carousel>
      )}
      {presentationSlidesStatus === "loading" && (
        <LoadingIconCircleRotation
          className={`${namespace}-loading-dots`}
          nested={false}
          durationInterval={500}
          textColor="#3AC2FF"
          width="20%"
          center
        />
      )}
    </div>
  );
};
const ProjectPageBody = memo(() => {
  const countPerPage = 9;
  const { slides, prevStartKey, startKey, status, previousPage, nextPage } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: true,
    });
  return (
    <>
      <ExploreAllBanner slides={slides} status={status} />
      {/* <ProjectsPagination
        startKey={startKey}
        prevStartKey={prevStartKey}
        onNext={nextPage}
        onPrev={previousPage}
      /> */}
    </>
  );
});
const ProjectPage = () => {
  const [waveRef, waveSize] = useElementSize();
  // const [headerRef, headerSize] = useElementSize();
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("color");
  }, []);
  return (
    <ThemeProvider theme={materialUITheme}>
      <div id={`${namespace}`}>
        <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
          <WaveBg id="project-wave" />
        </div>
        <div id={`${namespace}-inner`}>
          <AnimateHeaders namespace={namespace} htmlTag="h2" id={uuidArr[0]}>
            Projects
          </AnimateHeaders>
          <ProjectPageIntroSlides waveSize={waveSize} />
          <ProjectPageBody />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ProjectPage;
