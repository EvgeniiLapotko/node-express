const CustomApiError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthentificatedError = require('./unauthentificated')
const notFound = require('./notFound')


module.exports = {
    CustomApiError,
    BadRequestError,
    UnauthentificatedError,
    notFound
}
