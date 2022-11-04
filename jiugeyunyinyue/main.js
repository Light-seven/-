import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
import $http from './utils/request.js'

uni.$http = $http
// 配置请求根路径
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
uni.$showMsg = function(title = '数据加载失败！',duration = 1000){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
const bgAudioManager = wx.getBackgroundAudioManager();
uni.bgAudioManager = bgAudioManager
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}
// #endif
