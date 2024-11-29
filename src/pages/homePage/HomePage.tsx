import IntroBanner from "./components/introBanner/IntroBanner";
import ProjectBanner from "./components/projectBanner/ProjectBanner";
import SkillsBanner from "./components/skillsBanner/SkillsBanner";
import AboutMeBanner from "./components/aboutMeBanner/AboutMeBanner";
import { useEffect } from "react";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
const HomePage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("dark");
  }, [setCurrTheme]);
  return (
    <div className={"home-pg-container"}>
      <IntroBanner />
      <ProjectBanner />
      <SkillsBanner />
      <AboutMeBanner />
    </div>
  );
};
export default HomePage;