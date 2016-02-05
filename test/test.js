
var request = require('superagent');

var zhihu = require('../zhihu.js');


var userInfo = {
    name: '842891024@qq.com',
    password: 'ly19930720.'
}



// zhihu.Login(user, function(cookie) {
//     request
//         .get('https://www.zhihu.com/')
//         .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
//         .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
//         .set('Referer', 'http://www.zhihu.com/')
//         .set('Cookie', cookie)
//         .end(function(err, res) {
//             console.log(res.text);
//         })
// })

var user_url = 'https://www.zhihu.com/people/luo-ye-42-22';
zhihu.Login(userInfo,function(){
	zhihu.User(user_url,function(user){
		console.log(user);
	})
})