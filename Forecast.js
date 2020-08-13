import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Forecast({ forecast }) {
  console.log(forecast); //list:40 date, time, temp, condition

  const forecastList = forecast.map((component, index) => (
    <View key={index} style={layout.scrollBox__component}>
      <View style={layout.forecast__box}>
        <Text style={text.forecast__txt}>{component.date}</Text>
      </View>
      <View style={layout.forecast__box}>
        <Text style={text.forecast__txt}>{component.time}</Text>
      </View>
      <View style={layout.forecast__box}>
        <Text style={text.forecast__txt}>
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
    width: 100,
    margin: 10,
    justifyContent: "flex-end",
  },
  forecast__box: {},
});

const text = StyleSheet.create({
  forecast__txt: {
    color: "white",
    fontSize: 25,
  },
});
