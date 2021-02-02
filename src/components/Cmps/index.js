import styles from "./index.less";

export const TextComponent = 0;
export const ButtonComponent = 1;
export const ImgComponent = 2;

export const menus = [
  {
    desc: "文本",
    data: {
      type: TextComponent,
      value: "文本",
      style: {
        top: 1,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
        color: "#ff0000",
        backgroundColor: "#f5deb3",
        textAlign: "left",
        borderRadius: "0%",
      },
    },
  },
  {
    desc: "按钮",
    data: {
      type: ButtonComponent,
      value: "按钮",
      style: {
        top: 0,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
        color: "#ff0000",
        backgroundColor: "#f5deb3",
        textAlign: "left",
        borderRadius: "0%",
      },
    },
  },
  {
    desc: "图片",
    data: {
      type: ImgComponent,
      value:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1333208373,3297678241&fm=26&gp=0.jpg", // 图片地址
      style: {
        top: 0,
        left: 0,
        width: 200,
        height: 100,
        borderRadius: "0%",
      },
    },
  },
];

export default function Cmps(props) {
  const handleDragStart = (e, data) => {
    e.dataTransfer.setData("add-component", JSON.stringify(data));
  };

  return (
    <div className={styles.main}>
      {menus.map((item) => (
        <span
          key={item.desc}
          className={styles.cmp}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}>
          {item.desc}
        </span>
      ))}
    </div>
  );
}
