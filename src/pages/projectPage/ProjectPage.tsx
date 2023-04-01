import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import useElementSize from "../../hooks/useElementSize";
import Carousel from "../../utilities/carousel/Carousel";
import GithubIcon from "../../utilities/icons/Github";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import WaveBg from "../../utilities/waveBg/WaveBg";
import { unstable_batchedUpdates } from "react-dom";
import { ProjectDocument } from "../../utilities/types/RestApiTypes";
import { fetchProjectData } from "../../utilities/asyncActions/ProjectActions";
import { sortMixedStrings } from "../../utilities/helpers/sortMixedStrings";
import { marshall } from "@aws-sdk/util-dynamodb";

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
const fetchNewData = ({
  action,
  query,
  lastEvaluatedKey,
  currSlides,
  countPerPage,
  setPrevStartKey,
  setSlides,
  setQuery,
  setStartKey,
}: {
  action?: {
    type: "prev" | "next";
    keyToInclude: ProjectDocument["pk"];
  };
  query?: string;
  lastEvaluatedKey?: string;
  currSlides: React.MutableRefObject<ProjectDocument[]>;
  countPerPage: number;
  setPrevStartKey: React.Dispatch<React.SetStateAction<string | null>>;
  setSlides: React.Dispatch<React.SetStateAction<ProjectDocument[]>>;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  setStartKey: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const key = lastEvaluatedKey;
  const decodedKey = key ? decodeURI(key) : null;
  const decodedQuery = query ? decodeURI(query) : null;
  const parsedKey = decodedKey ? JSON.parse(decodedKey) : null;
  const parsedQuery = decodedQuery
    ? JSON.parse(decodedQuery)
    : {
        recordType: "projects",
      };
  const prevSlides = currSlides.current;
  fetchProjectData({
    query: parsedQuery,
    lastEvaluatedKey: parsedKey,
    max: countPerPage,
    action,
  }).then((res) => {
    if (!res) return;
    const firstElPrimaryKey =
      prevSlides && prevSlides.length > 0 ? prevSlides[0].pk : null;
    if (firstElPrimaryKey) {
      const marshalledKey = marshall(
        {
          startDate: firstElPrimaryKey.startDate,
          recordType: firstElPrimaryKey.recordType,
        },
        {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true,
        }
      );
      const prevKey = encodeURI(JSON.stringify(marshalledKey));
      setPrevStartKey(prevKey);
    } else setPrevStartKey(null);
    const newStartKey = res.result.LastEvaluatedKey
      ? encodeURI(JSON.stringify(res.result.LastEvaluatedKey))
      : null;
    const newQuery = parsedQuery ? JSON.stringify(parsedQuery) : null;
    currSlides.current = res.result.Items;
    unstable_batchedUpdates(() => {
      setSlides(res.result.Items);
      setQuery(newQuery);
      setStartKey(newStartKey);
    });
  });
};
const ProjectsPagination = ({
  navigate,
  query,
  prevStartKey,
  startKey,
}: {
  navigate: NavigateFunction;
  query: string | null;
  prevStartKey: string | null;
  startKey: string | null;
}) => {
  return (
    <div className={`${namespace}-pagination`}>
      <button
        className={`${namespace}-pagination-btns-prev`}
        onClick={() =>
          navigate(
            `/projects/${query}/${prevStartKey}/${encodeURI(
              JSON.stringify(null)
            )}`
          )
        }
        aria-label="previous"
        disabled={!prevStartKey}
      >
        Prev
      </button>
      <button
        className={`${namespace}-pagination-btns-next`}
        onClick={() =>
          navigate(
            `/projects/${query}/${startKey}/${encodeURI(JSON.stringify(null))}`
          )
        }
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
  return (
    <div key={slide.id} className={`${namespace}-slide`}>
      <div className={`${namespace}-slide-img-container`}>
        {/* <LazyImage
                      src={slide.imgURL}
                      placeholderSrc={slide.placeholderURL}
                      alt={slide.imgDescription ? slide.imgDescription : ""}
                    /> */}
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
  const navigate = useNavigate();
  const params = useParams();
  const caroHeight = calculateImgHeight(waveSize.height, headerSize.height);
  const [slides, setSlides] = useState<ProjectDocument[]>([]);
  const currSlides = useRef<ProjectDocument[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [startKey, setStartKey] = useState<string | null>(null);
  const [prevStartKey, setPrevStartKey] = useState<string | null>(null);
  const countPerPage = 9;
  //redirect to proper page when these change
  useEffect(() => {
    const query = params.query;
    const key = params.lastEvaluatedKey;
    const prevKey = params.prevEvaluatedKey;
    //we return to default settings
    if (!query) return navigate("/projects");
    if (query && !key) return navigate(`/projects/${query}`);
    if (query && key && !prevKey) return navigate(`/projects/${query}/${key}`);
  }, [
    params.query,
    params.lastEvaluatedKey,
    params.prevEvaluatedKey,
    navigate,
  ]);
  //set data
  useEffect(
    () =>
      fetchNewData({
        lastEvaluatedKey: params.lastEvaluatedKey,
        query: params.query,
        currSlides,
        countPerPage,
        setPrevStartKey,
        setSlides,
        setQuery,
        setStartKey,
      }),
    [params.lastEvaluatedKey, params.query]
  );
  //set previous evaluated key
  // useEffect(() => {
  //   fetchProjectData({
  //     query: {
  //       recordType: "projects",
  //     },
  //     max: 50,
  //     lastEvaluatedKey: null,
  //   }).then((res) => {
  //     if (!res) return;
  //     unstable_batchedUpdates(() => {
  //       setCaroSlides(res.result.Items);
  //     });
  //   });
  // }, []);

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
          query={query}
          navigate={navigate}
        />
      </div>
    </div>
  );
};
export default ProjectPage;
