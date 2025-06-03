const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RajbirGoodBoy';

// fetchuser is a function which is used here to extract user id from the token provided
// The simple idea of this function is that we will provide it token of a user and it will give us the id
const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token(Rajbir jo tune header mai token dala hai woh galat hai)" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); // If the token verifies then it will return the data variable that we have Signed to the user while signing a jwt token in auth.js

        req.user = data.user;
        next(); // this will call the function which is just written after it
    } catch (error) {
        return res.status(401).json({ error: "Please authenticate using a valid token(Rajbir jo tune header mai token dala hai woh galat hai)" });
    }
}

module.exports = fetchuser;