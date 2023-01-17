import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Root from "./root";
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const ProjectPage = React.lazy(() => import("./pages/projectPage/ProjectPage"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="home/*" element={<HomePage />} />
      <Route path="projects" element={<ProjectPage />}>
        <Route path=":page" element={<ProjectPage />} />
      </Route>
      <Route path="about" element={<AboutPage />}>
        <Route index element={<Navigate to={"/about"} />}></Route>
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
