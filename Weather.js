import React from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import PropTypes, { element } from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Clock from "./Clock";
import Forecast from "./Forecast";

const LOCA_NAME_MAX = 16;

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning-rainy",
    gradient: ["#200122", "#6f0000"],
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#3a7bd5", "#3a6073"],
  },
  Rain: {
    iconName: "weather-pouring",
    gradient: ["#0575E6", "#ACB6E5"],
  },
  Snow: {
    iconName: "weather-snowy-heavy",
    gradient: ["#E2E2E2", "#E29587"],
  },
  Mist: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
  },
  Smoke: {
    iconName: "weather-fog",
    gradient: ["#20002c", "#cbb4d4"],
  },
  Haze: {
    iconName: "weather-fog",
    gradient: ["#808080", "#F3904F"],
  },
  Dust: {
    iconName: "weather-fog",
    gradient: ["#2C3E50", "#F56217"],
  },
  Fog: {
    iconName: "weather-fog",
    gradient: ["#bec3c7", "#928DAB"],
  },
  Sand: {
    iconName: "weather-fog",
    gradient: ["#FFC371", "#2c3e50"],
  },
  Ash: {
    iconName: "weather-fog",
    gradient: ["#ff4b1f", "#2c3e50"],
  },
  Squall: {
    iconName: "weather-windy-variant",
    gradient: ["#4B79A1", "#283E51"],
  },
  Tornado: {
    iconName: "weather-tornado",
    gradient: ["#283E51", "#190A05"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#00C9FF", "#64b3f4", "#4BC0C8"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#355C7D", "#6C5B7B", "#C06C84"],
  },
};

function convertConditionIcon(forecast) {
  forecast.forEach((element) => {
    element.condition = (
      <MaterialCommunityIcons
        name={weatherOptions[element.condition].iconName}
        size={20}
        color="white"
      />
    );
  });
}

export default function Weather({
  locationName,
  temp,
  condition,
  description,
  forecast,
}) {
  if (locationName.length > LOCA_NAME_MAX) {
    locationName = locationName.slice(0, LOCA_NAME_MAX - 1);
    locationName += "...";
  }

  convertConditionIcon(forecast);
  /*
  forChangeBackground image :)
  const weatherCondition = ["Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
    "Clear",
    "Clouds"]
  condition = weatherCondition[14];
  */

  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={layout.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={layout.top}>
        <View style={layout.top_left}></View>
        <View style={layout.top_right}>
          <Text style={text.locationName}>{locationName}</Text>
        </View>
      </View>
      <View style={layout.halfTop}>
        <View style={layout.clockBox}>
          <Clock />
        </View>
        <View style={layout.weatherBox}>
          <MaterialCommunityIcons
            name={weatherOptions[condition].iconName}
            size={60}
            color="white"
          />
          <Text style={text.temp}>{temp}º</Text>
        </View>
      </View>
      <View style={layout.halfBottom}>
        <View style={layout.halfBottom__halfTop}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingStart: 15,
              paddingEnd: 5,
            }}
          >
            <Forecast forecast={forecast} />
          </ScrollView>
        </View>
        <View style={layout.halfBottom__halfBottom}>
          <Text style={text.title}>{condition}</Text>
          <Text style={text.subtitle}>{description}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const layout = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 8,
    flexDirection: "row",
  },
  top_left: {
    flex: 1,
  },
  top_right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  clockBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  weatherBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  halfTop: {
    flex: 42,
  },
  halfBottom: {
    flex: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  halfBottom__halfTop: {
    flex: 1,
  },
  halfBottom__halfBottom: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

const text = StyleSheet.create({
  locationName: {
    color: "white",
    fontSize: 20,
    marginTop: 15,
    marginRight: 5,
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  temp: {
    color: "white",
    paddingLeft: 20,
    fontSize: 42,
  },
});

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
    "Clear",
    "Clouds",
  ]).isRequired,
};
