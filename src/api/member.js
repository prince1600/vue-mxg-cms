import request from '@/utils/request'

export default {
    getList() {
        return request({
            method: 'get',
            url: '/member/list'
        })
    },
    search(page, size, searchMap) {
        return request({
            method: 'post',
            url: `/member/list/search/${page}/${size}`,
            data: searchMap
        })
    },
    addMember(data) {
        return request({
            method: 'post',
            url: '/member',
            data: data
        })
    },
    getById(id) {
        return request({
            method: 'get',
            url: `/member/${id}`
        })
    },
    update(id,data) {
        return request({
            method: 'put',
            url: `/member/${id}`,
            data: data
        })
    },
    deleteById(id) {
        return request({
            method: 'delete',
            url: `/member/${id}`,
        })
    }
}