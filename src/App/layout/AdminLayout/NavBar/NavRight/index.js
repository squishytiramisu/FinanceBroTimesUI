import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import PostService from '../../../../../services/backend';

class NavRight extends Component {
    state = {
        listOpen: false
    };

    logout = () => {
        PostService.logout().then(
            (response) => {
                console.log(response.data);
                window.location.href = "/auth/signin-1"
            },
            (error) => {
                console.log(error);
            }
        );
    }


    render() {

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <span>{window.localStorage.getItem("username")?window.localStorage.getItem("username"):null }</span>
                                    <button onClick={()=>this.logout()}>
                                        <i className="feather icon-log-out"/>
                                    </button>
                                </div>
                                <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>

            </Aux>
        );
    }
}

export default NavRight;
