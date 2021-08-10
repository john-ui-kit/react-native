interface Props {
    /**
     * @description 倒计时基本单位
     * @type {("second" | "minute")}
     * @memberof Props
     */
    unit: "second" | "minute";
}
declare const useTimer: (props: Props) => {
    start: (expiryTimestamp: number) => void;
    reset: (expiryTimestamp: number) => void;
    hour: string;
    second?: string | undefined;
    minute: string;
    endTimestamp: number;
    countDown: number;
};
export default useTimer;
