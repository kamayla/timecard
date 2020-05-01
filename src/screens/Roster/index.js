import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import {logout} from '../../actions/auth';
import {connect} from 'react-redux';
import AuthenPageWrapper from '../../components/AuthenPageWrapper';
import {getMyRosters} from '../../api/auth';
import HasFunctionHeader from '../../components/HasFunctionHeader';
import moment from 'moment';

const Roster = ({destroyToken, jwt, navigation}) => {
  const [rosters, setRosters] = useState([]);

  const [currentNum, setCurrentNum] = useState(0);

  const next = () => {
    const num = currentNum + 1;
    getRosters(num);
    setCurrentNum(num);
  };
  const prev = () => {
    const num = currentNum - 1;
    getRosters(num);
    setCurrentNum(num);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setCurrentNum(0);
      getRosters();
    });
  }, []);

  const getRosters = (diffMonth = 0) => {
    getMyRosters(jwt, diffMonth).then((res) => {
      const endDate = moment()
        .add(diffMonth, 'months')
        .endOf('month')
        .format('D');
      let array = [];
      for (let i = 0; i < endDate; i++) {
        array.push(
          moment()
            .add(diffMonth, 'months')
            .startOf('month')
            .add(i, 'days')
            .format('Y-MM-DD'),
        );
      }
      const dateData = array.map((date) => {
        const data = res.data.filter((d) => d.start_date === date);
        return data.length > 0
          ? data[0]
          : {
              start_date: date,
              start_datetime: null,
              end_datetime: null,
            };
      });
      setRosters(dateData);
    });
  };

  return (
    <SafeAreaView style={RosterPageStyles.safeContainer}>
      <View style={[RosterPageStyles.rosterPageWrapper]}>
        <HasFunctionHeader currentNum={currentNum} next={next} prev={prev} />
        <View style={RosterPageStyles.rosterMenuHeader}>
          <Text style={RosterPageStyles.rosterHeaderText}>日付</Text>
          <Text style={RosterPageStyles.rosterHeaderText}>開始</Text>
          <Text style={RosterPageStyles.rosterHeaderText}>終了</Text>
        </View>
        {/* todo ここはコンポネント化する */}
        {(() => {
          const elements = rosters.map((roster) => {
            return (
              <View style={RosterPageStyles.rosterRow} key={roster.start_date}>
                <Text style={RosterPageStyles.rosterText}>
                  {moment(roster.start_date).format('M/D(ddd)')}
                </Text>
                <Text style={RosterPageStyles.rosterText}>
                  {roster.start_datetime &&
                    moment(roster.start_datetime).format('HH:mm')}
                </Text>
                <Text style={RosterPageStyles.rosterText}>
                  {roster.end_datetime &&
                    moment(roster.end_datetime).format('HH:mm')}
                </Text>
              </View>
            );
          });
          return <ScrollView>{elements}</ScrollView>;
        })()}
      </View>
    </SafeAreaView>
  );
};

const RosterPageStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  rosterPageWrapper: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  rosterRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#AAAAAA',
  },
  rosterMenuHeader: {
    flexDirection: 'row',
    backgroundColor: '#DBDBDB',
    height: 28,
    alignItems: 'center',
    padding: 8,
  },
  rosterText: {
    flex: 1,
    fontSize: 12,
    color: '#868686',
  },
  rosterHeaderText: {
    flex: 1,
    fontSize: 12,
    color: '#343434',
  },
});

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    destroyToken: () => {
      dispatch(logout());
    },
  };
};

export default AuthenPageWrapper(
  connect(mapStateToProps, mapDispatchToProps)(Roster),
);
