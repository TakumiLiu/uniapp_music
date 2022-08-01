<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">重置密码</view>

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

			<button @tap="handleToResetPwd()" class="getCaptcha">提交</button>
			<button type="default" form-type="reset" class="formReturn" @tap="handleToReset()">重置</button>
		</view>
	</view>
</template>

<script>
	import {
		userResetPwd
	} from '../../common/api.js'
	export default {
		data() {
			return {
				email: '',
				password: '',
				ckpassword: '',
				checkpwdyes: false,
				checkpwdno: false,
			}
		},
		onUnload() {
			uni.navigateTo({
				url: './login'
			})
		},
		onLoad(options) {
			this.email = options.email
		},
		watch: {
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
			handleToResetPwd() {
				// console.log(1)
				if (this.password == '') {
					this.$u.toast('密码不能为空！');
				} else if (this.ckpassword == '') {
					this.$u.toast('没有确认密码噢！');
				}
				if (this.checkpwdno == true) {
					this.$u.toast('确认密码失败！');
				} else if(this.password.length<6||this.password.length<6){
					this.$u.toast('密码要在6-12位！');
				}else {
					userResetPwd(this.email, this.password).then((res) => {
						if (res.data.status == '0') {
							this.$u.toast('重置成功!');
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
				this.password = '';
				this.ckpassword = '';
				setTimeout(() => {
					this.checkpwdyes = false;
					this.checkpwdno = false;
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
