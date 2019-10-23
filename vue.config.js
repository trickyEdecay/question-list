module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.168.1.21/eolinker4.0/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}