import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

const TIME_DURATION = 60000;

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the time
      time: '00:00',
    };
  }
  componentDidMount() {
    this.setState({time : moment().format('HH:mm')});

    setInterval(() => { 
      this.setState({ 
      time : moment().format('HH:mm')
      }) 
     },TIME_DURATION); 
  }

  render() {
    return (
      <View style={layout.clockBox}>
        <Text style={text.clock}>{this.state.time}</Text>
      </View>
    );
  }
}

const layout = StyleSheet.create({
  clockBox : {
    marginBottom: 7,
    borderWidth: 1.8,
    borderColor: 'white',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,

  },
})

const text = StyleSheet.create({
  clock : {
    fontSize: 55,
    color: "white",
  },
})

