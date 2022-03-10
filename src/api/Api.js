import axios from 'axios';
import qs from 'qs';
import Storage from '../Storage/Storage';
const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    //timeout: 5000, // default is `0` (no timeout)
    responseType: 'json',
    // headers: {"Access-Control-Allow-Origin": "*"}
    'Content-Type:': 'application/json',
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'paramsSerializer': (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'});
      },
    headers: {'Authorization': 'Bearer ' + Storage.getToken()}
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    config.headers.Authorization = Storage.getToken()
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }

    return response;
}, (error) => {

    if (error.response) {
        throw error.response;
    }

    if (error.request) {
        throw error.request;
    }

    // Handle errors
    throw error;
});

export default axiosClient;