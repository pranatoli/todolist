require('dotenv').config();

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token == null) res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw new Error('invalid token');
            req.user = user;
            next();
        })
    } catch (error) {
        res.sendStatus(403)
    }
}

module.exports = {
    authenticateToken,
}