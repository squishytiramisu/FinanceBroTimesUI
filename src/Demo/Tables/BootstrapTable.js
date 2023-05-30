import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

import PostService from '../../services/backend';

const BootstrapTable = () => {

    const [stocks, setStocks] = React.useState([]);


    const buyStock = (stockSymbol) => {
        let quantity = document.getElementById(`i-quantity-${stockSymbol}`).value;
        PostService.addStockToPortfolio(stockSymbol, quantity).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const sellStock = (stockSymbol) => {
        let quantity = document.getElementById(`i-quantity-${stockSymbol}`).value;
        PostService.removeStockFromPortfolio(stockSymbol, quantity).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }


    React.useEffect(() => {

        if (window.localStorage.getItem("username") === null) {
            window.location.href = "/auth/signin-1"
        }
        PostService.whoAmi().then(

            
            
            PostService.getAllStocksWithPrices().then(
                (response) => {
                    console.log(response.data);
                    setStocks(response.data);
                },
                (error) => {
                    console.log(error);
                    window.location.href = "/auth/signin-1"
                    
                }
                )
                )
            }, []);


    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Available stocks</Card.Title>
                            <span className="d-block m-t-5">Always trade responsibly!</span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Stock Symbol</th>
                                        <th>Current Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stocks.map((stock, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.stockSymbol}</strong></td>
                                            <td><strong style={{ fontWeight: 'bold', color: 'black', fontSize: 'larger' }}>{stock.price}$</strong></td>
                                            <td>
                                                <input type="number" id={`i-quantity-${stock.stockSymbol}`} className="form-control" placeholder="Amount" />
                                                <br></br>
                                                <button className="btn btn-primary shadow-2 mb-4" id={`i-name-${stock.stockSymbol}`} onClick={() => buyStock(stock.stockSymbol)}>Buy</button>


                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Aux>
    );
}

export default BootstrapTable;