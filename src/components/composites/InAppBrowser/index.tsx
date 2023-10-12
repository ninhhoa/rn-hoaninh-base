import React, { useState, useRef, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native";
import { WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import styles from "./styles";
import ProgressBar from "./ProgressBar";
interface BrowserProp {
  uri: string;
  title: string;
}

const InAppBrowserScreen = ({}: BrowserProp) => {
  const navigation = useNavigation();

  const webviewRef = useRef<WebView>(null);
  const route = useRoute<
    RouteProp<
      {
        params: BrowserProp;
      },
      "params"
    >
  >();
  const params = route.params;

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const renderTitle = useCallback(() => <Text>Title</Text>, [params?.title]);
  const renderLeft = useCallback(() => {
    return (
      <TouchableOpacity>
        <Image
          style={styles.retreshIcon}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx3E49fO15yB_s3AsMJtmnCDVi9pRkOqIBg&usqp=CAU",
          }}
        />
      </TouchableOpacity>
    );
  }, []);
  const renderRight = useCallback(
    () => (
      <TouchableOpacity
        style={styles.containerRefreshIcon}
        disabled={loading}
        onPress={onRefreshPress}
        hitSlop={{
          top: 20,
          bottom: 20,
          right: 20,
          left: 20,
        }}
      >
        <Image
          style={styles.retreshIcon}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx3E49fO15yB_s3AsMJtmnCDVi9pRkOqIBg&usqp=CAU",
          }}
        />
      </TouchableOpacity>
    ),
    [loading]
  );

  const _headerBackground = () => (
    <View style={styles.headerBackground}>
      {percent > 0 && <ProgressBar percent={percent} />}
    </View>
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: renderTitle,
      headerLeft: renderLeft,
      headerRight: renderRight,
      headerBackground: _headerBackground,
      headerStyle: {
        backgroundColor: "red",
      },
      headerTitleAlign: "center",
    });

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [
    navigation,
    params.title,
    loading,
    renderTitle,
    renderRight,
    renderLeft,
    _headerBackground,
  ]);

  const onLoadStart = () => {
    setLoading(true);
  };

  const onRefreshPress = () => {
    setLoading(true);
    webviewRef.current?.reload();
  };

  const onLoadEnd = () => {
    timeoutRef.current = setTimeout(() => {
      setPercent(0);
      setLoading(false);
    }, 2000);
  };

  const onLoadProgress = (event: WebViewProgressEvent) => {
    const { progress } = event.nativeEvent;
    const newProgress = progress * 100;
    if (newProgress > percent) {
      setPercent(newProgress);
    }
  };

  const renderLoading = () => <View style={styles.wait} pointerEvents="none" />;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: params.uri }}
        onShouldStartLoadWithRequest={() => true}
        mediaPlaybackRequiresUserAction
        allowsInlineMediaPlayback
        allowsFullscreenVideo={false}
        setSupportMultipleWindows={false}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onLoadProgress={onLoadProgress}
        renderLoading={renderLoading}
        originWhitelist={["*"]}
      />
    </SafeAreaView>
  );
};

export default InAppBrowserScreen;
