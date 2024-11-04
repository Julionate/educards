// icon:icon-cheveron-right | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { cssInterop } from "nativewind";
cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true },
  },
});

function PointerRight(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path d="M9.3 8.7a1 1 0 011.4-1.4l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4l3.29-3.3-3.3-3.3z" />
    </Svg>
  );
}

export default PointerRight;
