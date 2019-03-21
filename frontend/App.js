import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoggedHomeScreen from './screens/LoggedHomeScreen.js';
import TheorieScreen from './screens/TheorieScreen.js';
import TrainingScreen from './screens/TrainingScreen.js';
import ExamScreen from './screens/ExamScreen.js';
import StatisticScreen from './screens/StatisticScreen.js';
import CategoryScreen from './screens/CategoryScreen.js';

const LoggedHomeStack = createStackNavigator({
  Home: {
    screen: LoggedHomeScreen
  },
  Theorie: {
    screen: TheorieScreen
  },
  Training: {
    screen : TrainingScreen
  },
  Exam: {
    screen : ExamScreen
  },
  Statistics: {
    screen : StatisticScreen
  },
  Category: {
    screen : CategoryScreen
  }
});

const LoggedHomeContainer = createAppContainer(LoggedHomeStack);
export default LoggedHomeContainer;
