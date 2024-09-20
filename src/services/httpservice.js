import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL = config.apiUrl

export function setDefaultCommonHeaders(headerName, headerValue){
    axios.defaults.headers.common[headerName] = headerValue;
}

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaultCommonHeaders,
}

export default httpService;