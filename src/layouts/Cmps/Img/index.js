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
  {
    src:
      "http://piccn.ihuaben.com/pic/community/201903/0-1552650342219-8L4S_640-1138.jpeg?x-oss-process=image/resize,w_640/format,webp",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/element/22/34/b6/41/0c4c873b22c5afbb3380ddd34debfa19.png!l800_i_w?auth_key=1638633600-0-0-f561fc9d1999c08cb15056d17bea1419",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/66/55/03/f6/f6b968f702f10b9b3a46504f1063a61f.png!l800_i_w?auth_key=1638633600-0-0-1301d0e3269d9765ee7b94af3a523aa1",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/66/55/03/df/df364dfef6687c7d750ab2df3a12194e.png!l800_i_w?auth_key=1638633600-0-0-705ca2435a2bdb2df13e3b0b9a58c339",
  },
  {
    src:
      "//img.tusij.com/ips_asset/element/22/34/b6/41/c68d0769ef4ab2ce0157b70f0ae1eac7.png?auth_key=1638633600-0-0-54ee679894966aab0e9b96dc8ab82424",
  },
];

function Img({baseCmp}) {
  return (
    <>
      {imgs.map((item, index) => (
        <AddCmpWrapper
          key={"img" + index}
          baseCmp={baseCmp}
          value={item.src}
          id="111">
          <img src={item.src} alt="" />
        </AddCmpWrapper>
      ))}
    </>
  );
}
export default Img;
