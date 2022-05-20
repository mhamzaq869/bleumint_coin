import React, { Component } from 'react';
import {  withRouter, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import './login.scss';

import '../SignupPage/account.scss';
import { toast } from 'react-toastify';

// const dispatch = useDispatch()

class Test extends Component {
  state = {
    email: '',
    password: '',
    passwordShow: false,
    error: {},
    loading: false,
  };

  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }

  render() {
    const { email, password } = this.state;
    const auth = cookie.get('Auth');
    if (auth) {
      toast.info('You are Loged in');
      return <Redirect to="/dashboard" />;
    }
    return <h1>Lmao lmao</h1>
      
  }
}

export default withRouter(Test);
