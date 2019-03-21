import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native';

export default class TrainingScreen extends React.Component {
  static navigationOptions = {
    title : "Entrainement",
    // headerStyle: {
    //   backgroundColor: "#70db70"
    // },
    // headerTitleStyle: {
    //   color: "#FFF"
    // }
  };

  state = {
    error : false,
    loading : true,
    questions: [],
    currentQuestion: {},
    currentQuestionIndex: 0,
    correctAnswer:null
  }

  componentWillMount(){
    this._fetchData();
  }

  _fetchData = async () => {
    fetch('http://localhost:3000/api/questions')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            questions: responseJson,
          });
          for (let i = 0; i < this.state.questions.length; i++) {
            const questionId = this.state.questions[i].question_id;
            this.state.questions[i].answers = [];
            fetch('http://localhost:3000/api/answers/'+`${questionId}`)
              .then((response) => response.json())
              .then((responseJson) => {
                this.state.questions[i].answers = responseJson;
              })
              .then(()=>{
                this.setState({
                  loading:false
                });
              })
              .catch((error) =>{
                console.error(error);
                this.setState({
                  error: true
                });
              });
          }
      })
      .then(() => {
        this.setState({
          currentQuestion: this.state.questions[0],
          currentQuestionIndex: 0,
        });
      })
      .catch((error) =>{
          console.error(error);
          this.setState({
            error: true
          });
        });
  }
  showNextQuestion = () => {
    const {questions, currentQuestionIndex} = this.state;
    this.setState({
        currentQuestion: questions[currentQuestionIndex+1],
        currentQuestionIndex: currentQuestionIndex+1,
        correctAnswer:null,
      });
  }

  showPreviousQuestion = () => {
    const {questions, currentQuestionIndex} = this.state;
    this.setState({
        currentQuestion: questions[currentQuestionIndex-1],
        currentQuestionIndex: currentQuestionIndex-1,
        correctAnswer:null
      });
  }

  checkAnswer = (answerIndex) => {
    if (this.state.currentQuestion.answers[answerIndex].is_correct === true){
      this.setState({
        correctAnswer:true
      });
    }else{
      this.setState({
        correctAnswer:false
      });
    }
  }

  render() {
    if (this.state.loading === true){
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      );
    }else if (this.state.error === true){
      return (
        <View style={styles.container}>
          <Text>Erreur lors de la récupération des données</Text>
        </View>
      );
    }else if (this.state.currentQuestion === undefined){
      return (
        <View style={styles.container}>
          <Text>Pas de question</Text>
        </View>
      );
    }
    if (this.state.correctAnswer === true){
      return (
        <View style={styles.container}>
            <Image
              style={{width: 300, height: 200}}
              source={{uri: `http://localhost:3000/api/images/questions/${this.state.currentQuestion.question_id}`}}
            />
            <Text>{this.state.currentQuestion.title}</Text>
            {
              this.state.currentQuestion.answers.map(( item, key ) =>
              (
                <Button
                  disabled={true}
                  key = { key }
                  title={ item.content }
                  onPress={() => this.checkAnswer(key)}
                />
              ))
            }
            <Text>Correct !</Text>
            <Text>{this.state.currentQuestion.answer_explanation}</Text>
          <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
            <Button
              onPress={this.showPreviousQuestion}
              title="<-"
            />
            <Button
              onPress={this.showNextQuestion}
              title="->"
            />
          </View>
        </View>
      );
    }else if (this.state.correctAnswer === false){
      return (
        <View style={styles.container}>
            <Image
              style={{width: 300, height: 200}}
              source={{uri: `http://localhost:3000/api/images/questions/${this.state.currentQuestion.question_id}`}}
            />
            <Text>{this.state.currentQuestion.title}</Text>
            {
              this.state.currentQuestion.answers.map(( item, key ) =>
              (
                <Button
                  disabled={true}
                  key = { key }
                  title={ item.content }
                  onPress={() => this.checkAnswer(key)}
                />
              ))
            }
            <Text>Faux !</Text>
            <Text>{this.state.currentQuestion.answer_explanation}</Text>
          <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
            <Button
              onPress={this.showPreviousQuestion}
              title="<-"
            />
            <Button
              onPress={this.showNextQuestion}
              title="->"
            />
          </View>
        </View>
      );
    }else {
      //timer pour la partie examen
      //A afficher à l'ecran
      // let timer = 0;
      // let myVar = setInterval(()=>{
      //   timer++;
      //   if (timer === 15){
      //     clearInterval(myVar);
      //     this.checkAnswer(0);
      //   }
      // }, 1000);
      return (
        <View style={styles.container}>
            <Image
              style={{width: 300, height: 200}}
              source={{uri: `http://localhost:3000/api/images/questions/${this.state.currentQuestion.question_id}`}}
            />
            <Text>{this.state.currentQuestion.title}</Text>
            {
              this.state.currentQuestion.answers.map(( item, key ) =>
              (
                <Button
                  key = { key }
                  title={ item.content }
                  onPress={() => this.checkAnswer(key)}
                />
              ))
            }
          <View style={{flexDirection:'row', justifyContent: 'center'}}>
            <Button
              onPress={this.showPreviousQuestion}
              title="<-"
            />
            <Button
              onPress={this.showNextQuestion}
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
  },
});
