import { StatusBar } from "expo-status-bar";
import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";

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

    console.log(
      cmpTime.month +
        " " +
        cmpTime.date +
        " " +
        cmpTime.hour +
        " " +
        typeof cmpTime.date
    );
    console.log(cMonth + " " + cDate + " " + cHour + " " + typeof cMonth);

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

function setForecastArray(arr, data) {
  //dt_txt: 2020-08-11 15:00:00
  const list = data.list;
  let currentDate;

  for (let i = 0; i < list.length; i++) {
    arr[i] = new Object();
    arr[i].time = list[i].dt_txt.slice(11, 13);
    if (arr[i].time === "00") {
      arr[i].time = "자정";
    } else {
      arr[i].time += "시";
    }

    if (i === 0 || arr[i].time === "자정") {
      arr[i].date = list[i].dt_txt.slice(5, 10); //08-13
      let mon =
        arr[i].date[0] === "0"
          ? arr[i].date.slice(1, 2)
          : arr[i].date.slice(0, 2);
      let dt =
        arr[i].date[3] === "0"
          ? arr[i].date.slice(4, 5)
          : arr[i].date.slice(3, 5);
      arr[i].date = mon + "월 " + dt + "일";
    } else {
      arr[i].date = "";
    }
    arr[i].temp = Math.round(list[i].main.temp) + "º";
    arr[i].condition = list[i].weather[0].main;
  }
}

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${FORECAST_API_KEY}&units=metric`
    );
    const data_now = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${CURRENT_API_KEY}&units=metric`
    );
    console.log(data_now.data);

    let currentIx = getTimeIx(data.list);
    data.list.splice(0, currentIx);

    let forecast = new Array();
    setForecastArray(forecast, data);

    this.setState({
      isLoading: false,
      locationName: data_now.data.name,
      condition: data_now.data.weather[0].main,
      description: data_now.data.weather[0].description,
      temp: data_now.data.main.temp,
      forecast: forecast,
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
      forecast,
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        locationName={locationName}
        temp={Math.round(temp)}
        condition={condition}
        description={description}
        forecast={forecast}
      />
    );
  }
}
