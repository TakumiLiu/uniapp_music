<script>
	
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>
<style>
	@import '@/common/iconfont.css';
</style>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	.container {
		width: 100%;
		height: calc(100vh - 70px);
		overflow: hidden;
	}

	.container scroll-view {
		height: 100%;
	}
	
	.fixbg{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		/* background-image: url(static/logo.png); */
		background-size: cover;
		background-position: center 0;
		filter: blur(20px);
		transform: scale(1.2);
	}
</style>
