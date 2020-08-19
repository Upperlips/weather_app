import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function DailyForecast({ d_forecast }) {
  console.log(d_forecast);

  d_forecast.forEach((li) => {
    let dt_txt = li.dt;
    let dt_arr = dt_txt.split(". ");

    li.dt = [];
    li.dt[0] = dt_arr[1] + "월";
    li.dt[1] = dt_arr[2] + "일";
  });

  const forecastList = d_forecast.map((component, index) => (
    <View key={index} style={layout.scrollBox__component}>
      <View style={layout.forecast__box__date}>
        <Text style={text.forecast__date}>
          {component.dt[0]} {component.dt[1]}
        </Text>
      </View>
      <View style={layout.forecast__info}>
        <View style={layout.forecast__box__icon}>
          <Text style={text.forecast__icon}>{component.weather[0].icon}</Text>
        </View>
        <View style={layout.forecast__box__temp}>
          <Text style={text.forecast__temp__max}>
            {Math.round(component.temp.max)}
          </Text>
          <Text style={text.forecast__temp__min}>
            {Math.round(component.temp.min)}
          </Text>
        </View>
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
  forecast__box__date: {
    paddingBottom: 4,
  },
  forecast__info: {
    flexDirection: "row",
  },
  forecast__box__temp: {
    flex: 1,
  },
  forecast__box__icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const text = StyleSheet.create({
  forecast__date: {
    color: "white",
    fontSize: 22,
    fontWeight: "200",
  },
  forecast__temp__max: {
    color: "white",
    fontSize: 23,
    fontWeight: "300",
    letterSpacing: 0,
  },
  forecast__temp__min: {
    opacity: 0.7,
    color: "white",
    fontSize: 23,
    fontWeight: "300",
    letterSpacing: 0,
  },
  forecast__icon: {
    color: "white",
    fontSize: 24,
    fontWeight: "300",
  },
});
