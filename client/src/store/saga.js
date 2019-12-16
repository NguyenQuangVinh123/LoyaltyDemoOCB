import { get } from 'lodash';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import API from './api';
import ActionTypes from './actions/actionTypes'
import { clearUserData, saveUserData, setRequestFailed, setRequestPending, setRequestSuccess, getHotCustomer } from './actions/appilcationActions';

function* login(action) {
    try {
       // Request pending
       yield put(setRequestPending(action.type));
       // Call API to get response
       const response = yield call(API.login, action.payload);
       if (response.status === 200) {
          // Request success
          yield put(setRequestSuccess({
             type: action.type,
             response: response
          }));
          // Save user data
          yield put(saveUserData({ ...response.data.data, id_user: get(action, 'payload.email', '') }));
          // Navigate to home screen
        //   yield put(push('/admin?#/dashboard'))
          // Giống then
           yield action.payload.onSuccess && action.payload.onSuccess(response)
       } else if(response.data.data.status === '0') {
          yield onRequestFailed(action,'Tài khoản bạn chưa được kích hoạt');
       } else{
        yield onRequestFailed(action,'Tài khoản bạn chưa được kích hoạt');

       }
    } catch (e) {
       yield onRequestFailed(action, 'Vui lòng kiểm tra email/password');
    }
};

// Login Customer
function* loginCustomer(action) {
   try {
      // Request pending
      yield put(setRequestPending(action.type));
      // Call API to get response
      const response = yield call(API.loginCustomer, action.payload);
      if (response.status === 200) {
         // Request success
         yield put(setRequestSuccess({
            type: action.type,
            response: response
         }));
         // Save user data
         yield put(saveUserData({ ...response.data.data}));
         // Giống then
          yield action.payload.onSuccess && action.payload.onSuccess(response)
      } else if(response.data.data.status === '0') {
         yield onRequestFailed(action,'Tài khoản bạn chưa được kích hoạt');
      } else{
       yield onRequestFailed(action,'Tài khoản bạn chưa được kích hoạt');

      }
   } catch (e) {
      yield onRequestFailed(action, 'Vui lòng kiểm tra email/password');
   }
}

/**  HANDLE API REQUEST ACTION */
function* callAPI(action) {
   try {
      // Request pending
      yield put({ type: ActionTypes.REQUEST_PENDING, payload: action.type });
      // Call API request to get response
      const response = yield call(action.payload.api, action.payload);
      if (response.status == 200 && get(response, 'data.data', '')) {
         // Handle save response data
         yield put(setRequestSuccess({
            type: action.type,
            response: response
         }));

         // !ignoreMessages && message && Alert.alert(message);
         if (action.payload.onSuccess) {
            yield action.payload.onSuccess(response);
         }
      } else {
         if (action.payload.onError) {
            yield action.payload.onError(response);
         }
         if(response.errorCode === 3){
            yield onRequestFailed(action, 'Số điểm của bạn không đủ để đổi quà');

         }
      }
   } catch (e) {
      if (action.payload.onError) {
         yield action.payload.onError(e);
      }
     
         yield onRequestFailed(action, 'Số điểm của bạn không đủ để đổi quà');
   }
   
}

// Logout Customer

function* logOut(action) {
   try {
      // Request pending
      // const response = yield call(API.logout, action.payload);
      // if (response.status == 200) {
      // Request success
      yield put(setRequestSuccess({
         type: action.type,
      }));
      // Clear user data
      yield put(clearUserData());
      // Navigate to Login screen
      
      // } else {
      //    yield onRequestFailed(action, response.error);
      // }
   } catch (e) {
      yield onRequestFailed(action, e.message);
   }
}

 function* onRequestFailed(action, message = '') {
    try {
       // Request failed
       yield put(setRequestFailed(action.type));
       const ignoreMessages = get(action, 'payload.ignoreMessages', false);
       !ignoreMessages && message && window.alert(message);
    
    } catch (e) {
       console.log(e);
    }
 }
function* mySaga() {
    yield takeLatest(ActionTypes.LOGIN, login);
    yield takeLatest(ActionTypes.LOGIN_CUSTOMER, loginCustomer);
    yield takeLatest(ActionTypes.GET_HOT_PRODUCT, callAPI);
    yield takeLatest(ActionTypes.TRANSACTION, callAPI);
   //  yield takeLatest(ActionTypes.CLEAR_USER_DATA, logOut);

}

export default mySaga;