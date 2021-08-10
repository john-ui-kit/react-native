"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _utils = require("../utils");

/*
 * @Author: John
 * @Date: 2021-06-30 15:53:03
 * @LastEditors: John
 * @LastEditTime: 2021-08-10 15:54:15
 */
const useTimer = props => {
  /**
   * 倒计时基本单位，以秒或者分计时
   */
  const {
    unit = "second"
  } = props;
  /**
   * 倒计时计时数，秒或者分
   */

  const [countDown, setCountDown] = (0, _react.useState)(0);
  /**
   * 结束时间的时间戳
   */

  const endTimestamp = (0, _react.useMemo)(() => {
    if (unit == "minute") {
      return new Date().getTime() + countDown * 1000 * 60;
    } else {
      return new Date().getTime() + countDown * 1000;
    }
  }, [countDown]);
  /**
   * 定时器
   */

  let timer = null;
  /**
   * 对外使用的时分秒转换数据
   */

  const timeDate = (0, _react.useMemo)(() => {
    if (unit == "minute") {
      return {
        hour: (0, _utils.zeroSupple)(parseInt(`${countDown / 60}`)),
        minute: (0, _utils.zeroSupple)(parseInt(`${countDown}`) % 60)
      };
    } else {
      return {
        hour: (0, _utils.zeroSupple)(parseInt(`${countDown / 60 / 60}`)),
        minute: (0, _utils.zeroSupple)(parseInt(`${countDown / 60}`) % 60),
        second: (0, _utils.zeroSupple)(parseInt(`${countDown % 60}`))
      };
    }
  }, [countDown, unit]);
  /**
   * 倒计时开始
   */

  const start = expiryTimestamp => {
    let time = expiryTimestamp;
    let ms = 0;

    if (unit == "second") {
      ms = 1000;
    } else if (unit == "minute") {
      ms = 1000 * 60;
    }

    setCountDown(time);
    timer = setInterval(() => {
      if (time == 0) {
        clearInterval(timer);
        return;
      }

      time--;
      setCountDown(time);
    }, ms);
  };
  /**
   * 重置倒计时
   * @param expiryTimestamp
   */


  const reset = expiryTimestamp => {
    clearInterval(timer);
    start(expiryTimestamp);
  };

  (0, _react.useEffect)(() => {
    clearInterval(timer);
    return () => {};
  }, []);
  return {
    endTimestamp,
    countDown,
    ...timeDate,
    start,
    reset
  };
};

var _default = useTimer;
exports.default = _default;
//# sourceMappingURL=useTimer.js.map