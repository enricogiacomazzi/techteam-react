import axios from "axios";

const token = "prova 123";


export function initInterceptors() {
    axios.interceptors.request.use((cfg) => {
        console.log('req intercetor', cfg);
        return {...cfg, headers: {...cfg.headers, Authentiation: `Bearer ${token}`}}
    });


    axios.interceptors.response.use((res) => {
        console.log('res interceptor', res);
        return {...res, data: res.data.slice(1)};
        // return res;
    }, err => {
        // if (err.status === 401) {
        //     // ...
        // }
        console.log('res interceptor error', err);
        //return Promise.reject(err);
        return Promise.resolve({data: []});
    })

     
}

