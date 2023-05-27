import React,{useState,useEffect} from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

import PostService  from '../../services/backend';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';


const Dashboard = () => {


    const [posts, setPosts] = useState([]);
    const [realizedGains, setRealizedGains] = useState(0);

    const [totalWorth, setTotalWorth] = useState(0);

    const [unrealizedGains, setUnrealizedGains] = useState(0);

    useEffect(() => {
        if(window.localStorage.getItem("token") === null){
            window.location.href = "/auth/signin-1";
        }

        PostService.getAvailableStocks().then(
          (response) => {
            console.log(response.data);
          },
          (error) => {
            console.log(error);
            window.location.href = "/auth/signin-1";
          }
        );

          PostService.getRealizedGainByUserId(window.localStorage.getItem("id")).then(

                (response) => { 
                    console.log(response.data);
                    setRealizedGains(response.data);
                }
                ,
                (error) => {
                    console.log(error);
                }
            );
        PostService.getCurrentPortfolioByUserId(window.localStorage.getItem("id")).then(
                (response) => {
                    console.log(response.data);
                    setTotalWorth(response.data.purchaseValue);
                }
                ,
                (error) => {
                    console.log(error);
                }
            );
        
        PostService.getUnrealizedGainByUserId(window.localStorage.getItem("id")).then(
                (response) => {
                    console.log(response.data);
                    setUnrealizedGains(response.data);
                }
                ,
                (error) => {
                    console.log(error);
                }
            );
            PostService.getAllPosts().then(
                (response) => {
                    console.log(response.data);
                    setPosts(response.data);
                },
                (error) => {
                    console.log(error);
                    window.location.href = "/auth/signin-1";
                }
            );

        
                

      }, []);


        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Current Profit</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        { realizedGains > 0 ? <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>${realizedGains} </h3> : <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/>${realizedGains}</h3> }
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total worth of portfolio</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> ${totalWorth} </h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Unrealized gains</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        { unrealizedGains > 0 ? <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>${Math.round(unrealizedGains)} </h3> : <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/>${Math.round(unrealizedGains)} </h3>}
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Posts</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    {posts.map((post) => (
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                            <td>
                                                <h6 className="mb-1">{post.title}</h6>
                                                <p className="m-0">{post.content.slice(0,25)}...</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{String(post.creationDate[1]).padStart(2,0)}.{String(post.creationDate[2]).padStart(2,0)} {String(post.creationDate[3]).padStart(2,0)}:{String(post.creationDate[4]).padStart(2,0)}</h6>
                                            </td>
                                            <td><a href="/sample-page" className="label theme-bg2 text-white f-12">Go to post</a></td>
                                        </tr>

                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
            
    
                    <Col md={6} xl={4}>
                    
                    </Col>
                
                </Row>
            </Aux>
        );
}

export default Dashboard;