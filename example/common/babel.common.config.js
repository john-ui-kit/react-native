/*
 * @LastEditTime: 2021-08-06 15:39:38
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
const path = require("path");
const pak = require("../../package.json");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // For development, we want to alias the library to the source
            [pak.name]: path.join(__dirname, "../../src/index"),
          },
        },
      ],
    ],
  };
};
