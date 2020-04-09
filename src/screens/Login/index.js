import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Vibration,
} from 'react-native';

const Login = () => {
  const [title, setTitle] = useState('test');

  return (
    <SafeAreaView style={LoginPageStyles.safeContainer}>
      <View style={[LoginPageStyles.loginPageWrapper]}>
        <View style={LoginPageStyles.titleWrapper}>
          <Text style={LoginPageStyles.loginTitle}>Login</Text>
        </View>
        <View style={LoginPageStyles.inputWrapper}>
          <TextInput
            style={LoginPageStyles.inputStyle}
            keyboardType="email-address"
            placeholder="ログインID"
          />
        </View>
        <View style={LoginPageStyles.inputWrapper}>
          <TextInput
            style={LoginPageStyles.inputStyle}
            placeholder="パスワード"
          />
        </View>
        <View style={LoginPageStyles.loginButtonWrapper}>
          <TouchableOpacity
            style={LoginPageStyles.loginButton}
            onPress={() => Vibration.vibrate()}>
            <Text style={LoginPageStyles.loginButtonText}>ログイン</Text>
          </TouchableOpacity>
        </View>
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

export default Login;
