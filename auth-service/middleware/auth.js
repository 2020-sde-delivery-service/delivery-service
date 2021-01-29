const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = {}; // find user with (decoded.id === id and tokens.token === token)

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'You do not have the necessary permissions. Please authenticate!' });
    }
}

module.exports = { authUser };