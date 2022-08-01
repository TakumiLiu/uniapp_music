<template>
	<view class="list">
		<!-- <view class="fixbg" :style="{ 'background-image': 'url('+playlist.coverImgUrl+')'}"></view> -->
		<view class="fixbg" :style="{ 'background-image': 'url('+coverImgUrl+')'}"></view>
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container" v-show="!isLoading2">
		<!-- <view class="container"> -->

			<scroll-view scroll-y="true">
				<!--播放列表简介-->
				<view class="list-head">
					<!--列表图片-->
					<view class="list-head-img">
						<image src="../../static/74887015_p0.jpg" mode="aspectFill"></image>
						<!-- <text class="iconfont icon-yousanjiao">{{playlist.playCount | formatCount}}</text> -->
					</view>
					<!--列表文字简介-->
					<view class="list-head-text">
						<view>播放列表</view>
						<view>
							<image src="../../static/disc.png" mode=""></image>扣扣云音乐
						</view>
						<view>
							这是你现在的播放列表哦。
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont icon-fenxiang"></text>分享给微信好友
				</button>
				<!-- #endif -->

				<!--歌曲数目-->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang1" @tap="handleToDetail(playlist[0][0].id)"></text>
						<text>播放全部</text>
						<text>(共{{playlist.length}}首)</text>
					</view>
					<!--数据列表-->
					<view class="list-music-item" v-for="(item,index) in playlist" :key="index">
						<view class="list-music-top">{{index+1}}</view>
						<view class="list-music-song" @tap="handleToDetail(item[0].id)">
							<!-- <view class="list-music-song" > -->
							<view>{{item[0].name}}</view>
							<view>
								<image v-if="privileges[index].flag >60 && privileges[index].flag <70"
									src="../../static/dujia.png" mode=""></image>
								<image v-if="privileges[index].maxbr == 999000" src="../../static/SQ.png" mode="">
								</image>
								{{item[0].ar[0].name}} - {{item[0].name}}
							</view>
						</view>
						<text class="iconfont icon-bofang" @tap="handleToDetail(item[0].id)"></text>
						<!-- <text class="iconfont icon-bofang"></text> -->
					</view>
				</view>
				<view class="standView"></view>
				<bottom-bar></bottom-bar>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";
	import {
		list,
		songDetail
	} from '../../common/api.js'
	export default {
		data() {
			return {
				coverImgUrl: '../../static/74887015_p0.jpg',
				playlist: [],
				privileges: [],
				isLoading: true,
				useremail: '',
				// statusList: [],
				// kkk:[],
				songlist: [],
				isLoading2: true,
			}
		},
		onLoad(options) {
			// console.log(options.listId);
			uni.showLoading({
				title: '正在加载...',
			});
			// 获取榜单
			uni.getStorage({
				key: 'song_list',
				success: (res) => {
					this.songList = res.data;
					// console.log(this.songList.length);
					for (let i = 0; i < this.songList.length; i++) {
						// console.log(this.songList[i]);
						Promise.all([songDetail(this.songList[i])]).then((values) => {
							this.playlist.push(values[0][1].data.songs);
							this.privileges.push(values[0][1].data.privileges[0]);
							// console.log(111);
						})
					};
				}
			});
			setTimeout(()=>{
			// console.log(this.privileges[0].flag);
				this.isLoading2=false;
				uni.hideLoading();
			},1000)
		},
		methods: {
			// 转到歌曲详情
			handleToDetail(songId) {
				// 转到歌曲详情
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				});
			},
		}
	}
</script>

<style scoped>
	.list {}

	.list-head {
		display: flex;
		margin: 30rpx;
	}

	.list-head-img {
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}

	.list-head-img image {
		width: 100%;
		height: 100%;
	}

	.list-head-img text {
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: white;
		font-size: 26rpx;
	}

	.list-head-text {
		flex: 1;
		color: #F0F2F7
	}

	.list-head-text view:nth-child(1) {
		color: white;
		font-size: 34rpx;
	}

	.list-head-text view:nth-child(2) {
		display: flex;
		margin: 20rpx 0;
		font-size: 24rpx;
		align-items: center;
	}

	.list-head-text view:nth-child(2) image {
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.list-head-text view:nth-child(3) {
		line-height: 34rpx;
		font-size: 22rpx;
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}

	.list-share text {
		margin-right: 16rpx;
	}

	.list-music {
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}

	.list-music-head {
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}

	.list-music-head text:nth-child(1) {
		height: 50rpx;
		font-size: 50rpx;
	}

	.list-music-head text:nth-child(2) {
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}

	.list-music-head text:nth-child(3) {
		font-size: 26rpx;
		color: #b2b2b2;
	}

	.list-music-item {
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		color: #959595;
	}

	.list-music-top {
		width: 58rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}

	.list-music-song {
		flex: 1;
	}

	.list-music-song view:nth-child(1) {
		font-size: 28rpx;
		color: black;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) {
		/* display: flex; */
		flex-wrap: wrap;
		font-size: 20rpx;
		align-items: center;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) image {
		width: 32rpx;
		height: 24rpx;
		margin-right: 10rpx;
		flex-shrink: 0;
	}

	.list-music-song text {
		font-size: 50rpx;
		color: #c7c7c7;
	}

	.list-music-collect {
		height: 16px;
		width: 16px;
	}

	.standView {
		width: 100%;
		height: 150rpx;
	}
</style>
