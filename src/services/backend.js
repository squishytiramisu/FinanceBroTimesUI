import axios from "axios";

const API_URL = "http://localhost:8080/";



const getAllPublicPosts = () => {
    let token = window.localStorage.getItem("token");
    return axios.get(API_URL + "api/portfolio/getAvailableStocks", { headers: {Authorization: `Bearer ${token}`} });
};

const getAllPosts = () => {
    let token = window.localStorage.getItem("token");
  return axios.get(API_URL + "api/blog/getAllBlogPosts", { headers: {Authorization: `Bearer ${token}`} });
};

const register = async (username, email, password) =>  {
    let response =  await axios.post(API_URL + "api/v1/auth/register", {"username": username, "email": email, "password": password});
    window.localStorage.setItem("token", response.data.access_token);
    window.localStorage.setItem("username", username);
    
    return response
};

const likePost = async (id) => {
    let token = window.localStorage.getItem("token");
    let response =  await axios.post(API_URL + "api/blog/toggleLike", {"blogPostId": id}, { headers: {Authorization: `Bearer ${token}`} });
    return response;
};

const addPost = async (title, content) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/blog/addBlogPost", {"title": title, "content": content}, { headers: {Authorization: `Bearer ${token}`} });
    return response;
};


const deletePost = async (id) => {
    let token = window.localStorage.getItem("token");
    let respone = await axios.post(API_URL + "api/blog/deleteBlogPost", {"blogPostId": id}, { headers: {Authorization: `Bearer ${token}`} });
    return respone;
};


const postService = {
  getAllPublicPosts,
  register,
  getAllPosts,
  likePost,
  addPost,
  deletePost,
};

export default postService;