import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import AuthenPageWrapper from '../../components/AuthenPageWrapper';
import Header from '../../components/Header';
import AttendancesList from '../../components/AttendancesList';
import moment from 'moment';

import Geolocation from '@react-native-community/geolocation';

import {goingWork, leavingWork} from '../../api/auth';

const Top = ({jwt, attendances, getMyAttendances}) => {
  const [timeHour, setTimeHour] = useState(moment().format('HH'));
  const [timeMin, setTimeMin] = useState(moment().format('mm'));
  const [timeSec, setTimeSec] = useState(moment().format('ss'));
  const goingWorkButton = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        goingWork(jwt, position.coords)
          .then((res) => {
            console.log(res.data);
            getMyAttendances(jwt);
            Vibration.vibrate();
          })
          .catch((e) => {
            console.log(e.response.data);
          });
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  };
  const leavingWorkButton = () => {
    console.log(jwt);
    Geolocation.getCurrentPosition(
      (position) => {
        leavingWork(jwt, position.coords)
          .then((res) => {
            getMyAttendances(jwt);
            Vibration.vibrate();
          })
          .catch((e) => {
            console.log(e.response.data);
          });
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  };
  useEffect(() => {
    window.setInterval(function () {
      setTimeHour(moment().format('HH'));
      setTimeMin(moment().format('mm'));
      setTimeSec(moment().format('ss'));
    }, 1000);
  }, []);
  return (
    <SafeAreaView style={TopPageStyles.safeContainer}>
      <View style={[TopPageStyles.topPageWrapper]}>
        <Header title="TimeCard" />
        <View style={TopPageStyles.timeCardButtomWrapper}>
          <View style={TopPageStyles.dateWrapper}>
            <Text style={TopPageStyles.dateText}>
              {moment().format('Y/MM/DD(ddd)')}
            </Text>
          </View>
          <View style={TopPageStyles.realTimeTextWrapper}>
            <View style={TopPageStyles.realTimeTextItemWrapper}>
              <Text style={TopPageStyles.realTimeText}>{timeHour}</Text>
            </View>
            <Text style={TopPageStyles.realTimeText}>:</Text>
            <View style={TopPageStyles.realTimeTextItemWrapper}>
              <Text style={TopPageStyles.realTimeText}>{timeMin}</Text>
            </View>
            <Text style={TopPageStyles.realTimeText}>:</Text>
            <View style={TopPageStyles.realTimeTextItemWrapper}>
              <Text style={TopPageStyles.realTimeText}>{timeSec}</Text>
            </View>
          </View>
          <View style={TopPageStyles.buttonArea}>
            <TouchableOpacity
              onLongPress={() => goingWorkButton()}
              style={[TopPageStyles.workButtonBase, TopPageStyles.startButton]}>
              <Text style={TopPageStyles.buttonText}>出勤</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onLongPress={() => leavingWorkButton()}
              style={[TopPageStyles.workButtonBase, TopPageStyles.endButton]}>
              <Text style={TopPageStyles.buttonText}>退勤</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={TopPageStyles.logTitleArea}>
          <Text style={TopPageStyles.logTitle}>打刻ログ</Text>
        </View>
        <AttendancesList attendances={attendances} />
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
    fontSize: 50,
  },
  realTimeTextItemWrapper: {
    width: 66,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  dateText: {
    color: '#ffffffff',
    fontSize: 24,
  },
  workButtonBase: {
    backgroundColor: '#679B9B',
    width: 163,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#707070',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#679B9B',
  },
  endButton: {
    backgroundColor: '#FFD0D0',
  },
  buttonText: {
    fontSize: 44,
    color: '#ffffffff',
  },
  buttonArea: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AuthenPageWrapper(Top);
