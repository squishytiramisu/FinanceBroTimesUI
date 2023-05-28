import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Card, InputGroup, FormControl, } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card2 from "../../App/components/MainCard";

import PostService from '../../services/backend';
import { bool } from 'prop-types';

const SamplePage = () => {

    const [posts, setPosts] = useState([]);

    const [addPostInput, setAddPostInput] = useState({ content: '', title: '' });

    const [isModerator, setGetIsModerator] = useState(false);



    const checkModeratorRole = () => {
            PostService.getIsModerator().then(
                (r) =>{
                    setGetIsModerator(true);
                },
                (e)=>{
                    console.log("User is not a moderator!");
                }
            ).catch(()=>console.log("error"));
    }

    const postLike = (id) => {
        PostService.likePost(id).then(
            (response) => {
                console.log(response.data);
                PostService.getAllPosts().then(
                    (response) => {
                        console.log(response.data);
                        setPosts(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const addPost = () => {
        PostService.addPost(addPostInput.title, addPostInput.content).then(
            (response) => {
                console.log(response.data);

                PostService.getAllPosts().then(
                    (response) => {
                        console.log(response.data);
                        setPosts(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                setAddPostInput({ content: '', title: '' });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const deletePost = (id) => {
        PostService.deletePost(id).then(
            (response) => {
                console.log(response.data);
                PostService.getAllPosts().then(
                    (response) => {
                        console.log(response.data);
                        setPosts(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
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
        checkModeratorRole();

    }, []);

    return (
        <Aux>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Write a post</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.postTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder="Title" value={addPostInput.title} onChange={(event) => setAddPostInput({ title: event.target.value, content: addPostInput.content })} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.postContent">
                            <Form.Label>Write your story...</Form.Label>
                            <Form.Control as="textarea" rows="3" value={addPostInput.content} onChange={(event) => setAddPostInput({ content: event.target.value, title: addPostInput.title })} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => addPost()}>Post</Button>
                    </Form>
                </Card.Body>
            </Card>

            {posts.map((post) => {
                return (


                    <Aux key={post.id}>
                        <Row>
                            <Col>
                                <Card2 id={post.id} title={post.title} likes={post.likeCount} author={post.author} isOption>
                                    <p>
                                        {post.content}
                                    </p>
                                    <Button size={'sm'} variant="primary" onClick={() => postLike(post.id)}>
                                        Like
                                    </Button>
                                    {post.author === window.localStorage.getItem("username") ? <Button size={'sm'} variant="btn btn-danger" onClick={() => deletePost(post.id)}> Delete </Button> : null}
                                    {/* ITT KELL MAJD A MODERATOR ROLE CHECK */}
                                    {isModerator == true && !(post.author === window.localStorage.getItem("username"))? <Button size={'sm'} variant="btn btn-danger" onClick={() => deletePost(post.id)}> Delete </Button> : null}
                                </Card2>
                            </Col>
                        </Row>
                    </Aux>
                );
            })}
        </Aux>

    );
}

export default SamplePage;