import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

import PostService from '../../../services/backend';

const SignIn1 = () => {

    const [error, setError] = React.useState(false);

    const signIn = () => {
        let email = document.getElementById("i-email").value;
        let password = document.getElementById("i-password").value;
        PostService.login(email,password).then(
            (response) => {
                console.log(response.data);
                window.localStorage.setItem("token", response.data.access_token);
                window.localStorage.setItem("username", response.data.username);
                window.location.href = "/dashboard/default"
            },
            (error) => {
                setError(true);
            }
        );
    }


        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" id="i-email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" id="i-password" className="form-control" placeholder="password"/>
                                </div>
                                {error===true ? <p className="mb-0 text-muted">Wrong email or password</p>: null}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={()=>signIn()}>Login</button>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
}

export default SignIn1;