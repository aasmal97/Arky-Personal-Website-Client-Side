import {
  faCogs,
  faProjectDiagram,
  faUserGraduate,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useElementSize from "../../../hooks/useElementSize";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useWindowWidth from "../../../hooks/useWindowWidth";
const namespace = "about-pg-education";
export type EducationInstitution = {
  name: string;
  imgURL: string;
  placeholderURL: string;
  degree: string;
};
//const educationData: EducationInstitution[] = [];
const Ellipse = ({
  setRef,
  orientation,
  height,
  heightUnit,
  style,
  maxHeight,
}: {
  setRef?: (node: HTMLDivElement | null) => void;
  orientation: "top" | "bottom";
  height: number;
  heightUnit: string;
  maxHeight?: string;
  style?: { [key: string]: string };
}) => {
  const styles: {
    [key: string]: string;
  } = {
    position: "absolute",
    borderRadius: "50%",
    width: "100%",
    height: `${height}${heightUnit}`,
    maxHeight: maxHeight ? maxHeight : "",
    zIndex: "0",
    ...style,
  };

  const position = `${height / 2}${heightUnit}`;
  if (orientation === "top")
    styles["top"] = maxHeight
      ? `calc(max(-${position}, -${maxHeight}/2))`
      : `-${position}`;
  else
    styles["bottom"] = maxHeight
      ? `calc(max(-${position}, -${maxHeight}/2))`
      : `-${position}`;
  return (
    <>
      <div ref={setRef} style={styles} />
    </>
  );
};
const displayData = [
  {
    name: "P.S. 503",
    description: "Elementary School",
    imgLink: `${process.env.REACT_APP_MEDIA_FILES_URL}/educationLogos/PS503Logo.png`,
    schoolLink: "https://www.ps503online.org/",
  },
  {
    name: "Christa McAuliffe I.S. 187",
    description: "Middle School",
    imgLink: `${process.env.REACT_APP_MEDIA_FILES_URL}/educationLogos/IS187Logo.jpg`,
    schoolLink: "https://www.is187nyc.com/",
  },
  {
    name: "Prep For Prep",
    description: "Prepartory School",
    imgLink: `${process.env.REACT_APP_MEDIA_FILES_URL}/educationLogos/PrepForPrepLogo.png`,
    schoolLink: "https://www.prepforprep.org/",
  },
  {
    name: "Deerfield Academy",
    description: "High School",
    imgLink: `${process.env.REACT_APP_MEDIA_FILES_URL}/educationLogos/DeerfieldAcademyLogo.png`,
    schoolLink: "https://deerfield.edu/",
  },
  {
    name: "Cornell University",
    description: "College",
    imgLink: `${process.env.REACT_APP_MEDIA_FILES_URL}/educationLogos/CornellUniversityLogo.png`,
    schoolLink: "https://www.cornell.edu/",
  },
];
const EducationDisplay = () => {
  return (
    <div id={`${namespace}-display`}>
      {displayData.map((item) => {
        return (
          <a
            key={item.imgLink}
            rel="noreferrer"
            target="_blank"
            href={item.schoolLink}
          >
            <img src={item.imgLink} alt={item.description + " logo"} />
          </a>
        );
      })}
    </div>
  );
};
const EducationAction = () => {
  return (
    <div id={`${namespace}-action`}>
      <div>Interested in working together?</div>
      <HashLink to="/#contact-me-banner">
        <span>Contact Me</span>
      </HashLink>
    </div>
  );
};
const EducationExploreItem = ({
  description,
  title,
  color,
  icon,
  link,
  iconColor,
}: {
  link: string;
  description: string;
  title: string;
  color: string;
  icon: IconDefinition;
  iconColor: string;
}) => {
  return (
    <Link
      to={link}
      className={`${namespace}-explore-item`}
      style={{ border: `1px solid ${color}` }}
    >
      <div
        className={`${namespace}-explore-item-icon`}
        style={{
          backgroundColor: color,
          color: iconColor,
          border: `1px solid ${color}`,
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={`${namespace}-explore-item-description`}>
        <h4 style={{ color: color }}>{title}</h4>
        <p>{description}</p>
      </div>
    </Link>
  );
};
const EducationExplore = () => {
  return (
    <div id={`${namespace}-explore`}>
      <h3>Explore More</h3>
      <div id={`${namespace}-explore-inner`}>
        <EducationExploreItem
          link={"/projects"}
          iconColor="#0068e0"
          color="#3ac2ff"
          icon={faProjectDiagram}
          title={"Projects"}
          description={"View current and past projects"}
        />
        <EducationExploreItem
          link={"/skills"}
          iconColor="#d47c00"
          color="#ffc83a"
          icon={faCogs}
          title={"Skills"}
          description={"View a list of soft and technical skills"}
        />
      </div>
    </div>
  );
};

const EducationBannerContent = () => {
  return (
    <>
      <EducationDisplay />
      <EducationAction />
      <EducationExplore />
    </>
  );
};
const EducationBanner = () => {
  const [ellipseRef, ellipseSize] = useElementSize();
  const [headerRef, headerSize] = useElementSize();
  const [mounted, setMounted] = useState(false);
  const mediumWindowWidth = useWindowWidth(992);
  const ellipseHeight = 30;
  const ellipseUnit = "vh";
  const ellipseMaxHeight = !mediumWindowWidth ? "6em" : "";
  const paddingTop = headerSize.height - ellipseSize.height / 2;
  //we do this to ensure that refs are attached
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div id={`${namespace}`}>
      <Ellipse
        maxHeight={ellipseMaxHeight}
        heightUnit={ellipseUnit}
        setRef={ellipseRef}
        orientation="top"
        height={ellipseHeight}
        style={{
          backgroundColor: "#313131",
          zIndex: "1",
        }}
      />
      <h2
        ref={headerRef}
        id={`${namespace}-header`}
        style={{
          width: "100%",
          position: "absolute",
          minHeight: `${ellipseSize.height / 2}px`,
          left: 0,
          top: `-${ellipseSize.height / 2}px`,
          zIndex: 3,
        }}
      >
        <FontAwesomeIcon icon={faUserGraduate} /> <span>Education</span>
      </h2>
      <div
        id={`${namespace}-container`}
        style={{
          paddingTop: mounted && paddingTop > 0 ? paddingTop : 0,
        }}
      >
        <div id={`${namespace}-container-inner`}>
          <EducationBannerContent />
        </div>
      </div>
      <Ellipse
        maxHeight={ellipseMaxHeight}
        heightUnit={ellipseUnit}
        orientation="bottom"
        height={ellipseHeight}
        style={{
          backgroundColor: "#313131",
          zIndex: "1",
        }}
      />
    </div>
  );
};
export default EducationBanner;
