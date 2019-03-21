import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ExamScreen extends React.Component {
  static navigationOptions = {
    title : "Examen",
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
        <Text>Exam Screen ! Hello</Text>
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
