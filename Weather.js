import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning-rainy",
    gradient: ["#200122", "#6f0000"],
    title: "",
    subtitle: "",
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#3a7bd5", "#3a6073"],
    title: "",
    subtitle: "",
  },
  Rain: {
    iconName: "weather-pouring",
    gradient: ["#2b5876", "#4e4376"],
    title: "Rain",
    subtitle: "Don't worry, It will be sunny.",
  },
  Snow: {
    iconName: "weather-snowy-heavy",
    gradient: ["#abbaab", "#ffffff"],
    title: "",
    subtitle: "",
  },
  Mist: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Smoke: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Haze: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Dust: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Fog	: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Sand: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Ash: {
    iconName: "weather-fog",
    gradient: ["#bdc3c7", "#2c3e50"],
    title: "",
    subtitle: "",
  },
  Squall: {
    iconName: "weather-windy-variant",
    gradient: ["#485563", "#29323c"],
    title: "",
    subtitle: "",
  },
  Tornado: {
    iconName: "weather-tornado",
    gradient: ["#870000", "#190A05"],
    title: "",
    subtitle: "",
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#2980B9", "#6DD5FA", "#FFFFFF"],
    title: "",
    subtitle: "",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#232526", "#414345"],
    title: "Clouds",
    subtitle: "where is the sun?",
  },
};

export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconName}
          size={96}
          color="white"
        />
        <Text style={styles.temp}>{temp}º</Text>
      </View>
      <View style={styles.halfContainer}>
          <Text style={styles.title}>
            {weatherOptions[condition].title}
          </Text>
          <Text style={styles.subtitle}>
             {weatherOptions[condition].subtitle}
          </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 42,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color : "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
    
  },
  subtitle: {
    color : "white",
    fontSize: 24,
    fontWeight: "600",
    
  },
});

Weather.PropTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
      "Thunderstorm",
      "Drizzle",
      "Rain",
      "Snow",
      "Atmosphere",
      "Clear",
      "Clouds",
      "Haze",
      "Mist",
      "Dust",
    ]).isRequired,
  };
