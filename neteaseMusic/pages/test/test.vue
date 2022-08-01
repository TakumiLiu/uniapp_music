<template>
	<view class="wrap">
		<image :src="avatar" mode="aspectFit" @tap="imgclick"></image>
		<button @tap="handleToSet">确认</button>
	</view>
</template>

<script>
	import {
		userLogin,
		userInfo,
		userCollectMusicId,
		userCheckCollectMusicId,
		userCollectMusic,
		userRegister,
		userAvatar
	} from '../../common/api.js'
	export default {
		data() {
			return {
				pic: 'a535a8fcecaa4484df8e2dc3cd756387.png',
				avatar: '',
			}
		},
		onLoad() {
			userAvatar(this.pic).then((res) => {
				// console.log(res)
				const a = new Uint8Array(res)
				this.avatar = 'data:image/jpeg;base64,' + uni.arrayBufferToBase64(res)
			})
		},

		methods: {
			imgclick() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.avatar = res.tempFilePaths[0];
					}
				});

			},
			handleToSet(){
				const _this=this
				uni.uploadFile({
					url:'http://127.0.0.1:3007/my/update/avatar',
					filePath:_this.avatar,
					name:'file',
					header:{
						'content-type':"multipart/form-data",
						'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzOTI1NTEwMTY2IiwiaWQiOjEsInVzZXJuYW1lIjoidGFrdW1pIiwicGFzc3dvcmQiOiIiLCJlbWFpbCI6ImFiY0BxcS5jb20iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY1MDkwNjk0MywiZXhwIjoxNjUwOTQyOTQzfQ.-DBSmY1WzRA4kLv5_AJAG-TeCGZm5TcD4m2Nc5lYZh8"
					},
					formData:{
						email:'abc@qq.com'
					},
					success:function(res){
						console.log('success')
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 40rpx !important;
		border-bottom: 1px solid #d5d5d6;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			.form-name {
				font-size: 30rpx;
				width: 20%;
			}

			.form-data {
				width: 80%;
				// display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
			}

			input {
				width: 100%;
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.form-view {
				// display: flex;
				margin-top: 10rpx;
				justify-content: space-between;
				border-bottom: 2rpx solid gray;
			}

			.tips {
				// color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				// color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;
				margin-top: 50rpx;

				&::after {
					border: none;
				}
			}

			.formReturn {
				background-color: rgb(253, 243, 208);
				// color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;
				margin-top: 20rpx;

				&::after {
					border: none;
				}
			}

			.alternative {
				// color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					// color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				// color: $u-tips-color;

				.link {
					// color: $u-type-warning;
				}
			}
		}
	}
</style>
