import React, { useEffect } from "react";
import { ColorValue } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ProgressBar = ({
  color = "white",
  height = 2,
  percent = 0,
}: {
  color?: ColorValue;
  height?: number;
  percent: number;
}) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(percent, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [percent, width]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: color,
      height,
      width: `${width.value}%`,
      position: "absolute",
      zIndex: 1000,
      bottom: 0,
      right: 0,
      left: 0,
      shadowColor: "#000 ",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }),
    [width]
  );

  return <Animated.View style={animatedStyle} />;
};

export default ProgressBar;
