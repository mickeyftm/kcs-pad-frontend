import axios from 'axios';
import { message } from 'antd';
const request = (url, method, param, paramHeaders, onSuccess, onFailure, localStorage) => {
    axios({
        url,
        method,
        data: param,
        headers: {
            ...paramHeaders,
        },
        timeout: 0,
        responseType: 'json',
        withCredentials: true, // sso tidak bisa pakai ini
        crossdomain: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRF-TOKEN',
    }).then((response) => {
        if (response.data.responseCode) {
            if (parseInt(response.data.responseCode, 10) === 1000 || response.data.responseCode === '00') {
                if (onSuccess) {
                    onSuccess(response);
                } else {
                    message.success('sucessfully request data, please handle onSuccess event !');
                }
            } else if (onFailure) {
                if (parseInt(response.data.responseCode, 10) === 2006 || response.data.responseCode === '2006') {
                    localStorage.removeItem(CONSTANTS.COOKIE_TOKEN_KEY);
                    localStorage.removeItem(CONSTANTS.COOKIE_TOKEN_WEB_CONS);
                    localStorage.removeItem(CONSTANTS.COOKIE_USERNAME);
                }
                onFailure(response);
            } else {
                message.error('Request data failed. please try again !');
            }
        } else if (onSuccess) {
            onSuccess(response);
        }
    }).catch((error) => {
        let errorResponse = {};
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const {
                headers, status, statusText, data,
            } = error.response;
            errorResponse = {
                status, statusText, data, headers,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorResponse = { status: 500, statusText: 'Connection to server failed.', responseCode: 9991 };
        } else {
            // Something happened in setting up the request that triggered an Error
            errorResponse = { status: 500, statusText: (error.message ? error.message : 'Something went wrong with the server'), responseCode: 9990 };
        }
        // message.error("Something went wrong with the server !");
        onFailure({ data: errorResponse });
    });
};

const withCsrfTokenHeaders = (headers) => {
    const newHeaders = {
        ...headers,
        // 'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
    return newHeaders;
};

export default request;