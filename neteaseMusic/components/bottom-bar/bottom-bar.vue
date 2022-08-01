<template>
	<view class="bar-bottom">
		<view v-for="(tab,index) in tabs" :key="index" @click="handleToPage(tab)">
			<view class="bar-bottom-list" >
				<image :src="index == current_index ? tab.active : tab.base" class="bar-bottom-img"></image>
				<text class="bar-bottom-name"
					:style="index == current_index ? 'color:red' : 'color:black'">{{tab.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"bottom-bar",
		data() {
			return {
				tabs: [{
						active: "/static/home-click.png",
						base: "/static/home.png",
						path: "/pages/index/index",
						name: '首页'
					},
					{
						active: "/static/my-click.png",
						base: "/static/my.png",
						path: "/pages/center/center",
						name: '我的'
					},
				]
			};
		},
		props:['current_index'],
		methods:{
			handleToPage(tab,index){
				uni.navigateTo({
					url:tab.path,
				});
			},
		},
	}
</script>

<style>
	.bar-bottom {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		background: rgb(243, 243, 243);
		justify-content: space-around;
		/* overflow: hidden; */
	}

	.bar-bottom-list {
		margin: 10rpx auto;
	}

	.bar-bottom-img {
		height: 48rpx;
		width: 48rpx;
	}

	.bar-bottom-name {
		font-size: 24rpx;
		display: block;
		text-align: center;
	}
</style>
