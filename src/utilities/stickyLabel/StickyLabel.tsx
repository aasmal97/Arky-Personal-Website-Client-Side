import { join, split, reverse } from "lodash";
import useOneLineText from "../../hooks/useOneLineText";
const reverseWords = (str: string) => join(reverse(split(str, " ")), " ");

const RotatedStickyLabel = ({ children }: { children: string }) => {
  const {
    setContainer,
    oneLine,
  } = useOneLineText();

  return (
    <div
      className="sticky-label"
      style={{
        writingMode: "vertical-lr",
        letterSpacing: "0.12em",
        lineHeight: "1.625em",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <p
        ref={setContainer}
        style={{
          transform: "rotate(180deg)",
          position: "sticky",
          top: "0.3em",
          left: 0,
          maxHeight: "100vh",
        }}
      >
        {oneLine ? children : reverseWords(children)}
      </p>
    </div>
  );
};
export default RotatedStickyLabel;
