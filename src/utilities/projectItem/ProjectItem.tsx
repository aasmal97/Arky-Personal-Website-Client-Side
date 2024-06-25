import { Button, Chip } from "@mui/material";
import seperateToWords from "../../helpers/seperateToWords";
import { sortMixedStrings } from "../../helpers/sortMixedStrings";
import Carousel from "../carousel/Carousel";
import { ComingSoonBanner } from "../comingSoon/ComingSoonBanner";
import LazyImage from "../lazyComponents/LazyImg";
import { ProjectDocument } from "../types/RestApiTypes";
import GithubIcon from "../icons/Github";
import { LinkIcon } from "../icons/LinkIcon";

const namespace = "project-item";
const ProjectTopic = ({ topic }: { topic: string }) => {
  return (
    <Chip
      clickable
      className={`${namespace}-project-topic`}
      sx={{ textTransform: "none" }}
      aria-label={`open-github-topic-${topic}`}
      onClick={() => {
        window.open(`https://github.com/topics/${topic}`, "_blank");
      }}
      label={topic}
    />
  );
};
const ProjectTitle = ({ title }: { title: string }) => {
  return <h4 className={`${namespace}-title`}>{seperateToWords(title)}</h4>;
};
const ProjectDescription = ({ description }: { description: string }) => {
  return <p className={`${namespace}-description`}>{description}</p>;
};
const ProjectActionBtns = ({
  githubURL,
  projectURL,
}: {
  githubURL?: string;
  projectURL?: string;
}) => {
  return (
    <div className={`${namespace}-action-btns`}>
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
        href={projectURL ? projectURL : githubURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon linkColor="black" background={{ color: "white" }} />
      </a>
    </div>
  );
};
const ProjectImageBanner = ({
  images,
}: {
  images: ProjectDocument["images"];
}) => {
  const sortedImages = images ? sortMixedStrings(images, "name") : null;
  return (
    <div className={`${namespace}-img`}>
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
  );
};
const ProjectItem = ({
  data,
  slim = false,
}: {
  data: ProjectDocument;
  slim?: boolean;
}) => {
  return (
    <div className={`${namespace}`}>
      <div className={`${namespace}-content`}>
        <ProjectTitle title={data.projectName} />
        {data.topics && !slim && (
          <div className={`${namespace}-labels`}>
            {data.topics.map((topic) => (
              <ProjectTopic key={topic} topic={topic} />
            ))}
          </div>
        )}
        {data.description && (
          <ProjectDescription description={data.description} />
        )}
        <ProjectActionBtns
          githubURL={data.githubURL}
          projectURL={data.appURL}
        />
      </div>
      <ProjectImageBanner images={data.images} />
    </div>
  );
};
export default ProjectItem;
