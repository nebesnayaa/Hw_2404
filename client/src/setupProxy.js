const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.privatbank.ua',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};