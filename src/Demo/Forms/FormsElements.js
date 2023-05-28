import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Card,Table, InputGroup, FormControl, } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card2 from "../../App/components/MainCard";

import PostService from '../../services/backend';

const FullPortfolio = () => {

    const [myStocks, setMyStocks] = useState({stockPurchases:[]});


    useEffect(() => {
        if(window.localStorage.getItem("token") === null){
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

    const sellPosition = async (id) =>{
        PostService.deleteStockFromPortfolio(id).then(
            (resp)=> {
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
            (e) =>{console.log(e);}
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
                                        <th>Purchase Sell Date</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {myStocks.stockPurchases.map((stock, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td><bold>{stock.stockSymbol}</bold></td>
                                            <td><bold>{stock.purchasePrice}$</bold></td>
                                            <td><bold>{stock.quantity}$</bold></td>
                                            <td><bold>{stock.purchaseDate}$</bold></td>
                                            <td><bold>{stock.sellPrice}$</bold></td>
                                            <td><bold>{stock.sellDate}$</bold></td>


                                            <td>
                                                <button className="btn btn-primary shadow-2 mb-4"  id={`i-name-${stock.stockSymbol}`} onClick={()=> sellPosition(stock.id)}>Close</button>

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