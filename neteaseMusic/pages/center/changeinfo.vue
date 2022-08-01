<template>
	<view>
		<form>
			<!-- <view class="user-img-box">
				<image :src="imgsrc" mode="aspectFill" class="user-img" @tap="imgclick"></image>
			</view>
			<view class="img-tips">点击头像修改头像</view> -->

			<view class="user-form">
				<view>用户昵称:</view>
				<input name="username" v-model="form.name" />
			</view>

			<view class="user-form">
				<view>电话号码:</view>
				<input name="phone" v-model="form.phone" />
			</view>

			<view class="form-btn">
				<button form-type="submit" @click="submit()">修改</button>
				<button type="default" form-type="reset" @tap="handleToReset()">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		userInfo,
		userChangeInfo
	} from '../../common/api.js'
	export default {
		data() {
			return {
				// userinfo: [],
				form: {
					name: '',
					phone: '',
				},
				oldemail: '',
				// imgsrc:"/static/76525384_p0.jpg",
			}
		},
		onLoad() {
			if (!this.$u.utils.isLogin(1)) return
			else {
				userInfo().then((res) => {
					// this.userinfo = res.data;
					this.form.name = res.data.username;
					this.form.phone = res.data.phone;
					this.oldemail = res.data.email;
					// console.log(this.userinfo);
				});
			};
		},
		methods: {
			// imgclick() {
			// 	var _this = this;
			// 	uni.chooseImage({
			// 		count: 1,
			// 		sizeType: ['compressed'],
			// 		sourceType: ['album'],
			// 		success: function(res) {
			// 			_this.imgsrc = res.tempFilePaths[0];
			// 		}
			// 	});
			// },
			submit() {
				var check = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (this.form.name == '') {
					this.$u.toast('昵称不能为空！');
				} else if (this.form.phone == '') {
					this.$u.toast('手机号不能为空！');
				} else if (!check.test(this.form.phone)) {
					this.$u.toast('手机号不正确！');
				} else if (this.form.name.length > 10) {
					this.$u.toast('昵称太长了！');
				} else {
					userChangeInfo(this.form.name, this.form.phone, this.oldemail).then((res) => {
						if (res.data.status == '0') {
							this.$u.toast('修改成功!');
							setTimeout(() => {
								uni.navigateTo({
									url: '../index/index',
								})
							}, 1500)
						} else if (res.data.status == '0') {
							this.$u.toast('修改失败!');
						}

					});
				}


			},
			handleToReset() {
				userInfo().then((res) => {
					// this.userinfo = res.data;
					this.form.name = res.data.username;
					this.form.phone = res.data.phone;
					this.oldemail = res.data.email;
					// console.log(this.userinfo);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ededed;
	}

	.user-img-box {
		display: flex;
		background-color: #fff;
	}

	.user-img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		// overflow: hidden;
		margin: 20px auto 20px auto;
	}

	.img-tips {
		background-color: #FFFFFF;
		text-align: center;
		color: gray;
		font-size: 16px;
	}

	.user-form {
		display: flex;
		margin-top: 20px;
		width: 750rpx;
		background-color: white;
		padding: 10px;
	}

	.user-form view:nth-child(1) {
		margin-right: 5px;
	}

	.form-btn {
		margin-top: 20px;
	}

	.form-btn button:nth-child(1) {
		background-color: white;
	}

	.form-btn button:nth-child(2) {
		margin-top: 20px;
		background-color: white;
	}
</style>
