<template>
	<view class="btn-group">
		<uni-grid :column="4" :highlight="true" @change="gridChangeHandle" :square="false" :showBorder="false">
			<uni-grid-item v-for="(item, index) in btns" :index="index" :key="index">
				<view class="grid-item-box" @click="btnGroupHandle(item.type)">
					<image mode="scaleToFill" style="width: 80rpx;height: 80rpx" :src="item.icon" @error="imageError" />
					<text class="grid-item-text">{{item.text}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
	<uni-popup ref="shareRef" type="share" safeArea backgroundColor="#fff">
		<uni-popup-share></uni-popup-share>
	</uni-popup>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';

	const btns = ref([{
		icon: '/static/imgs/index/active.svg',
		text: '活动公告1'
	}, {
		icon: '/static/imgs/index/integral.svg',
		text: '积分兑换',
		type: 'integral'
	},
	// , {
	// 	icon: '/static/imgs/index/transmit.svg',
	// 	text: '一键转发',
	// 	type: "transmit"
	// }, 
	{
		icon: '/static/imgs/index/user.svg',
		text: '用户中心',
		type: "user"
	}])

	const shareRef = ref<any>(null)

	const gridChangeHandle = () => {

	}

	const imageError = (err : any) => {
		console.log(err);
	}

	const btnGroupHandle = (type : string) => {
		switch (type) {
			case 'transmit':
				transmitHandle()
				break;
			case 'user':
				gotoUserPage()
				break;
			case 'integral':
				gotoIntegralPage()
				break;
			default:
				uni.showToast({
					title: '建设中...',
					duration: 2000
				});
		}
	}

	const gotoUserPage = () => {
		uni.navigateTo({
			url: '/pages/user/index'
		});
	}

	const gotoIntegralPage = () => {
		uni.navigateTo({
			url: '/pages/integral/index'
		});
	}

	/**
	 * 转发
	 */
	const transmitHandle = () => {
		shareRef.value.open()
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
			font-size: 25rpx;
		}
	}
</style>