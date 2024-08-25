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

router.post('/user-login', user_controller.login);
router.post('/user-register', user_controller.register)

router.get('/getProduct', user_controller.secret, data_controller.getProduct);

// without authen
router.get('/api/v1/allProduct', data_controller.getProduct);
router.get('/api/v1/productById/:id', data_controller.getProductById);
router.post('/api/v1/addProduct', data_controller.addProduct);
router.put('/api/v1/editProduct/:id', data_controller.editProduct);
router.delete('/api/v1/deleteProduct/:id', data_controller.deleteProduct);

// router.get('/testDataJoin', user_controller.secret, data_controller.getDataJoin);
// router.post('/testData', user_controller.secret, data_controller.addData);
// router.delete('/testData/:id', user_controller.secret, data_controller.deleteData);
// router.put('/testData/:id', user_controller.secret, data_controller.editData);


module.exports = router;