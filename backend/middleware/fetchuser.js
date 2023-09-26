var jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key =`${process.env.JWT_SECRET}`

const fetchuser = (req, res, next) => {
    //Get the user from jwt token & add id to req object
    const token = req.header('auth-token');

    //if token not present
    if (!token) {
        res.status(401).send({ error: "Please, authenticate user using a valid token" })
    }
    try {
        const data = jwt.verify(token, secret_key);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please, authenticate user using a valid token" })
    }
}

module.exports = fetchuser;