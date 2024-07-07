const mongoose = require("mongoose");

const DATABASE_NAME = "example-data";

let dev_db_url = "mongodb+srv://vuNHT:PHIhung@123@cluster0-vwx6r.mongodb.net/" + DATABASE_NAME + "?retryWrites=true&w=majority";
let mongoDB = dev_db_url;
const config = {
    autoIndex: false,
    useNewUrlParser: true,
};

mongoose.connect(mongoDB, config, (err, client) => {

    if (err) {
        console.log(err);
    } else {
        console.log("Connected to `" + DATABASE_NAME + "`!");
    }
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.createCollection('data-3', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Create Collection Success !!');

        var products = db.collection('data-3');
        var data = [
            { name: "ao phong", price: 75000, category: "quan ao" },
            { name: "giay the thao", price: 75000, category: "giay dep" },
            { name: "kinh", price: 375000, category: "Thoi trang" },
        ];
        products.insertMany(data, (err, resInsert) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Insert Data Success !!');
            }
        })
    }
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));