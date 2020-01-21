module.exports = function(app, db) {
    var passport = require('passport');

    app.get('/userslide', function(request, response) {
        db.collection('Slide').find().toArray(function(err, docs) {
            response.send(docs);
        });
    });
    app.get('/uservideo', function(request, response) {
        db.collection('Video').find().toArray(function(err, docs) {
            response.send(docs);
        });
    });
    app.get('/getAdminSlide', function(request, response) {
        db.collection('Slide').find().toArray(function(err, docs) {
            response.send(docs);
        });
    });
    app.post('/addAdminSlide', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { image: req.body.image, caption: req.body.caption, details: req.body.details }
        db.collection('Slide').insert(user, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/deleteAdminSlide', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { caption: req.body.title }
        db.collection('Slide').remove({ "caption": user.caption }, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/updateAdminSlide', passport.authenticate('jwt', { session: false }), function(req, res) {
        const value = { "caption": req.body.check };
        const details = {
            $set: {
                caption: req.body.caption,
                details: req.body.details,
                image: req.body.image
            }
        };
        db.collection('Slide').updateMany(value, details, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.get('/getAdminVideo', function(request, response) {
        db.collection('Video').find().toArray(function(err, docs) {
            response.send(docs);
        });
    });
    app.post('/addAdminVideo', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { video: req.body.title }
        db.collection('Video').insert(user, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/deleteAdminVideo', passport.authenticate('jwt', { session: false }), function(req, res) {
        var user = { video: req.body.title }
        db.collection('Video').remove({ "video": user.video }, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
    app.post('/updateAdminVideo', passport.authenticate('jwt', { session: false }), function(req, res) {
        const value = { "video": req.body.check };
        const details = {
            $set: {
                video: req.body.title
            }
        };
        db.collection('Video').updateMany(value, details, (err, result) => {
            if (err) return console.log('err in if');
            res.send(true);
        })
    });
}