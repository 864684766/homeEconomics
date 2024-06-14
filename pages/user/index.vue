<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<uni-group title="基础信息" top="20">
				<view class="uni-form-item uni-column">
					<text class="title">用户名：</text>
					<text class="content">
						<image :src="userobj.userinfo?.avatar.avatar_72" mode=""
							style="width: 100rpx;height: 100rpx;" />
						{{userobj.userinfo?.name}}
					</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">工号：</text>
					<text class="content">
						{{userobj.userinfo?.employee_no}}
					</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">企业名：</text>
					<text class="content">
						<image :src="userobj.tenantinfo?.avatar.avatar_72" mode=""
							style="width: 100rpx;height: 100rpx;" />
						{{userobj.tenantinfo?.name}}
					</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">性别：</text>
					<text class="content">{{getGender(userobj.userinfo?.gender)}}</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">所在城市：</text>
					<text class="content">{{userobj.userinfo?.city}}</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">手机号：</text>
					<text class="content">{{userobj.userinfo?.mobile}}</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">加入公司时间：</text>
					<uni-dateformat :date="userobj.userinfo?.join_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">工位：</text>
					<text class="content">{{userobj.userinfo?.work_station}}</text>
				</view>
			</uni-group>

			<uni-group title="用户状态" top="20">
				<view class="uni-form-item uni-column">
					<text class="title">是否离职：</text>
					<text>{{userobj.userinfo?.status.is_resigned?'是':'否'}}</text>
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">是否激活账号：</text>
					<text>{{userobj.userinfo?.status.is_activated?'是':'否'}}</text>
				</view>
			</uni-group>
		</form>

		<!-- 	<text>
			这里是用户信息
			{{userobj}}
		</text> -->
		<!-- <button @click="getWebPathHandle">获取地址</button> -->
	</view>

</template>

<script setup lang="ts">
	import {
		getWebPath
	} from '@/unit/common/index'
	import {
		computed,
		onMounted,
	} from 'vue';
	import {
		useStore
	} from 'vuex'
	import { getAccessToken, getDepartmentInfo, getOpenId, getTenantInfo, getUserInfo, getH5LoginCode } from '../../api';
	const store = useStore()

	// onMounted(() => {
	// 	initData()
	// })
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


	const initData = async () => {
		let code = ""
		// #ifndef H5
		const provider = await getProvider()
		const login_res = await login(provider.provider?.[0])
		code = login_res.code
		// #endif

		// #ifdef H5
		window.h5sdk.ready(async () => { // ready 方法不需要每次都调用。
			const res = await getH5LoginCode()
		});
		// #endif
		const accessTokenRes : any = await getAccessToken(code)
		// console.log("accessTokenRes----", accessTokenRes);
		const openIdObj : any = await getOpenId(accessTokenRes.data.data.access_token)
		const openid = openIdObj.data.data.open_id
		const user_info : any = await getUserInfo(openid)

		const tenantInfo : any = await getTenantInfo()
		// console.log("department_ids-------", user_info.data.data.user.department_ids);
		const departmentInfo = await getDepartmentInfo(user_info.data.data.user.department_ids[0])
		// const userInfo_res = await getUserInfo(provider.provider?.[0])
		// console.log('login_res---', login_res, 'userInfo_res---', userInfo_res, "openIdObj----", openIdObj, "user_info-----", user_info);
		// console.log("user_info-----", user_info, "openid----", openid, "tenantInfo----", tenantInfo, "departmentInfo-----", departmentInfo);
		const obj = { userinfo: user_info.data.data.user, tenantinfo: tenantInfo.data.data.tenant }
		console.log("obj---", obj);
		store.commit("user/infoChange", obj);
	}


	const userobj = computed(
		() => store.getters["user/userInfo"]
	);

	const getWebPathHandle = () => {

		const res = getWebPath()
		console.log(res);
	}

	const getGender = (gender : number) => {
		switch (gender) {
			case 1:
				return '男'
			case 2:
				return '女'
			case 3:
				return '保密'
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>