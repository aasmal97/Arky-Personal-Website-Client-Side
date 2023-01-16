import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
  return (
    <nav id={namespace}>
      {linkData.map((l) =>
        l.link ? (
          <Link key={l.name} to={l.link} onClick={l.onClick}>
            {l.name}
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
    </nav>
  );
};
export default Navbar;
