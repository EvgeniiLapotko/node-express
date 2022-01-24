const notFound = (req, res, next) => {
    res.status(404).send('<h1>Route not found</h1><a href="/api/v1/tasks">Go to main path</a>')
}

module.exports= notFound
