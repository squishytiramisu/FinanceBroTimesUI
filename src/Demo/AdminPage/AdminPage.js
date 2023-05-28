import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Card, InputGroup, FormControl, } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card2 from "../../App/components/MainCard";

import PostService from '../../services/backend';

const AdminPage = () => {
    const [adminInput, setAdminInput] = useState({ title: '', content: '' });
    const [moderatorInput, setModeratorInput] = useState({ title: '', content: '' });
    const [mailInput, setMailInput] = useState({ title: '', content: '' });

    const giveAdminRights = (id) => {
        PostService.giveAdminRights(id).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const giveModeratorRights = (id) => {
        PostService.giveModeratorRights(id).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const sendMail = (id) => {
        PostService.sendMail(id).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }


    useEffect(() => {
        if (window.localStorage.getItem("token") === null) {
            window.location.href = "/auth/signin-1";
        }
    }, []);

    return (
        <Aux>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Give admin rights</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.postTitle">
                            <Form.Label>User ID to give ADMIN role:</Form.Label>
                            <Form.Control type="email" placeholder="User ID" value={adminInput.title} onChange={(event) => setAdminInput({ title: event.target.value, content: adminInput.content })} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => giveAdminRights(adminInput.title)}>Give role</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Give moderator rights</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.postTitle">
                            <Form.Label>User ID to give MODERATOR role:</Form.Label>
                            <Form.Control type="email" placeholder="User ID" value={moderatorInput.title} onChange={(event) => setModeratorInput({ title: event.target.value, content: moderatorInput.content })} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => giveModeratorRights(moderatorInput.title)}>Give role</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Send daily report to user</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.postTitle">
                            <Form.Label>User ID to send mail to:</Form.Label>
                            <Form.Control type="email" placeholder="User ID" value={mailInput.title} onChange={(event) => setMailInput({ title: event.target.value, content: mailInput.content })} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => sendMail(mailInput.title)}>Send</Button>
                    </Form>
                </Card.Body>
            </Card>


        </Aux>

    );
}

export default AdminPage;