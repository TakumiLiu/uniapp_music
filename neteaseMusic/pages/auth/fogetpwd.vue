<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">忘记密码</view>

			<view class="form-view">
				<view class="form-name">邮箱名</view>
				<!-- <view v-if="checkemailyes" style="color: green;">邮箱格式正确</view> -->
				<view v-if="checkemail" style="color: red;">邮箱格式错误</view>
				<view class="form-data">
					<input v-model="email" placeholder="请输入邮箱" />
				</view>
			</view>

			<view class="form-view">
				<view class="form-name">电话号码</view>
				<view v-if="checkphone" style="color: red;">号码错误</view>
				<view class="form-data">
					<input v-model="phone" placeholder="请输入电话号码" />
				</view>
			</view>

			<button @tap="handleToForget()" class="getCaptcha">确认信息</button>
			<button type="default" form-type="reset" class="formReturn" @tap="handleToReset()">重置</button>
		</view>
	</view>
</template>

<script>
	import {
		userForgetPwd
	} from '../../common/api.js'
	export default {
		data() {
			return {
				email: '',
				phone: '',
				checkemail: false,
				checkphone: false,
			}
		},
		onUnload() {
			uni.navigateTo({
				url: './login'
			})
		},
		onLoad() {

		},
		watch: {
			email: function(newVal, oldVal) {
				var check = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!check.test(newVal)) {
					this.checkemail = true;
				} else {
					this.checkemail = false;
				}
			},
			phone: function(newVal, oldVal) {
				var check = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (!check.test(newVal)) {
					this.checkphone = true;
				} else {
					this.checkphone = false;
				}
			},
		},
		methods: {
			handleToForget() {
				if (this.email == '') {
					this.$u.toast('邮箱名不能为空！');
				} else if (this.phone == '') {
					this.$u.toast('电话号码不能为空！');
				} else if (this.checkemail == true) {
					this.$u.toast('邮箱格式不正确！');
				} else if (this.checkphone == true) {
					this.$u.toast('号码错误！');
				} else {
					userForgetPwd(this.email, this.phone).then((res) => {
						if (res.data.status == '0') {
							this.$u.toast('验证成功!');
							setTimeout(() => {
								// console.log(1)
								uni.navigateTo({
									url:'/pages/auth/rewritepwd?email='+this.email
								})
							}, 1000)
						} else if (res.data.status == '1') {
							this.$u.toast(res.data.message);
						}
					})
				}

			},
			handleToReset() {
				this.email = '';
				this.phone = '';
				setTimeout(() => {
					this.checkemail = false;
					this.checkphone = false;
				}, 10)

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
