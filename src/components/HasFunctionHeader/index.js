import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const HasFunctionHeader = ({currentNum, next, prev}) => {
  return (
    <View style={HeaderStyles.header}>
      <TouchableOpacity onPress={() => prev()}>
        <Text style={HeaderStyles.headerButtonText}>{'<先月'}</Text>
      </TouchableOpacity>
      <Text style={HeaderStyles.headerTitle}>
        {`${moment()
          .add(currentNum, 'months')
          .startOf('month')
          .format('Y/M/D')}〜${moment()
          .add(currentNum, 'months')
          .endOf('month')
          .format('Y/M/D')}`}
      </Text>
      <TouchableOpacity onPress={() => next()}>
        <Text style={HeaderStyles.headerButtonText}>{'翌月>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#FFB6B6',
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 20,
  },
  headerButtonText: {
    marginRight: 8,
    marginLeft: 8,
    color: '#ffffffff',
    fontSize: 20,
  },
});

export default HasFunctionHeader;
