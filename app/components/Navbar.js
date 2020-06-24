import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import navbarStyle from '../styles/navbar';

export default (NavBar = ({
  title,
  navIconVisible,
  menuVisible,
  shadowVisible,
  onPress,
  onPressMenu
}) => (
  <View
    style={[navbarStyle.container, shadowVisible ? navbarStyle.shadow : {}]}
  >
    <TouchableOpacity 
        disabled={!navIconVisible} 
        style={navbarStyle.menu} 
        onPress={onPress}
    >
    </TouchableOpacity>

    <Text style={navbarStyle.title}>{title}</Text>

    <TouchableOpacity
        disabled={!menuVisible}
        style={navbarStyle.menu}
        onPress={onPressMenu}
    >
    
    </TouchableOpacity>
    
  </View>
));
