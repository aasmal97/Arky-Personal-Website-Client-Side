import IntroBanner from "./components/introBanner/IntroBanner";
import ProjectBanner from "./components/projectBanner/ProjectBanner";
import SkillsBanner from "./components/skillsBanner/SkillsBanner";
const HomePage = () => {
  return (
    <div className={"home-pg-container"}>
      {/* <IntroBanner /> */}
      {/* <ProjectBanner /> */}
      <SkillsBanner />
    </div>
  );
};
export default HomePage;
