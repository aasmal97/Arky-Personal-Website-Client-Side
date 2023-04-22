import useElementSize, { Size } from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
import { ProjectDocument } from "../../utilities/types/RestApiTypes";
import { sortMixedStrings } from "../../utilities/helpers/sortMixedStrings";
import useProjectDocs from "../../hooks/useProjectDocs";
import seperateToWords from "../../utilities/helpers/seperateToWords";
import LoadingIcon, {
  LoadingIconCircleRotation,
} from "../../utilities/loadingIcon/LoadingIcon";
import { StopWatchAnimation } from "../../utilities/loadingIcon/ComingSoonIcon";
import { ComingSoonBannerWave } from "./ComingSoonBannerWave";
import useWindowWidth from "../../hooks/useWindowWidth";
import { memo, useState } from "react";
import { LinkIcon } from "../../utilities/icons/LinkIcon";
import { Button, createTheme, ThemeProvider, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const materialUITheme = createTheme({
  palette: {
    primary: {
      main: "#3ac2ff",
    },
    secondary: {
      main: "#4e4e4e",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
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
        <LinkIcon linkColor="black" background={{ color: "white" }} />
      </a>
    </>
  );
};

const ProjectCard = ({
  appURL,
  projectName,
  githubURL,
  description,
  images,
  topics,
}: ProjectDocument) => {
  const [showTopics, setShowTopics] = useState(false);
  const smallWindowWidth = useWindowWidth(576);
  const mediumWindowWidth = useWindowWidth(992);
  const sortedImages = images ? sortMixedStrings(images, "name") : null;
  const fullTopics = topics?.map((topic) => (
    <Button
      key={topic}
      variant={"outlined"}
      className={`${namespace}-project-topic`}
      style={{ textTransform: "none" }}
      aria-label={`open-github-topic-${topic}`}
      onClick={() => {
        window.open(`https://github.com/topics/${topic}`, "_blank");
      }}
    >
      {topic}
    </Button>
  ));
  return (
    <div className={`${namespace}-project-card`}>
      <div className={`${namespace}-project-card-img`}>
        {!sortedImages && (
          <ComingSoonBanner
            titleScaleFactor={smallWindowWidth ? 0.12 : 0.12}
            subTitleScaleFactor={smallWindowWidth ? 0.033 : 0.025}
          />
        )}
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
      <div className={`${namespace}-text-content`}>
        <div className={`${namespace}-project-urls`}>
          <ProjectUrls githubURL={githubURL} appURL={appURL} />
        </div>
        <div className={`${namespace}-text-content-inner`}>
          <div className={`${namespace}-project-header`}>
            <h4>{seperateToWords(projectName)}</h4>
            <div className={`${namespace}-project-topics`}>
              {!mediumWindowWidth && !!fullTopics && fullTopics.length > 0 && (
                <>
                  <Collapse in={showTopics} timeout={500}>
                    <div className={`${namespace}-project-topics-inner`}>
                      {fullTopics}
                    </div>
                  </Collapse>
                  <Button
                    className={`${namespace}-project-topics-btn`}
                    variant="outlined"
                    style={{ textTransform: "none" }}
                    onClick={() => setShowTopics(!showTopics)}
                  >
                    {!showTopics ? "Show Topics" : "Hide Topics"}
                  </Button>
                </>
              )}
              {mediumWindowWidth && fullTopics}
            </div>
          </div>

          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const ComingSoonBanner = memo(
  ({
    titleScaleFactor = 0.11,
    subTitleScaleFactor = 0.021,
  }: {
    subTitleScaleFactor?: number;
    titleScaleFactor?: number;
  }) => {
    const smallWindowWidth = useWindowWidth(576);
    const [parentElRef, parentElSize] = useElementSize();
    const titleStyles = {
      fontSize: smallWindowWidth
        ? `${parentElSize.width * titleScaleFactor}px`
        : `${parentElSize.width * titleScaleFactor}px`,
    };
    const subTitleStyles = {
      fontSize: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor}px`
        : `${parentElSize.width * subTitleScaleFactor * 1.5}px`,
      marginTop: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor}px`
        : `${parentElSize.width * subTitleScaleFactor * 1.5}px`,
      lineHeight: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor * 2}px`
        : `${parentElSize.width * subTitleScaleFactor * 2 * 1.5}px`,
    };
    return (
      <div
        ref={parentElRef}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <div className={`${namespace}-coming-soon-banner-bg`}>
          <ComingSoonBannerWave />
        </div>

        <div className={`${namespace}-coming-soon-banner-container`}>
          <div className={`${namespace}-coming-soon-banner`}>
            <div className={`${namespace}-coming-soon-banner-title`}>
              <h3 style={titleStyles}>coming soon.</h3>
              <StopWatchAnimation
                width="20%"
                clockHandColor="#00638F"
                polygonColor={"#3AC2FF"}
                ringColorDark="#3AC2FF"
                ringColorLight="#3AC2FF"
              />
            </div>

            <h6 style={subTitleStyles}>
              This project is still a work in progress. Check back periodically
              to see if it's ready for production!
            </h6>
          </div>
        </div>
      </div>
    );
  }
);
const ProjectSlideTextContent = ({
  slide,
  responsive,
}: {
  slide: ProjectDocument;
  responsive?: boolean;
}) => {
  const smallWindowWidth = useWindowWidth(576);
  const [parentElRef, parentSize] = useElementSize();
  const responsiveStyles = {
    titleStyles: {
      fontSize: responsive ? `${parentSize.width * 0.038}px` : "",
    },
    subTitleStyles: {
      fontSize: responsive ? `${parentSize.width * 0.03}px` : "",
    },
  };
  const titleStyles = {
    fontSize: smallWindowWidth ? "" : `${parentSize.width * 0.038}px`,
  };
  const subTitleStyles = {
    fontSize: smallWindowWidth ? "" : `${parentSize.width * 0.03}px`,
  };
  return (
    <div ref={parentElRef} className={`${namespace}-slide-text-content`}>
      <div className={`${namespace}-slide-first-row`}>
        <h4
          style={responsiveStyles ? responsiveStyles.titleStyles : titleStyles}
        >
          {seperateToWords(slide.projectName)}
        </h4>
        <div className={`${namespace}-slide-project-urls`}>
          <ProjectUrls githubURL={slide.githubURL} appURL={slide.appURL} />
        </div>
      </div>

      {(slide.endDate || slide.startDate) && (
        <div
          className={`${namespace}-slide-dates`}
          style={
            responsiveStyles ? responsiveStyles.subTitleStyles : subTitleStyles
          }
        >
          {slide.startDate && (
            <span>Started on {toLocale(slide.startDate)} </span>
          )}
          {slide.endDate && <span>Finished on {toLocale(slide.endDate)}</span>}
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
      <ProjectSlideTextContent slide={slide} responsive={responsive} />
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
  return (
    <>
      <h3 id={`${namespace}-explore-more-header`}>Explore All</h3>
      <div id={`${namespace}-explore-more`}>
        {status === "success" &&
          slides.map((slide) => {
            return <ProjectCard key={slide.id} {...slide} />;
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
const ProjectPageIntroSlides = ({
  waveSize,
  headerSize,
}: {
  waveSize: Size;
  headerSize: Size;
}) => {
  const smallWindowWidth = useWindowWidth(576);
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const countPerPage = 9;
  const { slides: presentationSlides, status: presentationSlidesStatus } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: false,
    });
  return (
    <div
      id={`${namespace}-carousel`}
      style={{ minHeight: smallWindowWidth ? caroHeight : caroHeight / 1.5 }}
    >
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
      <ProjectsPagination
        startKey={startKey}
        prevStartKey={prevStartKey}
        onNext={nextPage}
        onPrev={previousPage}
      />
    </>
  );
});
const ProjectPage = () => {
  const [waveRef, waveSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  return (
    <ThemeProvider theme={materialUITheme}>
      <div id={`${namespace}`}>
        <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
          <WaveBg id="project-wave" />
        </div>
        <div id={`${namespace}-inner`}>
          <h2 ref={headerRef}>Projects</h2>
          <ProjectPageIntroSlides waveSize={waveSize} headerSize={headerSize} />
          <ProjectPageBody />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ProjectPage;
