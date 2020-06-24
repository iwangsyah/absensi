import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ButtonStyle from '../styles/ButtonStyle';
import Theme from '../styles/Theme';

export default (Button = ({
  title,
  style,
  color,
  isTransparent,
  onPress,
}) => (
    <View style={[ButtonStyle.container, style]}>
      <TouchableOpacity
        style={[
          isTransparent ? ButtonStyle.buttonTransparent : ButtonStyle.button,
          {
            borderColor: color ? color : Theme.primaryColor,
            backgroundColor: isTransparent ? 'transparent' : color ? color : '#2e86de'
          }
        ]}
        onPress={onPress}
      >
        <Text style={[ButtonStyle.text, { color: isTransparent ? color ? color : Theme.primaryColor : Theme.txtWhite }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  ));