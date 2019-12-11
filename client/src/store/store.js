

import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import applicationReducer from './reducers/applicationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {compose} from 'redux'
import { connectRouter,routerMiddleware } from 'connected-react-router'
import {createBrowserHistory} from 'history'

// Configure aplication reducers
const rootReducer =(history) => combineReducers({
  router: connectRouter(history),
  app: applicationReducer
});
export const history = createBrowserHistory()

const configureStore = () => {
  // To run our Saga, we'll have to connect it to the Redux Store using the redux-saga middleware.
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
//   const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // Create store
  const store = createStore(
    rootReducer(history),
    {},
    compose(
        composeWithDevTools(
            
            applyMiddleware(routerMiddleware(history),sagaMiddleware)
            
        )
    )
    
  );

  // Then run the saga
  sagaMiddleware.run(saga);

  return store;
};


export default configureStore;