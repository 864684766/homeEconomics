<template>
	<view>
		<img src="/static/imgs/index/jifen.png" style="width: 100vw;height: 100vh;" alt="" srcset="" />
	</view>
</template>

<script lang="ts" setup>
	import { onBeforeMount, onMounted } from 'vue';
	onBeforeMount(() => {
		// #ifndef H5
		uni.showShareMenu({
			withShareTicket: true
		})
		// #endif
	})

	// 分享给朋友
	const onShareAppMessage = (res) => {
		console.log('onShareAppMessage---', res);
		return {
			title: '冲100送300',
			path: '/pages/index/index',
		};
	};

	onMounted(() => {
		const pages = getCurrentPages();
		const thisPage = pages[pages.length - 1];
		thisPage.onShareAppMessage = onShareAppMessage;
	});
</script>

<style>

</style>