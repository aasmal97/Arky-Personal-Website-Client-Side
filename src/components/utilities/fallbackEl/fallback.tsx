import LoadingIcon from "../loadingIcon/LoadingIcon";

const FallbackElement = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="fallback-inner-wrapper"
        style={{
          boxSizing: "border-box",
          paddingTop: "3.5em",
          paddingBottom: "3.5em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          maxWidth: "1500px",
        }}
      >
        <LoadingIcon
          primaryFillColor={"#ff5050"}
          secondaryFillColor={"#909090"}
          faceFillColor={"#232323"}
          strokeColor={"#232323"}
          backgroundArmColor={"#232323"}
          laptopLogoColor={"#909090"}
          textColor={"#f2f2f2"}
          background={{ color: "#232323" }}
          center
        />
      </div>
    </div>
  );
};
export default FallbackElement;
