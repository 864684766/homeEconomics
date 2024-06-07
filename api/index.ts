
const getUrl = (url : string) => {
	// #ifdef MP-LARK
	url = `https://open.feishu.cn${url}`
	// #endif
	return url
}


const app_id = "cli_a6d43e244ceb100b"
const app_secret = "f76i5lak9WFyoqFFFNQMneYWlOW3Nub8"


export const getH5LoginCode = async () => {
	return await tt.requestAuthCode({
		appId: app_id,
	});
}

/**
 * 设置token
 */
export const getAutoToken = async () => {
	const token = {
		data: ""
	}
	// let token = await uni.getStorage({ key: "autoToken" });
	// if (!token.data) {
	// console.log("没有token----------");
	const data = {
		app_id,
		app_secret
	}
	const token_res : any = await getToken(data)
	// console.log("token_res----------", token_res);
	await uni.setStorage({ key: "autoToken", data: `Bearer ${token_res.data.tenant_access_token}` })
	token.data = `Bearer ${token_res.data.tenant_access_token}`
	// }
	// console.log("token----------", token);
	return token.data
}

export const getToken = async (data : any) => {
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
	}
}


export const getAccessToken = async (code : string) => {
	try {
		const token = await getAutoToken()
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
		//TODO handle the exception
		console.log("e----", e);
	}
}