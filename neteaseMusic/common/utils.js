const install = (Vue, vm) => {

	/*
	 * 是否登录
	 */

	const isLogin = (res) => {
		// 如果没有token，跳转到登录页面
		var token;
		uni.getStorage({
			key: 'login_token',
			success: (res) => {
				token=res.data;			
			}
		});
		// console.log(token)
		if (!token) {
			// 来自哪个页面
			const currentPage = getCurrentPages().pop()
			// 获取页面路径，和请求参数
			const {
				options,
				route
			} = currentPage
			//参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if (optionsKeys.length !== 0) {
				params = '?songId='+options.songId
				// reduce((pre, current) => {
				// 	return `${pre}${current}=${options[current]}&`
				// }, '?').slice(0, -1)
			}
			// console.log(params)
			// 缓存当前页，用于登录或者注册之后的跳转
			uni.setStorageSync('back_url', route + params)
			if(res==1){
				vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login',
				})
			}, 1500)
			}
			
			return false
		}
		return true
	}

	// 其他工具
	/**
	 * 更新用户信息，更新vuex_user
	 */
	// const updateUser = async () => {
	// 	// 请求用户信息
	// 	const userInfo = await vm.$u.api.userInfo()
	// 	// 缓存用户信息
	// 	vm.$u.vuex('vuex_user', userInfo)
	// }
	vm.$u.utils = {
		isLogin,
		// updateUser
	}
}

export default {
	install
}
