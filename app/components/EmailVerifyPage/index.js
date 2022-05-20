import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import success from '../../images/success.png';
import './styles.scss';
import { Fragment } from 'react/cjs/react.production.min';

class EmailVerify extends Component {
  state = {
    validUrl: false,
  };

  componentWillMount() {
    const param = this.props.location.pathname.split('/');
    const id = param[2];
    const token = param[4];

    if (id && token) {
      const url = `/api/users/${id}/verify/${token}`;
      axios
        .get(url)
        .then(data => {
          console.log(data.response);

          this.setState({
            validUrl: true,
          });
        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({
            validUrl: false,
          });
        });
    }
  }

  render() {
    const { validUrl } = this.state;
    return (
      <Fragment>
        {validUrl ? (
          <div className="container">
            <img src={success} alt="success_img" className="success_img" />
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="green_btn">Login</button>
            </Link>
          </div>
        ) : (
          <h1>404 Not Found</h1>
        )}
      </Fragment>
    );
  }
}

export default withRouter(EmailVerify);
