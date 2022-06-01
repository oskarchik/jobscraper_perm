const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '10 seconds',
  engine: require('expeditious-engine-memory')(),
};

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = { cacheInit };
