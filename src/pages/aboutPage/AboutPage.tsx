import IntroBanner from "./components/IntroBanner";
import EducationBanner from "./components/EducationBanner";
import HobbiesBanner from "./components/HobbiesBanner";
import { useEffect } from "react";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
const namespace = "about-pg";
const AboutPage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("color");
  }, []);
  return (
    <div id={`${namespace}`}>
      <IntroBanner />
      <EducationBanner />
      {/* <HobbiesBanner /> */}
    </div>
  );
};
export default AboutPage;
