<template>
	<view class="index">
		<musichead title="扣扣云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<!--搜索框-->
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<!--排行榜单-->
				<view v-if="isLoading">
					<m-for-skeleton :avatarSize="200" :row="3" :loading="isLoading" isarc="square" :titleStyle="{}"
						:title="false" v-for="(item,key) in 4" :key="key">
					</m-for-skeleton>
				</view>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="(item,index) in topList" :key="index"
						@tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(musicItem,index) in item.tracks" :key="index">{{index+1}}.{{musicItem.first}}
								- {{musicItem.second}}</view>
						</view>
					</view>
				</view>
				<view class="standView"></view>
				<!--底部导航栏-->
				<bottom-bar :current_index="0"></bottom-bar>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mForSkeleton from "../../components/m-for-skeleton/m-for-skeleton.vue";
	import {
		topList
	} from '../../common/api.js'
	export default {
		data() {
			return {
				topList: [],
				isLoading: true,
			}
		},
		onLoad() {
			topList().then((res) => {
				if (res.length) {
					setTimeout(() => {
						this.topList = res;
						this.isLoading = false;
					}, 1000)
				}
			});
		},
		methods: {
			handleToList(listId) {
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId,
					success: res => {},
					fail: () => {

					},
					complete: () => {

					}
				});
			},
			handleToSearch() {
				uni.navigateTo({
					url: '../search/search'
				});
			},
			handleToPage(tab,index){
				this.$router.push(tab.path);
				this.cur_index = index;
				console.log(this.cur_index);
			},
		},
	}
</script>

<style scoped>

	.index {}

	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}

	.index-list-img {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}

	.index-list-text {
		font-size: 24rpx;
		line-height: 54rpx;
		flex: 1;
		/* width: 428rpx; */
	}
	.standView{
		width: 100%;
		height: 150rpx;
	}
</style>
