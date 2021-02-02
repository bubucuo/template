import AddCmpWrapper from "../AddCmpWrapper";

const imgs = [
  {
    src:
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1333208373,3297678241&fm=26&gp=0.jpg",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/15/92/20/82/17/0c/0cd90db0a695dbd3e3863fc91966f9e5.png!l800_i_w?auth_key=1638115200-0-0-b0ffe9b4a1b908c00614751f80c5576a",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/15/92/20/82/17/07/075b0e0118f23549ce0e700676e45191.png!l800_i_w?auth_key=1638115200-0-0-6bcef5430a7fef147606bfd7e6776a72",
  },

  {
    src:
      "https://img.tusij.com/ips_asset/15/92/20/82/17/81/812e08e2157d0fb0021cb376f3abdf89.png!l800_i_w?auth_key=1638115200-0-0-934ab0fcf8ac0d630994dfaa68d02736",
  },

  {
    src:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F13%2F8585e08ac31d512b393b31d42b0898b2.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614839119&t=aaf4ce9c2acf4de51fc6a2ffa1072b42",
  },
];

function Img({baseCmp}) {
  return (
    <>
      {imgs.map((item, index) => (
        <AddCmpWrapper key={"img" + index} baseCmp={baseCmp} value={item.src}>
          <img src={item.src} />
        </AddCmpWrapper>
      ))}
    </>
  );
}
export default Img;
