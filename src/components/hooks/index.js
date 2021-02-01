import React, {useState, useCallback} from "react";

function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}

export default {
  useForceUpdate,
};
