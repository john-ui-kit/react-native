/*
 * @LastEditTime: 2021-08-12 15:43:14
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
    return () => {};
  }, []);
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Button
          title="show prompt1"
          onPress={() =>
            prompt.show({
              text: "This is prompt 1 !!",
              duration: 0,
              type: "error",
              maskOpct: 0.5,
              top: 50
            })
          }
        />
        <Button
          title="show prompt2"
          onPress={() =>
            prompt.show({
              text: "This is prompt 2 !!",
              duration: 5000,
              type: "warning",
              mask: false,
              position: "bottom",
              bottom: 20,
            })
          }
        />
        <Button title="hide prompt" onPress={prompt.hide} />
        {/* <SliderBar />
        <Text>
          {Timer.hour}:{Timer.minute}:{Timer.second}
        </Text>
        <Text>Open up App.js to start working on your app!</Text> */}
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
