module.exports = {
    devServer: {
        port: 8888,
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                // target: 'http://mengxuegu.com:7300/mock/5e7821a01c5f7f209577b31c',
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: '',
                }
            }
        }
    },
    lintOnSave: false,
    productionSourceMap: false
}