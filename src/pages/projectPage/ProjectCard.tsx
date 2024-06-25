import Carousel from "../../utilities/carousel/Carousel";
import LazyImage from "../../utilities/lazyComponents/LazyImg";
import { ProjectDocument } from "../../utilities/types/RestApiTypes";
import { sortMixedStrings } from "../../helpers/sortMixedStrings";
import seperateToWords from "../../helpers/seperateToWords";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState } from "react";
import { Button, Collapse } from "@mui/material";
import { ComingSoonBanner } from "../../utilities/comingSoon/ComingSoonBanner";
const namespace = "project-pg";
const ProjectCardImg = ({
  images,
  mediumWindowWidth,
  smallWindowWidth,
}: {
  mediumWindowWidth: boolean;
  smallWindowWidth: boolean;
  images: ProjectDocument["images"];
}) => {
  const sortedImages = images ? sortMixedStrings(images, "name") : null;
  return (
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
  );
};
const ProjectTextContent = ({
  appURL,
  projectName,
  githubURL,
  description,
  topics,
  smallWindowWidth,
  mediumWindowWidth,
}: ProjectDocument & {
  mediumWindowWidth: boolean;
  smallWindowWidth: boolean;
}) => {
  const [showTopics, setShowTopics] = useState(false);

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
    <div className={`${namespace}-text-content`}>
      <div className={`${namespace}-project-urls`}>
        {/* <ProjectUrls githubURL={githubURL} appURL={appURL} /> */}
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
  );
};
export const ProjectCard = ({
  images,
  alternate,
  ...rest
}: ProjectDocument & {
  alternate?: boolean;
}) => {
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(576);
  return (
    <div className={`${namespace}-project-card`}>
      {!alternate && (
        <ProjectCardImg
          images={images}
          mediumWindowWidth={mediumWindowWidth}
          smallWindowWidth={smallWindowWidth}
        />
      )}
      <ProjectTextContent
        {...rest}
        mediumWindowWidth={mediumWindowWidth}
        smallWindowWidth={smallWindowWidth}
      />
      {alternate && (
        <ProjectCardImg
          images={images}
          mediumWindowWidth={mediumWindowWidth}
          smallWindowWidth={smallWindowWidth}
        />
      )}
    </div>
  );
};
