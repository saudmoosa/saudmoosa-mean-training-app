const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Issue = require('../models/issue');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register User', error: err});
        } else {
            res.json({success: true, msg:'User Registered'});
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// All Issues
router.get('/issues', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

// Get Issue by Id
router.get('/issues/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

// Add Issue
router.post('/issues/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfuly'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    });

// Update Issue
router.post('/issues/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;
            
            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete Issue
router.get('/issues/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});


// All Issues Count
router.get('/issues-count', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Issue.aggregate([
        { 
            "$group" : {
                "_id" : {

                }, 
                "COUNT(*)" : {
                    "$sum" : 1.0
                }
            }
        }, 
        { 
            "$project" : {
                "total" : "$COUNT(*)", 
                "_id" : 0.0
            }
        }
    ], (err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    }
    );
});



// Issues Severity Count
router.get('/issues-severity-count', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Issue.aggregate([
        { 
            "$group" : {
                "_id" : {
                    "severity" : "$severity"
                }, 
                "COUNT(*)" : {
                    "$sum" : 1.0
                }
            }
        }, 
        { 
            "$project" : {
                "severity" : "$_id.severity", 
                "total" : "$COUNT(*)", 
                "_id" : 0.0
            }
        }
    ], (err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    }
    );
});


// Issues Status Count
router.get('/issues-status-count', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Issue.aggregate([
        { 
            "$group" : {
                "_id" : {
                    "status" : "$status"
                }, 
                "COUNT(*)" : {
                    "$sum" : 1.0
                }
            }
        }, 
        { 
            "$project" : {
                "status" : "$_id.status", 
                "total" : "$COUNT(*)", 
                "_id" : 0.0
            }
        }
    ], (err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    }
    );
});


module.exports = router;