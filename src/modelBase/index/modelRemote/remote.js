import http from '@/utils/query/http';


export default {
    getUserInfo: () => {
        return http.get('/user/info',{id:111})
    }
}