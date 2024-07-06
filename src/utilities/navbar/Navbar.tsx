import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useWindowWidth from "../../hooks/useWindowWidth";
import Drawer from "../drawer/Drawer";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { LinkedIn } from "@mui/icons-material";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
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
  { name: "Skills", link: "/skills" },
  { name: "Contact", link: "/contact" },
];

const NavLinks = ({
  toggleDrawer,
}: {
  toggleDrawer?: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const smallWindowWidth = useWindowWidth(576);
  return (
    <>
      <div id={`${namespace}-links`}>
        {linkData.map((l) =>
          l.link ? (
            <Link
              key={l.name}
              to={l.link}
              onClick={(e) => {
                //improve stability of link out
                if (toggleDrawer) toggleDrawer(false)(e);
                if (l.onClick) l.onClick(e);
              }}
            >
              {l.name}
              {smallWindowWidth && (
                <>
                  <div className="link-animation-container"></div>
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </>
              )}
            </Link>
          ) : l.hashLink ? (
            <HashLink
              key={l.name}
              to={l.hashLink}
              onClick={(e) => {
                if (toggleDrawer) toggleDrawer(false)(e);
                if (l.onClick) l.onClick(e);
              }}
            >
              {l.name}
            </HashLink>
          ) : (
            <button
              key={l.name}
              onClick={(e) => {
                if (toggleDrawer) toggleDrawer(false)(e);
                if (l.onClick) l.onClick(e);
              }}
            >
              {l.name}
            </button>
          )
        )}
      </div>
    </>
  );
};
const NavDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };
  return (
    <>
      <Button
        variant="text"
        id={`${namespace}-open-drawer-button`}
        aria-label="open-drawer"
        onClick={toggleDrawer(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        id={`${namespace}-drawer`}
        anchor="right"
        open={open}
        onClose={(e) => toggleDrawer(false)(e)}
      >
        <Button
          variant="text"
          id={`${namespace}-close-drawer-button`}
          aria-label="close-drawer"
          onClick={toggleDrawer(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
        <NavLinks toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};
const Navbar = () => {
  const smallWindowWidth = useWindowWidth(576);
  const { currTheme } = useNavbarTheme();
  return (
    <nav id={namespace} className={currTheme || "dark"}>
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
            sx={{ height: "100%", aspectRatio: "1/1", width: "auto" }}
            alt="Arky Asmal"
            src={`${process.env.REACT_APP_MEDIA_FILES_URL}/appLogo.jpg`}
          />
        </div>
      </Link>
      {smallWindowWidth && <NavLinks />}
      <div id={`${namespace}-linkedIn`}>
        <a
          href="https://www.linkedin.com/in/arky-asmal"
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedIn />
        </a>
      </div>
      {!smallWindowWidth && <NavDrawer />}
    </nav>
  );
};
export default Navbar;
