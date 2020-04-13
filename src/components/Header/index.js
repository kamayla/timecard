import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={HeaderStyles.header}>
      <Text style={HeaderStyles.headerTitle}>{title}</Text>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#FFB6B6',
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 20,
  },
});

export default Header;
