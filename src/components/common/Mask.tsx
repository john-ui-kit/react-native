/*
 * @LastEditTime: 2021-08-17 14:30:55
 * @Date: 2021-08-12 11:41:44
 * @Author: John
 * @LastEditors: John
 */
import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/native";
import type { ViewProps } from "react-native";

type MaskProps = {
  /**
   * @description 是否显示
   * @type {boolean}
   */
  show: boolean;
  /**
   * @description 遮罩层的透明度
   * @type {number}
   */
  maskOpct?: number;
} & ViewProps;
/**
 * @description 遮罩层
 * @param props
 * @returns
 */
const Mask: React.FunctionComponent<MaskProps> = (props) => {
  const { maskOpct = 0.1 } = props;
  const [show, setShow] = useState(props.show);
  /**
   * 动画样式使用useTransition
   */
  const maskTransitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  useEffect(() => {
    setShow(props.show);
    return () => {};
  }, [props.show]);
  /** 组件使用maskTransitions包装 */
  return maskTransitions((MaslStyleProps, item) => {
    return (
      item && (
        <animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: "rgba(0,0,0," + maskOpct + ")",
            ...MaslStyleProps,
          }}
          {...props}
        >
          {props.children}
        </animated.View>
      )
    );
  });
};

export default Mask;
