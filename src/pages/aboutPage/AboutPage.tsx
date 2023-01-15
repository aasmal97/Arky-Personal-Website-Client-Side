import IntroBanner from "./components/IntroBanner";
import EducationBanner from "./components/EducationBanner";
import HobbiesBanner from "./components/HobbiesBanner";
const namespace = "about-pg";
const AboutPage = () => {
  return (
    <div id={`${namespace}`}>
      <IntroBanner />
      <EducationBanner />
      <HobbiesBanner />
    </div>
  );
};
export default AboutPage;
