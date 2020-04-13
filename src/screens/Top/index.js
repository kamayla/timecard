import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AuthenPageWrapper from '../../components/AuthenPageWrapper';
import Header from '../../components/Header';
import moment from 'moment';

const Top = ({jwt}) => {
  const [timeNow, setTimeNow] = useState(moment().format('hh:mm:ss'));
  useEffect(() => {
    window.setInterval(function () {
      setTimeNow(moment().format('hh:mm:ss'));
    }, 1000);
  }, []);
  return (
    <SafeAreaView style={TopPageStyles.safeContainer}>
      <View style={[TopPageStyles.topPageWrapper]}>
        <Header title="TimeCard" />
        <View style={TopPageStyles.timeCardButtomWrapper}>
          <Text>{moment().format('Y/MM/DD(ddd)')}</Text>
          <View style={TopPageStyles.realTimeTextWrapper}>
            <Text style={TopPageStyles.realTimeText}>{timeNow}</Text>
          </View>
        </View>
        <View style={TopPageStyles.logTitleArea}>
          <Text style={TopPageStyles.logTitle}>打刻ログ</Text>
        </View>
        <Text>aaaaaaaaaa</Text>
      </View>
    </SafeAreaView>
  );
};

const TopPageStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  topPageWrapper: {
    flex: 1,
  },
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
  timeCardButtomWrapper: {
    backgroundColor: '#AACFCF',
    height: 232,
  },
  logTitleArea: {
    backgroundColor: '#DBDBDB',
    padding: 6,
  },
  logTitle: {
    fontSize: 12,
    color: '#343434',
  },
  realTimeTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  realTimeText: {
    color: '#F8ED64',
    fontSize: 44,
  },
});

export default AuthenPageWrapper(Top);
