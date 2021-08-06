/*
 * @LastEditTime: 2021-08-06 15:30:52
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { SliderBar, useTimer } from "@john-ui-kit/react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export default function App() {
  const [expriyTimes, setExpriyTimes] = useState(5 * 60 * 60);
  const { hour, minute, second, start } = useTimer({
    expiryTimestamp: expriyTimes,
    unit: "second",
  });

  useEffect(() => {
    start(expriyTimes);
    setTimeout(() => {
      start(10 * 60 * 60);
    }, 5000);
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      {/* <SliderBar /> */}
      <Text>{`${hour}:${minute}:${second}`}</Text>
      <Button title={`${hour}:${minute}:${second}`} onPress={() => {}} />
      {/* <TimerText
        unit="minute"
        slot={({ hour, minute, second }) => <Text>{`${hour}:${minute}`}</Text>}
        expiryTimestamp={5}
      /> */}
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
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
