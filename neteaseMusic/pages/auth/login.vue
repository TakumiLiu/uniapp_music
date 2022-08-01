<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录扣扣云音乐</view>
			<form>
				<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
				<input class="u-border-bottom" password="false" v-model="password" placeholder="请输入密码" />
			</form>
			<button @tap="handleToLogin()" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password" @tap="handleToForgetPwd()">忘记密码</view>
				<view class="issue" @tap="handleToReg()">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userLogin,
		userInfo
	} from '../../common/api.js'
	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		onUnload() {
			uni.navigateTo({
				url:'../index/index'
			})
		},
		onLoad() {
			// const userInfo = await this.$u.api.UserInfo()

		},
		methods: {
			handleToLogin() {
				if (this.email !== '' && this.password !== '') {
					userLogin(this.email, this.password).then((res) => {
						if (res.data.status == '0') {

							this.$u.toast('登录成功！')
						} else if (res.data.status == '1') {
							this.$u.toast('登录失败！')
						}
						// console.log(res);

					});
					// userInfo();
					// uni.navigateTo({
					// 	url:'../center/center',
					// }); 
					// uni.navigateBack({

					// })
					// this.$u.toast('登录成功')
					// 登录之后，跳转到来源页
					const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch',
							url: backUrl
						})
					},1500)
				} else {
					this.$u.toast('邮箱名或密码为空！')
				}
			},
			handleToReg() {
				uni.navigateTo({
					url: '../auth/reg',
				});
			},
			handleToForgetPwd() {
				uni.navigateTo({
					url: '../auth/fogetpwd',
				});
			}
		},

	};
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

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
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
