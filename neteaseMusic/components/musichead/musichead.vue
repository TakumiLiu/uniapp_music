<template>
	<view class="music-head" :style="{color : color}">
		<view v-if="icon" class="music-head-icon" :class="{ 'music-head-iconblack' : iconblack}">
			<text class="iconfont icon-zuojiantou" style="padding: 0 10px 0 10px;" @tap="handleToBack"></text> | <text class="iconfont icon-shouye" style="padding: 0 10px 0 10px;" @tap="handleToHome"></text>
		</view>
		<text class="title-name">

			{{ title }}
		</text>
	</view>
</template>

<script>
	// import '@/common/iconfont.css';
	export default {
		name: "musichead",
		data() {
			return {

			};
		},
		props: ['title', 'icon', 'color', 'iconblack'],
		methods: {
			handleToBack() {
				uni.navigateBack({

				});
			},
			handleToHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped>
	.music-head {
		display: flex;
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: black;
		position: relative;
	}

	.title-name {
		width: 225px;
		position: absolute;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		right: 50%;
		transform: translateX(50%);
	}

	.music-head-icon {
		position: absolute;
		left: 8px;
		top: 26px;
		width: 80px;
		height: 31px;
		background: rgba(0, 0, 0, 0.4);
		color: white;
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		/* justify-content: space-evenly; */
	}

	.music-head-iconblack {
		color: black;
		border: 1px #eaeaea solid;
		background: white;
	}
</style>
