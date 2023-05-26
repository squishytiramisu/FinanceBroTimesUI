import React, {Component} from 'react';
import {Dropdown, Card, Collapse} from 'react-bootstrap';
import windowSize from 'react-window-size';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

class MainCard extends Component {
    state = {
        isOption: this.props.isOption,
        fullCard: false,
        collapseCard: false,
        loadCard: false,
        cardRemove: false
    };

    cardReloadHandler = () => {
        this.setState({loadCard: true});
        setInterval(() => {
            this.setState({loadCard: false});
        }, 3000);
    };

    cardRemoveHandler = () => {
        this.setState({cardRemove: true});
    };

    render() {
        let fullScreenStyle, loader, cardHeaderRight, cardHeader;
        let card = '';
        let cardClass = [];

        if (this.state.isOption) {
            cardHeaderRight = (
                <div className="card-header-right">
                </div>
            );
        }

        cardHeader = (
            <Card.Header>
                <Card.Title as='h5'>{this.props.title}</Card.Title>
                {cardHeaderRight}
            </Card.Header>
        );

        if (this.state.fullCard) {
            cardClass = [...cardClass, 'full-card'];
            fullScreenStyle = {position: 'fixed', top: 0, left: 0, right: 0, width: this.props.windowWidth, height: this.props.windowHeight};
        }

        if (this.state.loadCard) {
            cardClass = [...cardClass, 'card-load'];
            loader = (
                <div className="card-loader">
                    <i className="pct-loader1 anim-rotate"/>
                </div>
            );
        }

        if (this.state.cardRemove) {
            cardClass = [...cardClass, 'd-none'];
        }

        if (this.props.cardClass) {
            cardClass = [...cardClass, this.props.cardClass];
        }

        card = (
            <Card className={cardClass.join(' ')} style={fullScreenStyle}>
                {cardHeader}
                <Collapse in={!this.state.collapseCard}>
                    <div>
                        <Card.Body>
                            {this.props.children}
                        </Card.Body>
                    </div>
                </Collapse>
                {loader}
            </Card>
        );

        return (
            <Aux>
                {card}
            </Aux>
        );
    }
}

export default windowSize(MainCard);
