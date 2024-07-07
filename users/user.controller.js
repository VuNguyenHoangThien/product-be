const User = require('./userModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
var jwt = require('jsonwebtoken');

exports.secret = function (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        console.log(req.headers.authorization);
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

            // if there has been an error...
            if (err) {
                // shut them out!
                console.log(err);
                return res.status(401).json({ error: "Not Authorized" });
                // throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        return res.status(500).json({ error: "Not Authorized" });
        // throw new Error("Not Authorized");
    }
}

// exports.jwt = function jwt(req, res) {
//     let privateKey = fs.readFileSync('./private.pem', 'utf8');
//     let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256' });
//     res.send(token);
    // console.log(token);
// }

exports.login = function (req, res) {
    var query = { email: req.body.email };
    console.log('query: ', query);
    User.findOne(query, function (err, user) {
        if (err) {
            return res.json({ err })
        } else if (!user) {
            return res.json({
                message: 'Username or password are incorrect !!',
                status: false
            })
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: 'Service error !!'
                })
            }
            if (result === true) {
                let privateKey = fs.readFileSync('./private.pem', 'utf8');
                let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256',
            expiresIn: '1h' });
            console.log(token);
                return res.status(200).send({
                    message: 'Login Success !!',
                    token: token,
                    status: result
                })
            } else {
                return res.status(200).send({
                    message: 'Username or password are incorrect !!',
                    status: result
                })
            }
        })

        // if (req.body.password == user.password) {
        //     return res.status(200).send({
        //         message: "Login Success !!"
        //     })
        // } else {
        //     return res.status(200).send({
        //         message: 'Username and Password are incorrect'
        //     })
        // }

    })
}

exports.register = function (req, res, next) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user == null) { //Kiểm tra xem email đã được sử dụng chưa
            bcrypt.hash(req.body.password, 10, function (err, hash) { //Mã hóa mật khẩu trước khi lưu vào db
                if (err) { return next(err); }
                const user = new User(req.body)
                // user.role = ['customer'] 
                //sau khi register thì role auto là customer
                user.password = hash;
                // user.password_confirm = hash;
                user.save((err, result) => {
                    if (err) { return res.json({ err }) }
                    res.json({
                        user: result,
                        status: true
                    });
                    // return res.status(200).send({
                    //     message: 'Register Success !!',
                    //     status: true
                    //   })
                })
            })
        } else {
            res.json({
                err: 'Email has been used',
                status: false
            })
            // return res.status(200).send({
            //     message: 'Email has been used',
            //     status: false
            //   })
        }
    })
}