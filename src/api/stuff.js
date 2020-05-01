import request from '@/utils/request'

export default {
    search(page, size, searchMap){
        return request({
            method: 'post',
            url: `/stuff/list/search/${page}/${size}`,
            data: searchMap
        })
    },
    addStuff(data) {
        return request({
            method: 'post',
            url: `/stuff`,
            data: data
        })
    },
    getById(id){
        return request({
            method: 'get',
            url: `/stuff/${id}`,
        })
    },
    update(id,data) {
        return request({
            method: 'put',
            url: `/stuff/${id}`,
            data: data
        })
    },
    delete(id) {
        return request({
            method: 'delete',
            url: `/stuff/${id}`,
        })
    },
}