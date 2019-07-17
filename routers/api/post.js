const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
router.get('/',[auth,[check("text","Text is required").not().isEmpty()]],
/**
 * @param {Request} req
 * @param {Response} res
 */
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }



    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post = await newPost.save();
        res.json(post);
    }
    catch(err) {
        console.error(err.mesage);
        res.status(500).send('Server errror');
    }
});

module.exports = router;