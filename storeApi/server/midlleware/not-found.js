
const notFound = (req, res) => res.status(404).send('<h1>Route does not exist</h1><a href="/api/v1/products">Go to main path</a>')

module.exports = notFound
