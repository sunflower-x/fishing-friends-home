import http from '@/utils/query/http';


export default {
    getUserInfo: () => {
        return http.post('/user/login',{userName:'thomas1'})
    }
}