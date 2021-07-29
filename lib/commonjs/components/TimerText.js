"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimerText;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * @Author: John
 * @Date: 2021-06-30 15:53:03
 * @LastEditors: John
 * @LastEditTime: 2021-07-29 15:23:15
 */
function TimerText(props) {
  const {
    unit = 'second'
  } = props; // const [expiryTimestamp, setExpiryTimestamp] = useState(0);

  const [countDown, setCountDown] = (0, _react.useState)(0);
  const endTimestamp = (0, _react.useMemo)(() => {
    if (unit == 'minute') {
      return new Date().getTime() + countDown * 1000 * 60;
    } else {
      return new Date().getTime() + countDown * 1000;
    }
  }, [countDown]);
  let timer = null;
  const timeDate = (0, _react.useMemo)(() => {
    if (unit == 'minute') {
      return {
        hour: parseInt(`${countDown / 60}`),
        minute: parseInt(`${countDown}`) % 60
      };
    } else {
      return {
        hour: parseInt(`${countDown / 60 / 60}`),
        minute: parseInt(`${countDown / 60}`) % 60,
        second: parseInt(`${countDown % 60}`)
      };
    }
  }, [countDown, unit]);

  const start = () => {
    clearInterval(timer);
    let time = props.expiryTimestamp;
    let ms = 0;

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
  }; // const stop = () => {
  //   clearInterval(timer);
  //   setCountDown(0);
  //   // setExpiryTimestamp(0);
  // };


  (0, _react.useEffect)(() => {
    start();
    return () => {
      clearInterval(timer);
    };
  }, [props.expiryTimestamp]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.slot({
    endTimestamp,
    countDown,
    ...timeDate
  }));
}
//# sourceMappingURL=TimerText.js.map