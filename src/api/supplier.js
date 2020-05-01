import request from '@/utils/request'

export default {
    getList(){
        return request({
            method: 'get',
            url: '/supplier/list'
        })
    },
    search(page, pageSize, searchMap){
        return request({
            method: 'post',
            url: `/supplier/list/search/${page}/${pageSize}`,
            data: searchMap
        })
    },
    addSupplier(data){
        return request({
            method: 'post',
            url: '/supplier',
            data: data
        })
    },
    getById(id){
        return request({
            method: 'get',
            url: `/supplier/${id}`,
        })
    },
    update(id,data){
        return request({
            method: 'put',
            url: `/supplier/${id}`,
            data: data
        })
    },
    delete(id){
        return request({
            method: 'delete',
            url: `/supplier/${id}`,
        })
    },
}