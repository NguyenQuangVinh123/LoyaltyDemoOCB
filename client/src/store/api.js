import axios from 'axios';
import { get, omit } from 'lodash';
import configs from '../config/config'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const cancelAllRequests = () => source.cancel('');

const makeHttpRequest = ({ method = 'get', url , bodyData = {}  }) => {
    // const token = get(bodyData, 'token', '');
    return axios({
        url: url,
        method,
        header : {
            "Content-Type" : "application/json"
        },
        data: omit(bodyData),
        // cancelToken: source.token
    });
};
const getAPI = ({ url }) => {
    return makeHttpRequest({ method: 'get', url });
};

const postAPI = ({ url, bodyData }) => {
    return makeHttpRequest({ method: 'post', url, bodyData });
};

const login = ({ email, password }) => {
    return postAPI({
        url: `${configs.serverUrl}/api/users/login`,
        bodyData: {
            email,
            password,
        }
    });
};

const loginCustomer = ({email_customer,password_customer}) => {
    return postAPI({
        url: `${configs.serverUrl}/api/customers/loginCustomer`,
        bodyData :{
            email_customer,
            password_customer,
        }
    })
};

const transactionItem = ({ id_product,id_customer,total_point,quantity}) => {
    return postAPI({
        url: `${configs.serverUrl}/api/transaction`,
        bodyData :{
            id_product,
            id_customer,
            total_point
        }
    })
}


const getHotProduct = () => {
    return getAPI({
        url: `${configs.serverUrl}/api/products`,
        
    })
}



export const Api = {
    makeHttpRequest,
    transactionItem,
    cancelAllRequests,
    getAPI,
    postAPI,
    login,
    loginCustomer,
    getHotProduct,
    
};

export default Api;
