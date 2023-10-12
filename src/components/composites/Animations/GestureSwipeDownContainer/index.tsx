import React, { memo } from 'react';
import { Dimensions } from 'react-native';
import { ViewStyle } from 'react-native';
import { ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface IGestureSwipeDownContainerProps extends ViewProps {
  onFinish?: Function;
  style?: ViewStyle;
}
const GestureSwipeDownContainer = (props: IGestureSwipeDownContainerProps) => {
  const { height } = Dimensions.get('screen');
  const top = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    top: interpolate(top.value, [0, height / 2], [0, height / 4]),
    opacity: interpolate(top.value, [0, height / 2], [1, 0]),
  }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const { translationY } = event;

      if (translationY > 0) {
        top.value = translationY;
      }
    })
    .onFinalize((event) => {
      const { translationY } = event;

      if (translationY > height / 4) {
        top.value = withTiming(height);

        requestAnimationFrame(() => {
          if (props?.onFinish) {
            props.onFinish();
          }
        });
      } else {
        top.value = withTiming(0);
      }
    })
    .averageTouches(true)
    .activeOffsetY(40)
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[animatedStyle, props?.style]}
      >
        {props?.children && props?.children}
      </Animated.View>
    </GestureDetector>
  );
};

export default memo(GestureSwipeDownContainer);
