import axios from 'axios'

const guestInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true // отправлять cookie
})

const authInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true // отправлять cookie
})

// добавляем в запрос данные для авторизации с помощью перехватчика (interceptor)
const authInterceptor = (config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = 'Bearer ' + token;
    }
    return config
}
authInstance.interceptors.request.use(authInterceptor, error => {
    console.error("Error in authInterceptor:", error);
    return Promise.reject(error);
})

export {
    guestInstance,
    authInstance
}