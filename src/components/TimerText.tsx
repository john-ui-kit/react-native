/*
 * @Author: John
 * @Date: 2021-06-30 15:53:03
 * @LastEditors: John
 * @LastEditTime: 2021-07-29 15:23:15
 */
import React, { useEffect, useMemo, useState } from 'react';

export default function TimerText(props: {
  unit: 'second' | 'minute';
  slot: React.FunctionComponent<{
    endTimestamp: number;
    countDown: number;
    hour: number;
    second?: number;
    minute: number;
  }>;
  expiryTimestamp: number;
}) {
  const { unit = 'second' } = props;
  // const [expiryTimestamp, setExpiryTimestamp] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const endTimestamp = useMemo(() => {
    if (unit == 'minute') {
      return new Date().getTime() + countDown * 1000 * 60;
    } else {
      return new Date().getTime() + countDown * 1000;
    }
  }, [countDown]);
  let timer: any = null;
  const timeDate = useMemo<{
    hour: number;
    second?: number;
    minute: number;
  }>(() => {
    if (unit == 'minute') {
      return {
        hour: parseInt(`${countDown / 60}`),
        minute: parseInt(`${countDown}`) % 60,
      };
    } else {
      return {
        hour: parseInt(`${countDown / 60 / 60}`),
        minute: parseInt(`${countDown / 60}`) % 60,
        second: parseInt(`${countDown % 60}`),
      };
    }
  }, [countDown, unit]);
  const start = () => {
    clearInterval(timer);

    let time: number = props.expiryTimestamp;
    let ms: number = 0;
    if (unit == 'second') {
      ms = 1000;
    } else if (unit == 'minute') {
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
  // const stop = () => {
  //   clearInterval(timer);
  //   setCountDown(0);
  //   // setExpiryTimestamp(0);
  // };
  useEffect(() => {
    start();
    return () => {
      clearInterval(timer);
    };
  }, [props.expiryTimestamp]);

  return <>{props.slot({ endTimestamp, countDown, ...timeDate })}</>;
}
