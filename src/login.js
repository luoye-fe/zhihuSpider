'use strict';
var fs = require('fs');
var request = require('superagent');
var cheerio = require('cheerio');

var getCookie = function(params, xsrf, cb) {
    request
        .post('https://www.zhihu.com/login/email')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Referer', 'http://www.zhihu.com/')
        .send({
            _xsrf: xsrf,
            password: params.password,
            email: params.name,
            remember_me: false
        })
        .end(function(err, res) {
            if (err) {
                return next(err)
            }
            cb && cb(res)
        })
}

var getLoginCookie = function(params, cb) {
    request
        .get('https://www.zhihu.com/')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Referer', 'http://www.zhihu.com/')
        .end(function(err, res) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(res.text);
            var _xsrf = $('[name="_xsrf"]').eq(0).attr('value');
            getCookie(params, _xsrf, function(res) {
                if (JSON.parse(res.text).msg === '登陆成功') {
                    var cookies = res.header['set-cookie'].join(';');
                    fs.writeFile('./cookies', cookies, 'utf-8', function(err) {
                        cb && cb(cookies);
                    })
                }
            })
        })
}

module.exports = getLoginCookie;
