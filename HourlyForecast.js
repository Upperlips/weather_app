import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function HourlyForecast({ h_forecast }) {
  for (let i = 0; i < h_forecast.length; i++) {
    let dt_txt = h_forecast[i].dt; //"2020. 8. 19. 오전 9:00:00"
    let dt_arr = dt_txt.split(". "); //[2020, 8, 19, 오전 9:00:00]

    h_forecast[i].dt = [];

    if (i === 0 || dt_arr[3] === "오전 12:00:00") {
      h_forecast[i].dt[0] = dt_arr[1] + "월"; //8
      h_forecast[i].dt[1] = dt_arr[2] + "일"; //19
    }

    if (dt_arr[3].length == 10) {
      //오전 9:00:00
      h_forecast[i].dt[2] = dt_arr[3].slice(0, 4);
    } else {
      //오전 10:00:00
      h_forecast[i].dt[2] = dt_arr[3].slice(0, 5);
    }
  }

  const forecastList = h_forecast.map((component, index) => (
    <View key={index} style={layout.scrollBox__component}>
      <View style={layout.forecast__box__date}>
        <Text style={text.forecast__date}>
          {component.dt[0]} {component.dt[1]}
        </Text>
      </View>
      <View style={layout.forecast__box__time}>
        <Text style={text.forecast__time}>{component.dt[2]}시</Text>
      </View>
      <View style={layout.forecast__box__temp}>
        <Text style={text.forecast__temp}>
          {Math.round(component.temp)}º {component.weather[0].icon}
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
  forecast__box__date: {
    paddingBottom: 4,
  },
  forecast__box__time: {
    height: 30,
    justifyContent: "flex-end",
  },
});

const text = StyleSheet.create({
  forecast__date: {
    color: "white",
    fontSize: 22,
    fontWeight: "200",
  },
  forecast__time: {
    color: "white",
    fontSize: 23,
    fontWeight: "300",
    letterSpacing: 0,
  },
  forecast__temp: {
    color: "white",
    fontSize: 24,
    fontWeight: "300",
  },
});
