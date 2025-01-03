import useElementSize from "../../hooks/useElementSize";
import { StopWatchAnimation } from "../loadingIcon/ComingSoonIcon";
import { ComingSoonBannerWave } from "./ComingSoonBannerWave";
import useWindowWidth from "../../hooks/useWindowWidth";
import { memo } from "react";
const namespace = "coming-soon-banner";
export const ComingSoonBanner = memo(
  ({
    titleScaleFactor = 0.11,
    subTitleScaleFactor = 0.035,
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
                clockHandColor="#ae0000"
                polygonColor={"#ff5050"}
                ringColorDark="#ff5050"
                ringColorLight="#ff5050"
              />
            </div>

            <p style={subTitleStyles}>
              This project is still a work in progress. Check back periodically
              to see if it's ready for production!
            </p>
          </div>
        </div>
      </div>
    );
  }
);
