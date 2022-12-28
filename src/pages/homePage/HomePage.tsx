import IntroBanner from "./components/introBanner/IntroBanner";
import ProjectBanner from "./components/projectBanner/ProjectBanner";
import SkillsBanner from "./components/skillsBanner/SkillsBanner";
import AboutMeBanner from "./components/aboutMeBanner/AboutMeBanner";
const HomePage = () => {
  return (
    <div className={"home-pg-container"}>
      {/* <IntroBanner /> */}
      {/* <ProjectBanner /> */}
      {/* <SkillsBanner /> */}
      <AboutMeBanner />
    </div>
  );
};
export default HomePage;
