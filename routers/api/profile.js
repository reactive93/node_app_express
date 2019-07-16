const router = require('express').Router();
const auth = require('../../midleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');

router.get('/me',auth,
/**
 * @param {Request} req
 * @param {Response} res
 */
async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if (!profile) {
            return res.status(400).json({msg:'No profile for this user'})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


router.post('/',[auth,[
    check('status','Status is requred').not().isEmpty(),
    check('skills','Skills is requred').not().isEmpty()
]],
/**
 * @param {Request} req
 * @param {Response} res
 */
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;

});

module.exports = router;

