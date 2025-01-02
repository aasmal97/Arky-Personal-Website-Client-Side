import IntroBanner from "./components/IntroBanner";
import EducationBanner from "./components/EducationBanner";
import { useEffect } from "react";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
const namespace = "about-pg";
const AboutPage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("color");
  }, [setCurrTheme]);
  return (
    <div id={`${namespace}`}>
      <IntroBanner />
      <EducationBanner />
    </div>
  );
};
export default AboutPage;
