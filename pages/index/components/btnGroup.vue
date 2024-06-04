<template>
	<view class="btn-group">
		<uni-grid :column="4" :highlight="true" @change="gridChangeHandle" :square="false" :showBorder="false">
			<uni-grid-item v-for="(item, index) in btns" :index="index" :key="index">
				<view class="grid-item-box">
					<image mode="scaleToFill" style="width: 60rpx;height: 60rpx" :src="item.icon" @error="imageError" />
					<text class="grid-item-text">{{item.text}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const btns = ref([{
		icon: '/static/imgs/index/lottery.svg',
		text: '领券中心'
	}, {
		icon: '/static/imgs/index/active.svg',
		text: '活动中心'
	}, {
		icon: '/static/imgs/index/integral.svg',
		text: '积分兑换'
	}, {
		icon: '/static/imgs/index/business.svg',
		text: '业务分类'
	}])

	const gridChangeHandle = () => {

	}

	const imageError = (err) => {
		console.log(err);
	}
</script>

<style lang="scss">
	.btn-group {
		margin-top: 30rpx;
	}

	.grid-item-box {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;

		.grid-item-text {
			margin-top: 5rpx;
			font-size: 16rpx;
		}
	}
</style>