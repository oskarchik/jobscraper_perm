const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '10 seconds',
};

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = { cacheInit };
