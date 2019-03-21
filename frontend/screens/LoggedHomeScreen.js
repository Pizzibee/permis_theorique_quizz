import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class LoggedHomeScreen extends React.Component {
  static navigationOptions={
    header:null,
  };
  goToTheorie = () => {
    this.props.navigation.navigate('Theorie');
  }
  goToTraining = () => {
    this.props.navigation.navigate('Training');
  }
  goToExam = () => {
    this.props.navigation.navigate('Exam');
  }
  goToStatistics = () => {
    this.props.navigation.navigate('Statistics');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen Logged In</Text>
        <Button
          onPress={this.goToTheorie}
          title="Theorie"
        />
        <Button
          onPress={this.goToTraining}
          title="Entrainement"
        />
        <Button
          onPress={this.goToExam}
          title="Examen"
        />
        <Button
          onPress={this.goToStatistics}
          title="Statistics"
        />
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
