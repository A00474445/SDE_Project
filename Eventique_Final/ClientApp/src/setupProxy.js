const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:16302';

const context =  [
  "/api/User/signup",
  "/api/User/login",
  "/api/User/logout",
  "/api/User/approveuser",
  "/api/User/fetchuser",
  "/api/Event/createevent",
  "/api/Event/viewallevents",
  "/api/Event/joinevent",
  "/api/Event/viewuserevents",
  "/api/Event/viewhostedevents",
  "/api/Event/vieweventData",
  "/api/Payment/makepayment",
  "/api/Payment/viewpayment"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
