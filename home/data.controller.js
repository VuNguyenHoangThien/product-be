const Product = require('./dataModel');
// const Product2 = require('../home2/data2Model');
const request = require('request');
const cheerio = require('cheerio');

// const io = require('./../websocket/socket_server').socket();
// var http = require('http');
// const Express = require("express");

// var app = Express();
// var cors = require('cors');
// app.use(cors({ origin: '*', credentials: true }));


// var server = http.createServer(app);

// var io = require('socket.io').listen(server);

// io.on('connection', function(socket) {
//     console.log("controller");
//     socket.emit('welcome', {
//         message: 'welcome to websocket'
//     });
// })

// server.listen(8000);

var ObjectID = require('mongodb').ObjectID;

//Simple version, without validation or sanitation

exports.searchData = function (req, resBody) {
    const reqData = req.body.value;
    let endData;
    Product.find( { "name" : {'$regex': reqData} }, (err, product) => {
        // const data = product;
        // endData = data.filter(item => {
        // return item.name.toLowerCase().indexOf(reqData.toLowerCase()) > -1
        // });

        console.log(product);
        if (product === undefined || product.length <= 0) {

            resBody.status(200).send({
                success: 'true',
                message: 'Successfully !!',
                data: 'No Data !!'
            })
        } else {
            resBody.status(200).send({
                success: 'true',
                message: 'Successfully !!',
                data: product
            })
        }
    })
 }

exports.crawlingData = function (req, resBody) {
    request('https://giaxe.2banh.vn/suzuki/raider-150-fi.html', function (err, res, body) {
        //  Sử dụng cheerio.load để lấy dữ liệu trả về
        var $ = cheerio.load(body);
        var abc = [];
        //  Lấy chương mới nhất của truyện
        var newestChap = $('.price-block .price-red').text();

        // var obj = {
        //     data : newestChap
        // }
        // var json = JSON.stringify(obj);
        return resBody.status(200).send({
            data: newestChap
        })
    })
}

// Practice Product
exports.getProduct = function (req, res) {
    Product.find((err, product) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Load Product Fail !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Successfully !!',
                data: product
            })
        }
    })
}

exports.getProductById = (req, res) => {
    var query = { '_id': ObjectID(req.params.id) };
    Product.find(query, (err, product) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Load Product Fail !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Successfully !!',
                data: product
            })
        }
    })
}

exports.addProduct = (req, res) => {
    const body = req.body;
    Product.bulkWrite([
        {
            insertOne: {
                document: body
            }
        }
    ]).then((product, err) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Add Product Fail !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Add Product Successfully !!',
                data: body
            })
        }
    });
}

exports.editProduct = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.updateOne(query, {
        $set:
            req.body
    }, (err, product) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Edit Product Fail !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Save Product Successfully !!',
                data: req.body
            })
        }
    })
}

exports.deleteProduct = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.deleteOne(query, function (err, product) {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Delete Product Fail !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Delete Product Successfully !!',
            })
        }
    })
}

// Old code
exports.addData = function (req, res) {
    Product.bulkWrite([
        {
            insertOne: {
                document: { name: req.body.name, document: req.body.document, price: req.body.price }
            }
        }
    ]);
    if (res) {
        console.log('event');
        // io.on('connection', function(socket) {
        //     socket.emit('event', {
        //         message: true
        //     })
        // })
        // io.emit('event', {
        //     message: true
        // })
        return res.status(200).send({
            success: 'true',
            message: 'Add Successfully !!',
        })
    }
}

exports.deleteData = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.deleteOne(query, function (err, resDelete) {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            console.log('event');
            // io.on('connection', function(socket) {
            //     socket.emit('event', {
            //         message: true
            //     })
            // })
            io.emit('event', {
                message: true
            })
            return res.status(200).send({
                success: 'true',
                message: 'Delete Successfully !!',
            })
        }
    })
}

exports.editData = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.updateOne(query, {
        $set:
            req.body
        //      {
        //     name: req.body.name,
        //     document: req.body.document,
        //     price: req.body.price
        // }
    }, (err, edit) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Edit Successfully !!',
            })
        }
    })
}

exports.getDataJoin = function (req, res) {
    Product.aggregate([
        {
            $lookup: {
                from: 'data-2',
                localField: 'name',
                foreignField: 'name',
                as: 'joinData'
            }
        }
    ], (err, resJoin) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {

            return res.status(200).send({
                success: 'true',
                message: 'Edit Successfully !!',
                data: resJoin
            })
        }
    })
}