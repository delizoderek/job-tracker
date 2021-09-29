const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = 'DisisAsecret';
const expiration = '2h';

module.exports = {
  // Middleware function for authentication routes.
  // Checks if the token is in the headers 
  authMiddleware: function (req,res,next) {
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.split(' ').pop().trim();
      try{
        const {data} = jwt.verify(token,secret,{maxAge: expiration});
        req.user = data;
        next();
      } catch(error) {
        console.log(error);
        res.sendStatus(403);
      }
    } else {
      next();
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};