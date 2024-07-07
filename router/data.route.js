const express = require('express');

const  user_controller = require('../users/user.controller');
const socket_controller = require('../websocket/socket_server');

// const {UserValidator} = require('../validator');

const router = express.Router();


const data_controller = require('../home/data.controller');

// function requiresLogout(req, res, next){
//     if (req.session && req.session.user) {
//         return res.json({err: 'You must be Logout in to Login continue'});        
//     } else {
//         return next();
//     }
// }
// router.get('/jwt', user_controller.jwt);
// router.get('/secret', user_controller.secret);
// router.get('/websocket', socket_controller.socket);

// router.get('/crawlingData', data_controller.crawlingData);
// router.post('/searchData', data_controller.searchData);

router.post('/login', user_controller.login);
router.post('/register', user_controller.register)

router.get('/getProduct', user_controller.secret, data_controller.getData);
// router.get('/testDataJoin', user_controller.secret, data_controller.getDataJoin);
// router.post('/testData', user_controller.secret, data_controller.addData);
// router.delete('/testData/:id', user_controller.secret, data_controller.deleteData);
// router.put('/testData/:id', user_controller.secret, data_controller.editData);


module.exports = router;