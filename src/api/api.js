import axios from 'axios';

// export const apis = axios.create({
//     baseURL: `http://jsonplaceholder.typicode.com/`,
//     headers: {
//         Authorization: 'Bearer {token}'
//     }
// })


export const api = axios.create({
    baseURL: 'https://62d59d9515ad24cbf2caa1cd.mockapi.io/tets/',
    // baseURL: 'http://localhost:3000/',
    timeout: 30000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export const getproduct = () => {
    return api.get('products')
}