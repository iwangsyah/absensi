import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RNCamera } from 'react-native-camera';
import _ from 'lodash';
import Images from '../assets/icons';
import { Theme } from '../styles';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cameraView: {
        width: widthScreen,
        height: heightScreen,
    },
    preview: {
        flex: 1
    },
    containerInfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 50,
    },
    thumbnail: {
        width: 80,
        height: 80
    }
});

export default (CameraScreen = ({
    setCamera,
    takePicture,
    takeGallery
}) => (
        <RNCamera
            ref={cam => {
                setCamera(cam);
            }}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            style={styles.preview}
        >
            <View style={styles.containerInfo}>
                <TouchableOpacity onPress={() => takeGallery()}>
                    <Image source={Images.icGallery} style={styles.thumbnail} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => takePicture()}>
                    <Icon
                        size={70}
                        name="ios-finger-print"
                        color={Theme.primaryColor}
                    />
                </TouchableOpacity>
                <View style={{ width: 80 }} />
            </View>

        </RNCamera>
    )
)
