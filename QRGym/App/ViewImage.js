import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Modal,
  ScrollView
} from 'react-native'
import Switcher from './Switcher';
import viewImageHistory from  './viewImageHistory';
import BulkingModel from './../Realm/User';
var viewGif = '';
var viewWeight = '';
var viewRepeat = '';

class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state={
      viewGif: '',
    };
    this.setViewGif = this._setViewGif.bind(this);
  }
  propTypes:{
    source: React.propTypes.string
  }

  _RealmModel(){
    //Borramos todos los registros
    let AllBulking = BulkingModel.objects('Bulking');
    BulkingModel.write(() => {
      BulkingModel.delete(AllBulking);
    });

    let NewBulking;
    //Creamos uno nuevo
    BulkingModel.write(() => {
      NewBulking = BulkingModel.create('Bulking', {
        id:1,
        gifString: 'curvy-bench-press',
        weight: '150 k',
        repeat: '30 minutos'
      })
    });
    this.setState({viewGif:NewBulking.gifString});
    viewWeight = NewBulking.weight;
    viewRepeat = NewBulking.repeat;
  }

  _setViewGif(strGif){
    this.setState({viewGif: strGif});
  }


  componentWillMount(){
    this._RealmModel();
  }


  render () {

    return (
      <View style={styles.container}>
        <View style={styles.gif}>
          <Switcher source={this.state.viewGif}/>
        </View>
        <View style={styles.details}>
          <Image source={require('./../img/Icon-Workout.png')} style={{width: 100, height: 100}}/>
          <Text>  {viewWeight}        </Text>
          <Image source={require('./../img/stopwach.png')} style={{width: 100, height: 100}}/>
          <Text>  {viewRepeat}  </Text>
        </View>
        <View>
          <ScrollView
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      centerContent={true}>
                <TouchableHighlight >
                <Image source={require('./../img/curvy-bench-press.gif')} style={{width: 200, height: 200}}/>
                </TouchableHighlight>
                <TouchableHighlight >
                <Image source={require('./../img/dumbbell-exercises.gif')} style={{width: 200, height: 200}}/>
                </TouchableHighlight>
                <TouchableHighlight >
                <Image source={require('./../img/decline-bench-press.gif')} style={{width: 200, height: 200}}/>
                </TouchableHighlight>
                <TouchableHighlight >
                <Image source={require('./../img/curvy-leg-curls.gif')} style={{width: 200, height: 200}}/>
                </TouchableHighlight>
                <TouchableHighlight >
                <Image source={require('./../img/cable-bicep-exercises.gif')} style={{width: 200, height: 200}}/>
                </TouchableHighlight>
          </ScrollView>
        </View>
      </View>
		);
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:  1,
  },
  gif:{
    flex: .55,
    borderRadius: 1,
    borderWidth: 4,
    borderColor: '#8AB82D',
  },
  details:{
    flexDirection: 'row',
    flex: .20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE9C0'
  },
  statusBar: {
    flexDirection: 'row',
    flex: .25,
    //position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    //left:90
  },
  statusBarVolver: {
    transform: [{rotate: '180deg'}],
    flex: .25,
    //position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    //left:90
  },
  statusBarText: {
    fontSize: 20,
  },
  iButton: {
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },

});
export default ViewImage
