/*
 * @LastEditTime: 2021-08-11 16:35:30
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SliderBar,
  usePrompt,
  useTimer,
  RootSiblingParent,
} from "@john-ui-kit/react-native";
export default function App() {
  const prompt = usePrompt();
  const Timer = useTimer({ unit: "second" });
  useEffect(() => {
    Timer.start(10000);
    prompt.show({ content: "This is prompt!!" });
    return () => {};
  }, []);
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <SliderBar />
        <Text>
          {Timer.hour}:{Timer.minute}:{Timer.second}
        </Text>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </RootSiblingParent>
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
