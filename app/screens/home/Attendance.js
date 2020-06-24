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

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    // width: widthScreen / 2,
    // height: heightScreen / 2,
  },
  preview: {
    flex: 1
  },
  containerDescription: {
    flexDirection: 'row',
    backgroundColor: Theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 40,
    borderRadius: 6
  },
  textDescription: {
    color: Theme.txtWhite,
    marginLeft: 13
  },
  containerInfo: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    alignSelf: 'center',
    paddingHorizontal: 17
  }
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
    await this.requestLocationPermission()
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
        Geolocation.getCurrentPosition();

        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  takeFromGallery() {
    ImagePicker.openPicker({
      width: widthScreen,
      height: widthScreen
    }).then(image => {
      console.log(image);
      const source = { uri: image.path };
      this.setState({
        image: source,
        indicator: false
      });
    });
  }

  setCamera(cam) {
    this.camera = cam;
  }

  onPressButton = async () => {
    const { propertyId } = this.props.navigation.state.params;
    const { image } = this.state;
    this.resize(image, propertyId);
  }

  resize(image, propertyId) {
    const uriImage = Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
    // ImageResizer.createResizedImage(uriImage, 80, 60, 'JPEG', 100)
    //     .then(({ uri }) => {
    //         const dataImage = new FormData();
    //         dataImage.append('file', {
    //             uri,
    //             type: 'image/jpeg',
    //             name: 'image.jpeg'
    //         });
    //         dataImage.append('property_id', propertyId);
    //         this.setState({ indicator: true })

    //         ApiService.createImage(dataImage)
    //             .then(response => {
    //                 const { data } = response.data;
    //                 this.handleSuccessResponse(data);
    //             })
    //             .catch(error => {
    //                 ErrorHandler(error).then(er => {
    //                     this.handleFailResponse(er);
    //                 });
    //             });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return Alert.alert(
    //             'Unable to resize the photo',
    //             'Check the console for full the error message',
    //         );
    //     });
  }

  indicatorVisible = indicator => {
    this.setState({
      indicator,
      indicatorMode: 'loading',
      indicatorText: 'Loading...'
    });
  };

  handleSuccessResponse = (data) => {
    const { invoiceId } = this.props.navigation.state.params;
    this.setState({ indicator: false, image: {} });
    this.props.navigation.navigate('BuktiPembayaran', { photoId: data.id, invoiceId })
  };

  handleFailResponse = er => {
    this.setState({
      indicatorMode: 'failed',
      indicatorText: er.statusText
    });

    setTimeout(() => {
      this.indicatorVisible(false);
    }, 2000);
  };

  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      if (data.uri) {
        this.setState({ image: data })
      }
      Geolocation.getCurrentPosition(info => {
        let { latitude, longitude } = info.coords;
        this.getAddress(latitude, longitude);
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          timestamp: info.timestamp
        })
      });
    }
  };

  getAddress = async (lat, lng) => {
    let ret = await Geocoder.geocodePosition({ lat, lng })
    this.setState({ address: ret[1].formattedAddress })
  }

  render() {
    let content;

    if (this.state.image.uri) {
      content = (
        <View style={{ top: 21 }}>
          <Image
            style={{ width: '100%', height: widthScreen, transform: [{ rotate: Platform.OS == 'ios' ? '0deg' : '0deg' }] }}
            source={{ isStatic: true, uri: this.state.image.uri }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              position: 'absolute',
              top: 16,
              right: 16
            }}
            onPress={() => this.setState({ image: {} })}
          >
            <Icon name="remove" size={20} color="#FFF" />
          </TouchableOpacity>

          <View style={{ margin: 20 }}>
            <Text><Text style={{ fontWeight: 'bold' }}>Latitude :</Text> {this.state.latitude}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Longitude:</Text> {this.state.longitude}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Timestamp:</Text> {this.state.timestamp}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Alamat:</Text> {this.state.address}</Text>
          </View>

          <Button
            title='Attendance Succes'
            style={{ width: '100%', position: 'absolute', top: heightScreen - 180 }}
            onPress={() => this.setState({ image: {} })} />
          {/* <Text>Attendance Succes</Text> */}
        </View>
      )
    } else {
      content = (
        <CameraScreen
          setCamera={this.setCamera.bind(this)}
          takePicture={() => this.takePicture()}
          takeGallery={() => this.takeFromGallery()}
        />
      )
    }



    return (
      <View style={styles.cameraView} >
        <Header
          title={`Photo Selfie Absensi`}
          isBack
          onBack={() => this.props.navigation.pop()}
        />
        {content}
        <Indicator
          visible={this.state.indicator}
          mode={this.state.indicatorMode}
          title={this.state.indicatorText}
        />
      </View>
    );
  }
}
