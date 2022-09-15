// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {"@primary-color": "#1DA57A"},
          },
        },
        modifyLessRule: function () {
          return {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              {loader: "style-loader"},
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64:6]",
                  },
                },
              },
              {loader: "less-loader"},
            ],
          };
        },
      },
    },
  ],

  devServer: {
    proxy: {
      "/api": {target: "//www.bubucuo.cn/", changeOrigin: true},
      "/all": {target: "//commom.pek3b.qingstor.com", changeOrigin: true},
    },
  },
};
