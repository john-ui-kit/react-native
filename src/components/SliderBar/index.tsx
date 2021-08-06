import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Image, PanResponder, Text } from "react-native";
import IMAGES_ASSETS from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
/**
 * 传值
 */
type SliderBarProps = {
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
export type SliderBarRef = {
  setValue: (num: number) => void;
};
const SliderBar: React.ForwardRefRenderFunction<SliderBarRef, SliderBarProps> =
  (props, ref) => {
    /**
     * 滑块按钮滑动的位置
     */
    const [sliderbtnDistance, setSliderbtnDistance] = useState(0);
    /**
     * 按钮是否正在滑动
     */
    const [sliderBtnMoving, setSliderBtnMoving] = useState(false);
    /**
     * 滑块按钮的宽度
     */
    const sliderBtnWidth = useRef<number>(32);
    /**
     * 滑块的宽度
     */
    const sliderWidth = useRef<number>(210 - sliderBtnWidth.current);
    /**
     * 默认值
     */
    const { max = 100, min = 0, step = 1, value = min } = props;
    /**
     * 对外导出的持久化数据num
     */
    let finalNumRef = useRef<number>(0);
    /**
     * 滑块的步长
     */
    const sliderStep = useMemo(
      () => (step / (max - min)) * sliderWidth.current,
      [step, sliderWidth]
    );

    /**
     * 根据传值转换为滑块的滑动距离
     * @param v
     * @returns
     */
    const valueToSliderDistance = (v: number) => {
      return ((v - min) / step) * sliderStep;
    };

    /**
     * 滑块变化
     * @param num
     * @returns
     */
    const changeSliderDistance = (num: number) => {
      return new Promise<void>((reslove) => {
        let distance: number = num;
        if (num <= 0) {
          distance = 0;
        }
        if (num >= sliderWidth.current) {
          distance = sliderWidth.current;
        }
        const percentage = (100 / sliderWidth.current) * distance;
        finalNumRef.current = parseInt(
          ((percentage / 100) * (max - min) + min).toFixed(0)
        );
        setSliderbtnDistance(distance);
        reslove();
      });
    };

    /**
     * sliderBtn滑动响应
     */
    const SliderBtnResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        changeSliderDistance(sliderbtnDistance + gestureState.dx);
        setSliderBtnMoving(true);
        props.onPanResponderMove?.(finalNumRef.current);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        console.log("滑动结束");
        setSliderBtnMoving(false);
        // props.onPanResponderRelease?.(finalNum);
        props.finalChange?.(finalNumRef.current);
      },
      onPanResponderTerminate: () => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: () => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });

    /**
     * slider滑动响应
     */
    const SliderResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (evt) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        changeSliderDistance(evt.nativeEvent.locationX);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        console.log("滑动结束");
        setSliderBtnMoving(false);
        // props.onPanResponderRelease?.(finalNum);
        props.finalChange?.(finalNumRef.current);
      },
      onPanResponderTerminate: () => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: () => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });

    /**
     * 父组件控制子组件回调
     */
    useImperativeHandle(ref, () => {
      return {
        setValue(v) {
          console.log("调用子组件");
          changeSliderDistance(valueToSliderDistance(v));
        },
      };
    });

    useEffect(() => {
      console.log("======", finalNumRef.current);
      props.onChange?.(finalNumRef.current);
      return () => {};
    }, [finalNumRef.current]);

    /**
     * 初始化
     */
    useEffect(() => {
      changeSliderDistance(valueToSliderDistance(value));
      props.resetValue?.((v) => {
        changeSliderDistance(valueToSliderDistance(v));
      });
      return () => {};
    }, [value, sliderStep, step]);

    return (
      <View
        style={{
          marginTop: 37,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* 滑块组件 */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* 滑块底部组件 */}
          <View
            {...SliderResponder.panHandlers}
            style={{
              width: 210,
              height: 22,
              backgroundColor: "#F8F8F8",
              borderRadius: 11,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "#fff",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 6,
              position: "relative",
              marginRight: 16,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#F0A64D", "#F78240"]}
              style={{
                width: sliderbtnDistance, // 滑块按钮距离左边的距离
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
          {/* 滑块按钮组件 */}
          <View
            {...SliderBtnResponder.panHandlers}
            style={{
              position: "absolute",
              left: sliderbtnDistance,
              transform: [{ scale: sliderBtnMoving ? 1.2 : 1 }],
            }}
          >
            <View
              style={{
                opacity: sliderBtnMoving ? 1 : 0,
                position: "absolute",
                top: -24,
                left: -((35 - sliderBtnWidth.current) / 2),
                width: 35,
                height: 24,
              }}
            >
              <Image
                style={{ position: "absolute", left: 0, top: 0 }}
                source={IMAGES_ASSETS.bubble}
              />

              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#fff",
                  width: "100%",
                  textAlign: "center",
                }}
              >{`${finalNumRef.current}`}</Text>
            </View>
            <Image source={IMAGES_ASSETS.slider_btn} />
          </View>
        </View>
        {/* 滑块加减组件 */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            onTouchStart={() => {
              changeSliderDistance(sliderbtnDistance - sliderStep).then(() =>
                props.finalChange?.(finalNumRef.current)
              );
            }}
            style={{ marginRight: 9 }}
          >
            <Image source={IMAGES_ASSETS.slider_icon_left} />
          </View>
          <View
            onTouchStart={() => {
              changeSliderDistance(sliderbtnDistance + sliderStep).then(() =>
                props.finalChange?.(finalNumRef.current)
              );
            }}
          >
            <Image source={IMAGES_ASSETS.slider_icon_right} />
          </View>
        </View>
      </View>
    );
  };

export default forwardRef(SliderBar);
