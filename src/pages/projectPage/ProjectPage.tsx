import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
import {
  ProjectDocument,
  ProjectQueryProps,
} from "../../utilities/types/RestApiTypes";
import { sortMixedStrings } from "../../helpers/sortMixedStrings";
import useProjectDocs from "../../hooks/useProjectDocs";
import seperateToWords from "../../helpers/seperateToWords";
import { LoadingIconCircleRotation } from "../../utilities/loadingIcon/LoadingIcon";
import { ComingSoonBanner } from "../../utilities/comingSoon/ComingSoonBanner";
import useWindowWidth from "../../hooks/useWindowWidth";
import { memo, useEffect, useState } from "react";
import { LinkIcon } from "../../utilities/icons/LinkIcon";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
import ProjectItem from "../../utilities/projectItem/ProjectItem";
import { AnimateHeaders } from "../../utilities/animateHeaders/animateHeaders";
import { v4 as uuid } from "uuid";
import PaginationWrapper from "../../utilities/pagination/PaginationWrapper";
import FullPagePaginationLoadingComponent from "../../utilities/pagination/FullPagePaginationLoadingComponent";
import { paginateProjectData } from "../../utilities/asyncActions/ProjectActions";
import { SearchParamsProps } from "../../utilities/pagination/types";
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
}: {
  slide: ProjectDocument;
  namespace?: string;
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
const ExploreAllBanner = ({ slides }: { slides: ProjectDocument[] }) => {
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
        {slides.map((slide, idx) => {
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
      </div>
    </>
  );
};
const ProjectPageIntroSlides = () => {
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
          textColor="#ff5050"
          width="20%"
          center
        />
      )}
    </div>
  );
};
const countPerPage = 9;
const defaultParams: Partial<ProjectQueryProps & SearchParamsProps> = {
  recordType: "projects",
  sortBy: {
    startDate: -1,
  },
};
const ProjectPageBody = memo(() => {
  const [defaultData, setDefaultData] = useState<{
    items: ProjectDocument[];
    newStartKey?: string | null;
  } | null>(null);
  useEffect(() => {
    paginateProjectData({ ...defaultParams, take: countPerPage }).then(
      (data) => {
        if (data) setDefaultData(data);
      }
    );
  }, []);
  return (
    <PaginationWrapper
      paginate={paginateProjectData}
      take={countPerPage}
      defaultData={defaultData}
      defaultParams={defaultParams}
      loadingComponent={(ref) => (
        <FullPagePaginationLoadingComponent setRef={ref} />
      )}
    >
      {(props) => (
        <>
          <ExploreAllBanner slides={props.data?.items || []} />
        </>
      )}
    </PaginationWrapper>
  );
});
const ProjectPage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("color");
  }, [setCurrTheme]);
  return (
    <ThemeProvider theme={materialUITheme}>
      <div id={`${namespace}`}>
        <div id={`${namespace}-wave-bg`} style={waveStyles}>
          <WaveBg id="project-wave" />
        </div>
        <div id={`${namespace}-inner`}>
          <AnimateHeaders namespace={namespace} htmlTag="h2" id={uuidArr[0]}>
            Projects
          </AnimateHeaders>
          <ProjectPageIntroSlides />

          <ProjectPageBody />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ProjectPage;
