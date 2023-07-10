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
    baseURL: 'http://119.17.200.66:8373/v1/datasharing',
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

export const getcanbo   = (page) =>{
    return  api_menu.get(`/canbo/filter`,{
        params:{
            page:page,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:'',
            thamChieu_maMuc:''
        }
    })
    // console.log('get data canbo ' , data.data.content.length)
    // console.log('ayyyy')
   
}

export const getcanbo_by_coQuan   = (data_) =>{
    return  api_menu.get(`/canbo/filter`,{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:'',
            thamChieu_maMuc:'',
            coQuanDonVi_maHanhChinh:data_
        }
    })

   
}

export const get_coquandonvi =()=>{
    return api_menu.get('/coquandonvi/filter',{
        params:{
            page:0,
            size:100,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:'',
            thamChieu_maMuc:''
        }
    })
}

export const get_tinh=()=>{
    return api_menu.get('/tinhthanh/filter',{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:1,
            thamChieu_maMuc:''
        }
    })
}

export const get_quan =(maq)=>{
   
    return api_menu.get(`/quanhuyen/filter`,{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            thamChieu_maMuc:maq,
            tinhTrang:1
        }
    })
}

export const get_phuong =(map)=>{
    return api_menu.get(`/phuongxa/filter`,{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            thamChieu_maMuc:map,
            tinhTrang:1
        }
    })
}
export const get_gioitinh = ()=>{
    return api_menu.get('/gioitinh/filter',{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:1,
            thamChieu_maMuc:''
        }
    })
}

export const get_nhomQuyen = ()=>{
    return api_menu.get('/nhomquyen/filter',{
        params:{
            page:0,
            size:20,
            keyword:'',
            orderFields:'',
            orderTypes:'',
            tinhTrang:1,
            thamChieu_maMuc:'',
            
        }
    })
}

export const post_capQuyen = (data)=>{
    return api_menu.post('/canbo/many',data)
}


export const post_themCanBo = (data) =>{
    return api_menu.post('/canbo',data)
}

export const post_updateCanBo = (PrimKey,data) =>{
    return api_menu.post(`/canbo/${PrimKey}`,data)
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
    if(error.response.status === 401){
        console.log('ây có lỗi 401 địa chỉ api menu ');
        window.location.href = "/";
    }
    console.log('lỗi request qpi cán bộ')
    return Promise.reject(error);
});

export const get_sinhVien=(page)=>{
    return api_menu.get(`/sinhvien/filter`,{params:{  //  đây là một  query params nó khác hẳn với Parameter (API Endpoint) (thuật ngữ) : /sinhvien/filter đây mới là Parameter (API Endpoint) , query(thuật ngữ) : để lọc các giá trị của trả về của server  , params (thuật ngữ) : thường được sử dụng để chỉ các tham số được truyền vào trong phần thân của một request, thường là ở phương thức HTTP POST
        page:page,
        size:20,
        keyword:'',
        orderFields:'',
        orderTypes:'',
        tinhTrang:'',
        thamChieu_maMuc:''
    }})
}

export const post_themSinhVien = (data)=>{
    
    return api_menu.post('/sinhvien',data)
}

export const post_themThuMucAnh = (key,data) =>{
    return api_menu.post(`/sinhvien/${key}`,data)
}

export const post_capNhatSinhVien = (key,data) =>{
    return api_menu.post(`/sinhvien/${key}`,data)
}


export const upload_img = (formData)=>{
    // console.log("files:...", formData.get("files"))
    
    var token = getCookie('login_token')
    let config = {
        method: 'post',
        url: 'http://119.17.200.66:8373/v1/datasharing/album/upload' ,
        headers: {
          'Accept': 'application/json',
        //   'Content-Type': 'application/json',
          'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: formData,
        params: {}
      }

    return axios(config)
}

export const delete_image_ = (PrimKey, MainImage) =>{
    // return api_menu.delete(`album/${PrimKey}/attachment/${MainImage}`)


    var token = getCookie('login_token')
    let config = {
        method: 'delete',
        url: `http://119.17.200.66:8373/v1/datasharing/album/${PrimKey}/attachment/${MainImage}` ,
        headers: {
          'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: '',
        params: {}
      }

    return axios(config)
}


export const get_Tintuc = (page)=>{
    return api_menu.get(`/chuyenmuctintuc/filter`,{
        params:{
            page:page,
            size:"20",
            keyword:"",
            orderFields:"",
            orderTypes:'',
            tinhTrang:'',
            thamChieu_maMuc:'',
            NgayTaoFrom:'0',
            NgayTaoTo:'0',
        }
    })
}

export const post_themTinTuc = (MaChuyenMuc,TenChuyenMuc,TenTiengAnh,SoThuTu,TinhTrang,MaChuyenMucCha,PhanQuyenChuyenMuc_arr) =>{
    return api_menu.post(`/chuyenmuctintuc`,{
        MaChuyenMuc: MaChuyenMuc,
        TenChuyenMuc: TenChuyenMuc,
        TenTiengAnh: TenTiengAnh,
        SoThuTu: SoThuTu,
        TinhTrang: TinhTrang,
        MaChuyenMucCha: MaChuyenMucCha,
        PhanQuyenChuyenMuc: PhanQuyenChuyenMuc_arr
    
    })
}

export const post_capNhatTinTuc =(PrimKey,MaChuyenMuc,TenChuyenMuc,TenTiengAnh,SoThuTu,TinhTrang,MaChuyenMucCha,PhanQuyenChuyenMuc_arr) =>{
    return api_menu.post(`/chuyenmuctintuc/${PrimKey}`,{
        MaChuyenMuc: MaChuyenMuc,
        TenChuyenMuc: TenChuyenMuc,
        TenTiengAnh: TenTiengAnh,
        SoThuTu: SoThuTu,
        TinhTrang: TinhTrang,
        MaChuyenMucCha: MaChuyenMucCha,
        PhanQuyenChuyenMuc: PhanQuyenChuyenMuc_arr
    })
}

export const delete_xoaTinTuc = (PrimKey)=>{

    var token = getCookie('login_token')
    let config = {
        method: 'delete',
        url: `http://119.17.200.66:8373/v1/datasharing/chuyenmuctintuc/${PrimKey}` ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: '',
        params: {}
      }

    return axios(config)




    

}


/////////////////////kho số hóa 
export const api_login_ksh = axios.create({
    baseURL: 'http://119.17.200.69:8004/realms/flex-v2-dev/protocol/openid-connect/token',
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length':'<calculated when request is sent>',
        'Accept':'*/*'
    },
});

api_login_ksh.interceptors.request.use((config) => {
    config.headers = {
        // secret: "BMKQDYC1TYHilQa1xe5IXqBLPBMaibwz",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    return config;
}, function(error) {
    
    return Promise.reject(error);
});
api_login_ksh.interceptors.response.use(function(response) {
    // Trả về dữ liệu phản hồi
    
    // localStorage.setItem('token', response.data.access_token)
    taocock('login_khoSoHoa' , response.data.access_token,'36000');
        // console.log(localStorage.getItem('token'))

    return response;
}, function(error) {
    // Xử lý lỗi
    console.log(' có lỗi trong respong api login kho số hóa')
    return Promise.reject(error);
});

export const login_khoSoHoa = (data)=>{
    console.log(data);

    return api_login_ksh.post("",{
        grant_type:"password",
        client_id:"mtdata-idpmgt267",
        client_secret:"BMKQDYC1TYHilQa1xe5IXqBLPBMaibwz",

        
        username:"mtdata",
        password:"Mtdata@123456"

    })

}

const api_khoSoHoa = axios.create({
    baseURL: 'http://119.17.200.69:8004/',
    // timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
    }
})


api_khoSoHoa.interceptors.request.use((config)=>{
    
        var token = getCookie('login_khoSoHoa')

        if (token) {
            config.data = null // xác nhận phương thức get không gửi dữ liệu 
            config.headers = {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
                'Content-Type': 'application/json'
            };
            return config
        }
    

}, function(error) {
    // Xử lý lỗi
    console.log('lỗi ở intercepter')
    return Promise.reject(error);
})

export const get_TTHC =(page,side) =>{

    return api_khoSoHoa.get("/publicadministrativemgt/internal/thutuchanhchinh/1.0/filter",{
        params : {
            page:page,
            size:side,
            linhVucThuTuc_MaMuc:"G04-GT06"
        }
    })

}


export const get_DetailThuTuc = (PrimKey) =>{

    return api_khoSoHoa.get(`/publicadministrativemgt/internal/thutuchanhchinh/1.0/${PrimKey}`)
    
}

export const get_linhVuc = () =>{
    return api_khoSoHoa.get('http://119.17.200.69:8004/publicadministrativemgt/internal/linhvucthutuc/1.0/filter')
}

export const get_mucDo = ()=>{
    return api_khoSoHoa.get('http://119.17.200.69:8004/publicadministrativemgt/internal/mucdodvctructuyen/1.0/filter')
}

export const get_capTT = ()=>{
    return api_khoSoHoa.get('http://119.17.200.69:8004/publicadministrativemgt/internal/capthuchienthutuc/1.0/filter')
}

export const get_coQuan = ()=>{
    return api_khoSoHoa.get('http://119.17.200.69:8004/publicadministrativemgt/internal/coquanthuchientthc/1.0/filter')
}
