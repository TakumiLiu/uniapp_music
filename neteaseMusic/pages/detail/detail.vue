<template>
	<view>
		<view class="detail">
			<!--歌曲详情-->
			<view class="fixbg" :style="{ 'background-image': 'url('+ songDetail.al.picUrl+')'}"></view>
			<musichead :title="songDetail.name" :icon="true" color="white"></musichead>
			<view class="container" v-show="!isLoading">
				<scroll-view scroll-y="true">
					<!--歌曲图片-->
					<view class="detail-play" @tap="handleToPlay">
						<image :src="songDetail.al.picUrl" :class="{'detail-play-run' : isPlayRotate}" mode=""></image>
						<text class="iconfont" :class="iconplay"></text>
					</view>
					<!--歌词-->
					<view class="detail-lyric">
						<view class="detail-lyric-wrap" :style="{ transform : 'translateY('+ -scrollY*2 +'rpx)'}">
							<view class="detail-lyric-item" :class="{ active : lyricIndex == index}"
								v-for="(item,index) in songLyric" :key="index">{{ item.lyric }}</view>
						</view>
					</view>
					<!--歌曲进度条-->
					<view class="detail-progress-bar">
						<view class="progress-bar">
							<slider min="0" step="1" :value="nowtime" activeColor="#BB2C08" backgroundColor="#e9e9e9"
								block-size="14" @change="moved" @changing="moved" block-color="#ffffff" :max="maxTime">
							</slider>
						</view>
					</view>

					<view class="detail-progeress-button">
						<!--上一首-->
						<view class="detail-progress-lastsong">
							<image src="../../static/last-song.png" @tap="handleToLast()"></image>
						</view>
						<!--播放或暂停-->
						<view class="detail-progress-play" @tap="handleToPlay">
							<text class="iconfont" :class="iconplay"></text>
						</view>
						<!--下一首-->
						<view class="detail-progeress-nextsong">
							<image src="../../static/next-song.png" @tap="handleToNext()"></image>
						</view>
						<!--收藏-->
						<view class="detail-music-collect">
							<image v-if="check" src="/static/collection-white.png" @tap="collect(songid)">
							</image>
							<image v-if="!check" src="../../static/collection-fill.png" @tap="discollect(songid)">
							</image>
						</view>
					</view>

					<!--歌曲相似列表-->
					<view class="detail-like">
						<view class="detail-like-head">喜欢这首歌的人也听</view>
						<view class="detail-like-item" v-for="(item,index) in songSimi" :key="index"
							@tap="handleToSimi(item.id)">
							<view class="detail-like-img">
								<image :src="item.album.picUrl" mode=""></image>
							</view>
							<view class="detail-like-song">
								<view>{{item.name}}</view>
								<view>
									<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70"
										src="../../static/dujia.png" mode=""></image>
									<image v-if="item.privilege.maxbr == 999000" src="../../static/SQ.png" mode="">
									</image>
									{{item.album.artists[0].name}} - {{item.name}}
								</view>
							</view>
							<text class="iconfont icon-bofang1"></text>
						</view>
					</view>
					<!-- <view class="detail-comment">
						<view class="detail-comment-head">精彩评论</view>
						<view class="detail-comment-item" v-for="(item,index) in songComment" :key="index">
							<view class="detail-comment-img">
								<image :src="item.user.avatarUrl"></image>
							</view>
							<view class="detail-comment-content">
								<view class="detail-comment-title">
									<view class="detail-comment-name">
										<view>{{item.user.nickname}}</view>
										<view>{{item.time | formatTime}}</view>
									</view>
									<view class="detail-comment-like">{{item.likedCount | formatCount}} <text
											class="iconfont icon-dianzan"></text>
									</view>
								</view>
								<view class="detail-comment-text">{{item.content}}</view>
							</view>
						</view> -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		songDetail,
		songSimi,
		songComment,
		songLyric,
		songUrl,
		userInfo,
		userCollectMusicId,
		userCollectMusic,
		userDisCollectMusic,
		userCheckCollectMusicId
	} from '../../common/api.js'
	export default {
		data() {
			return {
				curHeight: 0,
				scrollY: 0,
				songDetail: {
					al: {
						picUrl: '',
					},

				},
				songSimi: [],
				songComment: [],
				songLyric: [],
				lyricIndex: 0,
				iconplay: 'icon-zanting',
				isPlayRotate: true,
				isLoading: true,
				check: true,
				nowdirection: 0,
				currentTime: 0,
				maxTime: "",
				nowtime: 0,
				musicId: '',
				songList: [],
				useremail: '',
				status: '',
				songid: '',
			}
		},
		// computed: {
		// 	// getCurrentTime:function(){
		// 	// 	// this.currentTime=this.bgAudioManager.currentTime;
		// 	// 	return this.bgAudioManager.currentTime;
		// 	// }
		// 	check() {
		// 		return function(index) {
		// 			// console.log(this.statusList[index])\
		// 			if (this.status == 'true')
		// 				return true;
		// 			else return false;
		// 			// return this.statusList[index];
		// 		}
		// 	}
		// },
		watch: {
			lyricIndex: function(newVal, oldVal) {
				// 获取歌词			
				// const lyricDomList = document.getElementsByClassName("detail-lyric-item");
				const _this = this;
				// var lyricDomList;
				uni.createSelectorQuery().in(_this).selectAll(".detail-lyric-item").boundingClientRect(data => {
					const lyricDomList = data;
					// console.log(data)
					if (newVal - oldVal > 1) { // 如果歌词向下跳转就增加需要跳转的歌词高度
						let offsetHeight = this.scrollY;
						for (let i = oldVal; i < newVal; i++) {
							// console.log("additem", i, lyricDomList[i].clientHeight)				
							offsetHeight += lyricDomList[i].height;
						}
						this.scrollY = offsetHeight;
					} else if (newVal - oldVal < 1) { // 如果歌词向上跳转就减少跳转的高度
						let offsetH = this.scrollY;
						for (let i = oldVal; i > newVal; i--) {
							// console.log("subitem", i, lyricDomList[i].clientHeight)
							offsetH = offsetH - lyricDomList[i].height;
						}
						this.scrollY = offsetH;
					} else if (oldVal - newVal == 1) { // 如果正常向下跳转就增加下一个歌词的高度	
						// this.curHeight = document.getElementsByClassName("active")[0].clientHeight;
						uni.createSelectorQuery().in(this).select(".active").boundingClientRect(data => {
							this.curHeight = data.height;
							this.scrollY = this.scrollY - this.curHeight;

						}).exec();
					} else { // 其他情况移动距离为顶部到跳转歌词的距离	
						this.scrollY = lyricDomList[newVal].height + this.scrollY;
						// this.scrollY = lyricDomList[newVal].clientHeight + this.scrollY;
					}
				}).exec();
			}
		},
		onLoad(options) {
			// console.log(options.songId);
			// console.log(options);
			this.getMusic(options.songId);
			// this.onTimeUpdate();
			// console.log(this.xxref);
			this.checkcollect(options.songId);
		},
		onUnload() {
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioManager.destroy();
			// #endif
		},
		onHide() {
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioManager.destroy();
			// #endif
		},
		methods: {
			// 获取歌曲
			getMusic(songId) {
				this.songid = songId;
				// 获取该歌曲id所在歌单的位置
				this.$store.commit('NEXT_ID', songId);
				uni.showLoading({
					title: '正在加载...',
				});
				this.isLoading = true;
				this.musicId = songId;
				Promise.all([songDetail(songId), songSimi(songId), songComment(songId), songLyric(songId), songUrl(
					songId)]).then((res) => {
					// 获取歌曲资源，如url、歌词、图片等
					if (res[0][1].data.code == '200') {
						this.songDetail = res[0][1].data.songs[0];
					}
					// 获取相同歌曲
					if (res[1][1].data.code == '200') {
						this.songSimi = res[1][1].data.songs;
					}
					// 获取歌曲评论
					if (res[2][1].data.code == '200') {
						this.songComment = res[2][1].data.hotComments;
					}
					// 获取歌词
					if (res[3][1].data.code == '200') {
						let lyric = res[3][1].data.lrc.lyric;
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var results = [];
						lyric.replace(re, ($0, $1, $2) => {
							results.push({
								"time": this.formatTimeToSec($1),
								"lyric": $2
							});
						});
						// 清除空歌词
						this.songLyric = results.filter((result) => {
							return result.lyric.charCodeAt(0) !== 10
						});
					}
					// 将歌曲载入音乐组件
					if (res[4][1].data.code == '200') {
						// #ifndef H5
						const bgAudioManager = uni.getBackgroundAudioManager();
						bgAudioManager.title = this.songDetail.name;
						// console.log(typeof this.bgAudioManager);
						// #endif
						// #ifdef H5
						const bgAudioManager = uni.createInnerAudioContext();
						// this.bgAudioManager.autoplay = true;
						this.iconplay = 'icon-bofang1';
						this.isPlayRotate = false;
						// console.log(this.bgAudioManager);
						// #endif
						// 放入歌曲url
						bgAudioManager.src = res[4][1].data.data[0].url || '';
						this.bgAudioManager = bgAudioManager;
						// 将歌词进行拆解
						this.listenLyricIndex();
						// 歌曲播放设置
						bgAudioManager.onPlay(() => {
							// console.log(this.songLyric);
							// for (var i = 0; i < 1; i++) {
							// 	this.curHeight += document.getElementsByClassName("active")[0]
							// 		.clientHeight;
							// 	this.scrollY += this.curHeight;
							// }
							// console.log("xxxxxx", this.curHeight)
							this.iconplay = 'icon-zanting';
							this.isPlayRotate = true;
							this.listenLyricIndex();
						});
						// 获取当前播放时间
						bgAudioManager.onTimeUpdate(() => {

							// console.log(bgAudioManager.currentTime);
							this.nowtime = bgAudioManager.currentTime;
						});
						// 歌曲暂停设置
						bgAudioManager.onPause(() => {
							this.iconplay = 'icon-bofang1';
							this.isPlayRotate = false;
							this.cancelLyricIndex();
						});
						// 歌曲结束设置
						bgAudioManager.onEnded(() => {
							// console.log('stop');
							// getMusic(this.$store.state.nextId);
							this.handleToNext();
						});

					}
					// console.log(this.songDetail);
					// 获取歌曲总长度
					this.maxTime = this.songDetail.dt / 1000;
					// 获取歌曲所在歌单
					uni.getStorage({
						key: 'song_list',
						success: (res) => {
							this.songList = res.data;
						}
					});
					// console.log(this.songList);
					this.isLoading = false;
					uni.hideLoading();
				});
			},
			// 将歌曲时间毫秒转换为秒
			formatTimeToSec(value) {
				let arr = value.split(':');
				return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
			},
			// 歌曲播放或暂停
			handleToPlay() {
				if (this.bgAudioManager.paused) {
					this.bgAudioManager.play();
				} else {
					this.bgAudioManager.pause();
				}
			},
			// 上一首歌曲
			handleToLast() {
				// console.log(this.songList);
				let lastSongId;
				let item;
				for (item in this.songList) {
					if (this.songDetail.id == this.songList[item]) {
						if (item == 0) {
							// 当歌曲为个当中的第一首，则播放歌单中的最后一首
							lastSongId = this.songList[this.songList.length - 1];
						} else {
							lastSongId = this.songList[Number(item) - 1];
						}
					}
				}
				// 跳转到上一首歌曲
				uni.redirectTo({
					url: '/pages/detail/detail?songId=' + lastSongId,
				});
			},
			// 下一首歌曲
			handleToNext() {
				let nextSongId;
				let item;
				for (item in this.songList) {
					if (this.songDetail.id == this.songList[item]) {
						if (item == this.songList.length - 1) {
							// 当歌曲为歌单中的最后一首，则播放第一首歌曲
							nextSongId = this.songList[0];
						} else {
							nextSongId = this.songList[Number(item) + 1];
						}
					}
				}
				// 跳转到下一首歌曲
				uni.redirectTo({
					url: '/pages/detail/detail?songId=' + nextSongId,
				});
			},
			listenLyricIndex() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					for (var i = 0; i < this.songLyric.length; i++) {

						if (this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1].time) {
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
						if (this.bgAudioManager.currentTime > this.songLyric[i].time && this.bgAudioManager
							.currentTime < this.songLyric[i + 1].time) {
							this.lyricIndex = i;
						}
					}
				}, 90);
			},
			cancelLyricIndex() {
				clearInterval(this.timer);
			},
			handleToSimi(songId) {
				uni.removeStorage({
					key: 'song_list',
				});
				let item;
				let song_list = [];
				for (item in this.songSimi) {
					song_list[item] = this.songSimi[item].id;
				};
				// console.log(song_list);
				// 缓存歌单
				uni.setStorage({
					key: 'song_list',
					data: song_list,
				});
				// 转到歌曲详情
				uni.redirectTo({
					url: '/pages/detail/detail?songId=' + songId,
				});
			},
			MillisecondToDate(msd) {
				var date = new Date(msd);

				function addZero(num) {
					return num < 10 ? "0" + num : num;
				}
				// 按自定义拼接格式返回
				return addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
			},
			checkcollect(musicid) {
				if (!this.$u.utils.isLogin()) {
					this.check = true;
				} else {
					userInfo().then((res) => {
						this.useremail = res.data.email;
						// console.log(this.playlist.tracks.id)
						// 验证用户收藏音乐是否存在
						userCheckCollectMusicId(this.useremail, this.songid).then((res) => {
							// console.log(res.message);
							this.status = res.message;
							if (this.status == 'true') {
								this.check = false;
							} else {
								this.check = true;
							}
						});
						// console.log(this.playlist.tracks[i].id)

					});
				}
			},
			// 收藏音乐
			collect(musicid) {
				if (!this.$u.utils.isLogin()) {
					this.$u.toast('请先登录再收藏');
				} else {
					this.$u.toast('收藏成功');
					userCollectMusic(this.useremail, musicid);
					this.check = false;
				}
			},
			// 取消收藏音乐
			discollect(musicid) {
				if (!this.$u.utils.isLogin()) {
					this.$u.toast('请先登录再取消收藏');
				} else {
					this.$u.toast('取消收藏成功');
					userDisCollectMusic(this.useremail, musicid);
					this.check = true;
				}
			},
			moved(e) {
				// 拖动进度条跳转到指定时间
				this.bgAudioManager.seek(e.detail.value)
				this.nowtimes = e.detail.value;
			},

		}
	}
</script>

<style scoped>
	.detail {}

	.detail-play {
		width: 580rpx;
		height: 580rpx;
		background: url(../../static/disc.png);
		background-size: cover;
		margin: 100rpx auto 0 auto;
		position: relative;
	}

	.detail-play image {
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}

	.detail-play .detail-play-run {
		animation-play-state: running;
	}

	@keyframes move {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}


	.detail-play text {
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: white;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	/* 	.detail-play view {
		width: 230rpx;
		height: 360rpx;
		background: url(../../static/needle.png);
		position: absolute;
		left: 60rpx;
		right: 100rpx;
		top: -200rpx;
		margin: auto;
		background-color: cover;
	} */
	.detail-progress-bar {
		display: flex;
		justify-content: center;
		/* margin-top: 10%; */
	}

	.progress-bar {
		width: 80%;
	}

	.detail-progeress-button {
		display: flex;
		justify-content: center;
		margin-left: 38px;
	}


	.detail-progress-lastsong {
		margin-right: 15px;
		/* margin-left: 33px; */
	}

	.detail-progress-lastsong image {
		color: white;
		height: 32px;
		width: 32px;
	}

	.detail-progeress-nextsong {
		margin-left: 15px;
	}

	.detail-progeress-nextsong image {
		height: 32px;
		width: 32px;
	}

	.detail-progress-play text {
		/* position: absolute; */
		color: white;
		display: flex;
		height: 32px;
		width: 31px;
		font-size: 30px;
		margin-top: 1px;
	}

	.detail-music-collect {
		margin-bottom: 2px;
		margin-left: 12px;
	}

	.detail-music-collect image {
		height: 32px;
		width: 32px;
	}


	.detail-lyric {
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: #6f6e73;
	}

	.detail-lyric-wrap {
		transition: .5s;
		/* height: 82rpx; */
	}

	.detail-lyric-item {
		/* height: 82rpx; */
		/* height: auto; */
	}

	.detail-lyric-item.active {
		color: white;
	}

	.detail-like {
		margin: 0 30rpx;
	}

	.detail-like-head {
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}

	.detail-like-item {
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
	}

	.detail-like-item text {
		font-size: 50rpx;
		color: #c6c2bf;
	}

	.detail-like-img {
		width: 82rpx;
		height: 82rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.detail-like-img image {
		width: 100%;
		height: 100%;
	}

	.detail-like-song {
		flex: 1;
		color: #c6c2bf;
	}

	.detail-like-song view:nth-child(1) {
		font-size: 28rpx;
		color: white;
		margin-bottom: 12rpx;
	}

	.detail-like-song view:nth-child(2) {
		font-size: 22rpx;
	}

	.detail-like-song image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.detail-comment {
		margin: 0 30rpx;
	}

	.detail-comment-head {
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}

	.detail-comment-item {
		margin-bottom: 28rpx;
		display: flex;
	}

	.detail-comment-img {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
		margin: 18rpx;
	}

	.detail-like-img image {
		width: 100%;
		height: 100%;
	}

	.detail-comment-content {
		flex: 1;
		color: #cbcacf;
	}

	.detail-comment-title {
		display: flex;
		justify-content: space-between;
	}

	.detail-comment-name {}

	.detail-comment-name view:nth-child(1) {
		margin-top: 20rpx;
		font-size: 26rpx;
		color: white;
	}

	.detail-comment-name view:nth-child(2) {
		font-size: 20rpx;
	}

	.detail-comment-like {
		font-size: 28rpx;
	}

	.detail-comment-text {
		font-size: 28rpx;
		line-height: 40rpx;
		color: white;
		margin-top: 20rpx;
		border-bottom: 1px #e0e0e0 solid;
		padding-bottom: 40rpx;
	}
</style>
