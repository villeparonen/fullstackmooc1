

export const giveNotification = message => {
    return {
        type: 'SHOW_MESSAGE',
        payload: message
    };
};

export const createBlogs = contentObj => {
    return {
        type: 'CREATE',
        payload: contentObj
    };
};


export const createComment = contentObj => {
    return {
        type: 'CREATE_COMMENT',
        payload: contentObj
    };
};

export const likeBlog = contentObj => {
    return {
        type: 'LIKE',
        payload: contentObj
    };
};


export const removeSelectedBlog = contentObj => {
    return {
        type: 'REMOVE',
        payload: contentObj
    };
};


export const initBlogs = contentObj => {
    return {
        type: 'INIT',
        payload: contentObj
    };
};


export const setUserAction = contentObj => {
    return {
        type: 'SET_USER',
        payload: contentObj
    };
};

export const LogOutUserAction = () => {
    return {
        type: 'LOGOUT_USER'
    };
};


// export const add = (content) => {
//     let newObj = asObject(content)
//     anecdotesService.createNew(newObj)
//     return {
//       type: 'ADD',
//       data: newObj
//     }
// }