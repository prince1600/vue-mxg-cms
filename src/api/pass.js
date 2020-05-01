import request from '@/utils/request'

export default {
    checkPass(value, id){
        return request({
            method: 'post',
            url: '/user/pwd',
            data: {
                id: id,
                value: value
            }
        })
    },
    updatePass(value, id){
        return request({
            method: 'put',
            url: '/user/pwd',
            data: {
                id: id,
                value: value
            }
        })
    }
}