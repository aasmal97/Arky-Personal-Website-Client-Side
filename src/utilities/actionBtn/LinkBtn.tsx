import { ArrowOutward } from "@mui/icons-material";
import { Link } from "react-router";

const LinkBtn = ({
  children,
  to,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (

      <Link to={to}>
        <div>{children}</div>
        <ArrowOutward />
      </Link>
  );
};
export default LinkBtn;
