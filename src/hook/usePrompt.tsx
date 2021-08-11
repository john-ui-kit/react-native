/*
 * @Author: John
 * @Date: 2021-07-02 17:02:23
 * @LastEditors: John
 * @LastEditTime: 2021-08-11 16:26:31
 */

import React, { useRef } from "react";
import { useTransition, animated } from "@react-spring/native";
import RootSiblings from "react-native-root-siblings";
import { Image, Text, View } from "react-native";
import IMAGES_ASSETS from "../assets/images";

export default function usePrompt() {
  let promptShow = useRef<boolean>(false);
  let siblingRef = useRef<RootSiblings | null>();
  const Component = ({ text }: { text: string }) => {
    const transitions = useTransition(promptShow, {
      from: { opacity: 0, top: 0 },
      enter: { opacity: 1, top: 70 },
      leave: { opacity: 0, top: 0 },
    });
    return transitions((styleProps, item) => {
      console.log("promptShow", item);
      return (
        item && (
          <animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 999,

              ...styleProps,
            }}
          >
            <View
              style={{
                backgroundColor: "#E8E8E8",
                borderRadius: 18,
                paddingHorizontal: 14,
                paddingVertical: 8,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 6,
              }}
            >
              <Image
                style={{ width: 20, height: 20, marginRight: 8 }}
                source={IMAGES_ASSETS.icon_warn_yellow}
              ></Image>
              <Text
                style={{
                  fontSize: 14,
                  color: "#464646",
                  lineHeight: 23,
                  width: 279,
                }}
                numberOfLines={2}
              >
                {text}
              </Text>
            </View>
          </animated.View>
        )
      );
    });
  };
  const show = ({ content }: { content: string }) => {
    if (siblingRef.current) {
      siblingRef.current.destroy();
      promptShow.current = false;
    }
    promptShow.current = true;
    siblingRef.current = new RootSiblings(<Component text={content} />);
  };
  return {
    show,
  };
}
