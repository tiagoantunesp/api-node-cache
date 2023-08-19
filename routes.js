const url = require('url');

const pessoasControllers = require('./controllers/PessoasController');
const animaisControllers = require('./controllers/AnimaisController');
const carrosControllers = require('./controllers/CarrosController');

routes = [{
    "path": "/animais",
    "method": "GET",
    "handler": animaisControllers.get
  },
  {
    "path": "/animais/{id}",
    "method": "GET",
    "handler": animaisControllers.find
  },
  {
    "path": "/pessoas",
    "method": "GET",
    "handler": pessoasControllers.get
  },
  {
    "path": "/pessoas/{id}",
    "method": "GET",
    "handler": pessoasControllers.find
  },
  {
    "path": "/carros",
    "method": "GET",
    "handler": carrosControllers.get
  },
  {
    "path": "/carros/{id}",
    "method": "GET",
    "handler": carrosControllers.find
  },
];

function routing(req, res) {

  const parsedUrl = url.parse(req.url, true);

  const route = routes.find(route => {
    return matchRouteWithIdPattern(req, route.path, parsedUrl.pathname) && route.method === req.method;
  });

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('Route not found');
    res.end();
  }

}

function matchRouteWithIdPattern(req, routePath, requestPath) {

  const routeSegments = routePath.split('/');
  const requestSegments = requestPath.split('/');

  if (routeSegments.length !== requestSegments.length) {
    return false;
  }

  for (let i = 0; i < routeSegments.length; i++) {
    if (routeSegments[i] === '{id}' && !isNaN(requestSegments[i])) {
      const params = {};
      params[normalizeParamName(routeSegments[i])] = parseInt(requestSegments[i]);
      req.params = params;
      return true;
    } else if (routeSegments[i] !== requestSegments[i]) {
      return false;
    }
  }

  return true;
}

function normalizeParamName(param) {
  return param.replace('{', '').replace('}', '');
}

module.exports = {
  routing
};