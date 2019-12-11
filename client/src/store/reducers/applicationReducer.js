import { get } from 'lodash';
import { REHYDRATE } from 'redux-persist';

import actionTypes from '../actions/actionTypes';
const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case REHYDRATE:
          return {
            ...state,
            app: action.payload
          };
        
        // Save User Data
        case actionTypes.SAVE_USER_DATA:
          return {
            ...state,
            userData: action.payload
          };
        // Clear User Data
        case actionTypes.CLEAR_USER_DATA:
          return {
            ...state,
            userData: null
          };
        // Request pending
        case actionTypes.REQUEST_PENDING:
          return {
            ...state,
            requests: {
              ...(state.request || {}),
              [action.payload]: true
            },
            response: {
              ...(state.response || {}),
              [action.payload]: null
            }
          };
        // Request failed
        case actionTypes.REQUEST_FAILED:
          return {
            ...state,
            requests: {
              ...(state.request || {}),
              [action.payload]: null
            },
            response: {
              ...(state.response || {}),
              [action.payload]: null
            }
          };
        // Request success
        case actionTypes.REQUEST_SUCCESS:
          return {
            ...state,
            requests: {
              ...(state.request || {}),
              [get(action, 'payload.type', '')]: false
            },
            response: {
              ...(state.response || {}),
              [get(action, 'payload.type', '')]: get(action, 'payload.response', '')
            }
          };
         
        // Clear Request Response
        case actionTypes.CLEAR_REQUEST_RESPONSE:
          return {
            ...state,
            requests: {
              ...(state.request || {}),
              [get(action, 'payload.type', '')]: false
            },
            response: {
              ...(state.response || {}),
              [get(action, 'payload.type', '')]: null
            }
          };
        default:
          return state;
      }
}
export const getCustomerData = (state) => get(state, 'app.userData',null)
export const getCustomerName = (state) => get(state, 'app.userData.name_customer','')

export const getUserData = (state) => get(state, 'app.userData', null);

export const getUserId = (state) => get(state, 'app.userData.userId', '');
// Check API request is waiting for response by action type
export const isAPIRequestLoading = (state, actionType) => get(state, `app.requests.${actionType}`, false);
// Get API response by action type
export const getAPIResponseData = (state, actionType, subKey = '') => get(state, `app.response.${actionType}.data${subKey ? `.${subKey}` : ''}`, null);

export default applicationReducer;