import { useEffect } from "react";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
import { SkillsList } from "../homePage/components/skillsBanner/SkillsBanner";
const namespace = "skills-pg";
const SkillsPage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("dark");
  }, [setCurrTheme]);
  return (
    <div className={`${namespace}-container`}>
      <SkillsList disableVerticalSidebar/>
    </div>
  );
};
export default SkillsPage;
