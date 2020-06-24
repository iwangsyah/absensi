import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Platform, Image, Text, View, Alert, PermissionsAndroid, ImageStore } from 'react-native';
// import _ from 'lodash';
// import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import ImageResizer from 'react-native-image-resizer';
import { Header, Button, Indicator, CameraScreen } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import { ApiService } from '../../services';
import { ErrorHandler } from '../../util';
import Images from '../../assets/icons';
import Theme from '../../styles/Theme';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoiaXdhbmdzeWFoIiwiYSI6ImNrYmE1ZjJjbTAwcTYycmxza3VrNnJ2Y3IifQ.Q8I76dqLbSix0tcShC986Q');

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
  },
  boxMenu: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: 'rgba(119, 117, 117, 0.8)',
    shadowOffset: {
      width: 0,
      height: 3.5
    },
    elevation: 8,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderRadius: 8
  },
  boxFeature: {
    width: '48%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicator: false,
      indicatorMode: '',
      indicatorText: '',
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => console.log(info));
    this.requestLocationPermission();
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        // alert("You can use the location");
      } else {
        console.log("location permission denied")
        Geolocation.getCurrentPosition(info => console.log(info));
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    let { name } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={`Attendance App`}
          onBack={() => this.props.navigation.pop()}
        />
        <View style={{ backgroundColor: 'rgb(61,144,61)', height: 50 }} />
        <View style={{ top: -40 }}>
          <View style={{
            paddingHorizontal: 16,
          }}>
            <View
              style={{
                flex: 1,
                paddingBottom: 8
              }}
            >
              <View
                style={[styles.boxMenu, styles.shadow]}
                onPress={() => {
                  this.props.navigation.navigate(screen);
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: Theme.txtPrimaryColor
                  }}
                >
                  Selamat Datang,
            </Text>
                <Text
                  style={{
                    fontSize: 22,
                    color: Theme.txtPrimaryColor,
                    fontWeight: 'bold'
                  }}
                >
                  {name}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <TouchableOpacity
                  style={[styles.boxMenu, styles.shadow, styles.boxFeature]}
                  onPress={() => this.props.navigation.navigate('Attendance')}
                >
                  <Image
                    source={Images.icAttendance}
                    style={{ width: 35, height: 35, marginRight: 10 }}
                  />
                  <Text>Absensi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.boxMenu, styles.shadow, styles.boxFeature]}
                  onPress={() => this.props.navigation.navigate('Location')}
                >
                  <Image
                    source={Images.icLocation}
                    style={{ width: 35, height: 35, marginRight: 10 }}
                  />
                  <Text>Location</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View >
    );
  }
}
