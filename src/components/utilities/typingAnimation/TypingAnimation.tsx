import useTypingAnimation from "../../hooks/useTypingAnimation";
const TypingAnimation = ({
  namespace,
  strArr,
}: {
  namespace: string;
  strArr: string[];
}) => {
  const { ref, currWord } = useTypingAnimation({
    strArr,
  });
  return (
    <span
      style={{ display: "inline", width: "100%" }}
      className={`${namespace}-ani-wrapper`}
    >
      <span
        style={{ display: "inline-block" }}
        className={`${namespace}-ani-container`}
        ref={ref}
      >
        {currWord}
      </span>
    </span>
  );
};
export default TypingAnimation;
