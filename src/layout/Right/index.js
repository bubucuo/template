import EditCanvas from "../../components/EditCanvas";
import EditCmp from "../../components/EditCmp";
import { useCanvasByContext } from "../../store/hooks";

export default function Right(props) {
  const canvas = useCanvasByContext();
  const selectedCmp = canvas.getSelectedCmp();

  return selectedCmp ? <EditCmp /> : <EditCanvas />;
}
