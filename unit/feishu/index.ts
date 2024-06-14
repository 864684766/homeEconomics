import { generateRandomString } from "@/unit/common/index.ts"
import { h5_id } from "@/unit/conf.ts"
import { getAutoToken, h5_authorize_ticket } from "@/api/index.ts"
import { getAccessToken, getDepartmentInfo, getOpenId, getTenantInfo, getUserInfo, getH5LoginCode } from '@/api/index.ts';
import CryptoJS from 'crypto-js'


/**
 * 获取飞书客户端的宿主信息
 */
export const getFsSystemInfo = () => {
	return new Promise((resolve, reject) => {
		tt.getSystemInfo({
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}


/**
 * 获取飞书鉴权需要的参数
 */
export const get_config_parameters = async () => {
	const token = await getAutoToken()
	const ticket_obj = await h5_authorize_ticket(token)
	const jsapi_ticket = ticket_obj.data.data.ticket
	const noncestr = generateRandomString(10)
	const timestamp = new Date().getTime()
	const url = `${window.location.origin}${window.location.pathname}`
	let signature = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
	signature = CryptoJS.SHA1(encodeURI(signature)).toString()
	return {
		"appid": h5_id,
		"signature": signature,
		"noncestr": noncestr,
		"timestamp": timestamp,
	}
}

/**
 * 设置飞书的鉴权
 */
export const set_feishu_config = () => {
	return new Promise(async (resolve, reject) => {
		const config = await get_config_parameters()
		// 调用config接口进行鉴权
		window.h5sdk.config({
			appId: config.appid,
			timestamp: config.timestamp,
			nonceStr: config.noncestr,
			signature: config.signature,
			jsApiList: [],
			//鉴权成功回调
			onSuccess: (res) => {
				console.log(`config success: ${JSON.stringify(res)}`);
				resolve(`config success: ${JSON.stringify(res)}`)
			},
			//鉴权失败回调
			onFail: (err) => {
				console.error(`config failed: ${JSON.stringify(err)}`);
				reject(`config failed: ${JSON.stringify(err)}`)
			},
		});
	})
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

/**
 * 获取用户信息
 */
export const getUserData = async () => {
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
		return obj
	}

}