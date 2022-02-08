import { url0 } from "../../../utils";
import AddCmpWrapper from "../AddCmpWrapper";

const imgs = [
  {
    style: {
      width: 180,
      height: 320,
    },

    value: url0 + "chuliu.jpeg",
  },
  {
    style: {
      width: 180,
      height: 320,
    },
    value: url0 + "hua-bg.png",
  },
  {
    style: {
      width: 315,
      height: 187,
    },
    value: url0 + "tiger.png",
  },
  {
    style: {
      width: 128,
      height: 30,
    },
    value: url0 + "fu.png",
  },

  {
    style: {
      width: 40,
      height: 30,
    },
    value: url0 + "gold-coins.png",
  },

  {
    style: {
      width: 40,
      height: 30,
    },
    value: url0 + "gold-coins2.png",
  },
  {
    style: {
      width: 120,
      height: 230,
    },
    value: url0 + "meng.webp",
  },

  {
    style: {
      width: 300,
      height: 152,
    },
    value: url0 + "taohuayun.png",
  },

  {
    style: {
      width: 300,
      height: 312,
    },
    value: url0 + "hua.png",
  },

  {
    style: {
      width: 320,
      height: 200,
    },
    value: url0 + "certificate.jpg",
  },
  {
    style: {
      width: 320,
      height: 200,
    },
    value: url0 + "rose.jpg",
  },
  {
    style: {
      width: 320,
      height: 200,
    },
    value: url0 + "red-rose.jpg",
  },

  {
    style: {
      width: 320,
      height: 200,
    },
    value: url0 + "peony.jpg",
  },
  {
    style: {
      width: 320,
      height: 200,
    },
    value: url0 + "flower.jpg",
  },
];

function Img({ baseCmp }) {
  return (
    <>
      {imgs.map((item, index) => (
        <AddCmpWrapper
          key={"img" + index}
          baseCmp={baseCmp}
          value={item.value}
          style={item.style}
          id="111"
        >
          <img src={item.value} alt="" />
        </AddCmpWrapper>
      ))}
    </>
  );
}
export default Img;
