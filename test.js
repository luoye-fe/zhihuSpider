


var zhihu = require('./app.js');


var loginInfo = {
	name:'842891024@qq.com',
	password:'ly19930720.'
}

var url = 'http://test.com';
zhihu.login(loginInfo,function(){
	zhihu.User(url,function(user){
		console.log(user.user_id);
	})
})

