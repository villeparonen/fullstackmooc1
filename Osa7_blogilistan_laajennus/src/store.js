
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { blogsReducer, notificationReducer, userReducer } from './reducers';


const reducer = combineReducers({
    blogs: blogsReducer,
    message: notificationReducer,
    user: userReducer
})


const Store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)


export default Store