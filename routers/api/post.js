const router = require('express').Router();

router.get('/',
/**
 * @param {Request} req
 * @param {Response} res
 */
(req, res)=>{res.send('Post route')});

module.exports = router;