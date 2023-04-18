import axios from '../../../node_modules/axios/index';


const $host = axios.create({
    baseURL: 'http://localhost:5001/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5001/'
})


$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("AccessToken")}`
    return config
})

$authHost.interceptors.response.use(config => {

    return config
}, async (error) => {

    const originalRequest = error.config

    if (error.response.status == 401 && error.config && !error.config.isRetry) {

        originalRequest.isRetry = true

        try {

            const tokenModel = {

                AccessToken: window.localStorage.getItem("AccessToken"),
                RefrechToken: window.localStorage.getItem("RefrechToken")
            }
            
            const response = await axios.post("http://localhost:5001/api/account/refrech", tokenModel)

            window.localStorage.setItem("AccessToken", response.data.accessToken)
            window.localStorage.setItem("RefrechToken", response.data.refrechToken)
            window.localStorage.setItem("time", response.data.time)

            return $authHost.request(originalRequest)
        } catch (e) {

            console.log(e)
        }
        throw error
    }
})

export {
    $host,
    $authHost,
}
