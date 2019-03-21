import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image
} from 'react-native';
import WarningMessage from '../components/WarningMessage';

export default class CategoryScreen extends Component {

  state = {
    error : false,
    loading : true,
    data: [],
    currentChapter: {},
    currentChapterIndex: 0
  }
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `${state.params.title}`,
    };
  };


  componentWillMount = () => {
    this._fetchChapters();
  }

  showNextChapter = () => {
    const {data, currentChapterIndex} = this.state;
    this.setState({
        currentChapter: data[currentChapterIndex+1],
        currentChapterIndex: currentChapterIndex+1
      });
  }

  showPreviousChapter = () => {
    const {data, currentChapterIndex} = this.state;
    this.setState({
        currentChapter: data[currentChapterIndex-1],
        currentChapterIndex: currentChapterIndex-1
    });
  }

  _fetchChapters = async () => {
    fetch(`http://localhost:3000/api/chapters/${this.props.navigation.state.params.categoryId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          currentChapter: responseJson[0],
          currentChapterIndex: 0,
          loading: false
        });
      })
      .catch((error) =>{
        console.error(error);
        this.setState({
          error: true
        });
      });
  }

  render() {
    if (this.state.currentChapter === undefined){
      return (
        <WarningMessage
          message="Pas de données"
        />
      );
    }else if (this.state.error === true){
      return (
        <WarningMessage
          message="Erreur lors de la récupération des données"
        />
      );
    }else if (this.state.loading === true){
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      );
    }

    if (this.state.currentChapterIndex === this.state.data.length -1){
      return (
        <View style={styles.container}>
          <Image
            style={{width: 300, height: 200}}
            source={{uri: `http://localhost:3000/api/images/chapters/${this.state.currentChapter.chapter_id}`}}
          />
          <Text>{this.state.currentChapter.title}</Text>
          <Text>{this.state.currentChapter.content}</Text>
          <Button
            onPress={this.showPreviousChapter}
            title="<-"
          />
        </View>
      );
    }else if (this.state.currentChapterIndex === 0){
      return (
        <View style={styles.container}>
          <Image
            style={{width: 300, height: 200}}
            source={{uri: `http://localhost:3000/api/images/chapters/${this.state.currentChapter.chapter_id}`}}
          />
          <Text>{this.state.currentChapter.title}</Text>
          <Text>{this.state.currentChapter.content}</Text>
          <Button
            onPress={this.showNextChapter}
            title="->"
          />
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <Image
            style={{width: 300, height: 200}}
            source={{uri: `http://localhost:3000/api/images/chapters/${this.state.currentChapter.chapter_id}`}}
          />
          <Text>{this.state.currentChapter.title}</Text>
          <Text>{this.state.currentChapter.content}</Text>
          <View style={{flexDirection:'row'}}>
            <Button
              onPress={this.showPreviousChapter}
              title="<-"
            />
            <Button
              onPress={this.showNextChapter}
              title="->"
            />
          </View>
        </View>
      );
    }
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
