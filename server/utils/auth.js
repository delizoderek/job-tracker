const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
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
      } catch {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(401);
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};