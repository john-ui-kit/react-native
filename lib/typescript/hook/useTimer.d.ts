import React from "react";
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
    slot?: React.FunctionComponent<{
        endTimestamp: number;
        countDown: number;
    } & TimeDate>;
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
declare const useTimer: (props: Props) => {
    start: (expiryTimestamp: number) => void;
    hour: string;
    second?: string | undefined;
    minute: string;
    endTimestamp: number;
    countDown: number;
};
export default useTimer;
