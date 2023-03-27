// import axios from 'axios';

// // export const apis = axios.create({
// //     baseURL: `http://jsonplaceholder.typicode.com/`,
// //     headers: {
// //         Authorization: 'Bearer {token}'
// //     }
// // })

// export const api = axios.create({
//     baseURL: 'https://62d59d9515ad24cbf2caa1cd.mockapi.io/tets/',
//     // baseURL: 'http://localhost:3000/',
//     timeout: 30000,
//     // headers: {'X-Custom-Header': 'foobar'}
// });

// export const getproduct = () => {
//     return api.get('products')
// }


import axios from 'axios';

export const api_login = axios.create({
    baseURL: 'http://119.17.200.66:8373/flex/oauth2',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

api_login.interceptors.request.use((config) => {
    config.headers = {
        secret: "f5gDd1JLB0vq6VVBvzEbltq6iVuaddvk",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});
api_login.interceptors.response.use(function(response) {
    // Trả về dữ liệu phản hồi
    console.log('ay :', response)
    localStorage.setItem('token', response.data.access_token)
        // console.log(localStorage.getItem('token'))

    return response;
}, function(error) {
    // Xử lý lỗi
    console.log('lỗi')
    return Promise.reject(error);
});
////////////////  thông tin tài khoản
export const api_profile = axios.create({
    baseURL: 'http://119.17.200.69:8379/v1/datasharing/canbo/token',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // Authorization: `Bearer ${ayy}`,
        // 'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
        // 'Content-Type': 'application/json' // báo cho máy chủ jonbiết dữ liệu được mã hóa theo kiểu 
    },
    data: null
});

api_profile.interceptors.request.use(function(config) {
    if (config.method === 'get') {
        var token = localStorage.getItem('token')
        if (token) {
            config.data = null // xác nhận phương thức get không gửi dữ liệu 
            config.headers = {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
                'Content-Type': 'application/json'
            };
            return config
        }
    }

}, function(error) {
    // Xử lý lỗi
    console.log('lỗi ở intercepter')
    return Promise.reject(error);
});




////// chuyên mục tin tức

export const api_tintuc = axios.create({
    baseURL: 'http://119.17.200.66:8373/v1/datasharing/chuyenmuctintuc/',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // Authorization: `Bearer ${ayy}`,
        // 'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
        // 'Content-Type': 'application/json' // báo cho máy chủ jonbiết dữ liệu được mã hóa theo kiểu 
    },
    data: null
});

api_tintuc.interceptors.request.use(function(config) {
    if (config.method === 'get') {
        var token = localStorage.getItem('token')
        if (token) {
            config.data = null // xác nhận phương thức get không gửi dữ liệu 
            config.headers = {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
                'Content-Type': 'application/json'
            };
            return config
        }
    }

    if (config.method === 'post')
    {
        var token2 = localStorage.getItem('token')
        if (token2) {
            config.headers = {
                Authorization: `Bearer ${token2}`,
                'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
                'Content-Type': 'application/json'
            };
            return config
        }
    }

}, function(error) {
    // Xử lý lỗi

    console.log('lỗi ở intercepter')
    
    return Promise.reject(error);
});

export const them_tt = (data) => {
    return api_tintuc.post('',data)
}

export const capnhat_tt = (PrimKey,data) => {
    
    console.log(PrimKey)
    return api_tintuc.post(`/${PrimKey}`,data)
}