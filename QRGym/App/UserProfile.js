import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text, Dimensions, ScrollView, Slider} from 'react-native';
import realm from './../Realm/User';
import AppIOS from './AppIOS';
import Login from  './../Login';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
let result;
var value = '';
var valueStr = '';
var userPicture = '';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      dataSource: '',
      loading: true,
      userPicture:'',
      userName:'',
      userGender:'',
      userBirthday:'',
      userID: '',
      userLocation: '',
    }
    //this.userPicture = '';
    //this._getUser = this._getUser.bind(this);
    this.value = '';
    //this.renderImage = this._renderImage.bind(this);
    this.getUserPic = this._getUserPic.bind(this);
  }
  propTypes:{
    source: React.propTypes.string
  }

  _getUserPic(token){
    return fetch('https://graph.facebook.com/v2.7/me?fields=id,name,gender,birthday,picture.type(large)&access_token=' +token)
      .then((response) =>response.json())
      .then((responseJson) => {
        this.setState({userPicture : responseJson.picture.data.url,
                       userName: responseJson.name,
                       userGender: responseJson.gender,
                       userBirthday: responseJson.birthday,
                       userID: responseJson.id});
      })
      .catch((error) => {
      console.error(error);
      });
  }

  componentWillMount(){
    this.setState({userPicture : 'http://www.islandairways.com/loading.jpg'});
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const {accessToken} = data
        this.getUserPic(accessToken)
      }
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image source={{uri:this.state.userPicture}} style={styles.profilePic}/>
          <View style={styles.profileData}>
            <Text>{this.state.userName}</Text>
            <Text>{this.state.userGender}</Text>
            <Text>{this.state.userBirthday}</Text>
            <Text>{this.state.userID}</Text>
            <Text>{this.state.userLocation}</Text>
          </View>
        </View>
        <View style={styles.trainersView}>
          <ScrollView horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      centerContent={true}>
            <Image source={{uri:'https://lh5.googleusercontent.com/-m3s-M80OGS0/AAAAAAAAAAI/AAAAAAAAABc/bMGq1LPngfg/s0-c-k-no-ns/photo.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/t31.0-8/12593654_10156773743430179_7113730652422510443_o.jpg'}} style={styles.trainers}/>
            <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/t31.0-8/11802598_761952060597326_5500452434640159136_o.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://www.laguiadelvaron.com/wp-content/uploads/2015/07/10963959_767263476683277_17892671_n-730x730.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
          </ScrollView>
        </View>
        <View style={styles.achievements}>
          <View style={styles.achievementsTitle}>
            <Text>Achievement 1</Text>
          </View>
          <View style={styles.achievementsRoute}>
            <Slider/>
          </View>
        </View>
          <Image source={require('./../img/frase.jpg')} style={{width: windowWidth, height: windowHeight * .4}}/>
      </View>);
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'gray',
    borderTopWidth: 10,
    borderColor:'red',
  },
  profile:{
    flexDirection: 'row'
    //marginTop: windowHeight * .5,

  },
  profilePic:{
    width: windowWidth * .5,
    height: windowHeight * .25,
    borderWidth: 5,
    borderColor: 'gray',
  },
  profileData:{
    flexDirection: 'column',
    marginLeft: windowWidth * .1,
    //borderWidth: 5,
    //borderColor: 'violet'
  },
  trainersView:{
    flexDirection: 'row',
    //borderWidth: 2,
    //borderColor: 'blue',
  },
  trainers:{
    borderRadius: 35 ,
    width: 70,
    height: 70,
  },
  achievements:{
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'gold',

  },
  achievementsTitle:{
    alignItems: 'center',
  },
  achievementsRoute:{

  },
  viewprofile:{
    //backgroundColor: 'violet',
  },
  opciones:{
    //marginTop: windowHeight * .6,
    flexDirection: 'column',
    backgroundColor: 'yellow',
  }
})
export default UserProfile
