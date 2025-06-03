const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RajbirGoodBoy';

// Endpoint: api/auth/createuser
router.post('/createuser', [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);

    // If errors exist, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Checking if such an email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "Sorry, a user of this email already exists" });
    }

    // Creating salt and hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass
    })

    // Signing a jwt token to the user
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);  // We are associating/linking user's id to authToken

    res.json(authtoken);
})

// Endpoint: api/auth/login
router.post('/login', [
    body('email').isEmail(),
    body('password', 'Password should not be blank').exists()
], async (req, res) => {
    const { email, password } = req.body;

    try {

        //Checking if such an email already exists
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Sorry, no such user exists" });
        }

        //Comparing passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "You have entered a wrong password" });
        }

        // Signing a jwt token to the user
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json(authtoken);

    }
    catch (error) {

        res.status(500).send("Internal server error");

    }
})

// Endpoint: api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // -password means except password
        res.send(user);

    } catch (error) {

        res.status(500).send("Internal server error");

    }

})

module.exports = router;