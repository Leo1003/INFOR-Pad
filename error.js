const util = require('util')

function ApiError(status, message) {
  this.name = 'HTTPError';
  this.status = status || 500;
  this.message = message || 'Server Error';
  this.stack = (new Error()).stack;
}
util.inherits(ApiError, Error)

exports.ApiError = ApiError
