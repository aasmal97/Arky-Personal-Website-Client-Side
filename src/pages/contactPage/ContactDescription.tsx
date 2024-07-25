import { ArrowOutward } from "@mui/icons-material";
import { IntroBannerImage } from "./IntroBannerImage";

const ContactDescription = ({ namespace }: { namespace: string }) => {
  return (
    <div id={`${namespace}-content`}>
      <div className={`${namespace}-content-row`}>
        <div className={`${namespace}-content-col`}>
          <h4>Email</h4>
          <a
            href="mailto:arkyasmal@gmail.com"
            className={`${namespace}-content-email-link`}
          >
            arkyasmal@gmail.com
          </a>
        </div>
        <div className={`${namespace}-content-col`}>
          <h4>Resume</h4>
          <a
            className={`${namespace}-content-resume-link`}
            href={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/ArkyAsmalCV.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            <div>View Resume</div>
            <ArrowOutward />
          </a>
        </div>
      </div>
      <div className={`${namespace}-content-row`}>
        <div className={`${namespace}-content-img`}>
          <IntroBannerImage />
        </div>
      </div>
    </div>
  );
};
export default ContactDescription;