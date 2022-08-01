<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册扣扣云音乐</view>

			<view class="form-view">
				<view class="form-name">邮箱名</view>
				<!-- <view v-if="checkemailyes" style="color: green;">邮箱格式正确</view> -->
				<view v-if="checkemail" style="color: red;">邮箱格式错误</view>
				<view class="form-data">
					<input v-model="email" placeholder="请输入邮箱" />
				</view>
			</view>

			<view class="form-view">
				<view class="form-name">昵称</view>
				<!-- <view v-if="checkemailyes" style="color: green;">邮箱格式正确</view> -->
				<view v-if="checkname" style="color: red;">昵称不能超过10位噢</view>
				<view class="form-data">
					<input v-model="username" placeholder="请输入昵称" />
				</view>
			</view>

			<view class="form-view">
				<view class="form-name">密码</view>
				<view class="form-data">
					<input v-model="password" placeholder="请输入密码" />
				</view>
			</view>

			<view class="form-view">
				<view class="form-name">确认密码</view>
				<view v-if="checkpwdyes" style="color: green;">密码相同</view>
				<view v-if="checkpwdno" style="color: red;">密码不同</view>
				<view class="form-data">
					<input v-model="ckpassword" placeholder="请再次输入密码" />
				</view>
			</view>

			<view class="form-view">
				<view class="form-name">电话号码</view>
				<view v-if="checkphone" style="color: red;">号码错误</view>
				<view class="form-data">
					<input v-model="phone" placeholder="请输入电话号码" />
				</view>
			</view>

			<button @tap="handleToReg()" class="getCaptcha">注册</button>
			<button type="default" form-type="reset" class="formReturn" @tap="handleToReset()">重置</button>
		</view>
	</view>
</template>

<script>
	import {
		userRegister
	} from '../../common/api.js'
	export default {
		data() {
			return {
				email: '',
				password: '',
				ckpassword: '',
				phone: '',
				username: '',
				checkpwdyes: false,
				checkpwdno: false,
				checkemail: false,
				checkphone: false,
				checkname: false,
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
			username: function(newVal, oldVal) {
				if (newVal.length > 10) {
					this.checkname = true;
				} else {
					this.checkname = false;
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
			password: function(newVal, oldVal) {
				if (newVal !== this.ckpassword) {
					this.checkpwdyes = false;
					this.checkpwdno = true;
				} else {
					this.checkpwdyes = true;
					this.checkpwdno = false;
				}
			},
			ckpassword: function(newVal, oldVal) {
				if (newVal !== this.password) {
					this.checkpwdyes = false;
					this.checkpwdno = true;
				} else {
					this.checkpwdyes = true;
					this.checkpwdno = false;
				}
			}
		},
		methods: {
			handleToReg() {
				if (this.email == '') {
					this.$u.toast('邮箱名不能为空！');
				} else if (this.password == '') {
					this.$u.toast('密码不能为空！');
				} else if (this.ckpassword == '') {
					this.$u.toast('没有确认密码噢！');
				} else if (this.phone == '') {
					this.$u.toast('电话号码不能为空！');
				} else if (this.checkemail == true) {
					this.$u.toast('邮箱格式不正确！');
				} else if (this.checkname == true) {
					this.$u.toast('昵称太长了！');
				} else if (this.checkphone == true) {
					this.$u.toast('号码错误！');
				} else if (this.checkpwdno == true) {
					this.$u.toast('确认密码失败！');
				} else if(this.password.length<6||this.password.length<6){
					this.$u.toast('密码要在6-12位！');
				}else {
					userRegister(this.username, this.email, this.password, this.phone).then((res) => {
						if (res.data.status == '0') {
							this.$u.toast('注册成功!');
							setTimeout(() => {
								uni.redirectTo({
									url: './login'
								})
							}, 500)
						} else if (res.data.status == '1') {
							this.$u.toast(res.data.message);
						}
					})
				}
			},
			handleToReset() {
				this.email = '';
				this.password = '';
				this.ckpassword = '';
				this.phone = '';
				this.username = '';
				setTimeout(() => {
					this.checkpwdyes = false;
					this.checkpwdno = false;
					this.checkemail = false;
					this.checkphone = false;
					this.checkname = false;
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
