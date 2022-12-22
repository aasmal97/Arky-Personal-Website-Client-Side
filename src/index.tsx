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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="projects" element={<></>} />
      <Route path="projects/:id" element={<></>} />
      <Route path="about" element={<></>}>
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
