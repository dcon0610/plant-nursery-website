import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser,logoutUser } from "./../actions/authActions";
import classnames from "classnames";
import { confirmAlert} from 'react-confirm-alert'; // Import

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      status: "you are not logged in"
    };
  }
  componentDidMount() {
    console.log("properties on login page",this.props)
    if (this.props.auth.isAuthenticated) {
      const usertype = localStorage.getItem("usertype")
      if (usertype === "admin"){
      
      this.props.history.push("/admin");
    }
    else {
      confirmAlert({
        title: 'Restricted',
        message: 'you are not registered as an admin, you will need to logout and log back in as an admin',
        buttons: [
          {
            label: 'Ok',
            onClick: () => {
              this.props.history.push("/plants")
              }
          }
        ]
      });
    }
  }

}
  
componentWillReceiveProps(nextProps) {


        console.log("usertype",nextProps.auth.usertype  )
     
        if (nextProps.auth.usertype==="admin"){
            this.props.history.push("/admin")
        }
        else {
          confirmAlert({
            title: 'Restricted',
            message: 'you are not registered as an admin',
            buttons: [
              {
                label: 'Ok',
                onClick: () => {
                  this.props.logoutUser()
                  this.props.history.push("/plants")
                  
                                              
                  }
}
            ]
          });
           
        }


    
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData,this.props.admin); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  
};
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col">
            <Link to="/" >
              Back to
              home
            </Link>
            <div className="col" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Admin Login</b> below
              </h4>
              { !this.props.admin && (<p >
                Don't have an account? <Link to="/register">Register</Link>
              </p>)}
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className=" col">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span >
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="col">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,

  
});
export default withRouter(connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(Login));