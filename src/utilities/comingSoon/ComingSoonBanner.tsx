import useElementSize from "../../hooks/useElementSize";
import { StopWatchAnimation } from "../../utilities/loadingIcon/ComingSoonIcon";
import { ComingSoonBannerWave } from "./ComingSoonBannerWave";
import useWindowWidth from "../../hooks/useWindowWidth";
import { memo } from "react";
const namespace = "project-pg";
export const ComingSoonBanner = memo(
  ({
    titleScaleFactor = 0.11,
    subTitleScaleFactor = 0.021,
  }: {
    subTitleScaleFactor?: number;
    titleScaleFactor?: number;
  }) => {
    const smallWindowWidth = useWindowWidth(576);
    const [parentElRef, parentElSize] = useElementSize();
    const titleStyles = {
      fontSize: smallWindowWidth
        ? `${parentElSize.width * titleScaleFactor}px`
        : `${parentElSize.width * titleScaleFactor}px`,
    };
    const subTitleStyles = {
      fontSize: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor}px`
        : `${parentElSize.width * subTitleScaleFactor * 1.5}px`,
      marginTop: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor}px`
        : `${parentElSize.width * subTitleScaleFactor * 1.5}px`,
      lineHeight: smallWindowWidth
        ? `${parentElSize.width * subTitleScaleFactor * 2}px`
        : `${parentElSize.width * subTitleScaleFactor * 2 * 1.5}px`,
    };
    return (
      <div
        ref={parentElRef}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <div className={`${namespace}-coming-soon-banner-bg`}>
          <ComingSoonBannerWave />
        </div>

        <div className={`${namespace}-coming-soon-banner-container`}>
          <div className={`${namespace}-coming-soon-banner`}>
            <div className={`${namespace}-coming-soon-banner-title`}>
              <h3 style={titleStyles}>coming soon.</h3>
              <StopWatchAnimation
                width="20%"
                clockHandColor="#00638F"
                polygonColor={"#3AC2FF"}
                ringColorDark="#3AC2FF"
                ringColorLight="#3AC2FF"
              />
            </div>

            <h6 style={subTitleStyles}>
              This project is still a work in progress. Check back periodically
              to see if it's ready for production!
            </h6>
          </div>
        </div>
      </div>
    );
  }
);
