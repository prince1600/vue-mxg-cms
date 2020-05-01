import request from '@/utils/request'

export default {
    getPageList(page, size, data){
        return request({
            method: 'post',
            url: `/goods/list/search/${page}/${size}`,
            data: data
        })
    },
    addGoods(data){
        return request({
            method: 'post',
            url: '/goods',
            data: data
        })
    },
    getById(id) {
        return request({
            method: 'get',
            url: `/goods/${id}`
        })
    },
    update(id, data) {
        return request({
            method: 'put',
            url: `/goods/${id}`,
            data: data
        })
    },
    delete(id) {
        return request({
            method: 'delete',
            url: `/goods/${id}`,
        })
    }
}