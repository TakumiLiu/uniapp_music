import App from './App'
import store from 'store/index.js'
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'

Vue.filter('formatCount', function(value) {
	if (value >= 10000 && value <= 100000000) {
		value /= 1000;
		return value.toFixed(1) + '万';
	} else if (value > 100000000) {
		value /= 100000000;
		return value.toFixed(1) + '亿';
	} else {
		return value;
	}
});

Vue.filter('formatTime', function(value) {
	var data = new Date(value);
	return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日';
});

const app = new Vue({
	...App,
	store
})
// 自定义工具
import utils from '@/common/utils.js'
Vue.use(utils, app)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
