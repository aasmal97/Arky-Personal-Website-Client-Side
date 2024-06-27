import { useState, useEffect, memo } from "react";
import { fetchSkillsData } from "../../../../utilities/asyncActions/SkillsActions";
import { Skills } from "../../../../utilities/types/RestApiTypes";
import Collapse from "@mui/material/Collapse";
import SkillsImage from "./SkillsImage";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
const namespace = "skills-banner";
const BubblesSVGIcon = () => {
  return (
    <svg viewBox="0 0 20 35" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11.5177" cy="24.5153" r="3.28157" fill="#FFC83A" />
      <circle cx="5.34061" cy="29.2768" r="1.47993" fill="#3AC2FF" />
      <circle cx="9.71604" cy="15.7644" r="1.35124" fill="#3AC2FF" />
      <circle cx="5.14755" cy="11.7107" r="1.1582" fill="#FFC83A" />
      <circle cx="10.8742" cy="32.8801" r="1.47993" fill="#D24040" />
      <circle cx="14.0271" cy="5.27626" r="5.27626" fill="#D24040" />
      <circle cx="3.732" cy="4.50412" r="2.18772" fill="#3AC2FF" />
      <circle cx="16.7296" cy="15.4427" r="2.57378" fill="#D24040" />
      <circle cx="2.38075" cy="18.9816" r="2.38075" fill="#D24040" />
    </svg>
  );
};

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
  return (
    <div className={`${namespace}-text-content`}>
      <h2>Skills</h2>
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
export const SkillsList = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
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
    <div className={`${namespace}-skills-list`}>
      <h3>Skills</h3>
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
  const mediumWindowWidth = useWindowWidth(768);
  // const width = "min(5vw, 4em)";
  // const innerStyle = {
  //   paddingBottom: !mediumWindowWidth ? `calc(${width} * 3)`: `calc(${width} * 1)`,
  // };
  return (
    <div id={namespace}>
      <div id={`${namespace}-inner`}>
        <MediaContent />
        <TextContent showSkills={showSkills} setShowSkills={setShowSkills} />
        {/* {!mediumWindowWidth && (
          <Collapse in={showSkills} timeout={500}>
            <SkillsList />
          </Collapse>
        )} */}
      </div>
      <Collapse in={showSkills} timeout={500}>
        <SkillsList />
      </Collapse>
    </div>
  );
});
export default SkillsBanner;
