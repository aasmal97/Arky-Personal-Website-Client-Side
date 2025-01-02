import { useState, useEffect, memo } from "react";
import { fetchSkillsData } from "../../../../utilities/asyncActions/SkillsActions";
import { type Skills } from "../../../../utilities/types/RestApiTypes";
import { Collapse } from "@mui/material";
import SkillsImage from "./SkillsImage";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import RotatedStickyLabel from "../../../../utilities/stickyLabel/StickyLabel";
import anime from "animejs";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";

const namespace = "skills-banner";

const MediaContent = () => {
  return (
    <div className={`${namespace}-media-content`}>
      <div className={`${namespace}-media-img-container`}>
        <SkillsImage />
      </div>
    </div>
  );
};
const TextContent = ({
  showSkills,
  setShowSkills,
}: {
  showSkills: boolean;
  setShowSkills: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const smallWindowWidth = useWindowWidth(576);
  const { ref: textRef, isVisible } = useIntersectionWrapper();
  const title = "Skills";
  useEffect(() => {
    if (isVisible)
      anime.timeline().add({
        targets: `.${namespace}-letter`,
        opacity: [0, 1],
        color: ["#000", "#ffc83a"],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: (el, i) => 50 * (i + 1),
      });
    return () => anime.remove(`.${namespace}-letter`);
  }, [isVisible]);
  return (
    <div className={`${namespace}-text-content`}>
      <h2 ref={(el) => (textRef.current = el)} aria-label={title}>
        {!smallWindowWidth && <MediaContent />}
        {Array(title.length)
          .fill(0)
          .map((e, idx) => {
            return title[idx] ? (
              <span
                key={`${title[idx]}-${idx}`}
                className={`${namespace}-letter`}
              >
                {title[idx]}
              </span>
            ) : (
              <span key={`${title[idx]}-${idx}`}>{title[idx]}</span>
            );
          })}
      </h2>
      <p>
        Pursing knowledge is my strongest attribute. After all, good work is
        only limited by the tools used. As a result, I have 30+ skills at my
        disposal. And I’m always hungry for more.
      </p>
      <button
        onClick={() => setShowSkills((e) => !e)}
        aria-label={"toggle-skills"}
      >
        <div>{!showSkills ? "View All" : "Hide Skills"}</div>
        {!showSkills ? <ArrowDownward /> : <ArrowUpward />}
      </button>
    </div>
  );
};
export const SkillsList = ({
  disableVerticalSidebar,
}: {
  disableVerticalSidebar?: boolean;
}) => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const mediumWindowWidth = useWindowWidth(768);
  useEffect(() => {
    fetchSkillsData({
      query: {},
      max: 200,
    }).then((res) => {
      const items = res?.result.Items;
      if (!items) return;
      setSkills(
        items.sort((a, b) => {
          const aIdx =
            typeof a.order === "number" ? parseInt(a.order) : items.length;
          const bIdx =
            typeof b.order === "number" ? parseInt(b.order) : items.length;
          return aIdx - bIdx;
        })
      );
    });
    return () => {};
  }, []);
  return (
    <div
      className={`${namespace}-skills-list ${
        disableVerticalSidebar ? "sidebar-disabled" : ""
      }`}
    >
      {!disableVerticalSidebar && mediumWindowWidth && (
        <RotatedStickyLabel>Skills</RotatedStickyLabel>
      )}
      {(!mediumWindowWidth || disableVerticalSidebar) && (
        <div className="sticky-label">Skills</div>
      )}
      <div className={`${namespace}-skills-list-inner`}>
        {skills.map((item) => {
          return (
            <div className={`${namespace}-skills-list-item`} key={item.name}>
              <div className={`${namespace}-skills-list-item-name`}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const SkillsBanner = memo(() => {
  const [showSkills, setShowSkills] = useState(false);
  const smallWindowWidth = useWindowWidth(576);
  return (
    <div id={namespace}>
      <div id={`${namespace}-inner`}>
        {smallWindowWidth && <MediaContent />}
        <TextContent showSkills={showSkills} setShowSkills={setShowSkills} />
      </div>
      <Collapse in={showSkills} timeout={500}>
        <SkillsList />
      </Collapse>
    </div>
  );
});
export default SkillsBanner;
