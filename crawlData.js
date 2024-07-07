const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const Express = require("express");

var app = Express();

//   Hàm lấy dữ liệu từ website
app.listen(3000, () => {
    //Gửi 1 request tới website
    request('https://giaxe.2banh.vn/suzuki/raider-150-fi.html', function (err, res, body) 
    {
        //  Sử dụng cheerio.load để lấy dữ liệu trả về
        var $ = cheerio.load(body);
        //  Lấy chương mới nhất của truyện
        var newestChap = $('.price-block strong').text();
        var obj = {
            data : newestChap
        }
        var json = JSON.stringify(obj);
      console.log(json);
    })
})
