import React from 'react';
import {connect} from 'react-redux';
import {refreshJwtToken} from '../../actions/auth';

const AuthenPageWrapper = (WrapperedComponent) => {
  const Component = () =>
    class extends React.Component {
      constructor(props) {
        super(props);
      }

      // componentDidMount() {
      //   const {navigation} = this.props;
      //   this.unsubscribe = navigation.addListener('focus', () => {
      //     const {jwt} = this.props;
      //     this.props.userRefreshToken(jwt);
      //   });
      // }

      render() {
        return <WrapperedComponent {...this.props} />;
      }
    };
  return connect(mapStateToProps, mapDispatchToProps)(Component());
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRefreshToken: (jwt) => {
      dispatch(refreshJwtToken(jwt));
    },
  };
};

export default AuthenPageWrapper;
