<script>
	import {
		getAutoToken,
		getH5Token,
		h5_authorize_ticket
	} from './api/index'

	import {
		getWebPath,
		generateRandomString
	} from "./unit/common/index"

	export default {
		onLaunch: async function() {
			// #ifndef H5
			await getAutoToken()
			// #endif
			// #ifdef H5

			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
		// onShareAppMessage(res) {
		// 	console.log("-----onShareAppMessage--------", res);
		// 	const path = getWebPath()
		// 	uni.showToast({
		// 		title: `------${res}`,
		// 		duration: 2000
		// 	});
		// 	return {
		// 		title: '分享的标题',
		// 		path,
		// 		imageUrl: '分享图片的URL'
		// 	}
		// }
	}
</script>

<style>
	/*每个页面公共css */
</style>