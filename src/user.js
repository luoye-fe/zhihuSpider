'use strict';
var fs = require('fs');
var request = require('superagent');
var cheerio = require('cheerio');

var userResult = {};

var User = function(url, cb) {
    fs.readFile('./cookies', 'utf-8', function(err, data) {
    	request
    		.get(url)
    		.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    		.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
    		.set('Referer', 'http://www.zhihu.com/')
    		.end(function(err,res){
    			var $ = cheerio.load(res.text);
    			userResult.id = getUserId($);
    			userResult.name = getUserName($);
    			userResult.avatar = getUserAvatar($);
    			userResult.agreeNum = getUserAgreeNum($);
    			userResult.thanksNum = getUserThanksNum($);
    			cb && cb(userResult);
    		})
    })
}

var getUserId = function($){
	return $('.Avatar').attr('src').replace(/https:\/\/pic[\d+].zhimg.com\//,'').replace(/\_(s|m|l|xl|xll)\.(png|jpg|jpeg|gif)/i,'')
}
var getUserName = function($){
	return $('.name').eq(0).text();
}
var getUserAvatar = function($){
	return {
		id: getUserId($),
		template: 'http://pic4.zhimg.com/{id}_{size}.png'
	}
}
var getUserAgreeNum = function($){
	return $('.zm-profile-header-user-agree').find('strong').text();
}
var getUserThanksNum = function($){
	return $('.zm-profile-header-user-thanks').find('strong').text();
}


module.exports = User;
