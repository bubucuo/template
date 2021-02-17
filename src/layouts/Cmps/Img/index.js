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
  {
    src:
      "https://img.tusij.com/ips_asset/15/48/39/56/74/56/564896077cb72510ff3b920732d8c53c.png!l800_i_w?auth_key=1639152000-0-0-456d31b72cda757ae3945425296bd646",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/15/48/39/56/79/2c/2ce035569e9220b4ca27c2d29f52977e.png!l800_i_w?auth_key=1639152000-0-0-6f62548d215a0bcc4548f6dacf9b88f9",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/15/48/39/56/78/3f/3f1b670ab744dc8c895b3483e4fe7bfe.png!l800_i_w?auth_key=1639152000-0-0-5ad0647faf411b341c9f9e8d5b88b2f8",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/15/48/39/56/74/7f/7f0b45e3009c7a22a0708415582d4635.png!l800_i_w?auth_key=1639152000-0-0-1b204be366ee0b8c146485295b52704f",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/a5/a57d2950001941a5e65fc3ac73fe8cb8.png!l800_i_w?auth_key=1639324800-0-0-d94f8946bfa0f7eca8fc8094a1516003",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/ca/ca7ebd1a9683109e61f374e75e87fc85.png!l800_i_w?auth_key=1639324800-0-0-04d5239353f80379a2430dc74d1ac11a",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/81/817e24206d89b50b1a272e540a1327e2.png!l800_i_w?auth_key=1639324800-0-0-00e8765293718d01e5e587ab3e3ccebe",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/97/97f4e9dff78ddd473ef53358c0602e79.png!l800_i_w?auth_key=1639324800-0-0-2b8c1e3809b681a8e7f021aae0969a24s",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/5a/5aac2e49feeb917d0071a29126964010.png!l800_i_w?auth_key=1639324800-0-0-fa311768fea7460b62100c4e6366a2e4",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/9a/9a353760e02b49cbdd2706f5c452291b.png!l800_i_w?auth_key=1639324800-0-0-8825104eb9f4bd5ca42b9ff8c3690c9c",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/69/6917ec339fa98e4cb97cf596cc9179df.png!l800_i_w?auth_key=1639324800-0-0-31958bfca526c4f4f87f4363b8b16b61",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/53/e7/e722646ec5596c852c8b193b2ef09db9.png!l800_i_w?auth_key=1639324800-0-0-0e5dcd8e08ad1e7f0de72c2dad23419c",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/ae/aefd66a218248c11f5652ef1a6e64b19.png!l800_i_w?auth_key=1639324800-0-0-2a91660153714f43bf6087c3c800f17b",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/09/09917bf7e35711c91d353fd7aebf2a38.png!l800_i_w?auth_key=1639324800-0-0-bd838424e74c24b3f0787ae4c4fb11d6",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/ab/ab06c00c974c83828a1ec4efb5bca2bf.png!l800_i_w?auth_key=1639324800-0-0-65182ed5f3ed55503bbfb02fb65b4663",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/2f/2f47210c3a3a60f638c90bece9d3d652.png!l800_i_w?auth_key=1639324800-0-0-64b996c5eb42ca445dda4264c4ac0217",
  },
  {
    src:
      "https://img.tusij.com/ips_asset/16/11/10/44/54/70/70913bd41742596a4a0dd68b088e6551.png!l800_i_w?auth_key=1639324800-0-0-2a8cd9567a9d2a9aa2ddd8acc4a24450",
  },
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpfp4bgkuj30ci06f3z7.jpg"},
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpg3t1gy6j306k064ta5.jpg"},
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpg4knu60j306g064q4f.jpg"},
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpg59i3iuj306g02odgp.jpg"},
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpge0978dj304004idg6.jpg"},
  {
    src:
      "https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/baike/pic/item/c995d143ad4bd1139851712355afa40f4bfb0507.jpg",
  },
  {src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnpgfjsjm4j30cg0cwjw1.jpg"},
  {
    src: "https://tva1.sinaimg.cn/large/008eGmZEly1gnqdhx1eprj303m03mjrm.jpg",
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
