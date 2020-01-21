module.exports = function(app, db) {
    var passport = require('passport');

    app.get('/getUserTestimonial', function(req, res) {
        //console.log("req:::::", req.params);
        db.collection("testimonial").find({}).toArray((err, result) => {
            if (err) {
                return err;
            }
            console.log("SUCCESS: ", result);
            res.send(result);
        });
    });

    app.post('/saveUserTestimonial', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("req.body", req.body);
        const query = { username: req.body.username, response: req.body.response };
        console.log("req.body.user", req.body.username);
        console.log("req.body.response", req.body.response);
        db.collection("testimonial").insert(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log(result);
                console.log("1 document inserted");
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });

}