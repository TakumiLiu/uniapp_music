<template>
	<view class="search">
		<musichead title="搜索" :icon="true" :iconblack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<!--搜索框-->
				<view class="search-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)"
						@input="handleToSuggest" />
					<text v-show="searchType != 1" class="iconfont icon-guanbi" @tap="handleToClose"></text>
				</view>
				<!--显示搜索历史和热搜榜-->
				<block v-if="searchType == 1">
					<!--搜索历史-->
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont icon-lajitong" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchHistory" :key="index" @tap="handleToWord(item)">{{item}}
							</view>
						</view>
					</view>
					<!--热搜榜-->
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-tiem" v-for="(item,index) in searchHot" :key="index"
							@tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index+1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>
				<!--搜索结果-->
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index"
							@tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.artists[0].name}} - {{item.album.name}}</view>
							</view>
							<text class="iconfont icon-bofang"></text>
						</view>
					</view>
					<bottom-bar></bottom-bar>
				</block>
				<!--搜索提示-->
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索“{{searchWord}}”</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index"
							@tap="handleToWord(item.keyword)">
							<text class="iconfont icon-fangdajing"></text>{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		searchHot,
		searchWord,
		searchSuggest
	} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '',
				searchHistory: [],
				searchType: 1,
				searchList: [],
				searchSuggest: [],
			}
		},
		onLoad() {
			// 获取热搜结果
			searchHot().then((res) => {
				if (res[1].data.code == '200') {
					this.searchHot = res[1].data.data;
				}
			});
			// 获取缓存中的搜索历史
			uni.getStorage({
				key: 'searchHistory',
				success: (res) => {
					this.searchHistory = res.data;
				}
			});
		},
		methods: {
			// 进行搜索
			handleToWord(word) {
				this.searchWord = word;
				this.handleToSearch(word);
			},
			// 进行对关键词搜索
			handleToSearch(word) {
				// 将关键词用头插法的方式存入搜索历史数组
				this.searchHistory.unshift(word); 
				this.searchHistory = [...new Set(this.searchHistory)];
				// 限定搜索历史为10个关键词
				if (this.searchHistory.length > 10) {
					this.searchHistory.length = 10;
				}
				// 将搜索历史存入缓存
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory
				});
				// 获取搜索结果列表
				this.getSearchList(word);
			},
			// 清除搜索历史缓存
			handleToClear() {
				uni.removeStorage({
					key: 'searchHistory',
					success: (res) => {
						this.searchHistory = [];
					}
				});
			},
			// 获取搜索结果列表
			getSearchList(word) {
				searchWord(word).then((res) => {
					if (res[1].data.code == '200') {
						this.searchList = res[1].data.result.songs;
						// 将搜索结果展示
						this.searchType = 2;
					}
				});
			},
			// 取消搜索
			handleToClose() {
				this.searchWord = '';
				this.searchType = 1;
			},
			// 进入歌曲
			handleToDetail(songId) {
				// 清除歌单缓存
				uni.removeStorage({
					key: 'song_list',
				});
				let item; 
				// 记录歌单
				let song_list = []; 
				// 获取搜索结果的歌单
				for (item in this.searchList) {
					song_list[item] = this.searchList[item].id;
				};
				// console.log(this.searchList);
				// 将搜索结果的歌单放入缓存
				uni.setStorage({
					key: 'song_list',
					data: song_list,
				});
				// 跳转到歌曲详情页
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				});
			},
			// 进行搜索提示
			handleToSuggest(ev) {
				// 获取输入框中的搜索词
				let value = ev.detail.value;
				// 如果搜索词为空则不进行搜索提示
				if (!value) {
					this.searchType = 1;
					return;
				}
				// 获取搜索词提示
				searchSuggest(value).then((res) => {
					if (res[1].data.code == '200') {
						this.searchSuggest = res[1].data.result.allMatch;
						this.searchType = 3;
					}
				});
			}
		}
	}
</script>

<style>
	.search-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 50rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.search-search text {
		margin: 0 26rpx;
	}

	.search-search input {
		flex: 1;
		font-size: 26rpx;
	}

	.search-history {
		margin: 0 30rpx 50rpx 30rpx;
		font-size: 26rpx;
	}

	.search-history-head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 36rpx;
	}

	.search-history-list {
		display: flex;
		flex-wrap: wrap;
	}

	.search-history-list view {
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		background: #f7f7f7;
	}

	.search-hot {
		margin: 0 30rpx;
		font-size: 26rpx;
	}

	.search-hot-head {
		margin-bottom: 36rpx;
	}

	.search-hot-tiem {
		display: flex;
		align-items: center;
		margin-bottom: 58rpx;
	}

	.search-hot-top {
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
	}

	.search-hot-word {
		flex: 1;
	}

	.search-hot-word view:nth-child(1) {
		font-size: 30rpx;
		color: black;
	}

	.search-hot-word view:nth-child(2) {
		font-size: 24rpx;
		color: #878787;
	}

	.search-hot-word image {
		width: 48rpx;
		height: 22rpx;
	}

	.search-hot-count {
		color: #878787;
	}

	.search-result {
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}

	.search-result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx #e4e4e4 solid;
	}

	.search-result-word {}

	.search-result-word view:nth-child(1) {
		font-size: 28rpx;
		color: #235790;
		margin-bottom: 12rpx;
	}

	.search-result-word view:nth-child(2) {
		font-size: 22rpx;
		color: #898989;
	}

	.search-result-item text {
		font-size: 50rpx;
	}

	.search-suggest {
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
		font-size: 26rpx;

	}

	.search-suggest-head {
		color: #4574a5;
		margin-bottom: 74rpx;
	}

	.search-suggest-item {
		color: #5d5d5d;
		margin-bottom: 74rpx;
	}

	.search-suggest-item text {
		color: #bdbdbd;
		margin-right: 28rpx;
		position: relative;
		top: 2rpx;
	}
</style>
