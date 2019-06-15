const config = require('config');
const jwt = require('jsonwebtoken');
//esse middleware serve para deixar rotas privadas x)

function auth(req, res, next) {//padroa de uma função middleware
    const token = req.header('x-auth-token');

    //check for token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
    //verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // add user from payload
    req.user = decoded;
    next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;