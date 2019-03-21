import React from 'react';
import { StyleSheet, Text, View, Button, SectionList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class TheorieScreen extends React.Component {

  static navigationOptions = {
    title : "Theorie",
    // headerStyle: {
    //   backgroundColor: "#70db70"
    // },
    // headerTitleStyle: {
    //   color: "#FFF"
    // }
  };

  state = {
    categories: [],
    loading: true,
    error: false,
  }

  componentWillMount(){
    this._fetchData();
  }

  _fetchData = async () => {
    fetch('http://localhost:3000/api/categories')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            categories: responseJson,
            loading: false
          });
      });
  }

  _onPressButton(categoryId, categoryName) {
    this.props.navigation.navigate('Category', { categoryId: categoryId, title: categoryName });
  }

  render() {
    if (this.state.error === true){
      return (
        <View style={styles.base}>
          <Text>Erreur lors de la récupération des données</Text>
        </View>
      );
    }else if (this.state.loading === true){
      return (
        <View style={styles.base}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View  style={styles.container}>
        <SectionList
          sections={this.state.categories}
          renderItem={({item}) => <TouchableOpacity onPress={() => this._onPressButton(item.category_id, item.name)}>
                                    <View>
                                      <Text style={styles.item}>{item.name}</Text>
                                    </View>
                                  </TouchableOpacity>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.name}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
   flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(240,240,240,2.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
