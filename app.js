'ues strict';
var request = require('superagent');
var cheerio = require('cheerio');
var co = require('co');

var login = require('./login.js');

var user = {
    name: '842891024@qq.com',
    password: 'ly19930720.'
}





login(user, function(cookie) {
    request
        .get('https://www.zhihu.com/')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Referer', 'http://www.zhihu.com/')
        .set('Cookie', cookie)
        .end(function(err, res) {
            console.log(res.text);
        })
})
