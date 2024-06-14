import { generateRandomString } from "@/unit/common/index.ts"
import { h5_id } from "@/unit/conf.ts"
import { getAutoToken, h5_authorize_ticket } from "@/api/index.ts"
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