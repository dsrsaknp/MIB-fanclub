const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport, db, mongo) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'MYSECRETKEY';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload.data._id);
        var objectId = new mongo.ObjectId(jwt_payload.data._id);
        db.collection("user").findOne({ "_id": objectId }, (err, user) => {
            if (err) {

                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}