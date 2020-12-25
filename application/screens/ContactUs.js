import React, {Component} from 'react';
import { NavigationActions, StackNavigator} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { Container, Form, Item, Input, Label, Textarea, Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Entypo';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import BannerAd from '../components/BannerAd';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class ContactUs extends Component {
   static navigationOptions = {
  headerShown: false
};

constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserName: '',
      UserEmail: '',
      UserMessage: ''
 
    }
 }

 UserRegistrationFunction = () =>{
 
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserMessage }  = this.state ;
 
fetch(ConfigApp.URL+'controller/contactform.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    name: UserName,
 
    email: UserEmail,
 
    message: UserMessage
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson == 'false') {
            Toast.show(Strings.ST32, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true})

        }else{
            Toast.show(Strings.ST74, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true})

          this.props.navigation.goBack()
        }

      }).catch((error) => {
        console.log(error);

      });
 
 
  }

  render () {

    return (
<Container style={styles.background_general}>

<LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width}}>
</LinearGradient>
<StatusBar barStyle="dark-content"/>

<ScrollView>

<LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

<Grid >
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
<Ionicons name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
</TouchableOpacity>
    </Col>
        <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST73}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    </Col>
</Grid>
</LinearGradient>

    <KeyboardAwareScrollView>

<View style={{flex: 1, margin: 15}}>

<View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../../assets/images/contact.png')} style={{width: 100, height: 100, marginTop: 10}} />
</View>

<Text style={{paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight:'bold', textAlign: 'center' }}>
  {Strings.ST76}
</Text>

<Text style={{color: '#888888', fontSize: 14, textAlign: 'center'}}>
{Strings.ST77}
</Text>

<Form style={{marginBottom: 35, marginTop: 25}}>
            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{Strings.ST78}</Label>
              <Input onChangeText={UserName => this.setState({UserName})} style={{fontSize: 15}} />
            </Item>

            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{Strings.ST79}</Label>
              <Input onChangeText={UserEmail => this.setState({UserEmail})} style={{fontSize: 15}} autoCapitalize="none" />
            </Item>

            <Textarea rowSpan={3} bordered placeholder={Strings.ST80} placeholderTextColor="#888888" onChangeText={UserMessage => this.setState({UserMessage})} style={{fontSize: 15, marginTop: 15, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}} />

</Form>

<View style={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={this.UserRegistrationFunction} activeOpacity={1}>
      <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.button_start_2} activeOpacity={1}>
      <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{Strings.ST81.toUpperCase()}</Text>
      </LinearGradient>
      </TouchableOpacity> 
</View>

</View>
    </KeyboardAwareScrollView>

</ScrollView>

</Container>

    )
  }

}