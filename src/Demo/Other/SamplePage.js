import React, {Component,useState,useEffect} from 'react';
import {Row, Col,Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import PostService from '../../services/backend';

const SamplePage = () => {

    const [posts, setPosts] = useState([]);

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
                    <Aux key={post.id}>
                        <Row>
                            <Col>
                                <Card id={post.id} title={post.title} likes={post.likeCount} author={post.author} isOption>
                                    <p>
                                        {post.content}
                                    </p>
                                    <Button size={'sm'} variant="primary" onClick={() => postLike(post.id)}>
                                                Like   
                                    </Button>

                                </Card>
                            </Col>
                        </Row>
                    </Aux>
                );
            })
        );
}

export default SamplePage;