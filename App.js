import { StatusBar } from "expo-status-bar";
import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";
import { func } from "prop-types";

//onecall api
//https://api.openweathermap.org/data/2.5/onecall?lat=37.28012&lon=126.977922&exclude=minutely&appid=7b6d6801fbdea9b550c493eb8fedd983&units=metric

const FORECAST_API_KEY = "7b6d6801fbdea9b550c493eb8fedd983";
const CURRENT_API_KEY = "e9174d67147f5fcaf179b538e41731d1";

function getTimeIx(weatherList) {
  const cTime = new Date();
  const cMonth = cTime.getMonth() + 1;
  const cDate = cTime.getDate();
  const cHour = cTime.getHours();

  let cmpTime;
  let timeIx = 0;
  for (let i = 0; i < weatherList.length; i++) {
    cmpTime = { time: weatherList[i].dt_txt, month: "", date: "", hour: "" };
    parseTimeObj(cmpTime);

    if (cMonth > cmpTime.month) {
      timeIx++;
    } else if (cMonth === cmpTime.month) {
      if (cDate > cmpTime.date) {
        timeIx++;
      } else if (cDate === cmpTime.date) {
        if (cHour > cmpTime.hour || cHour === cmpTime.hour) {
          timeIx++;
        } else {
          timeIx--;
          break;
        }
      } else {
        timeIx--;
        break;
      }
    } else {
      timeIx--;
      break;
    }
  }
  timeIx = timeIx >= 0 && timeIx < weatherList.length ? timeIx : 0;

  return timeIx;
}

function parseTimeObj(obj) {
  const time = obj.time; //YYYY-MM-DD HH:mm:ss
  obj.month = parseInt(time.slice(5, 7));
  obj.date = parseInt(time.slice(8, 10));
  obj.hour = parseInt(time.slice(11, 13));
}

function convertDtsToString(array) {
  array.forEach((element) => {
    element.dt = dtToString(element.dt);
  });
}

function dtToString(dt) {
  let temp_date = new Date();
  temp_date.setTime(dt * 1000);
  return temp_date.toLocaleString();
}

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    //latitude = 37.269384;
    //longitude = 127.022213;

    const {
      data: { name },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${CURRENT_API_KEY}&units=metric`
    );
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${FORECAST_API_KEY}&units=metric`
    );

    // let currentIx = getTimeIx(data.list);
    // data.list.splice(0, currentIx);

    convertDtsToString(data.hourly);
    convertDtsToString(data.daily);

    console.log(data);

    this.setState({
      isLoading: false,
      locationName: name,
      condition: data.current.weather[0].main,
      description: data.current.weather[0].description,
      temp: data.current.temp,
      h_forecast: data.hourly,
      d_forecast: data.daily,
    });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can not find you.");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {
      isLoading,
      locationName,
      temp,
      condition,
      description,
      h_forecast,
      d_forecast,
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        locationName={locationName}
        temp={Math.round(temp)}
        condition={condition}
        description={description}
        h_forecast={h_forecast}
        d_forecast={d_forecast}
      />
    );
  }
}
