/*
 * @LastEditTime: 2021-08-02 15:25:28
 * @Date: 1985-10-26 16:15:00
 * @Author: John
 * @LastEditors: John
 */
import { SliderBar, TimerText } from "@john-ui-kit/react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <SliderBar /> */}
      <TimerText
        unit="second"
        slot={({ hour, minute, second }) => (
          <Text>{`${hour}:${minute}:${second}`}</Text>
        )}
        expiryTimestamp={5 * 60 * 60}
      />

      <TimerText
        unit="second"
        slot={({ hour, minute, second }) => (
          <Button title={`${hour}:${minute}:${second}`} onPress={() => {}} />
        )}
        expiryTimestamp={5 * 60 * 60}
      />

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
