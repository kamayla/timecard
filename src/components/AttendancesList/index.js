import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import moment from 'moment';

const AttendancesList = ({attendances}) => {
  const array = attendances.map((attendance) => (
    <View style={AttendancesListStyles.cardWrapper} key={attendance.id}>
      <View style={AttendancesListStyles.dateTimeTextWrapper}>
        <Text style={[AttendancesListStyles.dateTimeText]}>
          {moment(attendance.created_at).format('M/D(ddd)')}
        </Text>
      </View>
      <View style={AttendancesListStyles.dateTimeTextWrapper}>
        <Text style={[AttendancesListStyles.dateTimeText]}>
          {moment(attendance.created_at).format('HH:mm')}
        </Text>
      </View>
      {attendance.item === 'going' ? (
        <View style={AttendancesListStyles.going}>
          <Text style={AttendancesListStyles.attendanceText}>出勤</Text>
        </View>
      ) : (
        <View style={AttendancesListStyles.leaving}>
          <Text style={AttendancesListStyles.attendanceText}>退勤</Text>
        </View>
      )}
      <View style={AttendancesListStyles.geolocationArea}>
        <Image
          style={AttendancesListStyles.mapIcon}
          source={require('../../images/map_icon.png')}
        />
      </View>
    </View>
  ));
  return <ScrollView>{array}</ScrollView>;
};

const AttendancesListStyles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    padding: 4,
    borderColor: '#AAAAAA',
    borderBottomWidth: 0.5,
  },
  dateTimeText: {
    color: '#868686',
    padding: 6,
  },
  dateTimeTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  going: {
    flex: 1,
    padding: 6,
    backgroundColor: '#679B9B',
    borderColor: '#AAAAAA',
    borderRadius: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginLeft: 16,
  },
  leaving: {
    flex: 1,
    padding: 6,
    backgroundColor: '#FFD0D0',
    borderColor: '#AAAAAA',
    borderRadius: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginLeft: 16,
  },
  attendanceText: {
    color: '#ffffffff',
  },
  geolocationArea: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    height: 22,
    width: 22,
    marginLeft: 16,
  },
});

export default AttendancesList;
