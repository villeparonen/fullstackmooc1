
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAllUsers = async () => {
    console.log("getAllUsers service launch")
    const request = await axios.get(baseUrl)
    return request.data
}

const getOneUser = async (id) => {
    const newUrl = baseUrl + "/" + id
    const request = await axios.get(newUrl)
    return request.data
}

export default { getAllUsers, getOneUser }