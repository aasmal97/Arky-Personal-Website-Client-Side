import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import DownloadButton from "../../../../utilities/downloadBtn/DownloadButton";
import { v4 as uuid } from "uuid";
import ActionBtn from "../../../../utilities/actionBtn/ActionBtn";
import { AnimateHeaders } from "../../../../utilities/animateHeaders/animateHeaders";
const namespace = "home-pg-intro-banner";
const uuidArr = Array(3)
  .fill(0)
  .map(() => uuid());
const mediaUrl = process.env.REACT_APP_MEDIA_FILES_URL;
const IntroBanner = () => {
  return (
    <div id={namespace}>
      <div className={`${namespace}-img-container`}>
        <div className={`${namespace}-img-wrapper`}>
          <LazyImage
            src={`${mediaUrl}/homePg/profile.png`}
            alt="Arky Asmal smiling, and standing with arms folded"
            placeholderSrc={`${mediaUrl}/homePg/profile-placeholder.png`}
          />
        </div>
      </div>
      <div className={`${namespace}-content`}>
        <div className={`${namespace}-title`}>
          <AnimateHeaders id={uuidArr[0]} htmlTag="h2" namespace={namespace}>
            Welcome! I'm Arky
          </AnimateHeaders>
          <AnimateHeaders id={uuidArr[2]} htmlTag="h3" namespace={namespace}>
            A Software Developer
          </AnimateHeaders>
        </div>
        <div className={`${namespace}-sub-content`}>
          <p>
            I provide technical, impactful and collaborative solutions to an
            application’s frontend, backend and cloud infrastructure
          </p>
          <DownloadButton
            fileName="ArkyAsmalCV"
            fileType="pdf"
            data={`${mediaUrl}/homePg/ArkyAsmalCV.pdf`}
          >
            {(props) => <ActionBtn props={props}>Download CV</ActionBtn>}
          </DownloadButton>
        </div>
      </div>
    </div>
  );
};
export default IntroBanner;
