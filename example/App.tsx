/*
 * @LastEditTime: 2021-07-30 16:25:06
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { SliderBar, TimerText } from "@john-ui-kit/react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <SliderBar />
      <TimerText
        unit="second"
        slot={({ second }) => <Text>{second}</Text>}
        expiryTimestamp={10}
      />
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
