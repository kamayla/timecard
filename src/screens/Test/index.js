import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {logout} from '../../actions/auth';
import {connect} from 'react-redux';
import AuthenPageWrapper from '../../components/AuthenPageWrapper';

const Login = ({destroyToken, auth}) => {
  const [title, setTitle] = useState('test');

  return (
    <SafeAreaView style={LoginPageStyles.safeContainer}>
      <View style={[LoginPageStyles.loginPageWrapper]}>
        <TouchableOpacity onPress={() => destroyToken()}>
          <Text>Testset</Text>
        </TouchableOpacity>
        <Text>{auth.jwt}</Text>
      </View>
    </SafeAreaView>
  );
};

const LoginPageStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  loginPageWrapper: {
    flex: 1,
    backgroundColor: '#FFB6B6',
  },
  titleWrapper: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    color: '#ffffffff',
    fontSize: 50,
  },
  inputStyle: {
    backgroundColor: '#ffffffff',
    width: 300,
    padding: 12,
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 0.5,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButton: {
    width: 250,
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#679B9B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffffff',
    fontSize: 23,
    fontWeight: '700',
  },
  loginButtonWrapper: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
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
  connect(mapStateToProps, mapDispatchToProps)(Login),
);
