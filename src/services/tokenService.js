const jwt = require('jsonwebtoken');
const CustomError = require('../models/customError.js');

class TokenService {
    issueToken(email) {
        return jwt.sign({ email: email, iss: 'Node-Auth' }, process.env.SECRET_KEY, {});
    }

    checkToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return decoded.email;
        } catch (err) {
            throw new CustomError(400, 'Invalid token');
        }
    }
}

module.exports = {TokenService};