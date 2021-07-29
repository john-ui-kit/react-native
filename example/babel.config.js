/*
 * @LastEditTime: 2021-07-29 17:20:54
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
const path = require("path");
const pak = require("../package.json");

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // For development, we want to alias the library to the source
            [pak.name]: path.join(__dirname, "..", pak.source),
          },
        },
      ],
    ],
  };
};
