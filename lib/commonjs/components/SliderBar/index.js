"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _images = _interopRequireDefault(require("../../assets/images"));

var _reactNativeLinearGradient = _interopRequireDefault(require("react-native-linear-gradient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SliderBar = (props, ref) => {
  const {
    sliderDefaultWidth = 210
  } = props;
  /**
   * 滑块按钮滑动的位置
   */

  const [sliderbtnDistance, setSliderbtnDistance] = (0, _react.useState)(0);
  /**
   * 按钮是否正在滑动
   */

  const [sliderBtnMoving, setSliderBtnMoving] = (0, _react.useState)(false);
  /**
   * 滑块按钮的宽度
   */

  const sliderBtnWidth = (0, _react.useRef)(32);
  /**
   * 滑块的宽度
   */

  const sliderWidth = (0, _react.useRef)(sliderDefaultWidth - 20);
  /**
   * 默认值
   */

  const {
    max = 100,
    min = 0,
    step = 1,
    value = min
  } = props;
  /**
   * 对外导出的持久化数据num
   */

  let finalNumRef = (0, _react.useRef)(0);
  /**
   * 滑块的步长
   */

  const sliderStep = (0, _react.useMemo)(() => step / (max - min) * sliderWidth.current, [step, sliderWidth]);
  /**
   * 根据传值转换为滑块的滑动距离
   * @param v
   * @returns
   */

  const valueToSliderDistance = v => {
    return (v - min) / step * sliderStep;
  };
  /**
   * 滑块变化
   * @param num
   * @returns
   */


  const changeSliderDistance = num => {
    return new Promise(reslove => {
      let distance = num;

      if (num <= 0) {
        distance = 0;
      }

      if (num >= sliderWidth.current) {
        distance = sliderWidth.current;
      }

      const percentage = 100 / sliderWidth.current * distance;
      finalNumRef.current = parseInt((percentage / 100 * (max - min) + min).toFixed(0));
      setSliderbtnDistance(distance);
      reslove();
    });
  };
  /**
   * sliderBtn滑动响应
   */


  const SliderBtnResponder = _reactNative.PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      var _props$onPanResponder;

      // 最近一次的移动距离为gestureState.move{X,Y}
      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      changeSliderDistance(sliderbtnDistance + gestureState.dx);
      setSliderBtnMoving(true);
      (_props$onPanResponder = props.onPanResponderMove) === null || _props$onPanResponder === void 0 ? void 0 : _props$onPanResponder.call(props, finalNumRef.current);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: () => {
      var _props$finalChange;

      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      console.log("滑动结束");
      setSliderBtnMoving(false); // props.onPanResponderRelease?.(finalNum);

      (_props$finalChange = props.finalChange) === null || _props$finalChange === void 0 ? void 0 : _props$finalChange.call(props, finalNumRef.current);
    },
    onPanResponderTerminate: () => {// 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onShouldBlockNativeResponder: () => {
      // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
      // 默认返回true。目前暂时只支持android。
      return true;
    }
  });
  /**
   * slider滑动响应
   */


  const SliderResponder = _reactNative.PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: evt => {
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      changeSliderDistance(evt.nativeEvent.locationX);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: () => {
      var _props$finalChange2;

      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      console.log("滑动结束");
      setSliderBtnMoving(false); // props.onPanResponderRelease?.(finalNum);

      (_props$finalChange2 = props.finalChange) === null || _props$finalChange2 === void 0 ? void 0 : _props$finalChange2.call(props, finalNumRef.current);
    },
    onPanResponderTerminate: () => {// 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onShouldBlockNativeResponder: () => {
      // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
      // 默认返回true。目前暂时只支持android。
      return true;
    }
  });
  /**
   * 父组件控制子组件回调
   */


  (0, _react.useImperativeHandle)(ref, () => {
    return {
      setValue(v) {
        console.log("调用子组件");
        changeSliderDistance(valueToSliderDistance(v));
      }

    };
  });
  (0, _react.useEffect)(() => {
    var _props$onChange;

    console.log("======", finalNumRef.current);
    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, finalNumRef.current);
    return () => {};
  }, [finalNumRef.current]);
  /**
   * 初始化
   */

  (0, _react.useEffect)(() => {
    var _props$resetValue;

    changeSliderDistance(valueToSliderDistance(value));
    (_props$resetValue = props.resetValue) === null || _props$resetValue === void 0 ? void 0 : _props$resetValue.call(props, v => {
      changeSliderDistance(valueToSliderDistance(v));
    });
    return () => {};
  }, [value, sliderStep, step]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 37,
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, SliderResponder.panHandlers, {
    style: {
      width: sliderDefaultWidth,
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
      marginRight: 16
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 0
    },
    colors: ["#F0A64D", "#F78240"],
    style: {
      width: sliderbtnDistance,
      // 滑块按钮距离左边的距离
      height: 10,
      borderRadius: 5
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, SliderBtnResponder.panHandlers, {
    style: {
      position: "absolute",
      left: sliderbtnDistance,
      transform: [{
        scale: sliderBtnMoving ? 1.2 : 1
      }]
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      opacity: sliderBtnMoving ? 1 : 0,
      position: "absolute",
      top: -24,
      left: -((35 - sliderBtnWidth.current) / 2),
      width: 35,
      height: 24
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: {
      position: "absolute",
      left: 0,
      top: 0
    },
    source: _images.default.bubble
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 14,
      lineHeight: 20,
      color: "#fff",
      width: "100%",
      textAlign: "center"
    }
  }, `${finalNumRef.current}`)), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: _images.default.slider_btn
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      changeSliderDistance(sliderbtnDistance - sliderStep).then(() => {
        var _props$finalChange3;

        return (_props$finalChange3 = props.finalChange) === null || _props$finalChange3 === void 0 ? void 0 : _props$finalChange3.call(props, finalNumRef.current);
      });
    },
    style: {
      marginRight: 9
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: _images.default.slider_icon_left
  })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      changeSliderDistance(sliderbtnDistance + sliderStep).then(() => {
        var _props$finalChange4;

        return (_props$finalChange4 = props.finalChange) === null || _props$finalChange4 === void 0 ? void 0 : _props$finalChange4.call(props, finalNumRef.current);
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: _images.default.slider_icon_right
  }))));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(SliderBar);

exports.default = _default;
//# sourceMappingURL=index.js.map