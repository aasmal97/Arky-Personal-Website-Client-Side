"use client";
import { Box, CircularProgress } from "@mui/material";
import useWindowWidth from "../../hooks/useWindowWidth";
export const FullPagePaginationLoadingComponent = ({
  setRef,
}: {
  setRef: (node?: Element | null | undefined) => void;
}) => {
  const mediumWidth = useWindowWidth(768);
  const largeWidth = useWindowWidth(992);
  return (
    <Box className="flex justify-center w-full p-6 sm:p-10 lg:p-14">
      <CircularProgress
        size={largeWidth ? "3.5rem" : mediumWidth ? "3rem" : "2.5rem"}
        ref={setRef}
      />
    </Box>
  );
};
export default FullPagePaginationLoadingComponent;
