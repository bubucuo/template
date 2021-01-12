import React, {useState, useCallback} from "react";
import useAddCanvas from "./useAddCanvas";
import useUpdateCanvas from "./useUpdateCanvas";

function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}

export default {
  useForceUpdate,
  useAddCanvas,
  useUpdateCanvas,
};
