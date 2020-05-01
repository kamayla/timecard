import React from 'react';
import {connect} from 'react-redux';
import {refreshJwtToken, logout, getMyAllAttendances} from '../../actions/auth';
import {getCurrentUser, goingWork} from '../../api/auth';
import Geolocation from '@react-native-community/geolocation';

const AuthenPageWrapper = (WrapperedComponent) => {
  const Component = () =>
    class extends React.Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {
        const {navigation} = this.props;
        this.unsubscribe = navigation.addListener('focus', () => {
          getCurrentUser(this.props.jwt)
            .then((res) => {
              this.props.getMyAttendances(this.props.jwt);
            })
            .catch((e) => {
              e.response.status === 401 && this.props.logout();
            });
        });
      }

      render() {
        return <WrapperedComponent {...this.props} />;
      }
    };
  return connect(mapStateToProps, mapDispatchToProps)(Component());
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
    attendances: state.auth.attendances,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRefreshToken: (jwt) => {
      dispatch(refreshJwtToken(jwt));
    },
    logout: () => {
      dispatch(logout());
    },
    getMyAttendances: (jwt) => {
      dispatch(getMyAllAttendances(jwt));
    },
  };
};

export default AuthenPageWrapper;
