<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots autoplay>
				<swiper-item v-for="(item,index) in banner_list">
					<image mode="scaleToFill" style="width: 100%;height: 100%;" :src="item" @error="imageError" />
				</swiper-item>
			</swiper>
			<btn-group />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import btnGroup from './components/btnGroup.vue';
	const banner_list = ref(['/static/imgs/index/1.jpeg', '/static/imgs/index/2.png', '/static/imgs/index/3.webp'])

	const imageError = (err) => {
		console.log(err);
	}
</script>

<style lang="scss">

</style>