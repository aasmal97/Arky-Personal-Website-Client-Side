import { Link } from "react-router-dom";
const namespace = "navbar";
type LinkData = {
  name: string;
  link?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
};
const linkData: LinkData[] = [
  { name: "Project", link: "/projects" },
  { name: "About", link: "/about" },
  { name: "Contact", onClick: () => {} },
];
const Navbar = () => {
  return (
    <nav id={namespace}>
      {linkData.map((l) =>
        l.link ? (
          <Link key={l.name} to={l.link} onClick={l.onClick}>
            {l.name}
          </Link>
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
