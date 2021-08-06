"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroSupple = zeroSupple;

/*
 * @LastEditTime: 2021-08-02 14:25:50
 * @Date: 2021-08-02 14:25:39
 * @Author: John
 * @LastEditors: John
 */

/**
 * @description 数字补零
 * @export
 * @param {number} num
 * @returns {string}
 */
function zeroSupple(num) {
  if (num < 10) return `0${num}`;
  return `${num}`;
}
//# sourceMappingURL=index.js.map