<template>
	<view>
		<view class="user-box">
			<view class="avatar-body">
				<!-- <view class="user-img">
					<image src="/static/76525384_p0.jpg" mode="aspectFill"></image>
				</view> -->
			</view>
			<view class="user-info">
				<view class="user-name">{{userinfo.username}}</view>
				<view class="user-email">邮箱: {{userinfo.email}}</view>
			</view>
		</view>

		<view class="baseInfo" @tap="turnChangePage()">
			<image src="../../static/baseinfo.png"></image>
			<view>修改信息</view>
		</view>

		<view class="music-list">
			<view class="music-list-play" @tap="handleToPlaylist">
				<image src="../../static/music.png"></image>
				<view>播放列表</view>
			</view>
			<view class="music-list-collect" @tap="handleToCollectlist">
				<image src="../../static/collet.png" ></image>
				<view>我的收藏</view>
			</view>
		</view>

		<view class="log-out" @tap="logout()">
			<image src="../../static/logout.png"></image>
			<view >退出登录</view>
		</view>
		
		<!-- <image src="http://127.0.0.1:3007/a535a8fcecaa4484df8e2dc3cd756387.png"></image> -->
		<bottom-bar :current_index="1"></bottom-bar>
	</view>
</template>

<script>
	import {
		userInfo,
		userAvatar
	} from '../../common/api.js'
	export default {
		data() {
			return {
				userinfo: [],
			}
		},
		onLoad() {
			if (!this.$u.utils.isLogin(1)) return
			else {
				// 进行登录
				userInfo().then((res) => {
					this.userinfo = res.data;
					// console.log(this.userinfo);
					var _this=this;
					// uni.getImageInfo({
					// 	src:"http://127.0.0.1:3007/a535a8fcecaa4484df8e2dc3cd756387.png",
					// 	success:(res) =>{
					// 		console.log(res);
					// 	},
					// 	fail: (err) => {
					// 		console.log(err);
					// 	}
					// })
				});
				
			}
			
		},
		methods: {
			logout() {
				this.$u.toast('退出成功');
				setTimeout(()=>{
				uni.removeStorage({
					key: 'login_token',
					success: function(res) {
						console.log('success');						
						uni.navigateTo({
							url: '../index/index',
						});
					}
				})
				},1500)
			},
			turnChangePage(){
				uni.navigateTo({
					url:'./changeinfo',
				});
			},
			handleToPlaylist(){
				uni.navigateTo({
					url:'../list/play_list',
				});
			},
			handleToCollectlist(){
				uni.navigateTo({
					url:'../list/collect_list',
				});
			}
			// handleToLogin() {

			// 	const currentPage = getCurrentPages().pop();
			// 	// console.log(currentPage);
			// 	// 获取页面路径，和请求参数
			// 	const {
			// 		options,
			// 		route
			// 	} = currentPage;
			// 	//参数的key
			// 	// console.log(options);
			// 	// 	console.log(route);
			// 	// 	const optionsKeys = Object.keys(options);
			// 	// console.log(optionsKeys);
			// 	uni.setStorageSync('back_url', route);

			// }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.user-box {
		display: flex;
		background-color: #fff;
	}

	.user-info {}

	.user-img {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		overflow: hidden;
		margin: 20px;
	}

	.user-img image {
		width: 100%;
		height: 100%;
	}

	.user-name {
		font-size: 30px;
		line-height: 27px;
		flex: 1;
		margin-top: 35px;
	}

	.user-email {
		font-size: 14px;
		line-height: 27px;
		flex: 1;
		color: gray;
	}

	.avatar-body {
		width: 20px;
		height: 120px;
	}

	.baseInfo {
		display: flex;
		margin-top: 20px;
		width: 750rpx;
		background-color: white;
		padding: 10px;
	}

	.baseInfo image {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		margin-right: 2px;
	}

	.baseInfo view {}

	.music-list {
		margin-top: 20px;
		width: 750rpx;
		background-color: white;
	}

	.music-list-play {
		display: flex;
		padding: 10px;
	}


	.music-list-play image {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		margin-right: 2px;
	}

	.music-list-collect {
		display: flex;
		padding: 10px;
	}

	.music-list-collect image {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		margin-right: 2px;
	}

	.log-out {
		display: flex;
		margin-top: 20px;
		width: 750rpx;
		background-color: white;
		padding: 10px;
	}

	.log-out image {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		margin-right: 2px;
	}
</style>
