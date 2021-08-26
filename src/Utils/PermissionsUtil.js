import axios from 'axios'

const getAllPermissions = () => {
    return axios.get("http://localhost:8001/api/permissions");
}

export default { getAllPermissions }