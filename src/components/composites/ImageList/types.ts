import type {
    ActivityIndicatorProps,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
  } from 'react-native';
  import { FastImageProps } from 'react-native-fast-image';
  
  export type ZoomableImageProps = Omit<FastImageProps, 'source'> & {
    uri: string;
    minScale?: number;
    maxScale?: number;
    minPanPointers?: number;
    maxPanPointers?: number;
    isPanEnabled?: boolean;
    isPinchEnabled?: boolean;
    onInteractionStart?: Function;
    onInteractionEnd?: Function;
    onPinchStart?: Function;
    onPinchEnd?: Function;
    onPanStart?: Function;
    onPanEnd?: Function;
    containerStyle?: StyleProp<ViewStyle>;
    imageContainerStyle?: StyleProp<ViewStyle>;
    activityIndicatorProps?: ActivityIndicatorProps;
    renderLoader?: Function;
    source?: ImageSourcePropType;
  };
  
