module.exports = function(app, db) {
    var passport = require('passport');
    app.get('/getNews', function(request, response) {
        db.collection('News').find().toArray(function(error, result) {
            response.send(result);
        });
    });
    app.get('/getAdminNews', function(request, response) {
        db.collection('News').find().toArray(function(error, result) {
            response.send(result);
        });
    });
    app.post('/addAdminNews', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { title: req.body.title, body: req.body.body, image: req.body.image }
        db.collection('News').insert(user, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/deleteAdminNews', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { title: req.body.title }
        db.collection('News').remove({ "title": user.title }, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/updateAdminNews', passport.authenticate('jwt', { session: false }), function(req, res) {
        const value = { "title": req.body.check };
        const details = {
            $set: {
                title: req.body.title,
                body: req.body.body,
                image: req.body.image
            }
        };
        db.collection('News').updateMany(value, details, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
}