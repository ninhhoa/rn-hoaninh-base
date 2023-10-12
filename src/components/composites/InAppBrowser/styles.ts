import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    retreshIcon: { width: 24, tintColor: 'white', height: 24 },
    containerRefreshIcon: { paddingRight: 16 },
    wait: {
      flex: 1,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
    },
    headerBackground: {
      width: '100%',
      height: '100%',
      backgroundColor: "red",
    },
  });

export default styles;
