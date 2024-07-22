import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
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
  return (
    <div
      style={{
        paddingTop: "3.5em",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <LoadingIcon
        primaryFillColor={"#3AC2FF"}
        secondaryFillColor={"#909090"}
        faceFillColor={"#2e2e2e"}
        strokeColor={"#2e2e2e"}
        backgroundArmColor={"#2e2e2e"}
        laptopLogoColor={"white"}
        textColor={"white"}
        width={!smallWindowWidth ? "80%" : "50%"}
        background={{ color: "black" }}
        center
      />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
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
