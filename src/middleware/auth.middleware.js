const { getUserById } = require("../users/users.controllers");
const config = require('../config')

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.jwtSecret
  };
  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      const data = getUserById(decoded.id)
      if(data){
        console.log("decoded jwt", decoded);
        return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
      } else {
        return done(null, false)
      }
    })
  );
};
