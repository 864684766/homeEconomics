<template>
	<view>
		<button type="default" @click="shareHandle">分享</button>
		<img src="/static/imgs/index/jifen.png" style="width: 100vw;height: 100vh;" alt="" srcset="" />
	</view>
</template>

<script lang="ts" setup>
	import { onBeforeMount, onMounted } from 'vue';

	import {
		getFullUrlPath
	} from '@/unit/common/index.ts'

	import {
		fillTemplate
	} from '@/unit/common/index.ts'

	import {
		isMpFeiShu
	} from '@/unit/index.ts'

	import {
		onLoad
	} from "@dcloudio/uni-app";


	onBeforeMount(async () => {
		// #ifdef H5
		const isFeishu = await isMpFeiShu()
		if (!isFeishu) {
			uni.redirectTo({
				url: '/pages/error/index'
			})
		}
		// #endif
		// #ifndef H5
		uni.showShareMenu({
			withShareTicket: true
		})
		// #endif
	})

	/**
	 * 分享功能
	 */
	const shareHandle = async () => {
		try {
			const cardTmp = {
				"elements": [
					{
						"tag": "div",
						"text": {
							"tag": "plain_text",
							"content": "$$[cardIntro]"
						}
					},
					{
						"actions": [
							{
								"tag": "button",
								"text": {
									"content": "立即加入",
									"tag": "plain_text"
								},
								"type": "primary",
								"url": "$$[reportUrl]"
							},
						],
						"tag": "action"
					}
				],
				"header": {
					"template": "blue",
					"title": {
						"content": "$$[cardHead]",
						"tag": "plain_text"
					}
				}
			}
			const cardData = {
				cardIntro: "消息的简介",
				reportUrl: getFullUrlPath(),
				cardHead: '🧿飞书未来公开课直播间，带你探索OKR'
			}
			const filled_template : any = fillTemplate(cardTmp, cardData)

			tt.sendMessageCard({
				shouldChooseChat: true,
				chooseChatParams: {},
				withAdditionalMessage: true,
				cardContent: {
					msg_type: "interactive",
					update_multi: false,
					card: filled_template
				},
				success(res) {
					console.log(JSON.stringify(res));
				},
				fail(res) {
					console.log(`sendMessageCard fail: ${JSON.stringify(res)}`);
				}
			});
		} catch (e) {
			//TODO handle the exception
			uni.showModal({
				title: '提示',
				content: `ERROR:${JSON.stringify(e)}`,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}

	// 分享给朋友
	const onShareAppMessage = (res) => {
		console.log('onShareAppMessage---', res);
		return {
			title: '冲100送300',
			path: getFullUrlPath(),
		};
	};


	// onLoad 接受 A 页面传递的参数
	onLoad((option) => {
		console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
	});

	onMounted(() => {
		// #ifndef H5
		const pages = getCurrentPages();
		const thisPage = pages[pages.length - 1];
		thisPage.onShareAppMessage = onShareAppMessage;
		// #endif
	});
</script>

<style>

</style>