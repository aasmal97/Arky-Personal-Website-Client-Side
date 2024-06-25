const RotatedStickyLabel = ({ children }: { children: string }) => {
  return (
    <div
      className="sticky-label"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        transform: "rotate(180deg)",
        writingMode: "vertical-lr",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        lineHeight: "1.625em",
        color: "#5a5a5a",
        textAlign: "end",
        maxHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};
export default RotatedStickyLabel;
