module.exports = function(app, db) {
    var passport = require('passport');
    var jwt = require('jsonwebtoken');
    var nodemailer = require("nodemailer");
    var rand, mailOptions, host, link;
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mibfanclub2018@gmail.com",
            pass: "mibuser123"
        }
    });

    app.get('/contestTest', function(req, res) {
        res.send('testing');
    });

    app.get('/getLeaderBoard', (request, response) => {
        db.collection('UserCredits').find({}).toArray((err, result) => {
            if (err) {
                return err;
            }
            if (result.length > 10) {
                result.length = 10;
            }
            result = result.sort((a, b) => {
                return b.credits - a.credits;
            });

            response.send(result);
        });
    });

    app.get('/getContests/:num', (request, response) => {
        var num = request.params.num;
        db.collection('Contests').find({}).toArray((err, result) => {
            if (err) {
                return err;
            }
            if (result.length > num) {
                result.length = num;
            }
            response.send(result);
        });
    });
    app.get('/getUpcomingContests', (request, response) => {
        db.collection('UpcomingContests').find({}).toArray((err, result) => {
            if (err) {
                return err;
            }
            response.send(result);
        });
    });
    app.post('/postCreditScore', passport.authenticate('jwt', { session: false }), async(request, response) => {
        var prevCredits = await getPreviousScore(request.body.username);
        if (prevCredits === false) {
            response.send(false);
        }
        var currentCredits = prevCredits + parseInt(request.body.score);
        if (currentCredits === NaN) {
            response.send(false);
        }

        var query = { "username": request.body.username };
        var update = {
            $set: {
                "username": request.body.username,
                "fname": request.body.fname,
                "lname": request.body.lname,
                "credits": currentCredits,
            },
            $push: {
                "quizesGiven": {
                    qName: request.body.qName
                }
            }

        }
        db.collection('UserCredits').updateOne(query, update, { upsert: true }, (error, result) => {
            if (error) response.send(false);
            response.send(true);
        });
    });



    async function getPreviousScore(username) {
        return new Promise(
            (resolve) => {
                db.collection("UserCredits").findOne({ username: username },
                    (err, result) => {
                        if (err) {
                            console.log('err in if');
                            resolve(false);
                        }
                        if (result) {
                            resolve(result.credits);
                        } else {
                            //console.log('not found');
                            resolve(0);
                        }
                    });
            }
        );


    }
    app.get('/getCreditScore/:username', passport.authenticate('jwt', { session: false }), (request, response) => {
        var query = { 'username': request.params.username }
        db.collection("UserCredits").findOne(query, (err, result) => {
            response.send(result);
        });
    });

    app.post('/getQuestions', passport.authenticate('jwt', { session: false }), async(request, response) => {

        var qId = request.body.qId;
        var userEmail = request.body.userEmail;
        var qName = request.body.name;
        if (!await canGive(userEmail, qName)) {
            response.send(false);
            return;
        }
        var query = { "name": qName };
        db.collection("ContestQuestions").findOne(query, (err, result) => {
            if (result)
                response.send(result.questions);
            else
                response.send(false);
        });
    });

    async function canGive(userEmail, qName) {
        return new Promise(
            (resolve) => {
                var query = { username: userEmail };

                flag = true;
                db.collection('UserCredits').findOne(query, (err, result) => {



                    if (!result) {
                        resolve(true);
                        return;
                    }
                    var quizesGiven = result.quizesGiven;
                    quizesGiven.forEach(quiz => {
                        if (qName === quiz.qName) {


                            resolve(false);
                            return;
                        }
                    });
                    resolve(true);
                });

            }
        );
    }

    app.post('/sendNotifEmail', (request, response) => {
        var contestName = request.body.name;
        var email = request.body.userEmail;
        var mailOptions = {
            to: email,
            subject: contestName + " - Thank you for showing your Intrest",
            html: "<h3>We will notify you when <b>" + contestName + "</b> starts</h3> "
        }
        smtpTransport.sendMail(mailOptions, function(error, result) {
            if (error) {
                response.send(false);
            } else {
                response.send(true);
            }
        });
    });

    app.post('/postUpcomingContest', passport.authenticate('jwt', { session: false }), (request, response) => {
        db.collection('UpcomingContests').insert(
            request.body,
            (error, result) => {
                if (error) response.send(false);
                response.send(true);
            }
        );
    });

    app.post('/isDuplicate', passport.authenticate('jwt', { session: false }), (request, response) => {
        var contestName = request.body.name;


        var flag = false;
        db.collection('Contests').find({}).toArray((error, result) => {
            if (error) response.send(false);
            result.forEach(element => {
                // console.log(element.name);

                if (element.name.toLowerCase() === contestName.toLowerCase()) {
                    flag = true;
                }

            });
            response.send(flag);
        });
    });


    app.post('/postContest', passport.authenticate('jwt', { session: false }), (request, response) => {
        db.collection('Contests').insert(
            request.body,
            (error, result) => {
                if (error) response.send(false);
                response.send(true);
            }
        );
    });
    app.post('/postContestQuestions', passport.authenticate('jwt', { session: false }), (request, response) => {
        db.collection('ContestQuestions').insert(
            request.body,
            (error, result) => {
                if (error) response.send(false);
                response.send(true);
            }
        );
    });
    app.get('/getAllQuestions', passport.authenticate('jwt', { session: false }), function(req, res) {
        db.collection("ContestQuestions").find({}).toArray((err, result) => {
            if (result)
                res.send(result);
            else
                res.send(false);
        });
    });

    app.delete('/delContest/:name', passport.authenticate('jwt', { session: false }), function(req, res) {
        const value = { "name": req.params.name };
        db.collection("ContestQuestions").remove(value, function(err, item) {
            if (err) throw err;
            else if (item) {
                db.collection("Contests").remove(value, function(err, result) {
                    if (err) throw err;
                    else if (result)
                        res.send(item);
                });
            }

        });

    });
    app.post('/updateContest', function(req, res) {

        const value = { "name": req.body.check };

        const details = {
            $set: {
                "name": req.body.name,
                "questions": req.body.questions
            }
        };
        db.collection('ContestQuestions').updateMany(value, details, (err, result) => {
            if (err) return console.log('err in if');
            console.log(res);
            res.send(true);

        })
    });
}