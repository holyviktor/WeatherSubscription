function handleErrors(err, req, res, next) {
    const statusCode = 'status' in err ? err.status : 500;
    res.status(statusCode).send(err.message);
}

module.exports = { handleErrors };