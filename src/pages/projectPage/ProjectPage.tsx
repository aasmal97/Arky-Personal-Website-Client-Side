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
          <h4>{projectName}</h4>
          <p>{description}</p>
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
    <div key={slide.id} className={`${namespace}-slide`}>
      <div className={`${namespace}-slide-img-container`}>
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
      <div className={`${namespace}-slide-text-content`}>
        <div className={`${namespace}-slide-first-row`}>
          <h4>{slide.projectName}</h4>
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
    </div>
  );
};
const ExploreAllBanner = ({ slides }: { slides: ProjectDocument[] }) => {
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
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const countPerPage = 9;
  const { slides, prevStartKey, startKey, previousPage, nextPage } =
    useProjectDocs({
      countPerPage,
      saveQueryInParams: true,
    });

  return (
    <div id={`${namespace}`}>
      <div ref={waveRef} id={`${namespace}-wave-bg`} style={waveStyles}>
        <WaveBg id="project-wave" />
      </div>
      <div id={`${namespace}-inner`}>
        <h2 ref={headerRef}>Projects</h2>
        <div id={`${namespace}-carousel`} style={{ minHeight: caroHeight }}>
          <Carousel numSlidesPerView={1} namespace={namespace}>
            {slides.map((slide) => {
              return <ProjectSlide key={slide.id} slide={slide} />;
            })}
          </Carousel>
        </div>
        <ExploreAllBanner slides={slides} />
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
