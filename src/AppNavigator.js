import React from 'react';
import {AsyncStorage, StyleSheet, Image, AppState} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Top from './screens/Top';
import Roster from './screens/Roster';

import {connect} from 'react-redux';
import {refreshJwtToken} from './actions/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  componentDidMount() {
    const getTokenFromStorage = async () => {
      const jwt = await AsyncStorage.getItem('token');
      this.props.setToken(jwt);
    };
    getTokenFromStorage();
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(nextAppState) {
    if (nextAppState === 'background') {
    }
    if (nextAppState === 'active') {
      this.props.userRefreshToken(this.props.auth.jwt);
    }
    if (nextAppState === 'inactive') {
    }
  }
  render() {
    return (
      <NavigationContainer>
        {this.props.auth.jwt ? (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                  case 'Home':
                    return focused ? (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/home_active.png')}
                      />
                    ) : (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/home_none_active.png')}
                      />
                    );
                  case 'WorkTable':
                    return focused ? (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/worktable_active.png')}
                      />
                    ) : (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/worktable_none_active.png')}
                      />
                    );
                  case 'WorkSummary':
                    return focused ? (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/worksummary_active.png')}
                      />
                    ) : (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/worksummary_none_active.png')}
                      />
                    );
                  case 'Setting':
                    return focused ? (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/setting_active.png')}
                      />
                    ) : (
                      <Image
                        style={AppNavigatorStyles.icon}
                        source={require('./images/setting_none_active.png')}
                      />
                    );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: '#3AABD2',
              inactiveTintColor: '#A1A1A1',
            }}>
            <Tab.Screen
              name="Home"
              component={Top}
              options={{title: 'ホーム'}}
            />
            <Tab.Screen
              name="WorkTable"
              component={Roster}
              options={{title: '勤務表'}}
            />
            <Tab.Screen
              name="WorkSummary"
              component={Roster}
              options={{title: '業務集計'}}
            />
            <Tab.Screen
              name="Setting"
              component={Roster}
              options={{title: '設定'}}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userRefreshToken: (jwt) => {
      dispatch(refreshJwtToken(jwt));
    },
    setToken: (jwt) => {
      dispatch({type: 'SET_JWT_TOKEN', payload: {jwt}});
    },
  };
};

const AppNavigatorStyles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
