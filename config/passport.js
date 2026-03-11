const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const pool = require("../models/db");

const options = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {

 passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {

   try {

    const user = await pool.query(
     "SELECT * FROM users WHERE id=$1",
     [jwt_payload.userId]
    );

    if (user.rows.length > 0) {
     return done(null, user.rows[0]);
    } else {
     return done(null, false);
    }

   } catch (err) {
    return done(err, false);
   }

  })
 );

};