import axios from "axios";
import {toast} from "react-toastify";


function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt
}

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log("Logging the error", error)
        toast.error("an unexpected error occurred!")
    }
    return Promise.reject(error);
})
export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setJwt
}