import http from '@/utils/query/http';


export default {
    getUserInfo: () => {
        return http.post('/user/login',{id:111})
    }
}