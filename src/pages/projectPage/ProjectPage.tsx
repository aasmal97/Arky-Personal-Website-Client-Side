import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useElementSize from "../../hooks/useElementSize";
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
      <button
        className={`${namespace}-pagination-btns-prev`}
        onClick={onPrev}
        aria-label="previous"
        disabled={typeof prevStartKey === "undefined"}
      >
        Prev
      </button>
      <button
        className={`${namespace}-pagination-btns-next`}
        onClick={onNext}
        aria-label="next"
        disabled={!startKey}
      >
        Next
      </button>
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
  projectName,
  githubURL,
  description,
  images,
}: ProjectDocument) => {
  const sortedImages = images ? sortMixedStrings(images, "name") : null;
  return (
    <div className={`${namespace}-project-card`}>
      <div className={`${namespace}-project-card-img`}>
        {!sortedImages && <div>Coming Soon</div>}
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
          <h4>{seperateToWords(projectName)}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const ComingSoonBanner = () => {
  return (
    <div style={{position: "relative", width: '100%', height: "100%"}}>
      <div className={`${namespace}-coming-soon-banner-bg`}>
        <ComingSoonBannerWave />
      </div>

      <div className={`${namespace}-coming-soon-banner-container`}>
        <div className={`${namespace}-coming-soon-banner`}>
          <div className={`${namespace}-coming-soon-banner-title`}>
            <h3>coming soon.</h3>
            <StopWatchAnimation
              width="20%"
              clockHandColor="#00638F"
              polygonColor={"#3AC2FF"}
              ringColorDark="#3AC2FF"
              ringColorLight="#3AC2FF"
            />
          </div>

          <h6>
            This project is still a work in progress. Check back periodically to
            see if it's ready for production!
          </h6>
        </div>
      </div>
    </div>
  );
};

const ProjectSlide = ({ slide }: { slide: ProjectDocument }) => {
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
              <span>Started on {toLocale(slide.startDate)} </span>
            )}
            {slide.endDate && (
              <span>Finished on {toLocale(slide.endDate)}</span>
            )}
          </div>
        )}
      </div>
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

const ProjectPage = () => {
  const [waveRef, waveSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const countPerPage = 9;
  const { slides, prevStartKey, startKey, status, previousPage, nextPage } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: true,
    });
  const { slides: presentationSlides, status: presentationSlidesStatus } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: false,
    });
  return (
    <div id={`${namespace}`}>
      <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
        <WaveBg id="project-wave" />
      </div>
      <div id={`${namespace}-inner`}>
        <h2 ref={headerRef}>Projects</h2>
        <div id={`${namespace}-carousel`} style={{ minHeight: caroHeight }}>
          {presentationSlidesStatus === "success" && (
            <Carousel numSlidesPerView={1} namespace={namespace}>
              {presentationSlides.map((slide) => {
                return <ProjectSlide key={slide.id} slide={slide} />;
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
        <ExploreAllBanner slides={slides} status={status} />
        <ProjectsPagination
          startKey={startKey}
          prevStartKey={prevStartKey}
          onNext={nextPage}
          onPrev={previousPage}
        />
      </div>
    </div>
  );
};
export default ProjectPage;
