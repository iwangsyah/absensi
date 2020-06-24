import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputText, Indicator, Button } from '../../components';
import { ErrorHandler, Astorage } from '../../util';
import { ApiService } from '../../services';
import Theme from '../../styles/Theme';
import Actions from '../../actions';

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  textinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 45,
    marginBottom: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Theme.primaryColor,
    paddingHorizontal: 21,
    backgroundColor: '#FFFFFF'
  },
  // textinput: {
  //   flex: 1,
  //   maxHeight: 80,
  //   alignSelf: 'center',
  //   color: Theme.primaryColor,
  //   fontFamily: Theme.fontMedium
  // },
  text: {
    marginRight: 5,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: Theme.fontMedium
  }
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nik: '',
      phone: '',
      indicator: false,
      indicatorMode: '',
      indicatorText: '',
      errorText: ''
    }
  }

  onPressButton() {
    if (this.state.nik == '1001') {
      this.props.navigation.navigate('Home', { name: 'Iwang' })
    } else if (this.state.nik == '1002') {
      this.props.navigation.navigate('Home', { name: 'Catur' })
    } else {
      this.setState({ errorText: 'No Induk Karyawan tidak terdaftar' })
      setTimeout(() => {
        this.setState({ errorText: '' })
      }, 2000)
    }
  }

  indicatorVisible = indicator => {
    this.setState({
      indicator,
      indicatorMode: 'loading',
      indicatorText: 'Loading...'
    });
  };

  handleSuccessResponse = data => {
    this.setState({
      indicatorMode: 'success',
      indicatorText: 'Login Success'
    });

    setTimeout(() => {
      this.indicatorVisible(false);
      this.props.navigation.navigate('App')
    }, 2000);
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

  render() {
    let { nik, phone } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Theme.primaryColor }}>
        <ImageBackground source={require('../../assets/images/background_grass_yellow.jpg')} style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
          <Text style={{ color: 'rgb(61,144,61)', fontWeight: 'bold', fontSize: 30, textAlign: 'center', bottom: 80 }}>ATTENDANCE APP</Text>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            style={styles.textinput}
            placeholder="No Induk Karyawan"
            onChangeText={nik => this.setState({ nik })}
            value={this.state.nik}
          />
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            style={styles.textinput}
            placeholder="No Hanphone"
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
          />
          <TouchableOpacity style={{ backgroundColor: '#2e86de', padding: 10, paddingVertical: 15, alignItems: 'center', borderRadius: 3, marginTop: 16 }} onPress={() => this.onPressButton()}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>MASUK</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold', top: 10, textAlign: 'center' }}>{this.state.errorText}</Text>
        </ImageBackground>
      </SafeAreaView >
    );
  }
}

