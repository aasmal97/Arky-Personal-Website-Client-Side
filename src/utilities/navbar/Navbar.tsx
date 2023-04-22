import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useWindowWidth from "../../hooks/useWindowWidth";
const namespace = "navbar";
type LinkData = {
  name: string;
  link?: string;
  hashLink?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
};
const linkData: LinkData[] = [
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
  { name: "Contact", hashLink: "/#contact-me-banner" },
];
const Navbar = () => {
  const smallWindowWidth = useWindowWidth(576)
  return (
    <nav id={namespace}>
      <Link to="/" id={`${namespace}-logo`}>
        <div
          style={{
            height: "100%",
            aspectRatio: "1/1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ height: "70%", aspectRatio: "1/1", width: "auto" }}
            alt="Arky Asmal"
            src={`${process.env.REACT_APP_MEDIA_FILES_UR}/profileImg.jpg`}
          />
        </div>
        {smallWindowWidth && <span>Arky's Portfolio</span>}
      </Link>

      <div id={`${namespace}-links`}>
        {linkData.map((l) =>
          l.link ? (
            <Link key={l.name} to={l.link} onClick={l.onClick}>
              {l.name}
              <div className="link-animation-container"></div>
              <svg viewBox="0 0 13 20">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </Link>
          ) : l.hashLink ? (
            <HashLink key={l.name} to={l.hashLink}>
              {l.name}
            </HashLink>
          ) : (
            <button key={l.name} onClick={l.onClick}>
              {l.name}
            </button>
          )
        )}
      </div>
    </nav>
  );
};
export default Navbar;
