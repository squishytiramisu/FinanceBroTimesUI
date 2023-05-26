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
    return response
};



const postService = {
  getAllPublicPosts,
  register,
  getAllPosts
};

export default postService;