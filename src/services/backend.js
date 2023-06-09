import axios from "axios";

const API_URL = "https://financebrotimes.azurewebsites.net/";



const getAvailableStocks = () => {
    let token = window.localStorage.getItem("token");
    return axios.get(API_URL + "api/portfolio/getAvailableStocks", { headers: { Authorization: `Bearer ${token}` } });
};

const getAllPosts = () => {
    let token = window.localStorage.getItem("token");
    return axios.get(API_URL + "api/blog/getAllBlogPosts", { headers: { Authorization: `Bearer ${token}` } });
};

const register = async (username, email, password) => {
    let response = await axios.post(API_URL + "api/v1/auth/register", { "username": username, "email": email, "password": password });
    window.localStorage.setItem("token", response.data.access_token);
    window.localStorage.setItem("username", username);


    return response
};

const likePost = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/blog/toggleLike", { "blogPostId": id }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const addPost = async (title, content) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/blog/addBlogPost", { "title": title, "content": content }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

//TODO ezt atnezni azert
const editPost = async (id, title, content) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/blog/editBlogPost", { "blogPostId": id, "title": title, "content": content }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const deletePost = async (id) => {
    let token = window.localStorage.getItem("token");
    let respone = await axios.post(API_URL + "api/blog/deleteBlogPost", { "blogPostId": id }, { headers: { Authorization: `Bearer ${token}` } });
    return respone;
};

const login = async (email, password) => {
    let response;
    try{
        response = await axios.post(API_URL + "api/v1/auth/authenticate", { "email": email, "password": password });
        window.localStorage.setItem("token", response.data.access_token);
        window.localStorage.setItem("username", response.data.username);
        await whoAmi();
    }catch(e){
        throw new Error();
    }
    return response;
};


const logout = async () => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/blog/logout", null, { headers: { Authorization: `Bearer ${token}` } });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    return response;
};

const whoAmi = async () => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/blog/whoAmi", { headers: { Authorization: `Bearer ${token}` } });
    await setTimeout(() => { }, 300);
    window.localStorage.setItem("username", response.data.username);
    window.localStorage.setItem("id", response.data.userId);
    window.localStorage.setItem("email", response.data.email);
    return response;
};


const getCurrentPortfolioByUserId = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/portfolio/getCurrentPortfolioByUserId/" + id, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const getCurrentPortfolioByEmail = async (email) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/portfolio/getCurrentPortfolioByEmail/" + email, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const addStockToPortfolio = async (stock, quantity) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/portfolio/addStockToUserPortfolio", { stockSymbol: stock, quantity: quantity }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const deleteStockFromPortfolio = async (stock) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/portfolio/removeStockFromUserPortfolio", { stockId: stock }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const closeEntirePortfolioByUserId = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/portfolio/closeEntirePortfolioByUserId/" + id, null, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const getRealizedGainByUserId = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/portfolio/getRealizedGainByUserId/" + id, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const sendMail = (id) => {
    let token = window.localStorage.getItem("token");
    let response = axios.post(API_URL + "api/admin/sendMail/" + id, null, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};


const getAllStocksWithPrices = () => {
    let token = window.localStorage.getItem("token");
    return axios.get(API_URL + "api/portfolio/getAllStocksWithPrices", { headers: { Authorization: `Bearer ${token}` } });
};


const getUnrealizedGainByUserId = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/portfolio/getUnrealizedGainByUserId/" + id, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const giveAdminRights = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/admin/giveAdminRights/"+id, null, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const giveModeratorRights = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "api/admin/giveModeratorRights/" + id, null, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const getIsAdmin = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/admin/isAdmin", { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const adminCloseEntirePortfolioById = async (id) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(API_URL + "/api/portfolio/closeEntirePortfolioByUserId/" + id, null, { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

const getIsModerator = async () => {
    let token = window.localStorage.getItem("token");
    let response = await axios.get(API_URL + "api/moderator/isModerator/", { headers: { Authorization: `Bearer ${token}` } });
    return response;
};
const postService = {
    getAvailableStocks,
    register,
    getAllPosts,
    likePost,
    addPost,
    editPost,
    deletePost,
    login,
    logout,
    whoAmi,
    getCurrentPortfolioByUserId,
    getCurrentPortfolioByEmail,
    addStockToPortfolio,
    deleteStockFromPortfolio,
    closeEntirePortfolioByUserId,
    getRealizedGainByUserId,
    sendMail,
    getAllStocksWithPrices,
    getUnrealizedGainByUserId,
    giveAdminRights,
    giveModeratorRights,
    getIsAdmin,
    adminCloseEntirePortfolioById,
    getIsModerator
};

export default postService;