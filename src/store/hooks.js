import { useContext } from "react";
import { CanvasContext } from "../Context";

export function useCanvasData() {
  const canvas = useContext(CanvasContext);

  console.log("c----anvas", canvas); //sy-log
  return canvas.getCanvas();
}

export function useCanvasCmps() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvasCmps();
}
