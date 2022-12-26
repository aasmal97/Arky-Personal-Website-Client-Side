import IntroBanner from "./components/introBanner/IntroBanner";
import ProjectBanner from "./components/projectBanner/ProjectBanner";
const HomePage = () => {
  return (
    <div className={"home-pg-container"}>
      {/* <IntroBanner /> */}
      <ProjectBanner />
    </div>
  );
};
export default HomePage;
