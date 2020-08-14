import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Forecast({ forecast }) {
  //list:40 date, time, temp, condition

  const forecastList = forecast.map((component, index) => (
    <View key={index} style={layout.scrollBox__component}>
      <View style={layout.forecast__box__date}>
        <Text style={text.forecast__date}>{component.date}</Text>
      </View>
      <View style={layout.forecast__box}>
        <Text style={text.forecast__time}>{component.time}</Text>
      </View>
      <View style={layout.forecast__box}>
        <Text style={text.forecast__temp}>
          {component.condition} {component.temp}
        </Text>
      </View>
    </View>
  ));

  return <View style={layout.scrollBox}>{forecastList}</View>;
}

const layout = StyleSheet.create({
  scrollBox: {
    flexDirection: "row",
  },
  scrollBox__component: {
    width: 90,
    margin: 10,
    justifyContent: "flex-end",
  },
  forecast__box: {},
  forecast__box__date: {
    paddingBottom: 7,
  },
});

const text = StyleSheet.create({
  forecast__date: {
    color: "white",
    fontSize: 23,
    fontWeight: "200",
  },
  forecast__time: {
    color: "white",
    fontSize: 25,
    fontWeight: "300",
    letterSpacing: 2,
  },
  forecast__temp: {
    color: "white",
    fontSize: 22,
    fontWeight: "300",
  },
});
