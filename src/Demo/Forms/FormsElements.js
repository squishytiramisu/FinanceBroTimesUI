import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Card, Table, InputGroup, FormControl, } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card2 from "../../App/components/MainCard";

import PostService from '../../services/backend';

const FullPortfolio = () => {

    const [myStocks, setMyStocks] = useState({ stockPurchases: [] });


    useEffect(() => {
        if (window.localStorage.getItem("token") === null) {
            window.location.href = "/auth/signin-1";
        }
        PostService.getCurrentPortfolioByUserId(window.localStorage.getItem('id')).then(
            (response) => {
                console.log(response.data);
                setMyStocks(response.data);
            },
            (error) => {
                console.log(error);
                window.location.href = "/auth/signin-1";
            }
        );
    }, []);

    const sellPosition = async (id) => {
        PostService.deleteStockFromPortfolio(id).then(
            (resp) => {
                PostService.getCurrentPortfolioByUserId(window.localStorage.getItem('id')).then(
                    (response) => {
                        console.log(response.data);
                        setMyStocks(response.data);
                    },
                    (error) => {
                        console.log(error);
                        window.location.href = "/auth/signin-1";
                    }
                );
            },
            (e) => { console.log(e); }
        );
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">My stock portfolio</Card.Title>
                <span className="d-block m-t-5">Always trade responsibly!</span>
            </Card.Header>
            <Card.Body>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Stock Symbol</th>
                            <th>Purchase Price</th>
                            <th>Quantity</th>
                            <th>Purchase Date</th>
                            <th>Sell price</th>
                            <th>Sell Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myStocks.stockPurchases.map((stock, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.stockSymbol}</strong></td>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.purchasePrice}</strong></td>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.quantity}</strong></td>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{new Date(stock.purchaseDate).toISOString().slice(0, 10)}</strong></td>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.sellPrice}{stock.sellPrice ? '$' : null}</strong></td>
                                <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.sellDate ? (new Date(stock.sellDate).toISOString().slice(0, 10)) : null}</strong></td>

                                <td>
                                    {stock.sellDate == null ? <button className="btn btn-primary shadow-2 mb-4" id={`i-name-${stock.stockSymbol}`} onClick={() => sellPosition(stock.id)}>Close</button> : null}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

    );
}

export default FullPortfolio;