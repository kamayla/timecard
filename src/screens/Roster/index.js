import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import {logout} from '../../actions/auth';
import {connect} from 'react-redux';
import AuthenPageWrapper from '../../components/AuthenPageWrapper';
import {getMyRosters} from '../../api/auth';

const Roster = ({destroyToken, jwt, navigation}) => {
  const [rosters, setRosters] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getRosters();
    });
  }, []);

  const getRosters = (diffMonth = 0) => {
    getMyRosters(jwt, diffMonth).then((res) => {
      setRosters(res.data);
    });
  };

  return (
    <SafeAreaView style={RosterPageStyles.safeContainer}>
      <View style={[RosterPageStyles.rosterPageWrapper]}>
        <Text>adsfasdf</Text>
        {/* todo ここはコンポネント化する */}
        {(() => {
          const elements = rosters.map((roster) => {
            return (
              <View style={RosterPageStyles.rosterRow} key={roster.id}>
                <Text>{roster.start_date}</Text>
                <Text>{roster.start_date}</Text>
                <Text>{roster.start_date}</Text>
              </View>
            );
          });
          return elements;
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
    backgroundColor: '#FFB6B6',
  },
  rosterRow: {
    flexDirection: 'row',
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
