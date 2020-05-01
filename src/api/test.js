//@代表/src目录，由cli帮我们实现
import request from '@/utils/request'

// request.get('/db.json')
//     .then(res => {
//         console.log(res.data)
//     })

// const req = request({
//     method: 'get',
//     url: '/db.json'
// }).then(res => {
//         console.log(res.data)
//     })

export default {
    axios_req() {
        const req = request({
            method: 'get',
            url: '/emplist'
        })
        return req
    }
}