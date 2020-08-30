

// reducer on funktio, joka saa parametrikseen olemassaolevan staten tilan sekä actionin ja palauttaa staten uuden tilan.
// Reduceria ei ole tarkoitus kutsua koskaan suoraan sovelluksen koodista. Reducer ainoastaan annetaan parametrina storen luovalle createStore-funktiolle:

import blogService from '../services/blogs'

export const notificationReducer = (showNotification = null, action) => {
    switch(action.type) {
        case 'SHOW_MESSAGE':
            return action.payload;
        default:
            return showNotification
    }
}


export const blogsReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT':
            console.log("init reducer")
            return action.payload
        case 'LIKE':
            console.log("like reducer")
            return action.payload
        case 'REMOVE':
            console.log("remove reducer")
            return action.payload
        case 'CREATE':
            console.log("create reducer")
            return [...state, action.payload]
        case 'CREATE_COMMENT':
            console.log("comment reducer")
            return action.payload
        default:
            return state
    }
}


export const userReducer = (state="", action) => {
    switch(action.type) {
        case 'SET_USER':
            console.log("set_user reducer")
            return action.payload
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
      const anecs = await blogService.getAll()
      dispatch({
        type: 'INIT',
        payload: anecs,
      })
    }
  }

