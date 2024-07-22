import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Root from "./root";
import LoadingIcon from "./utilities/loadingIcon/LoadingIcon";
import useWindowWidth from "./hooks/useWindowWidth";
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const ProjectPage = React.lazy(() => import("./pages/projectPage/ProjectPage"));
const SkillsPage = React.lazy(() => import("./pages/skillsPage/SkillsPage"));
const ContactPage = React.lazy(() => import("./pages/contactPage/ContactPage"));
const FallbackElement = () => {
  const smallWindowWidth = useWindowWidth(576);
  const mediumWindowWidth = useWindowWidth(992);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          paddingTop: "3.5em",
          paddingBottom: "3.5em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          maxWidth: "1500px",
        }}
      >
        <LoadingIcon
          primaryFillColor={"#ff5050"}
          secondaryFillColor={"#909090"}
          faceFillColor={"#232323"}
          strokeColor={"#232323"}
          backgroundArmColor={"#232323"}
          laptopLogoColor={"#909090"}
          textColor={"#f2f2f2"}
          width={!smallWindowWidth ? "80%" : !mediumWindowWidth ? "50%" : "40%"}
          background={{ color: "#232323" }}
          center
        />
      </div>
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      // <FallbackElement />
      <Root />
    }>
      <Route index element={<HomePage />} />
      <Route path="home/*" element={<HomePage />} />
      <Route path="projects" element={<ProjectPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="skills" element={<SkillsPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<FallbackElement />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
