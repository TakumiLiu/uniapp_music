import {
	baseUrl,
	baseUserUrl
} from './config.js'


// 用户登录
export function userLogin(Email, Password) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/api/login`, // 发送的地址
			method: 'POST', // 发送方式
			data: { // 发送信息的内容
				email: Email,
				password: Password,
			},
			header: { // 设置发送信息的类型
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {

				// 保存登录信息
				if (res.data.status == '0') {
					uni.setStorage({
						key: 'login_token',
						data: res.data.token,
					});
				}
				resolve(res);
			},
		});
	});
}


// 获取用户信息
export function userInfo() {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/my/userinfo`,
			method: 'GET',
			data: {},
			header: {
				'Authorization': authorization,
			},
			success: (res) => {
				console.log('success');
				// console.log(res);
				var result = res.data;
				resolve(result);
				// console.log(result);
			},
		});
	});
}

// 获取用户图片
export function userAvatar(Pic) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/api/download/avatar`,
			method: 'POST',
			responseType: 'arraybuffer',
			data: {
				pic: Pic,
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: (res) => {
				// console.log(res);
				var result = res.data;
				resolve(result);
			},
		});
	});
}

// 用户注册
export function userRegister(Username, Email, Password, Phone) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/api/reguser`, // 发送的地址
			method: 'POST', // 发送方式
			data: { // 发送信息的内容
				username: Username,
				email: Email,
				password: Password,
				phone: Phone,
			},
			header: { // 设置发送信息的类型
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				// console.log(res);
				resolve(res);
			},
		});
	});
}

// 用户忘记密码
export function userForgetPwd(Email, Phone) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/api/foget`, // 发送的地址
			method: 'POST', // 发送方式
			data: { // 发送信息的内容
				email: Email,
				phone: Phone,
			},
			header: { // 设置发送信息的类型
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				// console.log(res);
				resolve(res);
			},
		});
	});
}

// 用户重置密码
export function userResetPwd(Email, Password) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/api/reset`, // 发送的地址
			method: 'POST', // 发送方式
			data: { // 发送信息的内容
				email: Email,
				password: Password,
			},
			header: { // 设置发送信息的类型
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				// console.log(res);
				resolve(res);
			},
		});
	});
}

// 用户修改信息
export function userChangeInfo(Username, Phone, Email) {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/my/userinfo`,
			method: 'POST',
			data: {
				username: Username,
				phone: Phone,
				email: Email
			},
			header: {
				'Authorization': authorization,
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: (res) => {
				console.log('updatesuccess');
				resolve(res)
			},
		});
	});
}

// 用户收藏音乐
export function userCollectMusic(Email, MusicId) {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	uni.request({
		url: `${baseUserUrl}/my/update/music`,
		method: 'POST',
		data: {
			email: Email,
			musicid: MusicId,
		},
		header: {
			'Authorization': authorization,
			'content-type': 'application/x-www-form-urlencoded',
		},
		success: (res) => {
			console.log('insertsuccess');
		},
	});
}

// 用户取消收藏音乐
export function userDisCollectMusic(Email, MusicId) {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	uni.request({
		url: `${baseUserUrl}/my/delete/music`,
		method: 'POST',
		data: {
			email: Email,
			musicid: MusicId,
		},
		header: {
			'Authorization': authorization,
			'content-type': 'application/x-www-form-urlencoded',
		},
		success: (res) => {
			console.log('deletesuccess');
		},
	});
}

// 获取用户收藏音乐的id
export function userCollectMusicId(Email) {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/my/usermusic`,
			method: 'POST',
			data: {
				email: Email
			},
			header: {
				'Authorization': authorization,
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: (res) => {
				console.log('getsuccess');
				// console.log(res);
				var result = res.data;
				resolve(result);
				// console.log(result);
			},
		});
	});
}

// 验证用户收藏音乐是否存在
export function userCheckCollectMusicId(Email, MusicId) {
	var authorization;
	uni.getStorage({
		key: 'login_token',
		success: (res) => {
			authorization = res.data;
		}
	});
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUserUrl}/my/usercollect`,
			method: 'POST',
			data: {
				email: Email,
				musicid: MusicId,
			},
			header: {
				'Authorization': authorization,
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: (res) => {
				var result = res.data;
				resolve(result);
			},
		});
	});
}


// 获取热门榜单推荐
export function topList() {
	let listIds = ['19723756', '3779629', '2884035', '3778678'];
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				for (var i = 0; i < listIds.length; i++) {
					result[i].listId = listIds[i];
				}
				resolve(result);
			},
			fail: () => {},
			complete: () => {}
		});

	});
}

// 获取歌单列表
export function list(listId) {
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${listId}`,
		method: 'GET'
	});
}

// 获取歌曲详情
export function songDetail(songId) {
	return uni.request({
		url: `${baseUrl}/song/detail?ids=${songId}`,
		method: 'GET'
	});
}

// 获取类似歌曲
export function songSimi(songId) {
	return uni.request({
		url: `${baseUrl}/simi/song?id=${songId}`,
		method: 'GET'
	});
}

// 获取歌曲评论
export function songComment(songId) {
	return uni.request({
		url: `${baseUrl}/comment/music?id=${songId}`,
		method: 'GET'
	});
}

// 获取歌曲歌词
export function songLyric(songId) {
	return uni.request({
		url: `${baseUrl}/lyric?id=${songId}`,
		method: 'GET'
	});
}

// 获取音乐url
export function songUrl(songId) {
	return uni.request({
		url: `${baseUrl}/song/url?id=${songId}`,
		method: 'GET'
	});
}

// 获取热搜
export function searchHot() {
	return uni.request({
		url: `${baseUrl}/search/hot/detail`,
		method: 'GET'
	});
}

// 获取热搜词
export function searchWord(word) {
	return uni.request({
		url: `${baseUrl}/search?keywords=${word}`,
		method: 'GET'
	});
}

// 获取建议搜索词
export function searchSuggest(word) {
	return uni.request({
		url: `${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
		method: 'GET'
	});
}
