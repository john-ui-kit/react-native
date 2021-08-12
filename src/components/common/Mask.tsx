/*
 * @LastEditTime: 2021-08-12 14:02:19
 * @Date: 2021-08-12 11:41:44
 * @Author: John
 * @LastEditors: John
 */
import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/native";
import type { ViewProps } from "react-native";

type MaskProps = {
  show: boolean;
  maskOpct?: number;
} & ViewProps;
/**
 * 遮罩层
 * @param props
 * @returns
 */
const Mask: React.FunctionComponent<MaskProps> = (props) => {
  const { maskOpct = 0.1 } = props;
  const [show, setShow] = useState(props.show);
  const maskTransitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  useEffect(() => {
    setShow(props.show);
    return () => {};
  }, [props.show]);
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
