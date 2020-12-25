import React, {PureComponent} from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Text} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AppPreLoader from './AppPreLoader';
import ConfigApp from '../utils/ConfigApp';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class CategoriesHome extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      categories:[]
    };
  }


    componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_categories.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             categories: responseJson.filter((e, index) => { return index < 6 })
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

RecipesByCategory=(category_id, category_title)=>
{
      this.props.navigation.navigate('RecipesByCategoryScreen', { IdCategory: category_id, TitleCategory: category_title });    
}


	render () {

		return (

<View style={{margin: 5}}>
        <FlatList
          data={ this.state.categories }
          refreshing="false"
          numColumns={2}
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.RecipesByCategory.bind(this, item.category_id, item.category_title)} activeOpacity={1} style={{flex: 1, marginHorizontal: 5}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.category_image}} style={{ height: 110,  width: null, marginBottom: 10, borderRadius: 10}} imageStyle={{borderRadius: 10}}>
                    <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ height: 110,  width: null, alignItems: 'center', justifyContent: 'center', borderRadius: 10  }}>
                            <Text numberOfLines={1} style={{color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{item.category_title.toUpperCase()}</Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />
</View>

		)
	}
}

export default withNavigation(CategoriesHome);
