import { generateRandomString } from "."
import { getAutoToken, h5_authorize_ticket } from "../api"
import CryptoJS from 'crypto-js'
export const app_id = "cli_a6d43e244ceb100b"
export const app_secret = "f76i5lak9WFyoqFFFNQMneYWlOW3Nub8"

export const h5_id = "cli_a6e822984d3b900b"
export const h5_secret = "sA6jphT6JROW4sT3Ja4jfgnOo8ZEgf8d"

export const h5_qywx_id = "ww51b4f1a21af93931"
export const h5_qywx_secret = "DnpZuuHsTQXAu5VHul6RTREuwe807A8BFE2FJZSOgds"

export const getFullUrlPath = () => {
	// const url = `${window.location.origin}${window.location.pathname}`
	// const url = `http://127.0.0.1${window.location.pathname}`
	return window.location.href
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