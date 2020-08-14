import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Loading() {
  const time = new Date();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  return (
    <LinearGradient colors={["#E0EAFC", "#CFDEF3"]} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>{`${month}월 ${date}일 \n오늘의 날씨`}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#9370DB",
  },
  text: {
    fontWeight: "100",
    color: "#FFFFFF",
    fontSize: 60,
  },
});
