// import {
//   isRouteErrorResponse,
//   Links,
//   Meta,
//   Scripts,
//   ScrollRestoration,
// } from "react-router";
// import { Outlet } from "react-router";
// import Navbar from "./utilities/navbar/Navbar";
// import Footer from "./utilities/footer/Footer";
// import { NavbarThemeProvider } from "./hooks/useNavbarTheme";
// import CircleBg from "./utilities/circleBg/CircleBg";
// import type { Route } from "./+types/root";
// import { useEffect } from "react";
// export * from "./links";
// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <Links />
//         <Meta />
//       </head>
//       <body>
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }
// export default function App() {
//   useEffect(() => {
//     const loadFunc = () => {
//       console.log("loadFunc");
//       // const nodes = document.querySelectorAll("[rel=preload]");
//       // console.log(nodes, 'nodes');
//     };
//     window.addEventListener("load", loadFunc);
//     return () => {
//       window.removeEventListener("load", loadFunc);
//     };
//   }, []);
//   return (
//     <NavbarThemeProvider>
//       <Navbar />
//       <CircleBg />
//       <div id="app-container">
//         {/* <Outlet /> */}
//       </div>
//       <Footer />
//     </NavbarThemeProvider>
//   );
// }

// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   let message = "Oops!";
//   let details = "An unexpected error occurred.";
//   let stack: string | undefined;

//   if (isRouteErrorResponse(error)) {
//     message = error.status === 404 ? "404" : "Error";
//     details =
//       error.status === 404
//         ? "The requested page could not be found."
//         : error.statusText || details;
//   } else if (import.meta.env.DEV && error && error instanceof Error) {
//     details = error.message;
//     stack = error.stack;
//   }

//   return (
//     <main className="pt-16 p-4 container mx-auto">
//       <h1>{message}</h1>
//       <p>{details}</p>
//       {stack && (
//         <pre className="w-full p-4 overflow-x-auto">
//           <code>{stack}</code>
//         </pre>
//       )}
//     </main>
//   );
// }
