import React from "react";
/**
 * 传值
 */
declare type SliderBarProps = {
    max?: number;
    min?: number;
    step?: number;
    value?: number;
    onChange?: (num: number) => void;
    onPanResponderRelease?: (num: number) => void;
    onPanResponderMove?: (num: number) => void;
    resetValue?: (reset: (value: number) => void) => void;
    finalChange?: (num: number) => void;
};
/**
 * 对外导出控制方法
 */
export declare type SliderBarRef = {
    setValue: (num: number) => void;
};
declare const _default: React.ForwardRefExoticComponent<SliderBarProps & React.RefAttributes<SliderBarRef>>;
export default _default;
