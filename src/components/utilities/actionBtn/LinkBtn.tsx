import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router";

const LinkBtn = ({
  children,
  to,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (

      <a href={to}>
        <div>{children}</div>
        <ArrowOutward />
      </a>
  );
};
export default LinkBtn;
