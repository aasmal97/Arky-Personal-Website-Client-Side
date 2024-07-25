import LinkBtn from "../../../utilities/actionBtn/LinkBtn";
const namespace = "about-pg-education";
export type EducationInstitution = {
  name: string;
  imgURL: string;
  placeholderURL: string;
  degree: string;
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
      <LinkBtn to="/contact">Contact Me</LinkBtn>
    </div>
  );
};

const EducationBannerContent = () => {
  return (
    <>
      <EducationDisplay />
      <EducationAction />
    </>
  );
};
const EducationBanner = () => {
  return (
    <div id={`${namespace}`}>
      <h2 id={`${namespace}-header`}>Education</h2>
      <div id={`${namespace}-container`}>
        <div id={`${namespace}-container-inner`}>
          <EducationBannerContent />
        </div>
      </div>
    </div>
  );
};
export default EducationBanner;
