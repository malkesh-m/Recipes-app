import React, {Component} from 'react';
var styles = require('../../assets/files/Styles');
import {Alert, Dimensions, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Label, Form} from 'native-base';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import ColorsApp from '../utils/ColorsApp';
import { StatusBar } from "react-native";
import {Grid, Row, Col } from 'react-native-easy-grid';
import ConfigApp from '../utils/ConfigApp';
import HTML from 'react-native-render-html';
import Strings from '../utils/Strings';
import AppPreLoader from '../components/AppPreLoader'; 
import { LinearGradient } from 'expo-linear-gradient';

var width = Dimensions.get('window').width;

export default class TermsGuest extends Component {
	static navigationOptions = {
	headerShown: false
};

constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_strings.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

	render() {

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

return (

<Container style={styles.background_general}>

      <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width}}>
</LinearGradient>

<ScrollView>


<LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

<Grid >
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
<Ionicons name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
</TouchableOpacity>
    </Col>
        <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST82}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    </Col>
</Grid>
</LinearGradient>


<View style={{padding: 20}}>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 

<HTML html={item.st_termsofservice} />    

}

keyExtractor={(item, index) => index.toString()}
        
        />

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 

<HTML html={item.st_privacypolicy} />      

}

keyExtractor={(item, index) => index.toString()}
        
        />

</View>
</ScrollView>
		</Container>
			);
	}
}