module.exports = function(app, db) {
    var hashPass = require('password-hash');
    var jwt = require('jsonwebtoken');
    var passport = require('passport');
    app.post("/login", function(req, res) {


        var myquery = { email: req.body.email.toLowerCase() };
        db.collection("user").findOne(
            myquery,
            (err, result) => {
                if (err) {
                    console.log('err in if');
                }
                if (result) {
                    // console.log(result);
                    if (verifyPassword(req.body.pswd, result.password)) {
                        let responseData = {
                            _id: result._id,
                            firstname: result.firstname,
                            email: result.email,
                            isAdmin: result.isAdmin
                        };
                        var token = jwt.sign({ data: responseData }, 'MYSECRETKEY', { expiresIn: 64000 });
                        res.send({
                            data: responseData,
                            token: `Bearer ${token}`
                        });
                    } else {
                        res.send(false);
                    }

                } else {
                    console.log('not found');
                    res.send(false);
                }
            });


    });

    app.post('/adalLogin', (req, res) => {
        console.log('i am here');
        var data = req.body;
        console.log(data.profile.given_name);
        var user = { email: data.userName.toLowerCase() }

        db.collection('user').findOne(user, (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
                var token = jwt.sign({ data: result }, "MYSECRETKEY", { expiresIn: 64000 });
                res.send({
                    data: result,
                    token: `Bearer ${token}`
                });
            } else {
                newPassword = getHashPass(data.userName.toLowerCase());
                var user = {
                    firstname: data.profile.given_name,
                    lastname: data.profile.family_name,
                    contact: '',
                    dob: '',
                    email: data.userName.toLowerCase(),
                    password: newPassword,
                    isAdmin: false
                }

                db.collection('user').insert(user, (err, result) => {
                    if (err) {
                        return console.log('err in if');
                    } else {
                        db.collection('cart').insert({ "user": data.userName.toLowerCase() }, (err, result) => {
                            if (err) {
                                return console.log(err);
                            } else {
                                db.collection('user').findOne(user, (err, result) => {
                                    if (err) {
                                        res.send(err);
                                    }
                                    if (result) {
                                        var token = jwt.sign({ data: result }, "MYSECRETKEY", { expiresIn: 64000 });
                                        res.send({
                                            data: result,
                                            token: `Bearer ${token}`
                                        });
                                    } else {
                                        res.send(false);
                                    }
                                })
                            }

                        })
                    }
                })

            }
        })
    });

    app.get("/getUserData/:email", passport.authenticate('jwt', { session: false }), function(req, res) {
        var query = { email: req.params.email };
        // console.log(req.params);
        db.collection("user").findOne(query, (err, result) => {
            if (err) {
                console.log("err in if");
                res.send(false);
            }
            if (result) {
                // console.log("res result");
                res.send(result);
            } else {
                console.log('not found');
                res.send(false);
            }
        });
    });
    app.put('/update/:email', passport.authenticate('jwt', { session: false }), function(req, res) {

        const email = req.params.email;
        const value = { "email": email };
        if (req.body.newpassword === '') {
            req.body.newpassword = req.body.currpassword;
        }

        db.collection("user").findOne(
            value,
            (err, result) => {
                if (err) {

                    res.send(false);
                }
                if (result) {
                    if (verifyPassword(req.body.currpassword, result.password)) {
                        req.body.newpassword = getHashPass(req.body.newpassword);
                        const details = {

                            $set: {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                contact: req.body.contact,
                                password: req.body.newpassword,
                                dob: req.body.dob
                            }
                        };
                        db.collection('user').updateMany(value, details, (err, result) => {
                            if (err) res.send(err);

                            res.send(true);
                        });
                    } else {
                        res.send(false);
                    }
                }

            });
    });

    app.get('/getData', function(request, response) {
        db.collection('user').find().toArray(function(err, res) {
            // console.log(res);
            response.send(res)
        });

    });

    app.get('/test', function(req, res) {
        res.send('test working');
    })

    var nodemailer = require("nodemailer");
    var rand, mailOptions, host, link;
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mibfanclub2018@gmail.com",
            pass: "mibuser123"
        }
    });

    app.post('/send', function(req, res) {
        rand = Math.floor(Math.random() * 10000 + 54);
        // host = req.get('host');
        // link = "http://" + req.get('host') + "/verify?id=" + rand;
        mailOptions = {
                to: req.body.userEmail,
                subject: "Please confirm your Email account",
                html: "Hello,<br>Your autogenerated OTP is " + rand + "<br> Please fill up the confirm OTP in the form to verify your email."
            }
            //  console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log('error in if');
                res.send();
            } else {
                console.log("Message sent: ");
                res.send('sent');
            }
        });
    });
    app.post('/forgotPass', function(req, res) {
        const email = req.body.email;
        console.log(email);
        db.collection('user').findOne({ "email": email }, function(err, docs) {
            if (err) {
                res.send('error');
            } else if (docs) {
                console.log("Found the following records");
                var temPass = 'Mibuser123@' + email.substring(0, 3);
                console.log(temPass);
                tempPassword = getHashPass(temPass);
                const details = {
                    $set: {
                        password: tempPassword,
                    }
                };
                db.collection('user').updateMany({ "email": email }, details, (err, result) => {
                    if (err) res.send(err);

                    else {
                        res.send('true');
                        // console.log(password);
                        mailOptions = {
                                to: req.body.email,
                                subject: "Please use this temporary password for your Email account",
                                html: "Hello,<br>Your autogenerated temporary password is " + temPass + "<br> Please use this temporary password for your Email account. <br> Change your password after login asap"
                            }
                            //  console.log(mailOptions);
                        smtpTransport.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                // console.log('error in if');
                                res.send('error');
                            } else {
                                // console.log("Message sent: " + info.response);
                                res.send('sent');
                            }
                        });
                    }
                });


                //    res.send('duplicate');
            } else {
                res.send('NotFound')
            }

        });
    });
    app.post('/verify', function(req, res) {
        // console.log(req.protocol + ":/" + req.get('host'));
        // if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        //  console.log("Domain is matched. Information is from Authentic email");
        if (req.body.otp == rand) {
            console.log("email is verified");
            db.collection('user').findOne({ email: req.body.email }, function(err, docs) {
                if (err) {
                    res.send('error');
                } else if (docs) {
                    console.log("Found the following records");
                    console.log(docs)
                    res.send('duplicate');
                } else {
                    //   console.log('hi');
                    req.body.password = getHashPass(req.body.password);
                    var user = { firstname: req.body.firstname, lastname: req.body.lastname, contact: req.body.contact, dob: req.body.dob, email: req.body.email.toLowerCase(), password: req.body.password, isAdmin: false }
                    db.collection('user').insert(user, (err, result) => {

                        if (err) {
                            return console.log('err in if');
                        }
                        // SUCCESS: User added to 'user collection' 
                        else {
                            db.collection('cart').insert({ "user": req.body.email }, (err, result) => {
                                if (err) {
                                    return console.log(err);
                                }
                                // SUCCESS: User added to 'cart collection'
                                else {
                                    res.send(true);
                                }

                            })
                        }
                    })
                }
            });
        } else {
            console.log("email is not verified");
            res.send('false');
        }
    });

    function getHashPass(value) {
        console.log("reached getHashedCode");
        var  hashedPassword  = hashPass.generate(value);
        console.log(hashedPassword);
        return  hashedPassword;
    }

    function  verifyPassword(normalPassword, hashPassword) {
        if  (hashPass.verify(normalPassword, hashPassword)) {
            return  true;
        } else {
            return false;
        }
    }


}