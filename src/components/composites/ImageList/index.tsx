import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { Dimensions, Animated } from "react-native";
import { FlatListProps } from "react-native";
import { ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ZoomableImage from "./ZoomableImage";
import ExpandingDot, { ExpandingDotProps } from "./ExpandingDot";

export interface IImageListProps
  extends Omit<FlatListProps<any>, "renderItem"> {
  containerStyle?: ViewStyle;
  data: Array<any>;
  expandingDotProps?: ExpandingDotProps;
}

export interface FlatListInfo {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

const ImageList = (props: IImageListProps, ref: any) => {
  const { width, height } = Dimensions.get("screen");
  
  const { data, expandingDotProps } = props;
  const flatListRef = useRef<FlatList>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const _renderItem = useCallback(({ item }: any) => {
    return (
      <ZoomableImage style={{ width: width, height: height }} uri={item} />
    );
  }, []);

  const _onScrollToIndexFailed = useCallback(
    (info: FlatListInfo) => {
      const wait = new Promise((resolve) => setTimeout(resolve, 500));

      wait.then(() => {
        flatListRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
        });
      });
    },
    [flatListRef]
  );

  useImperativeHandle(ref, () => {});

  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        onScroll={_onScroll}
        scrollEventThrottle={16}
        snapToAlignment={"center"}
        decelerationRate={"normal"}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={_onScrollToIndexFailed}
        {...props}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(index) => index}
      />

      <ExpandingDot
        expandingDotWidth={10}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: "#347af0",
          borderRadius: 5,
        }}
        containerStyle={{
          bottom: 80,
        }}
        {...expandingDotProps}
        data={data}
        scrollX={scrollX}
      />
    </>
  );
};

export default memo(forwardRef(ImageList));
