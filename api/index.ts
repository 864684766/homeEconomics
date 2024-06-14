
import { app_id, app_secret, h5_id, h5_secret } from '@/unit/conf.ts'

const getUrl = (url : string) => {
	// #ifdef MP-LARK
	url = `https://open.feishu.cn${url}`
	// #endif
	return url
}


export const getH5LoginCode = async () => {
	return new Promise((resolve, reject) => {
		tt.requestAuthCode({
			appId: h5_id,
			success: (info) => {
				resolve(info.code)
				console.info(info.code)
			},
			fail: (error) => {
				reject(error)
				console.error(error)
			}
		});
	})

}

/**
 * 设置token
 */
export const getAutoToken = async () => {
	const token = {
		data: ""
	}
	const data = {
		app_id,
		app_secret
	}
	// #ifdef H5
	data.app_id = h5_id
	data.app_secret = h5_secret
	const h5_res : any = await getH5Token(data)
	token.data = `Bearer ${h5_res.data.tenant_access_token}`
	// #endif
	// #ifndef H5
	const mp_res : any = await getMpToken(data)
	token.data = `Bearer ${mp_res.data.tenant_access_token}`
	// #endif
	await uni.setStorage({ key: "autoToken", data: token.data })

	return token.data
}

export const getMpToken = async (data : any) => {
	try {
		const url = getUrl("/open-apis/auth/v3/tenant_access_token/internal")
		return await uni.request({
			url,
			method: "POST",
			data
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
	}
}


export const getAccessToken = async (code : string) => {
	try {
		let token : any = await getAutoToken()
		console.log("getAutoToken---------", token);
		const data = {
			grant_type: "authorization_code",
			code
		}
		const url = getUrl("/open-apis/authen/v1/oidc/access_token")
		return await uni.request({
			url,
			method: "POST",
			data,
			header: {
				Authorization: token
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
	}
}

export const getOpenId = async (accessToken : string) => {
	try {
		const url = getUrl("/open-apis/authen/v1/user_info")
		return await uni.request({
			url,
			method: "GET",
			header: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
	}
}


export const getUserInfo = async (openId : any) => {
	try {
		const token = await getAutoToken()
		const url = getUrl(`/open-apis/contact/v3/users/${openId}`)
		return await uni.request({
			url,
			method: "GET",
			header: {
				Authorization: token
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
	}
}


export const getTenantInfo = async () => {
	try {
		const token = await getAutoToken()
		const url = getUrl(`/open-apis/tenant/v2/tenant/query`)
		return await uni.request({
			url,
			method: "GET",
			header: {
				Authorization: token
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
	}
}

export const getDepartmentInfo = async (department_id : any) => {
	try {
		const token = await getAutoToken()
		const url = getUrl(`/open-apis/corehr/v1/departments/${department_id}`)
		return await uni.request({
			url,
			method: "GET",
			header: {
				Authorization: token
			}
		})
	} catch (e) {
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
		//TODO handle the exception
		console.log("e----", e);
	}
}

/**
 * 获取H5鉴权
 */
export const getH5Token = async (data : any) => {
	try {
		const url = getUrl(`/open-apis/auth/v3/tenant_access_token/internal`)
		return await uni.request({
			url,
			method: "POST",
			data
		})

	} catch (e) {
		//TODO handle the exception
		uni.showToast({
			title: `e----:${e}`,
			duration: 0
		});
		console.log("e----", e);
	}
}

/**
 * 获取H5的ticket
 */
export const h5_authorize_ticket = async (token : string) => {
	try {
		const url = getUrl(`/open-apis/jssdk/ticket/get`)
		return await uni.request({
			url,
			method: "POST",
			header: {
				Authorization: token
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log("e----", e);
		uni.showToast({
			title: `e----:${e}`,
			duration: 2000
		});
	}
}