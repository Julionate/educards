// icon:icon-cheveron-left | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { cssInterop } from "nativewind";
cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true },
  },
});

function PointerLeft(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path d="M14.7 15.3a1 1 0 01-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 1.4L11.42 12l3.3 3.3z" />
    </Svg>
  );
}

export default PointerLeft;
