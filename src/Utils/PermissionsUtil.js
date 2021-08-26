import axios from 'axios'

const getAllPermissions = () => {
    return axios.get("http://localhost:8000/api/permissions");
}
const getPermissionsById = (id) => {
    console.log(id);
    return axios.get("http://localhost:8000/api/permissions" + "/" + id);
}
export default { getAllPermissions, getPermissionsById }