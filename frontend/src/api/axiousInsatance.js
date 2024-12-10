import axious from 'axios'

const  axiousInstance = axious.create({
    baseURL : 'https://practise-9ck3.onrender.com'
})


// every time we refresh the page it take that token and check where user are authinticated or not
axiousInstance.interceptors.request.use(config=>{
    const token = JSON.parse(sessionStorage.getItem('token')) || ' '
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, error => {
    return Promise.reject(error);
  })
export default axiousInstance
