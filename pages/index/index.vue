<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots autoplay>
				<swiper-item v-for="(item,index) in banner_list">
					<image mode="scaleToFill" style="width: 100%;height: 100%;" :src="item" @error="imageError" />
				</swiper-item>
			</swiper>
			<btn-group />
			<text>
				<!-- {{userRef}} -->
			</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { useStore } from 'vuex'
	import btnGroup from './components/btnGroup.vue';
	import {
		set_feishu_config
	} from '@/unit/conf.ts'
	import {
		isMpFeiShu
	} from '@/unit/index.ts'
	import { getAccessToken, getDepartmentInfo, getOpenId, getTenantInfo, getUserInfo, getH5LoginCode } from '@/api/index.ts';
	const banner_list = ref(['/static/imgs/index/1.png', '/static/imgs/index/2.png', '/static/imgs/index/3.png', '/static/imgs/index/4.png'])

	const store = useStore()
	const imageError = (err : any) => {
		console.log(err);
	}
	onMounted(async () => {
		// #ifdef H5
		await isMpFeiShu()
		// #endif
		initData()
		// #ifndef H5
		uni.showShareMenu({
			withShareTicket: true
		})
		// #endif
	})

	const initData = async () => {
		let code : any = ""
		// #ifndef H5
		const provider = await getProvider()
		const login_res = await login(provider.provider?.[0])
		code = login_res.code
		// #endif

		// #ifdef H5
		await set_feishu_config()
		// window.h5sdk.ready(async () => { // ready 方法不需要每次都调用。

		// });
		code = await getH5LoginCode()
		// #endif
		const accessTokenRes : any = await getAccessToken(code)
		// console.log("accessTokenRes----", accessTokenRes);
		if (accessTokenRes.data.data?.access_token) {
			const openIdObj : any = await getOpenId(accessTokenRes.data.data.access_token)
			const openid = openIdObj.data.data.open_id
			const user_info : any = await getUserInfo(openid)

			const tenantInfo : any = await getTenantInfo()
			// console.log("department_ids-------", user_info.data.data.user.department_ids);
			// const departmentInfo = await getDepartmentInfo(user_info.data.data.user.department_ids[0])
			// const userInfo_res = await getUserInfo(provider.provider?.[0])
			// console.log('login_res---', login_res, 'userInfo_res---', userInfo_res, "openIdObj----", openIdObj, "user_info-----", user_info);
			// console.log("user_info-----", user_info, "openid----", openid, "tenantInfo----", tenantInfo, "departmentInfo-----", departmentInfo);
			const obj = { userinfo: user_info.data.data.user, tenantinfo: tenantInfo.data.data.tenant }
			console.log("obj---", obj);
			store.commit("user/infoChange", obj);
		}

	}

	/**
	 * 获取服务供应商
	 */
	const getProvider = async () => {
		return await uni.getProvider({
			service: 'oauth',
		})
	}

	/**
	 * 登录
	 */
	const login = async (provider : any) => {
		console.log('provider---', provider);
		return await uni.login({
			provider,
			univerifyStyle: {
				fullScreen: true
			}
		})
	}

	// /**
	//  * 获取用户信息
	//  */
	// const getUserInfo = async (provider : any) => {
	// 	return await uni.getUserInfo({
	// 		provider,
	// 		withCredentials: true
	// 	})
	// }
</script>

<style lang="scss">

</style>