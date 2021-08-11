/*
 * @LastEditTime: 2021-08-11 10:33:48
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SliderBar, useTimer } from "@john-ui-kit/react-native";
export default function App() {
  const Timer = useTimer({ unit: "second" });
  useEffect(() => {
    Timer.start(10000);
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <SliderBar />
      <Text>
        {Timer.hour}:{Timer.minute}:{Timer.second}
      </Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238, 238, 238, 1.000)",
    alignItems: "center",
    justifyContent: "center",
  },
});
