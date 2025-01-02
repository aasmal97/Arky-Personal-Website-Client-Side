// import React, { Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router";
// import reportWebVitals from "./reportWebVitals";

// import LoadingIcon from "./utilities/loadingIcon/LoadingIcon";
// import useWindowWidth from "./hooks/useWindowWidth";
// const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
// const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
// const ProjectPage = React.lazy(() => import("./pages/projectsPage/ProjectPage"));
// const SkillsPage = React.lazy(() => import("./pages/skillsPage/SkillsPage"));
// const ContactPage = React.lazy(() => import("./pages/contactPage/ContactPage"));

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={
//       <Root />
//     }>
//       <Route index element={<HomePage />} />
//       <Route path="home" element={<HomePage />} />
//       <Route path="projects" element={<ProjectPage />} />
//       <Route path="about" element={<AboutPage />} />
//       <Route path="contact" element={<ContactPage />} />
//       <Route path="skills" element={<SkillsPage />} />
//     </Route>
//   )
// );

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Suspense fallback={<FallbackElement />}>
//       <RouterProvider router={router} />
//     </Suspense>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
