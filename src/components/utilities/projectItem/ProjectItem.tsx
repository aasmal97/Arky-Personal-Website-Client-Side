import { Chip } from "@mui/material";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import seperateToWords from "../../helpers/seperateToWords";
import { sortMixedStrings } from "../../helpers/sortMixedStrings";
import Carousel from "../carousel/Carousel";
import { ComingSoonBanner } from "../comingSoon/ComingSoonBanner";
import LazyImage from "../lazyComponents/LazyImg";
import type { ProjectDocument } from "../types/RestApiTypes";
import GithubIcon from "../icons/Github";
import { LinkIcon } from "../icons/LinkIcon";

const namespace = "project-item";
const ProjectTopic = ({ topic }: { topic: string }) => {
  return (
    <Chip
      clickable
      className={`${namespace}-project-topic`}
      sx={{
        textTransform: "none",
        fontSize: "inherit",
      }}
      aria-label={`open-github-topic-${topic}`}
      onClick={() => {
        window.open(`https://github.com/topics/${topic}`, "_blank");
      }}
      label={topic}
    />
  );
};
const ProjectTitle = ({ title }: { title: string }) => {
  return <h2 className={`${namespace}-title`}>{seperateToWords(title)}</h2>;
};
const ProjectDescription = ({ description }: { description: string }) => {
  return <p className={`${namespace}-description`}>{description}</p>;
};
const ProjectActionBtns = ({
  githubURL,
  slideDeckURL,
  projectURL,
}: {
  slideDeckURL?: string;
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
        aria-label="open-github-repo"
      >
        <div>
          {!slideDeckURL && githubURL && <GithubIcon />}
          {slideDeckURL && <SlideshowIcon />}
        </div>
        <div>
          {!slideDeckURL && githubURL && "Repo"}
          {slideDeckURL && "Slides"}
        </div>
      </a>
      <a
        className={`${namespace}-project-url`}
        href={projectURL ? projectURL : githubURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="open-project-url"
      >
        <div>
          <LinkIcon linkColor="#f2f2f2" background={{ color: "transparent" }} />
        </div>
        <div>Deploy</div>
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
  imgOrientation = "left",
  smallWindowWidth = false,
}: {
  data: ProjectDocument;
  slim?: boolean;
  imgOrientation?: "right" | "left";
  smallWindowWidth?: boolean;
}) => {
  return (
    <div className={`${namespace}`}>
      <div
        className={`${namespace}-content ${
          imgOrientation ? `${namespace}-right-img` : `${namespace}-left-img`
        } ${slim ? `${namespace}-content-slim` : ""}`}
      >
        <ProjectTitle title={data.projectName} />
        {!smallWindowWidth && <ProjectImageBanner images={data.images} />}

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
      {smallWindowWidth && <ProjectImageBanner images={data.images} />}
    </div>
  );
};
export default ProjectItem;
