import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class StatisticScreen extends React.Component {
  static navigationOptions = {
    title : "Statistics",
    // headerStyle: {
    //   backgroundColor: "#70db70"
    // },
    // headerTitleStyle: {
    //   color: "#FFF"
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Statistics Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
