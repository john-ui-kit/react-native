/*
 * @Author: John
 * @Date: 2021-07-02 17:02:23
 * @LastEditors: John
 * @LastEditTime: 2021-08-12 14:15:49
 */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTransition, animated } from "@react-spring/native";
import RootSiblings from "react-native-root-siblings";
import { Text, ViewStyle } from "react-native";
import IconFont from "../assets/iconfont";
import Mask from "../components/common/Mask";

/**
 * @description 提示hook
 * @export
 * @returns
 */
export default function usePrompt() {
  /**
   * siblingRef
   */
  let siblingRef = useRef<RootSiblings | null>();
  /**
   * PromptComponentRef
   */
  let PromptComponentRef = useRef<PromptComponentRef>(null);

  /**
   * 显示
   * @param param0
   */
  const show = (props: Omit<PromptComponentProps, "show">) => {
    hide();
    const {
      duration = 5000,
      type = "info",
      mask = true,
      position = "top",
      width = 300,
      clickMaskClose = true,
    } = props;
    siblingRef.current = new RootSiblings(
      (
        <PromptComponent
          ref={PromptComponentRef}
          show={true}
          duration={duration}
          type={type}
          mask={mask}
          position={position}
          width={width}
          clickMaskClose={clickMaskClose}
          {...props}
        />
      )
    );
  };

  /**
   * 隐藏
   */
  const hide = () => {
    if (siblingRef.current) {
      PromptComponentRef.current?.setShow(false);
    }
  };

  return {
    show,
    hide,
  };
}

type PromptComponentProps = {
  /**
   * @description promt提示文案
   * @type {string}
   * @memberof PromptComponentProps
   */
  text: string;
  /**
   * @description promt开关标识
   * @type {boolean}
   * @memberof PromptComponentProps
   */
  show: boolean;
  /**
   * @description 显示时间, 毫秒。设为 0 则不会自动关闭，默认5000
   * @type {number}
   * @memberof PromptComponentProps
   */
  duration?: number;

  /**
   * @description prompt类型
   * @type {("error" | "info" | "success" | "warning" | "question")}
   * @memberof PromptComponentProps
   */
  type?: "error" | "info" | "success" | "warning" | "question";
  /**
   * @description 宽度
   * @type {number}
   */
  width?: number;

  /**
   * @description 是否显示遮罩层，默认true
   * @type {boolean}
   * @memberof PromptComponentProps
   */
  mask?: boolean;

  /**
   * @description 点击mask是否可以关闭
   * @type {boolean}
   */
  clickMaskClose?: boolean;

  maskOpct?: number;

  /**
   * @description 位置
   * @type {("top" | "bottom")}
   * @memberof PromptComponentProps
   */
  position?: "top" | "bottom";
} & Pick<ViewStyle, "top" | "bottom">;
interface PromptComponentRef {
  /**
   * @description 设置show
   * @memberof PromptComponentRef
   */
  setShow: (val: boolean) => void;
}
/**
 * prompt组件
 * @param props
 * @param ref
 * @returns
 */
const PromptComponent = forwardRef<PromptComponentRef, PromptComponentProps>(
  (props, ref) => {
    const [show, setShow] = useState(props.show);
    let fromStyle: ViewStyle = {};
    let enterStyle: ViewStyle = {};
    let leaveStyle: ViewStyle = {};
    switch (props.position) {
      case "top":
        fromStyle = { opacity: 0, top: 0 };
        enterStyle = {
          opacity: 1,
          top: typeof props.top == "undefined" ? 70 : props.top,
        };
        leaveStyle = { opacity: 0, top: 0 };
        break;
      case "bottom":
        fromStyle = { opacity: 0, bottom: 0 };
        enterStyle = {
          opacity: 1,
          bottom: typeof props.bottom == "undefined" ? 70 : props.bottom,
        };
        leaveStyle = { opacity: 0, bottom: 0 };
        break;
      default:
        break;
    }
    const transitions = useTransition(show, {
      from: fromStyle as any,
      enter: enterStyle,
      leave: leaveStyle,
    });

    useEffect(() => {
      console.log("组件初始化");
      if (props.duration == 0) return;
      const timer = setTimeout(() => {
        setShow(false);
      }, props.duration);
      return () => {
        clearTimeout(timer);
      };
    }, []);
    useImperativeHandle(
      ref,
      () => {
        return {
          setShow,
        };
      },
      []
    );
    const content = transitions((styleProps, item) => {
      return (
        item && (
          <animated.View
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: props.width ? -props.width / 2 : 100,
              width: props.width || 100,
              backgroundColor: "#E8E8E8",
              borderRadius: 18,
              paddingHorizontal: 14,
              paddingVertical: 8,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              // marginHorizontal: 20,
              marginTop: 6,
              ...styleProps,
            }}
          >
            {props.type == "warning" && (
              <IconFont
                name="warning"
                color="rgba(220, 165, 81, 1.000)"
                size={20}
                style={{ marginRight: 8 }}
              />
            )}
            {props.type == "success" && (
              <IconFont
                name="success"
                color="rgba(132, 195, 89, 1.000)"
                size={20}
                style={{ marginRight: 8 }}
              />
            )}
            {props.type == "error" && (
              <IconFont
                name="error"
                color="rgba(228, 116, 112, 1.000)"
                size={20}
                style={{ marginRight: 8 }}
              />
            )}
            {props.type == "info" && (
              <IconFont name="info" size={20} style={{ marginRight: 8 }} />
            )}
            <Text
              style={{
                fontSize: 14,
                color: "#464646",
                lineHeight: 23,
                width: 279,
              }}
              numberOfLines={2}
            >
              {props.text}
            </Text>
          </animated.View>
        )
      );
    });

    return (
      <>
        {props.mask && (
          <Mask
            show={show!}
            maskOpct={props.maskOpct}
            onTouchEnd={() => props.clickMaskClose && setShow(false)}
          >
            {content}
          </Mask>
        )}
        {!props.mask && content}
      </>
    );
  }
);
