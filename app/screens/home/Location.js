import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Platform, Image, Text, View, Alert, PermissionsAndroid } from 'react-native';
// import _ from 'lodash';
// import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import ImageResizer from 'react-native-image-resizer';
import { Header, Button, Indicator, CameraScreen } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { ApiService } from '../../services';
import { ErrorHandler } from '../../util';
import Theme from '../../styles/Theme';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoiaXdhbmdzeWFoIiwiYSI6ImNrYmE1ZjJjbTAwcTYycmxza3VrNnJ2Y3IifQ.Q8I76dqLbSix0tcShC986Q');

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    // width: widthScreen / 2,
    // height: heightScreen / 2,
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      latitude: '',
      longitude: '',
      timestamp: '',
      indicator: false,
      indicatorMode: '',
      indicatorText: '',
      address: ''
    };
  }

  async componentDidMount() {
    // Geolocation.getCurrentPosition(info => console.log('info: ', info));
    Geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        timestamp: info.timestamp
      })
    });
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
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={`Lokasi Anda`}
          isBack
          onBack={() => this.props.navigation.pop()}
        />
        <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{ flex: 1 }}>
          <MapboxGL.UserLocation
            visible={true}
          />
          <MapboxGL.Camera
            zoomLevel={12}
            followUserLocation={true}
          />
        </MapboxGL.MapView>
      </View>
    );
  }
}
