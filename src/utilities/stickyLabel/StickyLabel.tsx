const RotatedStickyLabel = ({ children }: { children: string }) => {
  return (
    <div
      className="sticky-label"
      style={{
        position: "sticky",
        top: "0.3em",
        left: 0,
        transform: "rotate(180deg)",
        writingMode: "vertical-lr",
        letterSpacing: "0.12em",
        lineHeight: "1.625em",
        textAlign: "end",
        maxHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};
export default RotatedStickyLabel;
