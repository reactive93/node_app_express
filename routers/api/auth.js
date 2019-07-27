const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const auth = require('../../midleware/auth');

const User = require('../../models/User');

router.post('/',[
                check("email","Invalid email").isEmail(),
                check("password","Password is required").exists()
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

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors:[{msg:"Ivalid credentials"}]
            }
        );
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                {
                    errors:[{msg:"Ivalid credentials"}]
                }
            );
        }
        const payload = {
            user:{
                id:user.id
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

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;