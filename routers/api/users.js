const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');
const graravar = require('gravatar');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
/**
 * public
 * post
 * register new user
 */
router.post('/',[check("name","field is required").not().isEmpty(),
                check("email","Invalid email").isEmail(),
                check("password","Please input password 6 or more characters").isLength({min:6})
],
/**
 * @param {Request} req
 * @param {Response} res
 */
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors:errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({errors:[{msg:"User already used"}]});
        }

        const avatar = graravar.url(email, {
            s:'200',
            r:'pg',
            d:'mm'
        });
        const new_user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash(password, salt);
        await new_user.save();


        const payload = {
            user:{
                id:new_user.id
            }
        };

        jsonwebtoken.sign(payload, config.get('secret'), {
            expiresIn:360000
        },
        (err, token)=>{
            if (err) {
                throw err;
            }
            res.json({token});
        });

    }
    catch(err) {
        console.log(err.massage);
        res.status(500).send('Server error');
    }

});

module.exports = router;