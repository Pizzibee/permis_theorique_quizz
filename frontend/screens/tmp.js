// <SectionList
//   sections={this.state.categories}
//   renderItem={({item}) => <TouchableOpacity onPress={() => this._onPressButton(item.category_id, item.name)}>
//                             <View>
//                               <Text style={styles.item}>{item.name}</Text>
//                             </View>
//                           </TouchableOpacity>}
//   renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.name}</Text>}
//   keyExtractor={(item, index) => index}
// />
// <FlatList
//   data={this.state.categories}
//   renderItem={({item}) => <Text>{item.name}</Text>}
//   keyExtractor={(item, index) => item.category_id.toString()}
// />


// fetch(`http://localhost:3000/api/chapters/${this.props.navigation.state.params.categoryId}`)
//   .then((response) => response.json())
//   .then((responseJson) => {
//     this.setState({
//       data: responseJson,
//       currentChapter: responseJson[0],
//       loading: false
//     });
//     console.log(this.state.currentChapter);
//   })
//   .catch((error) =>{
//     console.error(error);
//     this.setState({
//       error: true
//     });
//   });

// const parentCategories = await fetch('http://localhost:3000/api/parentcategories');
// const jsonParent = await parentCategories.json();
// const subCategories = await fetch('http://localhost:3000/api/subcategories');
// const jsonSub = await subCategories.json();
// for (let i = 0; i < jsonParent.length; i++) {
//   jsonParent[i].data = [];
//   for (let j = 0; j < jsonSub.length; j++) {
//     if (jsonSub[j].parent_category === jsonParent[i].category_id){
//       jsonParent[i].data.push(jsonSub[j]);
//     }
//   }
// }
// this.setState({categories:jsonParent});









  // fetch('http://localhost:3000/api/parentcategories')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //       this.setState({
  //         categories: responseJson,
  //       });
  //       fetch('http://localhost:3000/api/subcategories')
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //           for (let i = 0; i < this.state.categories.length; i++) {
  //             this.state.categories[i].data = [];
  //             for (let j = 0; j < responseJson.length; j++) {
  //               if (responseJson[j].parent_category === this.state.categories[i].category_id){
  //                 this.state.categories[i].data.push(responseJson[j]);
  //               }
  //             }
  //           }
  //           this.setState({
  //             loading: false,
  //           });
  //         })
  //         .catch((error) =>{
  //           console.error(error);
  //           this.setState({
  //             error: true
  //           });
  //         });
  //   })
  //   .catch((error) =>{
  //       console.error(error);
  //       this.setState({
  //         error: true
  //       });
  //     });
