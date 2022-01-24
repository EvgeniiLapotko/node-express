const notFound = (req,res) => {
    res.status(404).send('<h1>Route not found</h1><a href="/api/v1/">Go to main route</a>')
}

module.exports = notFound
