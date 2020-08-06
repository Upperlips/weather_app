import { StatusBar } from "expo-status-bar";
import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "7b6d6801fbdea9b550c493eb8fedd983";

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

    if (cmpTime.month > cMonth) {
      timeIx--;
      break;
    } else if (cmpTime.date > cDate) {
      timeIx--;
      break;
    } else if (cmpTime.hour > cHour) {
      timeIx--;
      break;
    } else {
      timeIx++;
    }
  }
  timeIx = timeIx >= 0 && timeIx < 40 ? timeIx : 0;
  return timeIx;
}

function parseTimeObj(obj) {
  const time = obj.time; //YYYY-MM-DD HH:mm:ss
  console.log("compare time : " + time);
  obj.month = time.slice(5, 7);
  obj.date = time.slice(8, 10);
  obj.hour = time.slice(11, 13);
}

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    console.log(data);

    let currentIx = getTimeIx(data.list);

    this.setState({
      isLoading: false,
      locationName: data.city.name,
      condition: data.list[currentIx].weather[0].main,
      description: data.list[currentIx].weather[0].description,
      temp: data.list[currentIx].main.temp,
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
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        locationName={locationName}
        temp={Math.round(temp)}
        condition={condition}
        description={description}
      />
    );
  }
}
