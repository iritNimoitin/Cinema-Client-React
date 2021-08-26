import axios from 'axios'

const getAllSubscriptions = () => {
    return axios.get("http://localhost:8001/api/subscriptions");
}
const getSubscriptionById = (id) => {
    return axios.get("http://localhost:8001/api/subscriptions" + "/" + id);
}
export default { getAllSubscriptions, getSubscriptionById }