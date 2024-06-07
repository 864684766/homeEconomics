<template>
	<view>
		<img src="/static/imgs/index/jifen.png" style="width: 100vw;height: 100vh;" alt="" srcset="" />
	</view>
</template>

<script lang="ts" setup>
	import { onBeforeMount } from 'vue';
	onBeforeMount(() => {
		// #ifndef H5
		uni.showShareMenu({
			withShareTicket: true
		})
		// #endif
	})
</script>

<style>

</style>