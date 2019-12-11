// API RESPONSE
import ActionTypes from './actionTypes';
import API, { Api } from '../api';

const setRequestPending = (payload) => ({
    type: ActionTypes.REQUEST_PENDING,
    payload
});
const setRequestFailed = (payload) => ({
    type: ActionTypes.REQUEST_FAILED,
    payload
});

const setRequestSuccess = ({ type, response }) => ({
    type: ActionTypes.REQUEST_SUCCESS,
    payload: { type, response }
});

const clearRequestResponse = ({ type }) => ({
    type: ActionTypes.REQUEST_SUCCESS,
    payload: { type }
});

// USER DATA
const saveUserData = (userData) => ({
    type: ActionTypes.SAVE_USER_DATA,
    payload: userData,
});

const clearUserData = () => ({
    type: ActionTypes.CLEAR_USER_DATA,
    payload: null,
});

// LOGIN
const login = (payload) => ({
    type: ActionTypes.LOGIN,
    payload: payload,
});

// LOGIN CUSTOMER
const loginCustomer = (payload) => ({
    type: ActionTypes.LOGIN_CUSTOMER,
    payload: {
        ...payload,
        api : Api.loginCustomer
    }
});

// GET HOT PRODUCT
const getHotProduct = (payload) =>({
    type: ActionTypes.GET_HOT_PRODUCT,
    payload: {
        ...payload,
        api: API.getHotProduct
    },
})
const transaction = (payload) =>({
    type: ActionTypes.TRANSACTION,
    payload: {
        ...payload,
        api: API.transactionItem
    },
})


export {
    login,
    loginCustomer,
    transaction,
    getHotProduct,
    saveUserData,
    clearUserData,
     // API RESPONSE
     setRequestPending,
     setRequestFailed,
     setRequestSuccess,
     clearRequestResponse,
}