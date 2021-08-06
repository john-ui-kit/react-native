/*
 * @Author: John
 * @Date: 2021-06-30 15:53:03
 * @LastEditors: John
 * @LastEditTime: 2021-08-06 15:26:55
 */
import { useMemo, useState } from "react";
import { zeroSupple } from "../utils";

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

  const [countDown, setCountDown] = useState(0);
  /**
   * 结束时间的时间戳
   */

  const endTimestamp = useMemo(() => {
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

  const timeDate = useMemo(() => {
    if (unit == "minute") {
      return {
        hour: zeroSupple(parseInt(`${countDown / 60}`)),
        minute: zeroSupple(parseInt(`${countDown}`) % 60)
      };
    } else {
      return {
        hour: zeroSupple(parseInt(`${countDown / 60 / 60}`)),
        minute: zeroSupple(parseInt(`${countDown / 60}`) % 60),
        second: zeroSupple(parseInt(`${countDown % 60}`))
      };
    }
  }, [countDown, unit]);
  /**
   * 倒计时开始
   */

  const start = expiryTimestamp => {
    clearInterval(timer);
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

  return {
    endTimestamp,
    countDown,
    ...timeDate,
    start
  };
};

export default useTimer;
//# sourceMappingURL=useTimer.js.map