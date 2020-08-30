import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const getAllComments = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}/comments`)
    return request.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// Send (POST) anonymous comment. Logging in not necessary therefore no need for authorization configs
const createAnonymousComment = async (id, content) => {
    console.log("service request body content", content)
    const response = await axios.post(`${baseUrl}/${id}/comments`, content)
    return response.data
}

// api/blogs/:id/comments
// const createComment = async (newCommentStr, id) => {
//     const config = {
//         headers: { Authorization: token },
//     }

//     const response = await axios.post(`${baseUrl}/${id}`, newCommentStr, config)
//     return response.data
// }


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = async id => {
    const config = {
        headers: { Authorization: token },
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
}

export default { getAll, create, update, setToken, remove, createAnonymousComment, getAllComments}