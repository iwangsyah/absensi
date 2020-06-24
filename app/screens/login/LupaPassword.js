import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Platform, Keyboard, Image, Text, View } from 'react-native';
import { InputText, Button, ModalEmpty, Indicator } from '../../components';
import { ApiService } from '../../services';
import { ErrorHandler } from '../../util';
import Actions from '../../actions';
import Theme from '../../styles/Theme';

export default class LupaPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            indicator: false,
            indicatorMode: '',
            indicatorText: '',
            visibleNotif: false
        };
    }

    onPressButton() {
        let { phoneNumber } = this.state;

        if (phoneNumber.charAt(0) === "0") {
            phoneNumber = phoneNumber.substr(1);
        }
        phoneNumber = `62${phoneNumber}`.replace(/\s+/g, '');

        if (phoneNumber) {
            this.setState({ indicator: true });
            ApiService.phoneRegister(phoneNumber)
                .then(response => {
                    const { data } = response.data;
                    this.handleSuccessResponse(data);
                })
                .catch(error => {
                    ErrorHandler(error).then(er => {
                        this.handleFailResponse(er);
                    });
                });
        } else {
            this.setState({ visibleNotif: true });
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
        this.setState({ indicator: false });
        this.props.navigation.navigate('InputOTP', { token: data.token });
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
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }} >
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.35)',
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                            position: 'absolute',
                            top: Platform.OS == 'ios' ? IphoneXHelper.isIphoneX ? IphoneXHelper.getStatusBarHeight() + 15 : IphoneXHelper.getStatusBarHeight() : IphoneXHelper.getStatusBarHeight(),
                            left: 16
                        }}
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Image
                            source={Images.icBack}
                        />
                    </TouchableOpacity>
                    <View style={{ width: '100%', marginTop: 52, paddingHorizontal: 33 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: Theme.fontBold,
                                color: Theme.txtPrimaryColor,
                                marginBottom: 4
                            }}
                        >
                            Lupa Password?
                        </Text>
                        <Text style={{ fontSize: 12, fontFamily: Theme.fontRegular, marginBottom: 30 }}>
                            silahkan input data berikut
                        </Text>
                        <InputText
                            isPhone
                            value={this.props.phoneNumber}
                            keyboardType="number-pad"
                            placeholderText="Nomor Handphone"
                            onChange={phoneNumber => this.setState({ phoneNumber })}
                        />
                    </View>

                    <Button
                        title="Next"
                        onPress={() => this.onPressButton()}
                    />

                    <Indicator
                        visible={this.state.indicator}
                        mode={this.state.indicatorMode}
                        title={this.state.indicatorText}
                    />
                    <ModalEmpty
                        visibleNotif={this.state.visibleNotif}
                        onPressClose={() => this.setState({ visibleNotif: false })} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
