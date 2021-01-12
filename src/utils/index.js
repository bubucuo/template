import {useCallback, useState} from "react";

export function getOnlyKey() {
  return Math.random();
}

export function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
}
