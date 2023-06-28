const jwt = require('jsonwebtoken');
const secret = process.env.secret_key;

const authenticate = (req, res, next) => {
    // Extract the JWT token from the request headers, cookies, or wherever it is included
    const token = req.cookies.usertoken;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }

        // Attach the decoded user information to the request object for further use
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;