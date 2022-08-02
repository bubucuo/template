import {isImgComponent} from "@/layout/Left";
import {useCanvasByContext} from "@/store/hooks";
import {defaultCommonStyle} from "@/utils/const";
import leftSideStyles from "../index.less";
import classNames from "classnames";

const defaultStyle = {
  ...defaultCommonStyle,
};

const url = "http://150.158.30.131:8181/";

const settings = [
  {
    key: 0,
    desc: "《精通React》",
    img: url + "react-head.png",
    data: '{"style":{"width":800,"height":8000,"backgroundColor":"#4400b9","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"value":"","style":{"position":"absolute","top":945,"left":109,"width":606,"height":1487,"borderRadius":"20%","borderStyle":"none","borderWidth":"0","borderColor":"blue","transform":0,"backgroundColor":"#ffffff"},"type":3,"key":0.9898443005171125},{"key":0.46365164238209244,"value":"http://150.158.30.131:8181/bg1.png","style":{"position":"absolute","top":0,"left":0,"width":798,"height":844,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.534850732632776,"value":"http://150.158.30.131:8181/react-head.png","style":{"position":"absolute","top":310,"left":-1,"width":800,"height":342,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.7349032473153161,"value":"《精通React》","style":{"position":"absolute","top":92,"left":2,"width":774,"height":174,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":"-15","lineHeight":"174px","fontSize":104,"fontWeight":"bold","color":"#ffffff","backgroundColor":"#ffffff00","textAlign":"center"},"type":1},{"key":0.09199263307831118,"value":"用一顿海底捞的钱，","style":{"position":"absolute","top":634,"left":177,"width":477,"height":116,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0,"lineHeight":"116px","fontSize":52,"fontWeight":"bold","color":"#ffffff","backgroundColor":"#ffffff00","textAlign":"left"},"type":1},{"key":0.07895562033889125,"value":"撬动月薪的大涨","style":{"position":"absolute","top":719,"left":193,"width":395,"height":121,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0,"lineHeight":"121px","fontSize":52,"fontWeight":"bold","color":"#ffffff","backgroundColor":"#ffffff00","textAlign":"left"},"type":1},{"key":0.9084638260168219,"value":"http://150.158.30.131:8181/lock.png","style":{"position":"absolute","top":784,"left":1,"width":799,"height":302,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.4594197912293638,"value":"http://150.158.30.131:8181/blue-star.png","style":{"position":"absolute","top":566,"left":522,"width":77,"height":78,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":"22"},"type":2},{"key":0.6433404952915975,"value":"最硬核的React课程","style":{"position":"absolute","top":911,"left":150,"width":524,"height":68,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0,"lineHeight":"68px","fontSize":56,"fontWeight":"bold","color":"#664955","backgroundColor":"#ffffff00","textAlign":"center"},"type":1},{"key":0.45078607010441796,"value":"http://150.158.30.131:8181/girl.png","style":{"position":"absolute","top":489,"left":227,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.5498624272093084,"value":"http://150.158.30.131:8181/dancer.png","style":{"position":"absolute","top":826,"left":77,"width":48,"height":52,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.3860585230608764,"value":"http://150.158.30.131:8181/tree.png","style":{"position":"absolute","top":686,"left":40,"width":55,"height":71,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.2902553846818834,"value":"http://150.158.30.131:8181/icon.png","style":{"position":"absolute","top":531,"left":192,"width":45,"height":45,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2}],"key":0,"desc":"《精通React》","img":"http://150.158.30.131:8181/react-head.png"}',
  },
];

export default function TplSide() {
  const canvas = useCanvasByContext();

  const setCanvas = (_cmp) => {
    canvas.setCanvas(JSON.parse(_cmp));
  };

  return (
    <div className={classNames(leftSideStyles.main)}>
      <ul className={classNames(leftSideStyles.box)}>
        {settings.map((item) => (
          <li
            className={leftSideStyles.item}
            key={item.key}
            onClick={() => setCanvas(item.data)}>
            <div className={leftSideStyles.desc}>{item.desc}</div>
            <img src={item.img} alt={item.desc} />
          </li>
        ))}
      </ul>
    </div>
  );
}
