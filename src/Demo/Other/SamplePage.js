import React, {Component,useState,useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import PostService from '../../services/backend';

const SamplePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.getAllPosts().then(
          (response) => {
            console.log(response.data);
            setPosts(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
      }, []);

        return (
            posts.map((post) => {
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card title={post.title} isOption>
                                    <p>
                                        {post.content}
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    </Aux>
                );
            })
        );
}

export default SamplePage;