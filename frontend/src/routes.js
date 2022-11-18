const host = '/api/v1';

const routes = {
  loginPath: () => [host, 'login'].join('/'),
  signupPath: () => [host, 'signup'].join('/'),
  login: '/login',
  signup: '/signup',
  root: '/',
  any: '*',
};

export default routes;