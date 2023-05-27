import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

import PostService from '../../../services/backend';

const SignUp1 = () =>{

    const signUp = () => {
        let username = document.getElementById("i-username").value;
        let email = document.getElementById("i-email").value;
        let password = document.getElementById("i-password").value;


        PostService.register(username,email,password).then(
            (response) => {
                console.log(response.data);
                window.location.href = "/dashboard/default"
            },
            (error) => {
                console.log(error);
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
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" id="i-username" className="form-control" placeholder="Username"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email"  id="i-email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" id="i-password" className="form-control" placeholder="password"/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={() => signUp()}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
}

export default SignUp1;