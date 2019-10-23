module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://'+process.env.VUE_APP_BACKEND_HOST+'/test.php',
            }
        }
    }
}