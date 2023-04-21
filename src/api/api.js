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
import { getCookie, taocock } from './cookie';
import { menu_pina } from '@/pinia/Store';

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
    // console.log('ay :', response)
    // localStorage.setItem('token', response.data.access_token)
    taocock('login_token' , response.data.access_token,'36000');
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
        // var token = localStorage.getItem('token')
        var token = getCookie('login_token')
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
        // var token = localStorage.getItem('token')
        var token = getCookie('login_token')
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
        // var token2 = localStorage.getItem('token')
        var token2 = getCookie('login_token')
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
    
    // console.log(PrimKey)
    return api_tintuc.post(`/${PrimKey}`,data)
}

///////////////////////////////////
/////menu

export const api_menu = axios.create({
    baseURL: 'http://119.17.200.66:8373/v1/datasharing/',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // Authorization: `Bearer ${ayy}`,
        // 'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
        // 'Content-Type': 'application/json' // báo cho máy chủ jonbiết dữ liệu được mã hóa theo kiểu 
        
    },
    data: null
});
api_menu.interceptors.request.use(function(config) {
    if (config.method === 'get') {
        // var token = localStorage.getItem('token')
        var token = getCookie('login_token')
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
        // var token2 = localStorage.getItem('token')
        var token2 = getCookie('login_token')
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


export const get_menu = async() =>{
     const data= await api_menu.get('/menu/filter?page=0&size=100&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=')
    //  console.log('ayyyyyyy',data.data.content)
    const pina_menu = menu_pina();
    pina_menu.actions_login(data.data.content)
    return data.data.content;
}


///// api cán bộ


export const tr_canbo = axios.create({
    baseURL: 'http://119.17.200.66:8373/v1/datasharing/',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // Authorization: `Bearer ${ayy}`,
        // 'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
        // 'Content-Type': 'application/json' // báo cho máy chủ jonbiết dữ liệu được mã hóa theo kiểu 
        
    },
    data: null
});


tr_canbo.interceptors.request.use(function(config) {
    if (config.method === 'get') {
        // var token = localStorage.getItem('token')
        var token = getCookie('login_token')
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
        // var token2 = localStorage.getItem('token')
        var token2 = getCookie('login_token')
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

export const getcanbo   = () =>{
    return  api_menu.get('/canbo/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=')
    // console.log('get data canbo ' , data.data.content.length)
    // console.log('ayyyy')
   
}

export const getcanbo_by_coQuan   = (data_) =>{
    return  api_menu.get(`/canbo/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=&coQuanDonVi_maHanhChinh=${data_}`)

   
}

export const get_coquandonvi =()=>{
    return api_menu.get('/coquandonvi/filter?page=0&size=100&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=')
}

export const get_tinh=()=>{
    return api_menu.get('/tinhthanh/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=1&thamChieu_maMuc=')
}

export const get_quan =(maq)=>{
    return api_menu.get(`/quanhuyen/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&thamChieu_maMuc=${maq}&tinhTrang=1`)
}

export const get_phuong =(map)=>{
    return api_menu.get(`/phuongxa/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&thamChieu_maMuc=${map}&tinhTrang=1`)
}
export const get_gioitinh = ()=>{
    return api_menu.get('/gioitinh/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=1&thamChieu_maMuc=')
}

export const get_nhomQuyen = ()=>{
    return api_menu.get('/nhomquyen/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=1&thamChieu_maMuc=&=&=')
}

export const post_capQuyen = (data)=>{
    return api_menu.post('/canbo/many',data)
}


export const post_themCanBo = (data) =>{
    return api_menu.post('/canbo',data)
}

api_menu.interceptors.response.use(function(response) {
    // Trả về dữ liệu phản hồi
    // console.log('ay :', response)
    // localStorage.setItem('token', response.data.access_token)
    // taocock('login_token' , response.data.access_token,'36000');
        // console.log(localStorage.getItem('token'))

    return response;
}, function(error) {
    // Xử lý lỗi
    // window.location.href = "http://localhost:8080/";
    console.log('lỗi')
    return Promise.reject(error);
});

