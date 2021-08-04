/*
 * @Author: John
 * @Date: 2021-06-30 15:53:03
 * @LastEditors: John
 * @LastEditTime: 2021-08-04 09:51:00
 */
import React, { useEffect, useMemo, useState } from "react";
import { zeroSupple } from "../utils";

interface Props {
  /**
   * @description 倒计时基本单位
   * @type {("second" | "minute")}
   * @memberof Props
   */
  unit: "second" | "minute";
  /**
   * @description 插槽slot
   * @type {(React.FunctionComponent<{
   *     endTimestamp: number;
   *     countDown: number;
   *   } & TimeDate>)}
   * @memberof Props
   */
  slot?: React.FunctionComponent<
    {
      endTimestamp: number;
      countDown: number;
    } & TimeDate
  >;
  /**
   * @description 传入的开始时间戳
   * @type {number}
   * @memberof Props
   */
  expiryTimestamp: number;
}

/**
 * @description 对外使用的时间数据
 * @interface TimeDate
 */
interface TimeDate {
  hour: string;
  second?: string;
  minute: string;
}

const useTimer = (props: Props) => {
  /**
   * 倒计时基本单位，以秒或者分计时
   */
  const { unit = "second" } = props;
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
  let timer: any = null;
  /**
   * 对外使用的时分秒转换数据
   */
  const timeDate = useMemo<TimeDate>(() => {
    if (unit == "minute") {
      return {
        hour: zeroSupple(parseInt(`${countDown / 60}`)),
        minute: zeroSupple(parseInt(`${countDown}`) % 60),
      };
    } else {
      return {
        hour: zeroSupple(parseInt(`${countDown / 60 / 60}`)),
        minute: zeroSupple(parseInt(`${countDown / 60}`) % 60),
        second: zeroSupple(parseInt(`${countDown % 60}`)),
      };
    }
  }, [countDown, unit]);
  /**
   * 倒计时开始
   */
  const start = (expiryTimestamp: number) => {
    clearInterval(timer);

    let time: number = expiryTimestamp;
    let ms: number = 0;
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

  // useEffect(() => {
  //   start();
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [props.expiryTimestamp]);

  // return <>{props.slot({ endTimestamp, countDown, ...timeDate })}</>;
  return { endTimestamp, countDown, ...timeDate, start };
};

export default useTimer;
