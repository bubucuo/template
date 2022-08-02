import EditCanvas from "@/components/EditCanvas";
import EditCmp from "@/components/EditCmp";
import {useCanvasByContext} from "@/store/hooks";
import {useState} from "react";
import styles from "./index.less";

export default function Right(props) {
  const canvas = useCanvasByContext();
  const selectedCmp = canvas.getSelectedCmp();

  const [showEdit, setShowEdit] = useState(true);

  return (
    <div className={styles.main}>
      <div
        className={styles.switch}
        onClick={() => {
          setShowEdit(!showEdit);
        }}>
        {showEdit ? "隐藏编辑区域" : "显示编辑区域"}
      </div>
      {showEdit && (selectedCmp ? <EditCmp /> : <EditCanvas />)}
    </div>
  );
}
