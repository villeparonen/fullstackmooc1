
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    messages: notificationReducer
})


const Store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)


export default Store