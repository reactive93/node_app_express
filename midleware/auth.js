const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg:"No token, authorization denied"})
    }

    try {
        const decoded = jsonwebtoken.verify(token,config.get('secret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg:'token is not valid'});
    }
};