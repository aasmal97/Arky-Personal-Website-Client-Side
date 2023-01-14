import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

const useLoadingState = ({
  asyncFunc,
}: {
  asyncFunc: <T>(e?: T) => Promise<any>;
}) => {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [result, setResult] = useState<any>();
  const callFunction: <T>(e?: T) => Promise<void> = async (e) => {
    setStatus("loading");
    try {
      const result = await asyncFunc(e);
      unstable_batchedUpdates(() => {
        setResult(result);
        setStatus("success");
      });
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };
  return { status, result, callFunction };
};
export default useLoadingState;
