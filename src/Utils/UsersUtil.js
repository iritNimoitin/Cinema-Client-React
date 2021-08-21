import axios from 'axios'

// const getAllUsersFromDB = () => {
//     return axios.get("http://localhost:8000/api/users/");
// }
// const getAllUsersFromJson = () => {
//     return axios.get("http://localhost:8000/api/users/all");
// }
const getAllUsersDetails = () => {
    return axios.get("http://localhost:8000/api/users/details");
}
const updateUser = (obj) => {
    return axios.put("http://localhost:8000/api/users/", obj)
}
const getUserFromDBbyId = (id) => {
    return axios.get("http://localhost:8000/api/users/user/:id" + "/" + id);
}
const getUserFromDBUserName = (id) => {
    return axios.post("http://localhost:8000/api/users/user/:username" + "/" + id);
}
const addUser = (obj) => {
    return axios.post("http://localhost:8000/api/users", obj)
}
// const addUserToJson = (obj) => {
//     return axios.post("http://localhost:8000/api/users/json", obj)
// }

// const updateUser = (id, obj) => {
//     return axios.put("https://jsonplaceholder.typicode.com/users" + "/" + id, obj)
// }

const deleteUser = (id) => {
    return axios.delete("http://localhost:8000/api/users" + "/" + id);
}

export default { deleteUser, getUserFromDBbyId, getUserFromDBUserName, addUser, getAllUsersDetails, updateUser }