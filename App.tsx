import { View, Text, SafeAreaView, StyleSheet } from "react-native";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This first screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
